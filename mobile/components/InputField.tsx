import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native';
import { Colors, Radius, Spacing } from '../constants/theme';

interface InputFieldProps extends TextInputProps {
  label: string;
  unit?: string;
}

export default function InputField({ label, unit, style, ...props }: InputFieldProps) {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.row}>
        <TextInput
          style={[styles.input, style]}
          placeholderTextColor="rgba(255,255,255,0.25)"
          keyboardType="decimal-pad"
          {...props}
        />
        {unit ? <Text style={styles.unit}>{unit}</Text> : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { marginBottom: Spacing.md },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.whiteMid,
    marginBottom: Spacing.xs,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.whiteHint,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    borderRadius: Radius.md,
    paddingHorizontal: Spacing.md,
  },
  input: {
    flex: 1,
    height: 48,
    fontSize: 16,
    color: Colors.white,
  },
  unit: {
    fontSize: 13,
    color: Colors.whiteLow,
    marginLeft: Spacing.xs,
  },
});
