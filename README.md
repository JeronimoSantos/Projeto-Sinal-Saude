# 💖🩺 Sinal Saúde

Plataforma de utilidade pública com calculadoras de saúde e guia de primeiros socorros, desenvolvida com HTML, CSS e JavaScript puros — sem dependências externas, funcionando 100% offline.

## Sobre o Projeto

O **Sinal Saúde** transforma dados técnicos de saúde em informações práticas para o dia a dia. O objetivo é oferecer ferramentas confiáveis, baseadas em critérios clínicos reconhecidos (OMS, Harris-Benedict), de forma acessível, sem cadastro e sem conexão com a internet.

## Problemas que esse Projeto Resolve

- **Falta de referência imediata** — o usuário obtém resultado, classificação e orientação de saúde em uma única tela, sem consultar tabelas externas.
- **Dificuldade de interpretação** — destaques visuais e cores por faixa eliminam ambiguidade nos resultados.
- **Dependência de apps ou cadastros** — sem backend, banco de dados ou autenticação. Funciona offline em qualquer dispositivo.
- **Ferramentas carregadas de anúncios** — interface limpa e focada na tarefa.

## Ferramentas disponíveis

| Ferramenta | Descrição |
|---|---|
| **Calculadora de IMC** | Índice de Massa Corporal com classificação em 6 faixas (OMS) |
| **Calculadora de Hidratação** | Necessidade diária de água por peso e nível de atividade |
| **Calculadora de RCQ** | Relação Cintura-Quadril e risco cardiovascular por sexo (OMS) |
| **Calculadora de TMB** | Taxa Metabólica Basal pela equação de Harris-Benedict + TDEE e macros |
| **Guia de Primeiros Socorros** | Protocolos de Heimlich, R.I.C.E., queimaduras e RCP |

## Estrutura de Arquivos

```
projeto-claude/
├── index.html                          # Splash screen — ponto de entrada
├── README.md
└── src/
    ├── assets/
    │   ├── cuidados-de-saude.png       # Ícone principal (favicon)
    │   └── cuidados-de-saude-128.png   # Ícone em alta resolução
    ├── css/
    │   ├── splash.css                  # Estilos da splash screen
    │   ├── calculadora-imc.css
    │   ├── calculadora-hidratacao.css
    │   ├── calculadora-rcq.css
    │   ├── calculadora-tmb.css
    │   └── primeiros-socorros.css
    ├── html/
    │   ├── calculadora-imc.html
    │   ├── calculadora-hidratacao.html
    │   ├── calculadora-rcq.html
    │   ├── calculadora-tmb.html
    │   └── primeiros-socorros.html
    └── js/
        ├── splash.js
        ├── calculadora-imc.js
        ├── calculadora-hidratacao.js
        ├── calculadora-rcq.js
        ├── calculadora-tmb.js
        └── primeiros-socorros.js
```

## Arquitetura e Decisões Técnicas

### Separação de responsabilidades

Cada página é composta por três arquivos independentes com responsabilidade única:

- **HTML** — estrutura semântica e marcação, sem estilos inline ou handlers no markup
- **CSS** — toda apresentação visual, incluindo temas por classificação e variáveis CSS customizadas
- **JS** — lógica de negócio e listeners de eventos, registrados via `DOMContentLoaded`

Nenhum arquivo contém `style=""`, `onclick=""`, `onsubmit=""` ou similares.

### Navegação com transição

A transição entre páginas usa um overlay com fade que mascara o carregamento nativo do browser, criando a sensação de SPA sem roteamento JavaScript. O mecanismo:

```js
function navigateTo(url) {
  document.getElementById('transition-overlay').classList.add('active');
  setTimeout(() => { window.location.href = url; }, 500);
}
```

Links de navegação usam `data-href` em vez de `onclick`, com listeners adicionados via JS.

### Caminhos de rota

Todos os assets (CSS, JS, imagens) usam caminhos absolutos a partir da raiz (`/src/css/...`, `/src/js/...`), garantindo resolução correta independente da profundidade do HTML no diretório.

Links de navegação entre páginas dentro de `src/html/` usam caminhos relativos entre si. O retorno ao `index.html` (raiz) usa `/index.html` para evitar resolução incorreta.

### Design

- Glassmorphism com `backdrop-filter: blur` e bordas semitransparentes
- Gradiente de fundo unificado em todas as páginas: `#0f0c29 → #302b63 → #24243e`
- Orbs decorativos animados via `@keyframes`
- Cores temáticas por ferramenta: roxo (IMC), azul (Hidratação), âmbar (RCQ), verde (TMB), vermelho (Primeiros Socorros)
- Animação de entrada de página via classe `.page-enter`

## Como Usar

1. Abra `index.html` diretamente no navegador — não é necessário servidor ou instalação.
2. Escolha a ferramenta desejada na splash screen.
3. Preencha os campos e submeta o formulário (botão ou `Enter`).
4. O resultado é exibido com classificação, métricas e orientação de saúde.

> Para servir via servidor local (necessário para que caminhos absolutos `/src/...` funcionem corretamente):
> ```bash
> npx serve .
> # ou
> python -m http.server 8080
> ```

## Boas Práticas Aplicadas

### HTML Semântico
- Estrutura com `<main>`, `<article>`, `<header>`, `<section>`, `<nav>`, `<footer>`
- Formulários com `<label for>` vinculados por `id`
- Listas de classificação como `<dl>/<dt>/<dd>` (pares nome/valor)
- `role="tablist"`, `role="tab"`, `role="tabpanel"` na navegação por abas dos primeiros socorros

### Acessibilidade
- `aria-live="polite"` e `aria-atomic="true"` nas áreas de resultado
- `aria-hidden="true"` em elementos decorativos (emojis, orbs)
- `aria-describedby` nos inputs associando cada campo à sua unidade (kg, cm, m)
- `aria-selected` atualizado dinamicamente nas abas
- `tabindex="0"` e listener de teclado (`Enter`/`Space`) nos links de navegação customizados

### SEO
- `<meta name="description">` descritivo em cada página
- `<meta name="robots">` configurado por página (`index, follow` nas calculadoras; `noindex, nofollow` na splash)
- `<title>` único e descritivo por página

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

| Sexo | Baixo risco | Moderado | Alto risco |
|---|---|---|---|
| Masculino | < 0,90 | 0,90 – 0,99 | ≥ 1,00 |
| Feminino | < 0,80 | 0,80 – 0,85 | > 0,85 |

**TMB** — Equação revisada de Harris-Benedict (Roza & Shizgal, 1984)

| Sexo | Fórmula |
|---|---|
| Masculino | 88,362 + (13,397 × kg) + (4,799 × cm) − (5,677 × idade) |
| Feminino | 447,593 + (9,247 × kg) + (3,098 × cm) − (4,330 × idade) |

**Hidratação** — 35 ml por kg de peso corporal, com fator de atividade física (1,0 / 1,15 / 1,3)

## Aviso

As informações fornecidas têm caráter exclusivamente educativo e não substituem avaliação ou consulta médica profissional. Em emergências, ligue para o SAMU (192) ou Bombeiros (193).
