import { Text, View } from 'react-native';

import { Screen } from '@/components/screen';

interface ComingSoonProps {
  title: string;
  module: string;
}

export function ComingSoon({ title, module }: ComingSoonProps) {
  return (
    <Screen>
      <View className="flex-1 justify-center items-center px-8 gap-3">
        <Text className="font-display text-3xl font-semibold text-ink">{title}</Text>
        <Text className="text-center text-base text-muted">
          {module} in the works — this screen is wired into the tab shell and ready.
        </Text>
      </View>
    </Screen>
  );
}