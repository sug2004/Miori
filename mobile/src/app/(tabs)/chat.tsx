import { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';

import { Image } from 'expo-image';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { api } from '@/lib/api';

type Msg = { id: string; role: string; content: any; createdAt: string };

const MIO_AVATAR = 'https://api.dicebear.com/9.x/adventurer/png?seed=Mio';

export default function ChatScreen() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const scrollRef = useRef<ScrollView>(null);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    void (async () => {
      setLoading(true);
      try {
        const conv = await api.get<any>('/chat/conversation');
        const msgs = await api.get<Msg[]>(`/chat/conversation/${conv.id}/messages`);
        setMessages(msgs);
      } catch {
        // ignore
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const scrollToBottom = () => {
    setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 100);
  };

  useEffect(scrollToBottom, [messages, sending]);

  const send = async () => {
    const text = input.trim();
    if (!text || sending) return;
    setInput('');
    setSending(true);
    try {
      const res = await api.post<any>('/chat/message', { content: text });
      setMessages((prev) => [...prev, res.userMessage, res.assistantMessage]);
    } catch {
      // ignore
    } finally {
      setSending(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top']}>
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
      >
        {/* Header */}
        <View className="px-5 pt-3 pb-2">
          <Text className="font-display text-2xl font-semibold text-ink">Mio</Text>
          <Text className="mt-0.5 text-sm text-muted">Your anime stylist waifu ✨</Text>
        </View>

        {/* Messages */}
        <ScrollView
          ref={scrollRef}
          className="flex-1 px-4"
          contentContainerStyle={{ gap: 12, paddingTop: 8, paddingBottom: 16 }}
          keyboardShouldPersistTaps="handled"
          onContentSizeChange={scrollToBottom}
        >
          {loading && (
            <View className="items-center py-8">
              <ActivityIndicator color="#F97316" />
            </View>
          )}

          {messages.map((m) => {
            const isUser = m.role === 'USER';
            const text = typeof m.content === 'string' ? m.content : (m.content?.text ?? '');
            const outfits = Array.isArray((m.content as any)?.outfits) ? (m.content as any).outfits : [];
            return (
              <View key={m.id} className={`flex-row ${isUser ? 'justify-end' : 'justify-start'}`}>
                {!isUser && (
                  <View className="mr-2 mt-1 h-8 w-8 overflow-hidden rounded-full border border-line">
                    <Image source={{ uri: MIO_AVATAR }} style={{ width: '100%', height: '100%' }} />
                  </View>
                )}
                <View
                  className={`max-w-[90%] rounded-2xl px-4 py-2.5 ${
                    isUser
                      ? 'bg-accent rounded-br-md'
                      : 'bg-surface border border-line rounded-bl-md'
                  }`}
                >
                  <Text className={`text-[15px] leading-[22px] ${isUser ? 'text-white' : 'text-ink'}`}>
                    {text}
                  </Text>
                  {!isUser && outfits.length > 0 && (
                    <View className="mt-3">
                      {outfits.map((outfit: any, oi: number) => (
                        <View key={oi} className="mb-3 last:mb-0">
                          <Text className="mb-2 text-xs font-semibold text-muted">{outfit.title || `Option ${oi + 1}`}</Text>
                          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 10 }}>
                            {(outfit.items || []).map((item: any) => (
                              <View key={item.id} className="w-28">
                                <View className="h-36 w-28 overflow-hidden rounded-xl border border-line bg-background">
                                  {item.imageUrl ? (
                                    <Image source={{ uri: item.imageUrl }} style={{ width: '100%', height: '100%' }} contentFit="cover" />
                                  ) : (
                                    <View className="flex-1 items-center justify-center px-1">
                                      <Text className="text-[10px] text-muted text-center">{item.subcategory || item.category}</Text>
                                    </View>
                                  )}
                                </View>
                                <Text className="mt-1 text-[10px] text-muted" numberOfLines={1}>
                                  {item.color ? `${item.color} ${item.subcategory || item.category}` : (item.subcategory || item.category)}
                                </Text>
                              </View>
                            ))}
                          </ScrollView>
                        </View>
                      ))}
                    </View>
                  )}
                </View>
              </View>
            );
          })}

          {sending && (
            <View className="flex-row justify-start">
              <View className="mr-2 mt-1 h-8 w-8 overflow-hidden rounded-full border border-line">
                <Image source={{ uri: MIO_AVATAR }} style={{ width: '100%', height: '100%' }} />
              </View>
              <View className="rounded-2xl rounded-bl-md bg-surface border border-line px-4 py-3">
                <ActivityIndicator color="#F97316" size="small" />
              </View>
            </View>
          )}
        </ScrollView>

        {/* Input bar */}
        <View
          style={{ paddingBottom: Math.max(insets.bottom, 8) }}
          className="flex-row items-end gap-2 border-t border-line bg-background px-4 pt-2"
        >
          <TextInput
            value={input}
            onChangeText={setInput}
            placeholder="Message Mio..."
            placeholderTextColor="#9CA3AF"
            className="flex-1 rounded-2xl border border-line bg-surface px-4 py-2.5 text-ink"
            returnKeyType="default"
            multiline
            blurOnSubmit={false}
            textAlignVertical="top"
            style={{ minHeight: 40, maxHeight: 100 }}
          />
          <Pressable
            onPress={send}
            disabled={sending || !input.trim()}
            className="h-10 items-center justify-center rounded-full bg-accent px-5 disabled:opacity-50 self-end mb-0.5"
          >
            <Text className="font-semibold text-white">Send</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
