const FACTOR_BASE = 35; // ml por kg

const activityLabels = {
  '1.0':  'Sedentário — hidratação mínima recomendada.',
  '1.15': 'Ativo moderado — mantenha a regularidade ao longo do dia.',
  '1.3':  'Muito ativo — replenha os líquidos perdidos no treino.',
};

const refRows = [
  { id: 'ref-50',  min: 45, max: 55  },
  { id: 'ref-60',  min: 55, max: 65  },
  { id: 'ref-70',  min: 65, max: 75  },
  { id: 'ref-80',  min: 75, max: 85  },
  { id: 'ref-90',  min: 85, max: 95  },
  { id: 'ref-100', min: 95, max: 110 },
];

function getLabelAtividade(val) {
  return { '1.0': 'sedentária', '1.15': 'moderada', '1.3': 'ativa' }[val] || '';
}

function calcular(event) {
  event.preventDefault();

  const peso = parseFloat(document.getElementById('peso').value);
  const atividadeInput = document.querySelector('input[name="atividade"]:checked');
  const fator = parseFloat(atividadeInput.value);

  if (!peso || peso <= 0) {
    alert('Por favor, informe um peso válido.');
    return;
  }

  const mlTotal = Math.round(peso * FACTOR_BASE * fator);
  const litros  = (mlTotal / 1000).toFixed(2);
  const copos   = Math.ceil(mlTotal / 250);

  document.getElementById('result-liters').textContent  = litros;
  document.getElementById('result-ml').textContent      = mlTotal.toLocaleString('pt-BR');
  document.getElementById('result-glasses').textContent = copos;
  document.getElementById('result-label').textContent   = `Para ${peso} kg com atividade ${getLabelAtividade(atividadeInput.value)}`;
  document.getElementById('result-tip').innerHTML       =
    `<strong>Dica:</strong> ${activityLabels[atividadeInput.value]} Distribua o consumo em ${copos} copos de 250 ml ao longo do dia.`;

  document.getElementById('result').style.display = 'block';

  refRows.forEach(r => {
    document.getElementById(r.id).classList.toggle('active', peso >= r.min && peso < r.max);
  });
}

function navigateTo(url) {
  const overlay = document.getElementById('transition-overlay');
  overlay.classList.add('active');
  setTimeout(() => { window.location.href = url; }, 500);
}

document.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('page-enter');

  document.querySelector('form').addEventListener('submit', calcular);

  document.querySelectorAll('.back-link[data-href]').forEach(link => {
    link.addEventListener('click', () => navigateTo(link.dataset.href));
    link.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') navigateTo(link.dataset.href);
    });
  });
});
