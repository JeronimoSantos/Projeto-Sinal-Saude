const tabs = ['heimlich', 'rice', 'burns', 'rcp'];

function showTab(id) {
  tabs.forEach(t => {
    document.getElementById('panel-' + t).classList.toggle('active', t === id);
    const tab = document.getElementById('tab-' + t);
    tab.classList.toggle('active', t === id);
    tab.setAttribute('aria-selected', t === id);
  });
}

function navigateTo(url) {
  const overlay = document.getElementById('transition-overlay');
  overlay.classList.add('active');
  setTimeout(() => { window.location.href = url; }, 500);
}

document.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('page-enter');

  document.querySelectorAll('.ptab[data-tab]').forEach(btn => {
    btn.addEventListener('click', () => showTab(btn.dataset.tab));
  });

  document.querySelectorAll('.back-link[data-href]').forEach(link => {
    link.addEventListener('click', () => navigateTo(link.dataset.href));
    link.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') navigateTo(link.dataset.href);
    });
  });
});
