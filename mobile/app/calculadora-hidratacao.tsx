import { router } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Card from '../components/Card';
import GradientBackground from '../components/GradientBackground';
import InputField from '../components/InputField';
import PrimaryButton from '../components/PrimaryButton';
import { Colors, Radius, Spacing, Typography } from '../constants/theme';

const levels = [
  { key: 'sedentario', label: 'Sedentário', desc: 'Pouca ou nenhuma atividade', factor: 1.0 },
  { key: 'moderado',   label: 'Moderado',   desc: '3–5 dias de exercício/semana', factor: 1.15 },
  { key: 'ativo',      label: 'Muito Ativo', desc: 'Exercício diário intenso', factor: 1.3 },
];

export default function CalculadoraHidratacao() {
  const [peso, setPeso] = useState('');
  const [level, setLevel] = useState('sedentario');
  const [result, setResult] = useState<number | null>(null);

  function calcular() {
    const p = parseFloat(peso.replace(',', '.'));
    if (!p || p <= 0) return;
    const factor = levels.find((l) => l.key === level)!.factor;
    setResult(p * 35 * factor);
  }

  const liters = result ? (result / 1000).toFixed(1) : null;

  return (
    <GradientBackground>
      <SafeAreaView style={styles.safe}>
        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
          <View style={styles.header}>
            <View style={[styles.badge, { borderColor: Colors.blueBorder, backgroundColor: Colors.blueDim }]}>
              <Text style={[styles.badgeText, { color: Colors.blue }]}>Calculadora de Hidratação</Text>
            </View>
            <Text style={styles.title}>Necessidade{'\n'}de Água</Text>
            <Text style={styles.subtitle}>35 ml por kg · ajuste por atividade</Text>
          </View>

          <Card style={styles.formCard}>
            <InputField label="Peso" unit="kg" placeholder="Ex: 70" value={peso} onChangeText={setPeso} />

            <Text style={styles.sectionLabel}>Nível de Atividade</Text>
            <View style={styles.levelGroup}>
              {levels.map((l) => (
                <TouchableOpacity
                  key={l.key}
                  style={[styles.levelBtn, level === l.key && styles.levelBtnActive]}
                  onPress={() => setLevel(l.key)}
                  activeOpacity={0.75}
                >
                  <Text style={[styles.levelName, level === l.key && styles.levelNameActive]}>{l.label}</Text>
                  <Text style={styles.levelDesc}>{l.desc}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <PrimaryButton label="Calcular Hidratação" onPress={calcular} accent={Colors.blue} />
          </Card>

          {result && (
            <Card style={styles.resultCard}>
              <Text style={[styles.resultValue, { color: Colors.blue }]}>{liters}</Text>
              <Text style={styles.resultUnit}>litros / dia</Text>
              <Text style={styles.resultMl}>≈ {Math.round(result)} ml · {Math.round(result / 250)} copos de 250 ml</Text>
              <Text style={styles.resultTip}>
                Distribua ao longo do dia. Aumente em dias quentes ou após exercícios intensos.
              </Text>
            </Card>
          )}

          <TouchableOpacity onPress={() => router.back()} style={styles.back}>
            <Text style={styles.backText}>← Voltar ao início</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  scroll: { padding: Spacing.lg, paddingBottom: Spacing.xxl },

  header: { alignItems: 'center', marginBottom: Spacing.lg },
  badge: { borderWidth: 1, borderRadius: Radius.full, paddingHorizontal: 14, paddingVertical: 4, marginBottom: Spacing.md },
  badgeText: { fontSize: 11, fontWeight: '700', letterSpacing: 1, textTransform: 'uppercase' },
  title: { ...Typography.h1, textAlign: 'center', marginBottom: Spacing.xs },
  subtitle: { ...Typography.body, textAlign: 'center' },

  formCard: { padding: Spacing.lg, marginBottom: Spacing.md },
  sectionLabel: { fontSize: 13, fontWeight: '600', color: Colors.whiteMid, marginBottom: Spacing.sm },
  levelGroup: { gap: Spacing.sm, marginBottom: Spacing.lg },
  levelBtn: {
    padding: Spacing.md,
    backgroundColor: Colors.whiteHint,
    borderWidth: 1.5,
    borderColor: Colors.cardBorder,
    borderRadius: Radius.md,
  },
  levelBtnActive: { borderColor: Colors.blue, backgroundColor: Colors.blueDim },
  levelName: { fontSize: 14, fontWeight: '700', color: Colors.whiteMid },
  levelNameActive: { color: Colors.blue },
  levelDesc: { fontSize: 12, color: Colors.whiteLow, marginTop: 2 },

  resultCard: {
    alignItems: 'center',
    padding: Spacing.xl,
    marginBottom: Spacing.md,
  },
  resultValue: { fontSize: 64, fontWeight: '800', lineHeight: 72 },
  resultUnit: { ...Typography.label, marginBottom: Spacing.xs },
  resultMl: { fontSize: 13, color: Colors.whiteMid, marginBottom: Spacing.md },
  resultTip: { ...Typography.body, textAlign: 'center', lineHeight: 20 },

  back: { alignItems: 'center', paddingVertical: Spacing.md },
  backText: { fontSize: 13, color: Colors.whiteLow },
});
