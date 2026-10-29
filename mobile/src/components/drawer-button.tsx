import { Pressable, View } from 'react-native';

import { useDrawer } from '@/state/drawer';

export function DrawerButton() {
  const { open } = useDrawer();
  return (
    <Pressable onPress={open} hitSlop={10} className="gap-1 p-1.5">
      <View className="h-0.5 w-5 rounded-full bg-ink" />
      <View className="h-0.5 w-5 rounded-full bg-ink" />
      <View className="h-0.5 w-3 rounded-full bg-ink" />
    </Pressable>
  );
}
