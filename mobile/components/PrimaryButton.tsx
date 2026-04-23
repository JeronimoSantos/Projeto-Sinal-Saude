import { Pressable, StyleSheet, Text, ViewStyle } from 'react-native';
import { Colors, Radius, Spacing } from '../constants/theme';

interface PrimaryButtonProps {
  label: string;
  onPress: () => void;
  accent?: string;
  style?: ViewStyle;
}

export default function PrimaryButton({ label, onPress, accent = Colors.purple, style }: PrimaryButtonProps) {
  return (
    <Pressable
      style={({ pressed }) => [styles.btn, { backgroundColor: accent, opacity: pressed ? 0.8 : 1 }, style]}
      onPress={onPress}
      accessibilityRole="button"
    >
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: {
    borderRadius: Radius.full,
    paddingVertical: Spacing.md,
    alignItems: 'center',
  },
  label: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.white,
    letterSpacing: 0.3,
  },
});
