import { ComponentRef, useRef, useState } from 'react';
import { Dimensions, Pressable, ScrollView, Text, View } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';

const { width } = Dimensions.get('window');

const PAGES = [
  {
    title: 'Miori',
    subtitle: 'Your personal AI stylist',
    image: 'https://images.unsplash.com/photo-1489987707025-afc232f7bdaf?w=800&q=80',
    caption: 'More than outfits.\nA better you.',
  },
  {
    title: 'Organize Your Wardrobe',
    subtitle: 'Keep your clothes always with you.',
    image: 'https://images.unsplash.com/photo-1489987707025-afc232f7bdaf?w=800&q=80',
    caption: 'Your wardrobe in your pocket',
  },
  {
    title: 'Get AI Outfit Suggestions',
    subtitle: 'Looks for your mood, occasion and weather.',
    image: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800&q=80',
    caption: 'Look good. Feel good. Do good.',
  },
];

export default function OnboardingScreen() {
  const scrollRef = useRef<ComponentRef<typeof ScrollView>>(null);
  const [page, setPage] = useState(0);

  const goNext = () => {
    if (page < PAGES.length - 1) {
      scrollRef.current?.scrollTo({ x: (page + 1) * width, animated: true });
    } else {
      router.replace('/sign-in');
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top', 'left', 'right', 'bottom']}>
      <View className="flex-1">
        <ScrollView
          ref={scrollRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={(e) => {
            const p = Math.round(e.nativeEvent.contentOffset.x / width);
            setPage(p);
          }}>
          {PAGES.map((p, i) => (
            <View key={i} style={{ width }} className="flex-1 px-6 pt-10">
              {i === 0 ? (
                <>
                  <Text className="font-display text-5xl text-ink">Miori</Text>
                  <Text className="mt-2 text-base text-muted">Your personal AI stylist</Text>
                </>
              ) : (
                <>
                  <Text className="font-display text-3xl text-ink">{p.title}</Text>
                  <Text className="mt-2 text-base text-muted">{p.subtitle}</Text>
                </>
              )}

              {/* Image card */}
              <View className="mt-8 flex-1 items-center justify-center">
                <View className="h-[380px] w-full overflow-hidden rounded-3xl border border-line bg-surface">
                  <Image source={{ uri: p.image }} style={{ width: '100%', height: '100%' }} contentFit="cover" />
                  <View className="absolute bottom-4 left-4 right-4 rounded-2xl bg-background/85 px-4 py-3">
                    <Text className="text-center text-sm text-ink">{p.caption}</Text>
                  </View>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>

        {/* Footer: dots + next button */}
        <View className="flex-row items-center justify-between px-8 pb-10">
          <View className="flex-row gap-2">
            {PAGES.map((_, i) => (
              <View
                key={i}
                className={`h-2 w-2 rounded-full ${i === page ? 'bg-accent' : 'bg-line'}`}
              />
            ))}
          </View>
          <Pressable
            onPress={goNext}
            className="h-14 w-14 items-center justify-center rounded-full bg-accent active:bg-accent-strong">
            <Text className="text-xl text-background">→</Text>
          </Pressable>
        </View>
        <Pressable onPress={() => router.replace('/sign-in')} className="items-center pb-6">
          <Text className="text-sm text-muted">Skip</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
