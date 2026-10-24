import {
  Tabs,
  TabList,
  TabTrigger,
  TabSlot,
  type TabTriggerSlotProps,
} from 'expo-router/ui';
import { Pressable, View, StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';

const tabs = [
  { name: 'home', href: '/', label: 'Home' },
  { name: 'wardrobe', href: '/wardrobe', label: 'Wardrobe' },
  { name: 'chat', href: '/chat', label: 'Chat' },
  { name: 'shopping', href: '/shopping', label: 'Shop' },
] as const;

export default function AppTabs() {
  return (
    <Tabs>
      <TabSlot style={{ flex: 1 }} />
      <TabList asChild>
        <View style={styles.list}>
          {tabs.map((tab) => (
            <TabTrigger key={tab.name} name={tab.name} href={tab.href} asChild>
              <TabButton>{tab.label}</TabButton>
            </TabTrigger>
          ))}
        </View>
      </TabList>
    </Tabs>
  );
}

function TabButton({ children, isFocused, ...props }: TabTriggerSlotProps) {
  return (
    <Pressable {...props} style={({ pressed }) => [styles.btn, pressed && styles.pressed]}>
      <ThemedText
        type="smallBold"
        themeColor={isFocused ? 'accent' : 'muted'}>
        {children}
      </ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  list: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    paddingHorizontal: 8,
    paddingBottom: 24,
    backgroundColor: '#1E1C18',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#34302A',
  },
  btn: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 16,
  },
  pressed: {
    opacity: 0.6,
  },
});