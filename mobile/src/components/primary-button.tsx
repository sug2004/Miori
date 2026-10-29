import { Pressable, Text } from 'react-native';

interface PrimaryButtonProps {
  label: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
}

export function PrimaryButton({ label, onPress, loading = false, disabled = false }: PrimaryButtonProps) {
  const isDisabled = disabled || loading;
  return (
    <Pressable
      accessibilityRole="button"
      disabled={isDisabled}
      onPress={onPress}
      className={`items-center rounded-2xl px-6 py-3.5 ${
        isDisabled ? 'bg-muted/50' : 'bg-accent active:bg-orange-700'
      }`}>
      <Text className="font-semibold text-background">
        {loading ? 'Please wait…' : label}
      </Text>
    </Pressable>
  );
}