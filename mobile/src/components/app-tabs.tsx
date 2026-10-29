import { Tabs } from 'expo-router';

export default function AppTabs() {
  return (
    <Tabs screenOptions={{ headerShown: false, tabBarStyle: { display: 'none' } }}>
      <Tabs.Screen name="index" />
      <Tabs.Screen name="wardrobe" />
      <Tabs.Screen name="outfits" />
      <Tabs.Screen name="chat" />
      <Tabs.Screen name="shopping" />
    </Tabs>
  );
}
