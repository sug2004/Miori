import { Image } from 'expo-image';
import { View } from 'react-native';

export function AuthHero() {
  return (
    <View className="self-center overflow-hidden rounded-3xl border border-line">
      <Image
        source={require('@/assets/images/mockup-hero.png')}
        className="w-60 sm:w-72"
        style={{ aspectRatio: 1225 / 1284, opacity: 0.92 }}
        contentFit="cover"
        transition={200}
      />
    </View>
  );
}