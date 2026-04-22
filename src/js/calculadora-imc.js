const classifications = [
  { key: 'abaixo',     max: 18.5,     label: 'Abaixo do peso',     tip: 'Considere consultar um nutricionista.',        class: 'abaixo' },
  { key: 'normal',     max: 25.0,     label: 'Peso normal',         tip: 'Parabéns! Mantenha hábitos saudáveis.',        class: 'normal' },
  { key: 'sobrepeso',  max: 30.0,     label: 'Sobrepeso',           tip: 'Atenção à alimentação e exercícios físicos.',  class: 'sobrepeso' },
  { key: 'obesidade1', max: 35.0,     label: 'Obesidade grau I',    tip: 'Procure orientação médica e nutricional.',     class: 'obesidade1' },
  { key: 'obesidade2', max: 40.0,     label: 'Obesidade grau II',   tip: 'Acompanhamento médico é muito importante.',    class: 'obesidade2' },
  { key: 'obesidade3', max: Infinity, label: 'Obesidade grau III',  tip: 'Busque atendimento médico especializado.',     class: 'obesidade3' },
];

function classify(imc) {
  return classifications.find(c => imc < c.max);
}

function calcular(event) {
  event.preventDefault();

  const peso   = parseFloat(document.getElementById('peso').value);
  const altura = parseFloat(document.getElementById('altura').value);

  if (!peso || !altura || peso <= 0 || altura <= 0) {
    alert('Por favor, preencha peso e altura corretamente.');
    return;
  }

  const imc  = peso / (altura * altura);
  const info = classify(imc);

  const resultEl = document.getElementById('result');
  resultEl.className    = 'result ' + info.class;
  resultEl.style.display = 'block';

  document.getElementById('imc-value').textContent = imc.toFixed(1);
  document.getElementById('imc-label').textContent = info.label;
  document.getElementById('imc-tip').textContent   = info.tip;

  classifications.forEach(c => {
    document.getElementById('row-' + c.key).classList.toggle('active', c.key === info.key);
  });
}

function navigateTo(url) {
  const overlay = document.getElementById('transition-overlay');
  overlay.classList.add('active');
  setTimeout(() => { window.location.href = url; }, 500);
}

document.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('page-enter');

  document.querySelector('.form').addEventListener('submit', calcular);

  document.querySelectorAll('.back-link[data-href]').forEach(link => {
    link.addEventListener('click', () => navigateTo(link.dataset.href));
    link.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') navigateTo(link.dataset.href);
    });
  });
});
