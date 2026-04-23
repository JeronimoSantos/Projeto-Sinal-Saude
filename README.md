# 💖🩺 Sinal Saúde

Aplicativo mobile de utilidade pública com calculadoras de saúde e guia de primeiros socorros. Desenvolvido em React Native com Expo — sem cadastro, sem backend, funcionando 100% offline.

## Sobre o Projeto

O **Sinal Saúde** transforma dados técnicos de saúde em informações práticas para o dia a dia. O objetivo é oferecer ferramentas confiáveis, baseadas em critérios clínicos reconhecidos (OMS, Harris-Benedict), de forma acessível e sem qualquer dependência de conexão com a internet.

## Problemas que esse Projeto Resolve

- **Falta de referência imediata** — resultado, classificação e orientação de saúde em uma única tela, sem consultar tabelas externas.
- **Dificuldade de interpretação** — destaques visuais e cores por faixa eliminam ambiguidade nos resultados.
- **Dependência de cadastros** — sem backend, banco de dados ou autenticação. Zero fricção para o usuário.
- **Apps carregados de anúncios** — interface limpa, focada na tarefa.

## Ferramentas Disponíveis

| Ferramenta | Descrição |
|---|---|
| **Calculadora de IMC** | Índice de Massa Corporal com classificação em 6 faixas (OMS) |
| **Calculadora de Hidratação** | Necessidade diária de água por peso e nível de atividade |
| **Calculadora de RCQ** | Relação Cintura-Quadril e risco cardiovascular por sexo (OMS) |
| **Calculadora de TMB** | Taxa Metabólica Basal por Harris-Benedict + TDEE e macronutrientes |
| **Guia de Primeiros Socorros** | Protocolos de Heimlich, R.I.C.E., queimaduras (3 graus) e RCP |

## Stack

| Camada | Tecnologia |
|---|---|
| Framework | React Native + Expo SDK 54 (managed workflow) |
| Linguagem | TypeScript |
| Navegação | Expo Router 6 (file-based) |
| Gradientes | expo-linear-gradient |
| Estilização | StyleSheet.create() |
| Build & Distribuição | EAS Build (Expo Application Services) |
| Plataforma-alvo | Android |

## Distribuição

O app é distribuído como APK gerado via **EAS Build** — sem Play Store, sem cadastro de usuário. O link de download é compartilhado diretamente.

| Campo | Valor |
|---|---|
| Package | `com.jejedev.sinalsaude` |
| Owner | `jejedev` |
| Project ID | `eec6f26d-9123-4784-abfd-9daf1d67ed38` |
| Scheme | `sinalsaude` |

Para instalar o APK, o usuário precisa habilitar uma vez em:
> Configurações → Segurança → **Permitir instalação de fontes desconhecidas**

## Estrutura de Arquivos

```
mobile/
├── app.json                        # Configuração Expo (nome, scheme, ícones, EAS)
├── eas.json                        # Perfis de build (preview → APK, production → AAB)
├── metro.config.js                 # Configuração do Metro Bundler
├── .npmrc                          # legacy-peer-deps=true (resolve conflitos de peer deps)
├── app/
│   ├── _layout.tsx                 # Root layout — Stack navigator com fade
│   ├── index.tsx                   # Home — listagem de ferramentas + acesso a emergências
│   ├── calculadora-imc.tsx
│   ├── calculadora-hidratacao.tsx
│   ├── calculadora-rcq.tsx
│   ├── calculadora-tmb.tsx
│   └── primeiros-socorros.tsx
├── components/
│   ├── GradientBackground.tsx      # Wrapper com LinearGradient unificado
│   ├── Card.tsx                    # Card com glassmorphism
│   ├── InputField.tsx              # Input com label e unidade
│   └── PrimaryButton.tsx           # Botão primário com accent color configurável
├── constants/
│   └── theme.ts                    # Cores, espaçamentos, raios e tipografia
└── assets/
    ├── icon.png                    # Ícone do app (1024×1024 px)
    ├── adaptive-icon.png           # Ícone adaptativo Android (fundo transparente)
    └── splash-icon.png             # Tela de carregamento
```

## Como Executar

### Pré-requisitos

