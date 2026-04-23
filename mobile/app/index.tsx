import { router } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import GradientBackground from '../components/GradientBackground';
import { Colors, Radius, Spacing, Typography } from '../constants/theme';

const tools = [
  { label: 'Calculadora de IMC', icon: '⚖️', color: Colors.purple, route: '/calculadora-imc' },
  { label: 'Calculadora de Hidratação', icon: '💧', color: Colors.blue, route: '/calculadora-hidratacao' },
  { label: 'Calculadora de RCQ', icon: '📏', color: Colors.amber, route: '/calculadora-rcq' },
  { label: 'Calculadora de TMB', icon: '🔥', color: Colors.green, route: '/calculadora-tmb' },
];

export default function SplashScreen() {
  return (
    <GradientBackground>
      <SafeAreaView style={styles.safe}>
        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <Text style={styles.icon}>🩺</Text>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>Gratuito &amp; Offline</Text>
            </View>
            <Text style={styles.title}>Sinal Saúde</Text>
            <Text style={styles.subtitle}>
              Transformando dados técnicos em informações práticas para o dia a dia.
            </Text>
          </View>

          <View style={styles.stats}>
            {[
              { value: '5', label: 'Ferramentas' },
              { value: 'OMS', label: 'Critérios' },
              { value: '0', label: 'Cadastros' },
            ].map((s) => (
              <View key={s.label} style={styles.statItem}>
                <Text style={styles.statValue}>{s.value}</Text>
                <Text style={styles.statLabel}>{s.label}</Text>
              </View>
            ))}
          </View>

          <View style={styles.toolList}>
            {tools.map((t) => (
              <TouchableOpacity
                key={t.route}
                style={styles.toolCard}
                onPress={() => router.push(t.route as any)}
                activeOpacity={0.75}
              >
                <View style={[styles.toolIcon, { backgroundColor: `${t.color}22` }]}>
                  <Text style={styles.toolEmoji}>{t.icon}</Text>
                </View>
                <Text style={styles.toolLabel}>{t.label}</Text>
                <Text style={[styles.toolArrow, { color: t.color }]}>→</Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity
            style={styles.emergencyCard}
            onPress={() => router.push('/primeiros-socorros')}
            activeOpacity={0.8}
          >
            <View style={styles.emergencyHeader}>
              <Text style={styles.emergencyIcon}>🚨</Text>
              <View>
                <Text style={styles.emergencyTitle}>Guia de Primeiros Socorros</Text>
                <Text style={styles.emergencySub}>Heimlich · R.I.C.E. · Queimaduras · RCP</Text>
              </View>
            </View>
            <Text style={styles.emergencyBtn}>Acessar guia de emergência →</Text>
          </TouchableOpacity>

          <Text style={styles.disclaimer}>
            Informações de caráter educativo. Não substitui consulta médica.
          </Text>
        </ScrollView>
      </SafeAreaView>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  scroll: { padding: Spacing.lg, paddingBottom: Spacing.xxl },

  header: { alignItems: 'center', marginBottom: Spacing.lg },
  icon: { fontSize: 56, marginBottom: Spacing.sm },
  badge: {
    backgroundColor: Colors.purpleDim,
    borderWidth: 1,
    borderColor: Colors.purpleBorder,
    borderRadius: Radius.full,
    paddingHorizontal: 14,
    paddingVertical: 4,
    marginBottom: Spacing.md,
  },
  badgeText: { fontSize: 11, fontWeight: '700', color: Colors.purple, letterSpacing: 1, textTransform: 'uppercase' },
  title: { ...Typography.h1, fontSize: 32, textAlign: 'center', marginBottom: Spacing.sm },
  subtitle: { ...Typography.body, textAlign: 'center', maxWidth: 300, lineHeight: 22 },

  stats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.lg,
  },
  statItem: { alignItems: 'center' },
  statValue: { fontSize: 22, fontWeight: '800', color: Colors.white },
  statLabel: { ...Typography.caption, marginTop: 2 },

  toolList: { gap: Spacing.sm, marginBottom: Spacing.lg },
  toolCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    borderRadius: Radius.md,
    padding: Spacing.md,
  },
  toolIcon: { width: 40, height: 40, borderRadius: Radius.sm, alignItems: 'center', justifyContent: 'center' },
  toolEmoji: { fontSize: 20 },
  toolLabel: { flex: 1, fontSize: 14, fontWeight: '600', color: Colors.whiteHigh },
  toolArrow: { fontSize: 18, fontWeight: '800' },

  emergencyCard: {
    backgroundColor: Colors.redDim,
    borderWidth: 1,
    borderColor: Colors.redBorder,
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  emergencyHeader: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md, marginBottom: Spacing.md },
  emergencyIcon: { fontSize: 28 },
  emergencyTitle: { fontSize: 15, fontWeight: '700', color: Colors.white },
  emergencySub: { fontSize: 12, color: Colors.whiteLow, marginTop: 2 },
  emergencyBtn: { fontSize: 14, fontWeight: '700', color: Colors.red, textAlign: 'center' },

  disclaimer: { ...Typography.caption, textAlign: 'center', lineHeight: 18 },
});
