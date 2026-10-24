import { ReactNode } from 'react';
import { Text, View } from 'react-native';

import { AuthHero } from '@/components/auth-hero';
import { Screen } from '@/components/screen';

interface AuthLayoutProps {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer: ReactNode;
}

export function AuthLayout({ title, subtitle, children, footer }: AuthLayoutProps) {
  return (
    <Screen scroll>
      <View className="w-full max-w-md flex-grow justify-center self-center gap-8 px-6 py-10">
        <AuthHero />

        <View className="gap-2">
          <Text className="font-display text-3xl font-semibold text-ink sm:text-4xl">{title}</Text>
          <Text className="text-base text-muted">{subtitle}</Text>
        </View>

        <View className="gap-4">{children}</View>

        <View className="flex-row flex-wrap justify-center gap-1">{footer}</View>
      </View>
    </Screen>
  );
}