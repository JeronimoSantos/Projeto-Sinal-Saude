function navigateTo(url) {
  const overlay = document.getElementById('transition-overlay');
  overlay.classList.add('active');
  setTimeout(() => { window.location.href = url; }, 500);
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-href]').forEach(el => {
    el.addEventListener('click', () => navigateTo(el.dataset.href));
    el.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') navigateTo(el.dataset.href);
    });
  });
});
