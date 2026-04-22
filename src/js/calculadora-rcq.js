const criteria = {
  M: [
    { key: 'baixo',    max: 0.90,     label: 'Baixo risco',    riskClass: 'risk-baixo',    bgClass: 'bg-baixo',    pct: 20, tip: 'Sua distribuição de gordura corporal está dentro da faixa segura. Continue mantendo hábitos saudáveis.' },
    { key: 'moderado', max: 1.00,     label: 'Risco moderado', riskClass: 'risk-moderado', bgClass: 'bg-moderado', pct: 60, tip: 'Atenção à gordura abdominal. Exercícios aeróbicos e dieta equilibrada ajudam a reduzir o risco cardiovascular.' },
    { key: 'alto',     max: Infinity, label: 'Alto risco',     riskClass: 'risk-alto',     bgClass: 'bg-alto',     pct: 95, tip: 'Risco cardiovascular elevado. Consulte um médico ou cardiologista para avaliação e acompanhamento.' },
  ],
  F: [
    { key: 'baixo',    max: 0.80,     label: 'Baixo risco',    riskClass: 'risk-baixo',    bgClass: 'bg-baixo',    pct: 20, tip: 'Sua distribuição de gordura corporal está dentro da faixa segura. Continue mantendo hábitos saudáveis.' },
    { key: 'moderado', max: 0.85,     label: 'Risco moderado', riskClass: 'risk-moderado', bgClass: 'bg-moderado', pct: 60, tip: 'Atenção à gordura abdominal. Exercícios aeróbicos e dieta equilibrada ajudam a reduzir o risco cardiovascular.' },
    { key: 'alto',     max: Infinity, label: 'Alto risco',     riskClass: 'risk-alto',     bgClass: 'bg-alto',     pct: 95, tip: 'Risco cardiovascular elevado. Consulte um médico ou cardiologista para avaliação e acompanhamento.' },
  ],
};

const fillColors = {
  'risk-baixo':    '#34d399',
  'risk-moderado': '#fbbf24',
  'risk-alto':     '#f87171',
};

let lastSexo = 'M';
let lastKey  = null;

function calcular(event) {
  event.preventDefault();

  const cintura = parseFloat(document.getElementById('cintura').value);
  const quadril = parseFloat(document.getElementById('quadril').value);
  const sexo    = document.querySelector('input[name="sexo"]:checked').value;

  if (!cintura || !quadril || cintura <= 0 || quadril <= 0) {
    alert('Por favor, preencha cintura e quadril corretamente.');
    return;
  }

  if (cintura >= quadril * 1.5) {
    alert('Verifique os valores inseridos: a cintura não pode ser muito maior que o quadril.');
    return;
  }

  const rcq  = cintura / quadril;
  const info = criteria[sexo].find(c => rcq < c.max);

  lastSexo = sexo;
  lastKey  = info.key;

  const hero = document.getElementById('result-hero');
  hero.className = 'result-hero ' + info.bgClass;

  document.getElementById('result-value').textContent = rcq.toFixed(2);
  document.getElementById('result-value').className   = 'rcq-value ' + info.riskClass;
  document.getElementById('result-label').textContent = info.label;
  document.getElementById('result-label').className   = 'rcq-label ' + info.riskClass;
  document.getElementById('result-sub').textContent   = `Cintura ${cintura} cm ÷ Quadril ${quadril} cm`;

  const fill   = document.getElementById('risk-fill');
  const marker = document.getElementById('risk-marker');
  const color  = fillColors[info.riskClass];
  fill.style.width      = info.pct + '%';
  fill.style.background = `linear-gradient(90deg, #34d399, ${color})`;
  marker.style.left     = info.pct + '%';
  marker.style.color    = color;

  document.getElementById('metric-cintura').textContent = cintura;
  document.getElementById('metric-quadril').textContent = quadril;

  document.getElementById('result-tip').innerHTML = `<strong>Orientação:</strong> ${info.tip}`;

  document.getElementById('result').style.display = 'block';

  switchTab(sexo);
  highlightRow(sexo, info.key);
}

function switchTab(sexo) {
  document.getElementById('table-M').style.display = sexo === 'M' ? '' : 'none';
  document.getElementById('table-F').style.display = sexo === 'F' ? '' : 'none';
  document.getElementById('tab-M').className = 'sex-tab' + (sexo === 'M' ? ' active' : '');
  document.getElementById('tab-F').className = 'sex-tab' + (sexo === 'F' ? ' active' : '');

  if (lastKey) highlightRow(sexo, lastKey);
}

function highlightRow(sexo, key) {
  ['baixo', 'moderado', 'alto'].forEach(k => {
    const el = document.getElementById(`ref-${sexo}-${k}`);
    if (el) el.classList.toggle('active', k === key);
  });
}

function navigateTo(url) {
  const overlay = document.getElementById('transition-overlay');
  overlay.classList.add('active');
  setTimeout(() => { window.location.href = url; }, 500);
}

document.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('page-enter');

  document.getElementById('table-F').style.display = 'none';

  document.querySelector('form').addEventListener('submit', calcular);

  document.querySelectorAll('.sex-tab[data-sex]').forEach(btn => {
    btn.addEventListener('click', () => switchTab(btn.dataset.sex));
  });

  document.querySelectorAll('input[name="sexo"]').forEach(radio => {
    radio.addEventListener('change', () => switchTab(radio.value));
  });

  document.querySelectorAll('.back-link[data-href]').forEach(link => {
    link.addEventListener('click', () => navigateTo(link.dataset.href));
    link.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') navigateTo(link.dataset.href);
    });
  });
});
