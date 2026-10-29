import { StyleSheet, Text, type TextProps } from 'react-native';

export type ThemedTextProps = TextProps & {
  type?: 'default' | 'title' | 'small' | 'smallBold' | 'subtitle';
  themeColor?: 'text' | 'textSecondary' | 'accent' | 'muted';
};

const COLORS: Record<string, string> = {
  text: '#EDE8DF',
  textSecondary: '#A49C90',
  accent: '#E3C6A6',
  muted: '#A49C90',
};

export function ThemedText({ style, type = 'default', themeColor = 'text', ...rest }: ThemedTextProps) {
  return (
    <Text
      style={[
        { color: COLORS[themeColor] },
        type === 'title' && styles.title,
        type === 'subtitle' && styles.subtitle,
        type === 'small' && styles.small,
        type === 'smallBold' && styles.smallBold,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  small: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500',
  },
  smallBold: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '700',
  },
  default: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '500',
  },
  title: {
    fontSize: 40,
    fontWeight: '600',
    lineHeight: 44,
  },
  subtitle: {
    fontSize: 26,
    lineHeight: 34,
    fontWeight: '600',
  },
});