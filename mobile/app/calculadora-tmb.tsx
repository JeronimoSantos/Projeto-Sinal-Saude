import { router } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Card from '../components/Card';
import GradientBackground from '../components/GradientBackground';
import InputField from '../components/InputField';
import PrimaryButton from '../components/PrimaryButton';
import { Colors, Radius, Spacing, Typography } from '../constants/theme';

const activityFactors = [
  { key: 'sedentario',   label: 'Sedentário',      desc: 'Pouca ou nenhuma atividade', factor: 1.2 },
  { key: 'leve',         label: 'Levemente Ativo',  desc: '1–3 dias/semana', factor: 1.375 },
  { key: 'moderado',     label: 'Moderadamente',    desc: '3–5 dias/semana', factor: 1.55 },
  { key: 'muito_ativo',  label: 'Muito Ativo',      desc: '6–7 dias/semana', factor: 1.725 },
  { key: 'extra_ativo',  label: 'Extra Ativo',      desc: 'Atleta/trabalho físico', factor: 1.9 },
];

const goals = [
  { key: 'lose',     label: 'Perder peso',      delta: -500, color: Colors.red },
  { key: 'maintain', label: 'Manter peso',       delta: 0,    color: Colors.green },
  { key: 'gain',     label: 'Ganhar peso',       delta: 500,  color: Colors.purple },
];

interface TmbResult {
  tmb: number;
  tdee: number;
  prot: number;
  carb: number;
  fat: number;
}

function calcTmb(peso: number, altura: number, idade: number, sexo: 'M' | 'F', actFactor: number): TmbResult {
  const tmb = sexo === 'M'
    ? 88.362 + (13.397 * peso) + (4.799 * altura) - (5.677 * idade)
    : 447.593 + (9.247 * peso) + (3.098 * altura) - (4.330 * idade);
  const tdee = tmb * actFactor;
  return {
    tmb: Math.round(tmb),
    tdee: Math.round(tdee),
    prot: Math.round((tdee * 0.3) / 4),
    carb: Math.round((tdee * 0.45) / 4),
    fat: Math.round((tdee * 0.25) / 9),
  };
}