- [Node.js](https://nodejs.org) 18+
- [Expo Go](https://expo.dev/go) instalado no celular Android

### Instalação

```bash
cd mobile
npm install
```

### Desenvolvimento (Expo Go)

```bash
npx expo start --clear
```

Escaneie o QR code com o app Expo Go no celular. O app carrega instantaneamente, sem build nativo.

### Build APK para distribuição

```bash
# Login na conta Expo (necessário uma vez)
npx eas-cli login

# Gera APK via nuvem (~5–15 min)
npx eas-cli build --platform android --profile preview
```

Ao finalizar, a Expo disponibiliza um link público para download do `.apk`.

> O perfil `production` no `eas.json` gera um `.aab` (Android App Bundle), reservado para futura publicação na Play Store.

## Arquitetura e Decisões Técnicas

### Navegação file-based (Expo Router)

Cada arquivo dentro de `app/` é automaticamente uma rota. A navegação usa `router.push()` e `router.back()`, sem configuração manual de stacks.

```
app/index.tsx              → /
app/calculadora-imc.tsx    → /calculadora-imc
app/primeiros-socorros.tsx → /primeiros-socorros
```

O `_layout.tsx` define o Stack raiz com animação `fade` e sem header visível.

### Sistema de tema centralizado

Todas as cores, espaçamentos, raios de borda e tipografia vivem em `constants/theme.ts`. Nenhuma tela define valores mágicos inline.

```ts
import { Colors, Spacing, Radius, Typography } from '../constants/theme';
```

Cada ferramenta tem uma cor accent:

| Ferramenta | Accent |
|---|---|
| IMC | `Colors.purple` — #a78bfa |
| Hidratação | `Colors.blue` — #38bdf8 |
| RCQ | `Colors.amber` — #fbbf24 |
| TMB | `Colors.green` — #34d399 |
| Primeiros Socorros | `Colors.red` — #f87171 |

### Componentes reutilizáveis

- **`GradientBackground`** — aplica o gradiente `#0f0c29 → #302b63 → #24243e` em todas as telas via `expo-linear-gradient`.
- **`Card`** — superfície semitransparente com borda sutil (glassmorphism adaptado para mobile).
- **`InputField`** — agrupa label, `TextInput` e unidade (kg, cm, anos) em um único componente controlado.
- **`PrimaryButton`** — botão com `accent` configurável via prop, sem cor fixa.

### Lógica de cálculo

Toda a lógica de saúde é pura (sem side effects) e vive dentro da própria tela:

```ts
// IMC
const imc = peso / (altura * altura);

// TMB — Harris-Benedict revisado (Roza & Shizgal, 1984)
const tmb = sexo === 'M'
  ? 88.362 + (13.397 * peso) + (4.799 * altura) - (5.677 * idade)
  : 447.593 + (9.247 * peso) + (3.098 * altura) - (4.330 * idade);

// RCQ
const rcq = cintura / quadril;

// Hidratação
const agua = peso * 35 * fatorAtividade;
```

### Design

- Gradiente escuro unificado em todas as telas: `#0f0c29 → #302b63 → #24243e`
- Cards com `rgba(255,255,255,0.05)` de fundo e borda `rgba(255,255,255,0.1)`
- Cores temáticas por ferramenta e por faixa de risco clínico
- Transição entre telas via animação `fade` no Stack navigator
- `userInterfaceStyle: dark` — força tema escuro do sistema

## Classificações e Referências Clínicas

**IMC** — Organização Mundial da Saúde (OMS)

| Classificação | IMC |
|---|---|
| Abaixo do peso | < 18,5 |
| Peso normal | 18,5 – 24,9 |
| Sobrepeso | 25,0 – 29,9 |
| Obesidade grau I | 30,0 – 34,9 |
| Obesidade grau II | 35,0 – 39,9 |
| Obesidade grau III | ≥ 40,0 |

**RCQ** — Organização Mundial da Saúde (OMS)

| Classificação | Masculino | Feminino |
|---|---|---|
| Baixo risco | < 0,90 | < 0,80 |
| Risco moderado | 0,90 – 0,99 | 0,80 – 0,85 |
| Alto risco | ≥ 1,00 | > 0,85 |

**TMB** — Equação revisada de Harris-Benedict (Roza & Shizgal, 1984)

| Sexo | Fórmula |
|---|---|
| Masculino | 88,362 + (13,397 × kg) + (4,799 × cm) − (5,677 × idade) |
| Feminino | 447,593 + (9,247 × kg) + (3,098 × cm) − (4,330 × idade) |

**Hidratação** — 35 ml por kg de peso corporal, com fator de atividade: sedentário (×1,0) · moderado (×1,15) · muito ativo (×1,3)

**TDEE** — TMB × fator de atividade física. Macros calculados na proporção 30% proteína / 45% carboidrato / 25% gordura.

## Aviso

As informações fornecidas têm caráter exclusivamente educativo e não substituem avaliação ou consulta médica profissional. Em emergências, ligue para o SAMU (192) ou Bombeiros (193).