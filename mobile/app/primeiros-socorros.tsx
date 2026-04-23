import { router } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Card from '../components/Card';
import GradientBackground from '../components/GradientBackground';
import { Colors, Radius, Spacing, Typography } from '../constants/theme';

type TabId = 'heimlich' | 'rice' | 'burns' | 'rcp';

const tabs: { id: TabId; icon: string; label: string; color: string }[] = [
  { id: 'heimlich', icon: '🆘', label: 'Heimlich', color: Colors.red },
  { id: 'rice',     icon: '🧊', label: 'R.I.C.E.',  color: Colors.blue },
  { id: 'burns',    icon: '🔥', label: 'Queimad.', color: Colors.orange },
  { id: 'rcp',      icon: '❤️', label: 'RCP',       color: Colors.purple },
];

function Step({ num, title, desc, color }: { num: number; title: string; desc: string; color: string }) {
  return (
    <View style={styles.step}>
      <View style={[styles.stepNum, { backgroundColor: color + '22' }]}>
        <Text style={[styles.stepNumText, { color }]}>{num}</Text>
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.stepTitle}>{title}</Text>
        <Text style={styles.stepDesc}>{desc}</Text>
      </View>
    </View>
  );
}

function HeimlichPanel() {
  return (
    <Card>
      <View style={styles.panelHeader}>
        <Text style={[styles.eyebrow, { color: Colors.red }]}>MANOBRA DE HEIMLICH</Text>
        <Text style={styles.panelTitle}>Desobstrução das Vias Aéreas</Text>
        <Text style={styles.panelDesc}>Adultos e crianças acima de 1 ano com engasgamento grave</Text>
      </View>
      <View style={[styles.alert, { backgroundColor: Colors.redDim, borderColor: Colors.redBorder }]}>
        <Text style={[styles.alertText, { color: Colors.red }]}>⚠️ Se a pessoa pode tossir ou falar, estimule a tosse. Não intervenha ainda.</Text>
      </View>
      <View style={styles.steps}>
        {[
          { title: 'Posicione-se atrás', desc: 'Fique em pé atrás da vítima, pés afastados para maior estabilidade.' },
          { title: 'Forme um punho', desc: 'Coloque o polegar do punho entre o umbigo e o esterno da vítima.' },
          { title: 'Comprima com força', desc: 'Com a outra mão sobre o punho, faça compressões rápidas para dentro e para cima.' },
          { title: 'Repita até desobstruir', desc: 'Continue as compressões até o objeto ser expelido ou a vítima perder a consciência.' },
          { title: 'Chame o SAMU', desc: 'Ligue 192 imediatamente ou peça a alguém que ligue enquanto realiza a manobra.' },
        ].map((s, i) => (
          <Step key={i} num={i + 1} {...s} color={Colors.red} />
        ))}
      </View>
    </Card>
  );
}

function RicePanel() {
  const items = [
    { letter: 'R', word: 'Repouso', en: 'Rest', desc: 'Interrompa imediatamente a atividade. Não force o membro lesionado.' },
    { letter: 'I', word: 'Gelo', en: 'Ice', desc: 'Aplique gelo envolvido em pano por 20 min, com intervalos de 40 min.' },
    { letter: 'C', word: 'Compressão', en: 'Compression', desc: 'Use atadura elástica com pressão uniforme. Não aperte demais.' },
    { letter: 'E', word: 'Elevação', en: 'Elevation', desc: 'Mantenha o membro acima do nível do coração para reduzir o inchaço.' },
  ];
  return (
    <Card>
      <View style={styles.panelHeader}>
        <Text style={[styles.eyebrow, { color: Colors.blue }]}>PROTOCOLO R.I.C.E.</Text>
        <Text style={styles.panelTitle}>Lesões Musculoesqueléticas</Text>
        <Text style={styles.panelDesc}>Entorses, contusões e estiramentos nas primeiras 48–72 horas</Text>
      </View>
      <View style={styles.riceGrid}>
        {items.map((item) => (
          <View key={item.letter} style={styles.riceCard}>
            <Text style={styles.riceLetter}>{item.letter}</Text>
            <Text style={styles.riceWord}>{item.word}</Text>
            <Text style={styles.riceEn}>{item.en}</Text>
            <Text style={styles.riceDesc}>{item.desc}</Text>
          </View>
        ))}
      </View>
    </Card>
  );
}

