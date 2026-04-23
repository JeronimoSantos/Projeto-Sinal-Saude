import { router } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Card from '../components/Card';
import GradientBackground from '../components/GradientBackground';
import InputField from '../components/InputField';
import PrimaryButton from '../components/PrimaryButton';
import { Colors, Radius, Spacing, Typography } from '../constants/theme';

interface ImcResult {
  imc: number;
  label: string;
  color: string;
  tip: string;
}

const ranges = [
  { max: 18.5, label: 'Abaixo do peso', color: Colors.blue, tip: 'Considere orientação nutricional para ganho de peso saudável.' },
  { max: 25,   label: 'Peso normal',    color: Colors.green, tip: 'Mantenha hábitos saudáveis de alimentação e atividade física.' },
  { max: 30,   label: 'Sobrepeso',      color: Colors.amber, tip: 'Atenção à dieta e aumente a prática de atividade física.' },
  { max: 35,   label: 'Obesidade grau I',  color: Colors.orange, tip: 'Consulte um médico para um plano de emagrecimento seguro.' },
  { max: 40,   label: 'Obesidade grau II', color: '#f97316', tip: 'Acompanhamento médico é fundamental nessa faixa.' },
  { max: Infinity, label: 'Obesidade grau III', color: Colors.red, tip: 'Procure atendimento médico com urgência.' },
];

function calcImc(peso: number, altura: number): ImcResult {
  const imc = peso / (altura * altura);
  const r = ranges.find((x) => imc < x.max)!;
  return { imc, label: r.label, color: r.color, tip: r.tip };
}

export default function CalculadoraImc() {
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [result, setResult] = useState<ImcResult | null>(null);

  function calcular() {
    const p = parseFloat(peso.replace(',', '.'));
    const a = parseFloat(altura.replace(',', '.'));
    if (!p || !a || p <= 0 || a <= 0) return;
    setResult(calcImc(p, a));
  }

  return (
    <GradientBackground>
      <SafeAreaView style={styles.safe}>
        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
          <View style={styles.header}>
            <View style={[styles.badge, { borderColor: Colors.purpleBorder, backgroundColor: Colors.purpleDim }]}>
              <Text style={[styles.badgeText, { color: Colors.purple }]}>Calculadora de IMC</Text>
            </View>
            <Text style={styles.title}>Índice de Massa{'\n'}Corporal</Text>
            <Text style={styles.subtitle}>Classificação OMS em 6 faixas</Text>
          </View>

          <Card style={styles.formCard}>
            <InputField label="Peso" unit="kg" placeholder="Ex: 70" value={peso} onChangeText={setPeso} />
            <InputField label="Altura" unit="m" placeholder="Ex: 1.75" value={altura} onChangeText={setAltura} />
            <PrimaryButton label="Calcular IMC" onPress={calcular} accent={Colors.purple} />
          </Card>

          {result && (
            <Card style={[styles.resultCard, { borderColor: result.color + '44' }]}>
              <Text style={[styles.resultValue, { color: result.color }]}>{result.imc.toFixed(1)}</Text>
              <Text style={styles.resultUnit}>kg/m²</Text>
              <View style={[styles.resultBadge, { backgroundColor: result.color + '22', borderColor: result.color + '55' }]}>
                <Text style={[styles.resultLabel, { color: result.color }]}>{result.label}</Text>
              </View>
              <Text style={styles.resultTip}>{result.tip}</Text>
            </Card>
          )}

          <View style={styles.refCard}>
            <Text style={styles.refTitle}>Tabela de Referência (OMS)</Text>
            {ranges.map((r) => (
              <View key={r.label} style={styles.refRow}>
                <View style={[styles.dot, { backgroundColor: r.color }]} />
                <Text style={styles.refLabel}>{r.label}</Text>
              </View>
            ))}
          </View>

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

  resultCard: {
    alignItems: 'center',
    padding: Spacing.xl,
    marginBottom: Spacing.md,
    borderWidth: 1.5,
  },
  resultValue: { fontSize: 64, fontWeight: '800', lineHeight: 72 },
  resultUnit: { ...Typography.label, marginBottom: Spacing.md },
  resultBadge: { borderWidth: 1, borderRadius: Radius.full, paddingHorizontal: 16, paddingVertical: 5, marginBottom: Spacing.md },
  resultLabel: { fontSize: 13, fontWeight: '700' },
  resultTip: { ...Typography.body, textAlign: 'center', lineHeight: 20 },

  refCard: {
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    gap: Spacing.sm,
    marginBottom: Spacing.lg,
  },
  refTitle: { fontSize: 12, fontWeight: '700', color: Colors.whiteLow, textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: Spacing.xs },
  refRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  dot: { width: 8, height: 8, borderRadius: 4 },
  refLabel: { fontSize: 13, color: Colors.whiteMid },

  back: { alignItems: 'center', paddingVertical: Spacing.md },
  backText: { fontSize: 13, color: Colors.whiteLow },
});
