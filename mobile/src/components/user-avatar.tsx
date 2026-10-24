import { Image } from 'expo-image';
import { Text, View } from 'react-native';

interface UserAvatarProps {
  name: string;
  avatarUrl?: string | null;
  size?: number;
}

function getInitial(name: string): string {
  const trimmed = name.trim();
  if (!trimmed) return '?';
  const parts = trimmed.split(/\s+/);
  if (parts.length > 1) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return trimmed[0].toUpperCase();
}

export function UserAvatar({ name, avatarUrl, size = 80 }: UserAvatarProps) {
  const round = { width: size, height: size, borderRadius: size / 2 };

  if (avatarUrl) {
    return (
      <View className="overflow-hidden border-2 border-accent bg-surface-alt" style={round}>
        <Image source={{ uri: avatarUrl }} style={{ width: '100%', height: '100%' }} contentFit="cover" />
      </View>
    );
  }

  return (
    <View
      className="items-center justify-center border-2 border-accent bg-surface-alt"
      style={round}>
      <Text className="font-display font-semibold text-ink" style={{ fontSize: size * 0.4 }}>
        {getInitial(name)}
      </Text>
    </View>
  );
}