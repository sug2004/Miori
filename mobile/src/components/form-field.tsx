import { ComponentRef, forwardRef, useState } from 'react';
import { Text, TextInput, TextInputProps, View } from 'react-native';

interface FormFieldProps extends Omit<TextInputProps, 'value' | 'onChangeText'> {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
}

export const FormField = forwardRef<ComponentRef<typeof TextInput>, FormFieldProps>(function FormField(
  { label, value, onChangeText, placeholder, ...rest },
  ref,
) {
  const [focused, setFocused] = useState(false);

  return (
    <View className="gap-2">
      <Text className="text-sm font-medium text-ink">{label}</Text>
      <TextInput
        ref={ref}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#6B665D"
        selectionColor="#E3C6A6"
        autoCorrect={false}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        spellCheck={false}
        className={`rounded-xl border bg-surface px-4 py-3.5 text-base text-ink ${
          focused ? 'border-accent' : 'border-line'
        }`}
        {...rest}
      />
    </View>
  );
});