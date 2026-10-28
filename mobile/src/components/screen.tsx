import { ReactNode } from 'react';
import { KeyboardAvoidingView, Platform, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView } from 'react-native-safe-area-context';

interface ScreenProps {
  children: ReactNode;
  scroll?: boolean;
}

export function Screen({ children, scroll = false }: ScreenProps) {
  if (scroll) {
    return (
      <SafeAreaView className="flex-1 bg-background" edges={['top', 'left', 'right']}>
        <KeyboardAwareScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 48 }}
          keyboardShouldPersistTaps="handled"
          enableOnAndroid
          extraScrollHeight={24}
          enableAutomaticScroll>
          {children}
        </KeyboardAwareScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top', 'left', 'right']}>
      <KeyboardAvoidingView className="flex-1" behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View className="flex-1">{children}</View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}