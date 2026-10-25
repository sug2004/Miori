import { useEffect, useState } from 'react';
import { ActivityIndicator, KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, TextInput, View } from 'react-native';

import { Image } from 'expo-image';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Screen } from '@/components/screen';
import { api } from '@/lib/api';

type Msg = { id: string; role: string; content: any; createdAt: string };

export default function ChatScreen() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);

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
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0} className="flex-1">
        <View className="px-5 pt-4 pb-2">
          <Text className="font-display text-3xl font-semibold text-ink">Mio - Stylist Waifu</Text>
          <Text className="mt-1 text-sm text-muted">Your caring anime stylist</Text>
        </View>
        <ScrollView className="flex-1 px-5" contentContainerStyle={{ gap: 12, paddingVertical: 12 }} keyboardShouldPersistTaps="handled">
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
                  <View className="mr-2 h-8 w-8 overflow-hidden rounded-full border border-line">
                    <Image source={{ uri: 'https://api.dicebear.com/9.x/adventurer/png?seed=Mio' }} style={{ width: '100%', height: '100%' }} />
                  </View>
                ) : null}
                <View className={`max-w-[75%] rounded-3xl px-4 py-2 ${isUser ? 'bg-accent' : 'bg-surface border border-line'}`}>
                  <Text className={`text-sm ${isUser ? 'text-white' : 'text-ink'}`}>{text}</Text>
                </View>
              </View>
            );
          })}
          {sending ? (
            <View className="flex-row justify-start">
              <View className="mr-2 h-8 w-8 overflow-hidden rounded-full border border-line">
                <Image source={{ uri: 'https://api.dicebear.com/9.x/adventurer/png?seed=Mio' }} style={{ width: '100%', height: '100%' }} />
              </View>
              <View className="rounded-3xl px-4 py-2 bg-surface border border-line">
                <ActivityIndicator color="#F97316" />
              </View>
            </View>
          ) : null}
        </ScrollView>
        <View className="px-5 pb-6 pt-2 flex-row gap-2 bg-background border-t border-line">
          <TextInput
            value={input}
            onChangeText={setInput}
            placeholder="Talk to Mio~"
            placeholderTextColor="#9CA3AF"
            className="flex-1 rounded-full border border-line bg-surface px-4 py-2.5 text-ink"
            returnKeyType="send"
            onSubmitEditing={send}
          />
          <Pressable onPress={send} disabled={sending || !input.trim()} className="rounded-full bg-accent px-5 items-center justify-center">
            <Text className="text-white font-semibold">Send</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