function BurnsPanel() {
  const degrees = [
    {
      cls: 'deg-1', badge: '1º Grau', title: 'Superficial',
      symptoms: 'Vermelhidão, calor e dor. Não forma bolhas.',
      action: 'Resfrie com água fria corrente por 10–20 min. Não use gelo, pasta de dente ou manteiga.',
      color: Colors.amber,
    },
    {
      cls: 'deg-2', badge: '2º Grau', title: 'Parcial',
      symptoms: 'Bolhas, dor intensa, pele úmida ou com aspecto marmoreado.',
      action: 'Resfrie e cubra frouxamente com pano limpo. Não estoure bolhas. Busque atendimento médico.',
      color: Colors.orange,
    },
    {
      cls: 'deg-3', badge: '3º Grau', title: 'Profunda',
      symptoms: 'Pele carbonizada ou branca/cinza, sem dor (nervo destruído).',
      action: 'Ligue 192 (SAMU) imediatamente. Não tente remover tecido. Cubra frouxamente.',
      color: Colors.red,
    },
  ];
  return (
    <Card>
      <View style={styles.panelHeader}>
        <Text style={[styles.eyebrow, { color: Colors.orange }]}>QUEIMADURAS</Text>
        <Text style={styles.panelTitle}>Classificação e Conduta</Text>
        <Text style={styles.panelDesc}>Procedimentos iniciais por grau de severidade</Text>
      </View>
      <View style={styles.degreesContainer}>
        {degrees.map((d) => (
          <View key={d.badge} style={[styles.degreeCard, { borderColor: d.color + '44', backgroundColor: d.color + '11' }]}>
            <View style={styles.degHeader}>
              <View style={[styles.degBadge, { backgroundColor: d.color + '22' }]}>
                <Text style={[styles.degBadgeText, { color: d.color }]}>{d.badge}</Text>
              </View>
              <Text style={styles.degTitle}>{d.title}</Text>
            </View>
            <Text style={styles.degSymptoms}>{d.symptoms}</Text>
            <Text style={styles.degAction}>{d.action}</Text>
          </View>
        ))}
      </View>
    </Card>
  );
}

function RcpPanel() {
  return (
    <Card>
      <View style={styles.panelHeader}>
        <Text style={[styles.eyebrow, { color: Colors.purple }]}>RCP BÁSICO</Text>
        <Text style={styles.panelTitle}>Ressuscitação Cardiopulmonar</Text>
        <Text style={styles.panelDesc}>Para adultos em parada cardiorrespiratória</Text>
      </View>
      <View style={[styles.alert, { backgroundColor: Colors.purpleDim, borderColor: Colors.purpleBorder }]}>
        <Text style={[styles.alertText, { color: Colors.purple }]}>
          Este protocolo é uma orientação básica. Faça um curso de RCP para estar preparado.
        </Text>
      </View>
      <View style={styles.steps}>
        {[
          { title: 'Verifique a segurança', desc: 'Certifique-se de que o ambiente é seguro para você e para a vítima.' },
          { title: 'Chame o SAMU', desc: 'Ligue 192 imediatamente ou peça a alguém que ligue.' },
          { title: 'Verifique a respiração', desc: 'Observe por até 10 segundos se a vítima respira normalmente.' },
          { title: 'Inicie as compressões', desc: 'Entrelace as mãos no centro do peito. Comprima 5–6 cm, 100–120 compressões/min.' },
          { title: 'Ventilações (se treinado)', desc: '30 compressões : 2 ventilações. Sem treinamento, só compressões contínuas.' },
          { title: 'Continue até o socorro', desc: 'Não pare até o SAMU chegar, a vítima se recuperar ou você não conseguir continuar.' },
        ].map((s, i) => (
          <Step key={i} num={i + 1} {...s} color={Colors.purple} />
        ))}
      </View>
    </Card>
  );
}

