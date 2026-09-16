import { Text, TextInput, View } from 'react-native';

interface FormFieldProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  keyboardType?: 'email-address' | 'default';
  autoCapitalize?: 'none' | 'sentences' | 'words';
  autoComplete?: 'email' | 'current-password' | 'new-password' | 'off';
  textContentType?: 'emailAddress' | 'password' | 'newPassword' | 'none';
}

export function FormField({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  keyboardType = 'default',
  autoCapitalize = 'none',
  autoComplete = 'off',
  textContentType = 'none',
}: FormFieldProps) {
  return (
    <View className="gap-2">
      <Text className="text-sm font-medium text-ink">{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#6B665D"
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        autoComplete={autoComplete}
        textContentType={textContentType}
        className="rounded-xl border border-line bg-surface px-4 py-3 text-base text-ink"
      />
    </View>
  );
}