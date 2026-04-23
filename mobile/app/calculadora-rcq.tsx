import { router } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Card from '../components/Card';
import GradientBackground from '../components/GradientBackground';
import InputField from '../components/InputField';
import PrimaryButton from '../components/PrimaryButton';
import { Colors, Radius, Spacing, Typography } from '../constants/theme';

interface RcqResult {
  rcq: number;
  risk: string;
  color: string;
  tip: string;
}

const maleRanges = [
  { max: 0.9,      risk: 'Baixo risco',     color: Colors.green,  tip: 'Distribuição de gordura corporal dentro do padrão saudável.' },
  { max: 1.0,      risk: 'Risco moderado',  color: Colors.amber,  tip: 'Atenção à dieta e atividade física para reduzir a circunferência abdominal.' },
  { max: Infinity, risk: 'Alto risco',       color: Colors.red,    tip: 'Consulte um médico. Risco cardiovascular elevado.' },
];

const femaleRanges = [
  { max: 0.8,      risk: 'Baixo risco',    color: Colors.green,  tip: 'Distribuição de gordura corporal dentro do padrão saudável.' },
  { max: 0.85,     risk: 'Risco moderado', color: Colors.amber,  tip: 'Atenção à dieta e atividade física para reduzir a circunferência abdominal.' },
  { max: Infinity, risk: 'Alto risco',      color: Colors.red,    tip: 'Consulte um médico. Risco cardiovascular elevado.' },
];

function calcRcq(cintura: number, quadril: number, sexo: 'M' | 'F'): RcqResult {
  const rcq = cintura / quadril;
  const ranges = sexo === 'M' ? maleRanges : femaleRanges;
  const r = ranges.find((x) => rcq < x.max)!;
  return { rcq, ...r };
}

