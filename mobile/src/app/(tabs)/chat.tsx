import { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, TextInput, View } from 'react-native';

import { Image } from 'expo-image';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { api } from '@/lib/api';

type Msg = { id: string; role: string; content: any; createdAt: string };

export default function ChatScreen() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const scrollRef = useRef<ScrollView>(null);
  const insets = useSafeAreaInsets();

  const load = async () => {
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
  };

  useEffect(() => {
    load();
  }, []);

  useEffect(() => {
    setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 150);
  }, [messages, sending]);

  const send = async () => {
    if (!input.trim()) return;
    const text = input.trim();
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
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
        className="flex-1"
      >
        <View className="px-5 pt-3 pb-2">
          <Text className="font-display text-2xl font-semibold text-ink">Mio - Stylist Waifu</Text>
          <Text className="mt-1 text-sm text-muted">Your caring anime stylist</Text>
        </View>
        <ScrollView
          ref={scrollRef}
          className="flex-1 px-5"
          contentContainerStyle={{ gap: 12, paddingTop: 8, paddingBottom: 16, flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          automaticallyAdjustKeyboardInsets={Platform.OS === 'ios'}
          onContentSizeChange={() => scrollRef.current?.scrollToEnd({ animated: false })}
        >
          {loading ? (
            <View className="items-center py-8">
              <ActivityIndicator color="#F97316" />
            </View>
          ) : null}
          {messages.map((m) => {
            const isUser = m.role === 'USER';
            const text = typeof m.content === 'string' ? m.content : m.content?.text || '';
            return (
              <View key={m.id} className={`flex-row ${isUser ? 'justify-end' : 'justify-start'}`}>
                {!isUser ? (
                  <View className="mr-2 h-8 w-8 overflow-hidden rounded-full border border-line mt-1">
                    <Image source={{ uri: 'https://api.dicebear.com/9.x/adventurer/png?seed=Mio' }} style={{ width: '100%', height: '100%' }} />
                  </View>
                ) : null}
                <View className={`max-w-[75%] rounded-2xl px-4 py-2 ${isUser ? 'bg-accent rounded-br-md' : 'bg-surface border border-line rounded-bl-md'}`}>
                  <Text className={`text-[15px] leading-5 ${isUser ? 'text-white' : 'text-ink'}`}>{text}</Text>
                </View>
              </View>
            );
          })}
          {sending ? (
            <View className="flex-row justify-start">
              <View className="mr-2 h-8 w-8 overflow-hidden rounded-full border border-line mt-1">
                <Image source={{ uri: 'https://api.dicebear.com/9.x/adventurer/png?seed=Mio' }} style={{ width: '100%', height: '100%' }} />
              </View>
              <View className="rounded-2xl px-4 py-2.5 bg-surface border border-line rounded-bl-md">
                <ActivityIndicator color="#F97316" size="small" />
              </View>
            </View>
          ) : null}
        </ScrollView>
        <View style={{ paddingBottom: Math.max(insets.bottom, 8) }} className="px-4 pt-2 flex-row items-center gap-2 bg-background border-t border-line">
          <TextInput
            value={input}
            onChangeText={setInput}
            placeholder="Message Mio..."
            placeholderTextColor="#9CA3AF"
            className="flex-1 rounded-full border border-line bg-surface px-4 py-2.5 text-ink"
            returnKeyType="send"
            onSubmitEditing={send}
            blurOnSubmit={false}
            multiline={false}
          />
          <Pressable onPress={send} disabled={sending || !input.trim()} className="rounded-full bg-accent px-5 h-10 items-center justify-center">
            <Text className="text-white font-semibold">Send</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