export default function CalculadoraTmb() {
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [idade, setIdade] = useState('');
  const [sexo, setSexo] = useState<'M' | 'F'>('M');
  const [activity, setActivity] = useState('sedentario');
  const [result, setResult] = useState<TmbResult | null>(null);

  function calcular() {
    const p = parseFloat(peso.replace(',', '.'));
    const a = parseFloat(altura.replace(',', '.'));
    const i = parseFloat(idade.replace(',', '.'));
    if (!p || !a || !i || p <= 0 || a <= 0 || i <= 0) return;
    const factor = activityFactors.find((x) => x.key === activity)!.factor;
    setResult(calcTmb(p, a, i, sexo, factor));
  }

  return (
    <GradientBackground>
      <SafeAreaView style={styles.safe}>
        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
          <View style={styles.header}>
            <View style={[styles.badge, { borderColor: Colors.greenBorder, backgroundColor: Colors.greenDim }]}>
              <Text style={[styles.badgeText, { color: Colors.green }]}>Calculadora de TMB</Text>
            </View>
            <Text style={styles.title}>Taxa Metabólica{'\n'}Basal</Text>
            <Text style={styles.subtitle}>Harris-Benedict · TDEE · Macronutrientes</Text>
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

            <InputField label="Peso" unit="kg" placeholder="Ex: 70" value={peso} onChangeText={setPeso} />
            <InputField label="Altura" unit="cm" placeholder="Ex: 175" value={altura} onChangeText={setAltura} />
            <InputField label="Idade" unit="anos" placeholder="Ex: 30" value={idade} onChangeText={setIdade} keyboardType="number-pad" />

            <Text style={styles.sectionLabel}>Nível de Atividade</Text>
            <View style={styles.activityGroup}>
              {activityFactors.map((a) => (
                <TouchableOpacity
                  key={a.key}
                  style={[styles.actBtn, activity === a.key && styles.actBtnActive]}
                  onPress={() => setActivity(a.key)}
                  activeOpacity={0.75}
                >
                  <Text style={[styles.actName, activity === a.key && styles.actNameActive]}>{a.label}</Text>
                  <Text style={styles.actDesc}>{a.desc}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <PrimaryButton label="Calcular TMB" onPress={calcular} accent={Colors.green} />
          </Card>

          {result && (
            <>
              <Card style={styles.resultCard}>
                <View style={styles.tdeeRow}>
                  <View style={styles.tdeeCol}>
                    <Text style={[styles.tdeeValue, { color: Colors.green }]}>{result.tmb}</Text>
                    <Text style={styles.tdeeLabel}>TMB (kcal)</Text>
                  </View>
                  <View style={styles.tdeeDivider} />
                  <View style={styles.tdeeCol}>
                    <Text style={[styles.tdeeValue, { color: Colors.green, fontSize: 32 }]}>{result.tdee}</Text>
                    <Text style={styles.tdeeLabel}>TDEE (kcal/dia)</Text>
                  </View>
                </View>
              </Card>

              <Card style={styles.macroCard}>
                <Text style={styles.macroTitle}>Macronutrientes (30/45/25)</Text>
                <View style={styles.macroRow}>
                  {[
                    { label: 'Proteína', value: result.prot, unit: 'g', color: Colors.red },
                    { label: 'Carboidrato', value: result.carb, unit: 'g', color: Colors.amber },
                    { label: 'Gordura', value: result.fat, unit: 'g', color: Colors.purple },
                  ].map((m) => (
                    <View key={m.label} style={styles.macroItem}>
                      <Text style={[styles.macroValue, { color: m.color }]}>{m.value}<Text style={styles.macroUnit}>{m.unit}</Text></Text>
                      <Text style={styles.macroLabel}>{m.label}</Text>
                    </View>
                  ))}
                </View>
              </Card>

              <Card style={styles.goalsCard}>
                <Text style={styles.goalsTitle}>Metas calóricas</Text>
                {goals.map((g) => (
                  <View key={g.key} style={styles.goalRow}>
                    <View style={[styles.goalDot, { backgroundColor: g.color }]} />
                    <Text style={styles.goalLabel}>{g.label}</Text>
                    <Text style={[styles.goalKcal, { color: g.color }]}>{result.tdee + g.delta} kcal</Text>
                  </View>
                ))}
              </Card>
            </>
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
  sexBtnActive: { borderColor: Colors.green, backgroundColor: Colors.greenDim },
  sexLabel: { fontSize: 14, fontWeight: '700', color: Colors.whiteMid },
  sexLabelActive: { color: Colors.green },

  activityGroup: { gap: Spacing.xs, marginBottom: Spacing.lg },
  actBtn: {
    padding: Spacing.md,
    backgroundColor: Colors.whiteHint,
    borderWidth: 1.5,
    borderColor: Colors.cardBorder,
    borderRadius: Radius.md,
  },
  actBtnActive: { borderColor: Colors.green, backgroundColor: Colors.greenDim },
  actName: { fontSize: 13, fontWeight: '700', color: Colors.whiteMid },
  actNameActive: { color: Colors.green },
  actDesc: { fontSize: 11, color: Colors.whiteLow, marginTop: 2 },

  resultCard: { padding: Spacing.lg, marginBottom: Spacing.md },
  tdeeRow: { flexDirection: 'row', alignItems: 'center' },
  tdeeCol: { flex: 1, alignItems: 'center' },
  tdeeDivider: { width: 1, height: 50, backgroundColor: Colors.cardBorder },
  tdeeValue: { fontSize: 40, fontWeight: '800', lineHeight: 48 },
  tdeeLabel: { fontSize: 11, color: Colors.whiteLow, textTransform: 'uppercase', letterSpacing: 0.5, marginTop: 4 },

  macroCard: { padding: Spacing.lg, marginBottom: Spacing.md },
  macroTitle: { fontSize: 12, fontWeight: '700', color: Colors.whiteLow, textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: Spacing.md },
  macroRow: { flexDirection: 'row', justifyContent: 'space-around' },
  macroItem: { alignItems: 'center' },
  macroValue: { fontSize: 24, fontWeight: '800' },
  macroUnit: { fontSize: 13, fontWeight: '600' },
  macroLabel: { fontSize: 11, color: Colors.whiteLow, marginTop: 2 },

  goalsCard: { padding: Spacing.lg, marginBottom: Spacing.lg },
  goalsTitle: { fontSize: 12, fontWeight: '700', color: Colors.whiteLow, textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: Spacing.md },
  goalRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm, marginBottom: Spacing.sm },
  goalDot: { width: 8, height: 8, borderRadius: 4 },
  goalLabel: { flex: 1, fontSize: 13, color: Colors.whiteMid },
  goalKcal: { fontSize: 14, fontWeight: '700' },

  back: { alignItems: 'center', paddingVertical: Spacing.md },
  backText: { fontSize: 13, color: Colors.whiteLow },
});