export default function CalculadoraRcq() {
  const [cintura, setCintura] = useState('');
  const [quadril, setQuadril] = useState('');
  const [sexo, setSexo] = useState<'M' | 'F'>('M');
  const [result, setResult] = useState<RcqResult | null>(null);

  function calcular() {
    const c = parseFloat(cintura.replace(',', '.'));
    const q = parseFloat(quadril.replace(',', '.'));
    if (!c || !q || c <= 0 || q <= 0) return;
    setResult(calcRcq(c, q, sexo));
  }

  return (
    <GradientBackground>
      <SafeAreaView style={styles.safe}>
        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
          <View style={styles.header}>
            <View style={[styles.badge, { borderColor: Colors.amberBorder, backgroundColor: Colors.amberDim }]}>
              <Text style={[styles.badgeText, { color: Colors.amber }]}>Calculadora de RCQ</Text>
            </View>
            <Text style={styles.title}>Relação{'\n'}Cintura-Quadril</Text>
            <Text style={styles.subtitle}>Risco cardiovascular por sexo (OMS)</Text>
          </View>

          <Card style={styles.formCard}>
            <Text style={styles.sectionLabel}>Sexo</Text>
            <View style={styles.sexGroup}>
              {(['M', 'F'] as const).map((s) => (
                <TouchableOpacity
                  key={s}
                  style={[styles.sexBtn, sexo === s && styles.sexBtnActive]}
                  onPress={() => setSexo(s)}
                  activeOpacity={0.75}
                >
                  <Text style={[styles.sexLabel, sexo === s && styles.sexLabelActive]}>
                    {s === 'M' ? 'Masculino' : 'Feminino'}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <InputField label="Circunferência da Cintura" unit="cm" placeholder="Ex: 80" value={cintura} onChangeText={setCintura} />
            <InputField label="Circunferência do Quadril" unit="cm" placeholder="Ex: 100" value={quadril} onChangeText={setQuadril} />
            <PrimaryButton label="Calcular RCQ" onPress={calcular} accent={Colors.amber} />
          </Card>

          {result && (
            <Card style={[styles.resultCard, { borderColor: result.color + '44' }]}>
              <Text style={[styles.resultValue, { color: result.color }]}>{result.rcq.toFixed(2)}</Text>
              <Text style={styles.resultUnit}>índice RCQ</Text>
              <View style={[styles.resultBadge, { backgroundColor: result.color + '22', borderColor: result.color + '55' }]}>
                <Text style={[styles.resultLabel, { color: result.color }]}>{result.risk}</Text>
              </View>
              <Text style={styles.resultTip}>{result.tip}</Text>
            </Card>
          )}

          <View style={styles.refCard}>
            <Text style={styles.refTitle}>Referência OMS</Text>
            <View style={styles.refTable}>
              {/* Cabeçalho */}
              <View style={styles.refRow}>
                <View style={styles.refColRisk} />
                <View style={[styles.refColVal, styles.refColHeader]}>
                  <Text style={[styles.refHeaderText, { color: Colors.blue }]}>♂ Masc.</Text>
                </View>
                <View style={[styles.refColVal, styles.refColHeader]}>
                  <Text style={[styles.refHeaderText, { color: Colors.purple }]}>♀ Fem.</Text>
                </View>
              </View>

              <View style={styles.refDivider} />

              {[
                { risk: 'Baixo risco',    m: '< 0,90',     f: '< 0,80',     color: Colors.green },
                { risk: 'Risco moderado', m: '0,90 – 0,99', f: '0,80 – 0,85', color: Colors.amber },
                { risk: 'Alto risco',     m: '≥ 1,00',     f: '> 0,85',     color: Colors.red },
              ].map((r) => (
                <View key={r.risk} style={styles.refRow}>
                  <View style={styles.refColRisk}>
                    <View style={[styles.dot, { backgroundColor: r.color }]} />
                    <Text style={styles.refRisk}>{r.risk}</Text>
                  </View>
                  <View style={styles.refColVal}>
                    <Text style={[styles.refRange, { color: Colors.blue }]}>{r.m}</Text>
                  </View>
                  <View style={styles.refColVal}>
                    <Text style={[styles.refRange, { color: Colors.purple }]}>{r.f}</Text>
                  </View>
                </View>
              ))}
            </View>
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
  sectionLabel: { fontSize: 13, fontWeight: '600', color: Colors.whiteMid, marginBottom: Spacing.sm },
  sexGroup: { flexDirection: 'row', gap: Spacing.sm, marginBottom: Spacing.lg },
  sexBtn: {
    flex: 1,
    paddingVertical: Spacing.md,
    alignItems: 'center',
    backgroundColor: Colors.whiteHint,
    borderWidth: 1.5,
    borderColor: Colors.cardBorder,
    borderRadius: Radius.md,
  },
  sexBtnActive: { borderColor: Colors.amber, backgroundColor: Colors.amberDim },
  sexLabel: { fontSize: 14, fontWeight: '700', color: Colors.whiteMid },
  sexLabelActive: { color: Colors.amber },

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
    marginBottom: Spacing.lg,
  },
  refTitle: { fontSize: 12, fontWeight: '700', color: Colors.whiteLow, textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: Spacing.md },
  refTable: { gap: Spacing.sm },
  refRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  refColRisk: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  refColVal: { width: 80, alignItems: 'flex-end' },
  refColHeader: { paddingBottom: 2 },
  refHeaderText: { fontSize: 11, fontWeight: '700', letterSpacing: 0.4 },
  refDivider: { height: 1, backgroundColor: Colors.cardBorder, marginVertical: 4 },
  dot: { width: 8, height: 8, borderRadius: 4, flexShrink: 0 },
  refRisk: { fontSize: 12, color: Colors.whiteMid },
  refRange: { fontSize: 12, fontWeight: '600' },

  back: { alignItems: 'center', paddingVertical: Spacing.md },
  backText: { fontSize: 13, color: Colors.whiteLow },
});
