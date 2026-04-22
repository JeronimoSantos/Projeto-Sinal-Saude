const activityNames = {
  '1.2':   'Sedentário',
  '1.375': 'Lev. ativo',
  '1.55':  'Mod. ativo',
  '1.725': 'Muito ativo',
  '1.9':   'Ext. ativo',
};

const MACRO = { prot: 0.30, carb: 0.45, fat: 0.25 };
const KCAL  = { prot: 4,    carb: 4,    fat: 9    };

function calcular(event) {
  event.preventDefault();

  const sexo   = document.querySelector('input[name="sexo"]:checked').value;
  const idade  = parseFloat(document.getElementById('idade').value);
  const peso   = parseFloat(document.getElementById('peso').value);
  const altura = parseFloat(document.getElementById('altura').value);
  const fator  = parseFloat(document.querySelector('input[name="atividade"]:checked').value);

  if ([sexo, idade, peso, altura, fator].some(v => !v || v <= 0)) {
    alert('Por favor, preencha todos os campos corretamente.');
    return;
  }

  const tmb = sexo === 'M'
    ? 88.362  + (13.397 * peso) + (4.799 * altura) - (5.677 * idade)
    : 447.593 + (9.247  * peso) + (3.098 * altura) - (4.330 * idade);

  const tdee       = Math.round(tmb * fator);
  const tmbRounded = Math.round(tmb);
  const goalPerder = tdee - 500;
  const goalGanhar = tdee + 300;

  document.getElementById('result-tmb').textContent      = tmbRounded.toLocaleString('pt-BR');
  document.getElementById('result-hero-sub').textContent =
    `${sexo === 'M' ? 'Masculino' : 'Feminino'} · ${idade} anos · ${peso} kg · ${altura} cm`;
  document.getElementById('result-tdee').textContent      = tdee.toLocaleString('pt-BR');
  document.getElementById('result-atividade').textContent = activityNames[String(fator)];

  document.getElementById('goal-perder').textContent       = goalPerder.toLocaleString('pt-BR');
  document.getElementById('goal-perder-delta').textContent = '−500 kcal';
  document.getElementById('goal-manter').textContent       = tdee.toLocaleString('pt-BR');
  document.getElementById('goal-ganhar').textContent       = goalGanhar.toLocaleString('pt-BR');
  document.getElementById('goal-ganhar-delta').textContent = '+300 kcal';

  const protG = Math.round((tdee * MACRO.prot) / KCAL.prot);
  const carbG = Math.round((tdee * MACRO.carb) / KCAL.carb);
  const fatG  = Math.round((tdee * MACRO.fat)  / KCAL.fat);

  document.getElementById('val-prot').textContent = `${protG} g`;
  document.getElementById('val-carb').textContent = `${carbG} g`;
  document.getElementById('val-fat').textContent  = `${fatG} g`;

  const maxG = Math.max(protG, carbG, fatG);
  document.getElementById('bar-prot').style.width = (protG / maxG * 100) + '%';
  document.getElementById('bar-carb').style.width = (carbG / maxG * 100) + '%';
  document.getElementById('bar-fat').style.width  = (fatG  / maxG * 100) + '%';

  const formulaBox = document.getElementById('formula-box');
  formulaBox.innerHTML = sexo === 'M'
    ? `<div class="formula-title">Equação aplicada — Masculino</div>` +
      `88,362 + (13,397 × ${peso}) + (4,799 × ${altura}) − (5,677 × ${idade})<br>` +
      `= <span class="formula-highlight">${tmbRounded.toLocaleString('pt-BR')} kcal/dia</span>`
    : `<div class="formula-title">Equação aplicada — Feminino</div>` +
      `447,593 + (9,247 × ${peso}) + (3,098 × ${altura}) − (4,330 × ${idade})<br>` +
      `= <span class="formula-highlight">${tmbRounded.toLocaleString('pt-BR')} kcal/dia</span>`;

  document.getElementById('result').style.display = 'block';
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
