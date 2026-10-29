import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ActivityIndicator, Modal, Pressable, ScrollView, Text, TextInput, View } from 'react-native';

import { Image } from 'expo-image';
import { router, useFocusEffect } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DrawerButton } from '@/components/drawer-button';
import { BookmarkIcon, SearchIcon } from '@/components/icons';
import { api } from '@/lib/api';
import { useAuth } from '@/state/auth';
import { File, Paths } from 'expo-file-system';

type Pin = {
  id: string;
  title: string;
  image: string;
  aspect: number;
  vibe: string;
};

type FeedResponse = {
  pins: Pin[];
  hasMore: boolean;
  nextBookmark?: string | null;
};

const savedFile = () => new File(Paths.document, 'miori-saved-pins.json');

export default function InspirationScreen() {
  const { user } = useAuth();
  const [styles, setStyles] = useState<string[]>(['For You']);
  const [filter, setFilter] = useState('For You');
  const [tab, setTab] = useState<'discover' | 'saved'>('discover');
  const [query, setQuery] = useState('');
  const [pins, setPins] = useState<Pin[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [selected, setSelected] = useState<Pin | null>(null);
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set());
  const [savedPins, setSaved] = useState<Pin[]>([]);

  const filterRef = useRef(filter);
  const searchRef = useRef('');
  const cursorRef = useRef<string | null>(null);

  useEffect(() => {
    let active = true;
    try {
      const f = savedFile();
      if (f.exists) {
        void Promise.resolve(f.text()).then((raw) => {
          if (!active) return;
          const list = JSON.parse(raw) as Pin[];
          setSavedIds(new Set(list.map((p) => p.id)));
          setSaved(list);
        });
      }
    } catch {}
    void api
      .get<{ styles: string[] }>('/inspiration/styles')
      .then((res) => {
        if (active && res.styles?.length) setStyles(res.styles);
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);

  const loadPins = useCallback(
    async (opts: { style: string; search: string; bookmarks?: string | null; page: number; replace: boolean }) => {
      if (opts.replace) setLoading(true);
      else setLoadingMore(true);
      try {
        const params = new URLSearchParams({ style: opts.style, page: String(opts.page) });
        if (opts.search) params.set('search', opts.search);
        if (opts.bookmarks) params.set('bookmarks', opts.bookmarks);
        if (user?.gender) params.set('gender', user.gender);
        const res = await Promise.race([
          api.get<FeedResponse>(`/inspiration?${params.toString()}`),
          new Promise<never>((_, reject) => setTimeout(() => reject(new Error('timeout')), 12_000)),
        ]);
        cursorRef.current = res.nextBookmark ?? null;
        setHasMore(res.hasMore);
        setPage(opts.page);
        setPins((prev) =>
          opts.replace
            ? res.pins
            : [...prev.filter((p) => !res.pins.some((n: Pin) => n.id === p.id)), ...res.pins],
        );
      } catch {
        // keep old pins
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    },
    [],
  );

  useFocusEffect(
    useCallback(() => {
      void loadPins({ style: filterRef.current, search: '', page: 1, replace: true });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );

  const applyStyle = (f: string) => {
    filterRef.current = f;
    searchRef.current = '';
    setFilter(f);
    setQuery('');
    cursorRef.current = null;
    setTab('discover');
    void loadPins({ style: f, search: '', page: 1, replace: true });
  };

  const runSearch = (raw: string) => {
    const q = raw.trim();
    searchRef.current = q;
    cursorRef.current = null;
    if (q) {
      setTab('discover');
      void loadPins({ style: filterRef.current, search: q, page: 1, replace: true });
    }
  };

  const clearSearch = () => {
    setQuery('');
    if (searchRef.current) {
      searchRef.current = '';
      cursorRef.current = null;
      void loadPins({ style: filterRef.current, search: '', page: 1, replace: true });
    }
  };

  const loadMore = () => {
    if (loadingMore || !hasMore) return;
    void loadPins({
      style: filterRef.current,
      search: searchRef.current,
      bookmarks: cursorRef.current,
      page: page + 1,
      replace: false,
    });
  };

  const toggleSave = (pin: Pin) => {
    let nextList: Pin[];
    let nextIds: Set<string>;
    if (savedIds.has(pin.id)) {
      nextList = savedPins.filter((p) => p.id !== pin.id);
      nextIds = new Set([...savedIds].filter((x) => x !== pin.id));
    } else {
      nextList = [pin, ...savedPins];
      nextIds = new Set([pin.id, ...savedIds]);
    }
    setSaved(nextList);
    setSavedIds(nextIds);
    try {
      void Promise.resolve(savedFile().write(JSON.stringify(nextList)));
    } catch {}
  };

  const removeSaved = (pin: Pin) => {
    setSaved(savedPins.filter((p) => p.id !== pin.id));
    setSavedIds(new Set([...savedIds].filter((i) => i !== pin.id)));
    try {
      void Promise.resolve(
        savedFile().write(JSON.stringify(savedPins.filter((p) => p.id !== pin.id))),
      );
    } catch {}
  };

  const columns = useMemo(() => {
    const entries = pins.map((p) => ({ pin: p, h: 1 / (p.aspect || 0.75) }));
    const counts = [0, 0];
    const cols: Pin[][] = [[], []];
    for (const e of entries) {
      const idx = counts[0] <= counts[1] ? 0 : 1;
      cols[idx].push(e.pin);
      counts[idx] += e.h;
    }
    return cols;
  }, [pins]);

  const searching = query.trim().length > 0;

  const pinCard = (pin: Pin) => (
    <Pressable
      key={pin.id}
      onPress={() => setSelected(pin)}
      className="mb-3 overflow-hidden rounded-2xl border border-line bg-surface active:opacity-80">
      <Image
        pointerEvents="none"
        source={{ uri: pin.image }}
        style={{ width: '100%', aspectRatio: pin.aspect || 0.75 }}
        contentFit="cover"
        transition={150}
      />
      <View className="flex-row items-center justify-between gap-2 px-3 py-2.5">
        <Text className="flex-[4] text-xs text-muted" numberOfLines={2}>
          {pin.title}
        </Text>
        <Pressable onPress={() => toggleSave(pin)} hitSlop={10}>
          <BookmarkIcon filled={savedIds.has(pin.id)} color={savedIds.has(pin.id) ? '#E3C6A6' : '#6B665D'} />
        </Pressable>
      </View>
    </Pressable>
  );

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top', 'left', 'right']}>
      {/* Header */}
      <View className="flex-row items-center justify-between px-5 py-3">
        <DrawerButton />
        <Text className="font-display text-2xl font-semibold text-ink">Inspiration</Text>
        <View className="w-6" />
      </View>

      {/* Search bar */}
      <View className="mx-5 flex-row items-center gap-2 rounded-2xl border border-line bg-surface px-4 py-3">
        <SearchIcon color="#6B665D" />
        <TextInput
          value={query}
          onChangeText={setQuery}
          onSubmitEditing={() => runSearch(query)}
          returnKeyType="search"
          placeholder="Search pins, styles, ideas…"
          placeholderTextColor="#6B665D"
          className="flex-1 text-sm text-ink"
          autoCorrect={false}
        />
        {query.length > 0 ? (
          <Pressable onPress={clearSearch} hitSlop={10}>
            <Text className="text-sm text-muted">✕</Text>
          </Pressable>
        ) : null}
      </View>

      {/* Discover / Saved segmented control */}
      <View className="mx-5 mt-3 flex-row rounded-full border border-line bg-surface p-1">
        {(['discover', 'saved'] as const).map((t) => {
          const active = tab === t;
          const label = t === 'discover' ? 'Discover' : `Saved (${savedPins.length})`;
          return (
            <Pressable key={t} onPress={() => setTab(t)} className="flex-1 items-center rounded-full py-2">
              <Text
                className={
                  active ? 'text-xs font-semibold text-accent' : 'text-xs font-medium text-muted'
                }>
                {label}
              </Text>
            </Pressable>
          );
        })}
      </View>

      {tab === 'saved' ? (
        <ScrollView className="pt-2" showsVerticalScrollIndicator={false}>
          <View className="flex-row flex-wrap gap-3 px-5 pb-16">
            {savedPins.map((pin) => (
              <View
                key={pin.id}
                className="overflow-hidden rounded-2xl border border-line bg-surface"
                style={{ width: '47%' }}>
                <Image
                  pointerEvents="none"
                  source={{ uri: pin.image }}
                  style={{ width: '100%', aspectRatio: pin.aspect || 0.75 }}
                  contentFit="cover"
                />
                <View className="flex-row items-center justify-between px-3 py-2">
                  <Text className="flex-1 text-xs text-ink" numberOfLines={1}>
                    {pin.title}
                  </Text>
                  <Pressable onPress={() => removeSaved(pin)} hitSlop={10}>
                    <Text className="pl-2 text-xs text-muted">✕</Text>
                  </Pressable>
                </View>
              </View>
            ))}
            {savedPins.length === 0 ? (
              <Text className="mt-16 w-full text-center text-sm text-muted">
                No saved pins yet — switch to Discover and save a look.
              </Text>
            ) : null}
          </View>
        </ScrollView>
      ) : (
        <View style={{ flex: 1 }}>
          {/* Style filter chips (hidden while searching) */}
          {!searching ? (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              alwaysBounceVertical={false}
              style={{ flexGrow: 0, flexShrink: 0 }}
              contentContainerStyle={{ gap: 8, paddingHorizontal: 20, paddingVertical: 12 }}>
              {styles.map((f) => (
                <Pressable
                  key={f}
                  onPress={() => applyStyle(f)}
                  style={{
                    borderRadius: 999,
                    borderWidth: 1,
                    borderColor: filter === f ? '#E3C6A6' : '#34302A',
                    backgroundColor: filter === f ? '#E3C6A6' : '#1E1C18',
                    paddingHorizontal: 16,
                    paddingVertical: 8,
                  }}>
                  <Text style={{ fontSize: 12, fontWeight: '500', color: filter === f ? '#0D0E0C' : '#A49C90' }}>
                    {f}
                  </Text>
                </Pressable>
              ))}
            </ScrollView>
          ) : (
            <View className="flex-row items-center justify-between px-5 pb-2 pt-3">
              <Text className="text-xs text-muted">Results for "{query.trim()}"</Text>
              <Pressable onPress={clearSearch} hitSlop={10}>
                <Text className="text-xs text-accent">Clear</Text>
              </Pressable>
            </View>
          )}

          {loading ? (
            <View className="flex-1 items-center justify-center">
              <View className="flex-row items-center gap-3 rounded-full border border-line bg-surface px-5 py-3">
                <ActivityIndicator size="small" color="#E3C6A6" />
                <Text className="text-xs text-muted">Fetching looks…</Text>
              </View>
            </View>
          ) : (
            <ScrollView
              style={{ flex: 1 }}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
              keyboardDismissMode="on-drag">
              {pins.length === 0 ? (
                <View className="items-center py-20">
                  <Text className="text-sm text-muted">No pins found. Try another search.</Text>
                </View>
              ) : (
                <View className="flex-row gap-2 px-5 pt-1">
                  {columns.map((col, ci) => (
                    <View key={ci} className="flex-1">
                      {col.map(pinCard)}
                    </View>
                  ))}
                </View>
              )}
              {loadingMore ? (
                <View className="items-center py-4">
                  <ActivityIndicator size="small" color="#E3C6A6" />
                </View>
              ) : hasMore ? (
                <Pressable
                  onPress={loadMore}
                  className="mt-2 items-center self-center rounded-full border border-accent bg-accent-soft px-6 py-2.5 active:opacity-70">
                  <Text className="text-sm font-medium text-accent">Load more looks +</Text>
                </Pressable>
              ) : null}
              <View className="h-10" />
            </ScrollView>
          )}
        </View>
      )}

      {/* Pin detail modal */}
      <Modal
        visible={!!selected}
        transparent
        animationType="slide"
        onRequestClose={() => setSelected(null)}>
        <View className="flex-1 bg-black/70">
          <Pressable
            className="absolute inset-0"
            accessibilityLabel="Close pin details"
            onPress={() => setSelected(null)}
          />
          <SafeAreaView
            edges={['bottom']}
            className="absolute inset-x-0 bottom-0 rounded-t-3xl border-t border-line bg-background"
            style={{ top: 56 }}>
            <View className="items-center pb-1 pt-2.5">
              <View className="h-1 w-10 rounded-full bg-border" />
            </View>
            <ScrollView
              showsVerticalScrollIndicator={false}
              bounces
              contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 40 }}>
              {selected ? (
                <>
                  <View className="overflow-hidden rounded-2xl border border-line bg-surface">
                    <Image
                      source={{ uri: selected.image }}
                      style={{ width: '100%', aspectRatio: selected.aspect || 0.75 }}
                      contentFit="cover"
                    />
                  </View>
                  <Text className="font-display mt-4 text-2xl text-ink">{selected.title}</Text>
                  {selected.vibe ? <Text className="mt-1 text-sm text-muted">{selected.vibe}</Text> : null}
                  {searching ? (
                    <Text className="mt-3 text-xs text-muted">From search: "{query.trim()}"</Text>
                  ) : null}
                  <View className="mt-5 gap-3">
                    <Pressable
                      onPress={() => toggleSave(selected)}
                      className="items-center rounded-full border border-accent bg-accent-soft py-3.5 active:opacity-70">
                      <Text className="text-sm font-semibold text-accent">
                        {savedIds.has(selected.id) ? 'Saved ✓' : 'Save look'}
                      </Text>
                    </Pressable>
                    <Pressable
                      onPress={() => {
                        setSelected(null);
                        router.push('/(tabs)/outfits' as never);
                      }}
                      className="items-center rounded-full bg-accent py-3.5 active:bg-accent-strong">
                      <Text className="text-sm font-semibold text-background">
                        Recreate with my closet →
                      </Text>
                    </Pressable>
                  </View>
                </>
              ) : (
                <View className="items-center justify-center py-16">
                  <ActivityIndicator color="#E3C6A6" />
                </View>
              )}
            </ScrollView>
          </SafeAreaView>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