export default function PrimeirosSocorros() {
  const [activeTab, setActiveTab] = useState<TabId>('heimlich');

  return (
    <GradientBackground>
      <SafeAreaView style={styles.safe}>
        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <View style={[styles.badge, { borderColor: Colors.redBorder, backgroundColor: Colors.redDim }]}>
              <Text style={[styles.badgeText, { color: Colors.red }]}>● Primeiros Socorros</Text>
            </View>
            <Text style={styles.title}>Guia de{'\n'}Emergências</Text>
            <Text style={styles.subtitle}>Protocolos de primeiros socorros offline</Text>
          </View>

          <View style={[styles.emergency, { borderColor: Colors.redBorder }]}>
            <View style={styles.emergItem}>
              <Text style={styles.emergNum}>192</Text>
              <Text style={styles.emergLabel}>SAMU</Text>
            </View>
            <View style={styles.emergDivider} />
            <View style={styles.emergItem}>
              <Text style={styles.emergNum}>193</Text>
              <Text style={styles.emergLabel}>Bombeiros</Text>
            </View>
            <View style={styles.emergDivider} />
            <View style={styles.emergItem}>
              <Text style={styles.emergNum}>190</Text>
              <Text style={styles.emergLabel}>Polícia</Text>
            </View>
          </View>

          <View style={styles.tabRow}>
            {tabs.map((t) => (
              <TouchableOpacity
                key={t.id}
                style={[styles.tab, activeTab === t.id && { borderColor: t.color, backgroundColor: t.color + '18' }]}
                onPress={() => setActiveTab(t.id)}
                activeOpacity={0.75}
              >
                <Text style={styles.tabIcon}>{t.icon}</Text>
                <Text style={[styles.tabLabel, activeTab === t.id && { color: t.color }]}>{t.label}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {activeTab === 'heimlich' && <HeimlichPanel />}
          {activeTab === 'rice'    && <RicePanel />}
          {activeTab === 'burns'   && <BurnsPanel />}
          {activeTab === 'rcp'     && <RcpPanel />}

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
  badgeText: { fontSize: 11, fontWeight: '700', letterSpacing: 1 },
  title: { ...Typography.h1, textAlign: 'center', marginBottom: Spacing.xs },
  subtitle: { ...Typography.body, textAlign: 'center' },

  emergency: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: Colors.redDim,
    borderWidth: 1,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.lg,
  },
  emergItem: { alignItems: 'center' },
  emergNum: { fontSize: 28, fontWeight: '800', color: Colors.red },
  emergLabel: { fontSize: 10, color: Colors.whiteLow, textTransform: 'uppercase', letterSpacing: 0.5, marginTop: 2 },
  emergDivider: { width: 1, height: 36, backgroundColor: Colors.redBorder },

  tabRow: { flexDirection: 'row', gap: Spacing.sm, marginBottom: Spacing.md },
  tab: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
    paddingVertical: Spacing.sm,
    backgroundColor: Colors.whiteHint,
    borderWidth: 1.5,
    borderColor: Colors.cardBorder,
    borderRadius: Radius.md,
  },
  tabIcon: { fontSize: 20 },
  tabLabel: { fontSize: 10, fontWeight: '700', color: Colors.whiteLow, textTransform: 'uppercase', letterSpacing: 0.4 },

  panelHeader: { padding: Spacing.lg, borderBottomWidth: 1, borderBottomColor: Colors.cardBorder },
  eyebrow: { fontSize: 10, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 },
  panelTitle: { ...Typography.h2, marginBottom: 4 },
  panelDesc: { ...Typography.body, fontSize: 13 },

  alert: { margin: Spacing.md, marginTop: Spacing.md, borderWidth: 1, borderRadius: Radius.sm, padding: Spacing.md },
  alertText: { fontSize: 12, fontWeight: '600', lineHeight: 18 },

  steps: { padding: Spacing.lg, gap: Spacing.md },
  step: { flexDirection: 'row', gap: Spacing.md, alignItems: 'flex-start' },
  stepNum: { width: 30, height: 30, borderRadius: 15, alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  stepNumText: { fontSize: 13, fontWeight: '800' },
  stepTitle: { fontSize: 14, fontWeight: '700', color: Colors.white, marginBottom: 3 },
  stepDesc: { fontSize: 12.5, color: Colors.whiteMid, lineHeight: 18 },

  riceGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm, padding: Spacing.lg },
  riceCard: {
    width: '47%',
    padding: Spacing.md,
    backgroundColor: Colors.blueDim,
    borderWidth: 1.5,
    borderColor: Colors.blueBorder,
    borderRadius: Radius.md,
  },
  riceLetter: { fontSize: 28, fontWeight: '800', color: Colors.blue },
  riceWord: { fontSize: 13, fontWeight: '700', color: Colors.white, marginTop: 4, marginBottom: 2 },
  riceEn: { fontSize: 10, color: Colors.blue, fontStyle: 'italic', marginBottom: Spacing.sm },
  riceDesc: { fontSize: 11.5, color: Colors.whiteMid, lineHeight: 16 },

  degreesContainer: { padding: Spacing.lg, gap: Spacing.sm },
  degreeCard: { padding: Spacing.md, borderWidth: 1.5, borderRadius: Radius.md },
  degHeader: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm, marginBottom: Spacing.xs },
  degBadge: { paddingHorizontal: Spacing.sm, paddingVertical: 2, borderRadius: Radius.full },
  degBadgeText: { fontSize: 10, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.5 },
  degTitle: { fontSize: 13, fontWeight: '700', color: Colors.white },
  degSymptoms: { fontSize: 12, color: Colors.whiteLow, marginBottom: Spacing.xs, lineHeight: 18 },
  degAction: { fontSize: 12.5, color: Colors.whiteMid, lineHeight: 18 },

  back: { alignItems: 'center', paddingVertical: Spacing.lg },
  backText: { fontSize: 13, color: Colors.whiteLow },
});
