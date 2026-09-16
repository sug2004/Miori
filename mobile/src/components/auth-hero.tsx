import { Image } from 'expo-image';
import { View } from 'react-native';

export function AuthHero() {
  return (
    <View className="overflow-hidden rounded-3xl border border-line">
      <Image
        source={require('@/assets/images/mockup-hero.png')}
        style={{ width: '100%', aspectRatio: 1225 / 1284, opacity: 0.92 }}
        contentFit="cover"
        transition={200}
      />
    </View>
  );
}