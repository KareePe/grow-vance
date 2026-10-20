(function () {
  const heroes = document.querySelectorAll('[data-hero]');

  // Play each hero's entrance animation the first time it scrolls into view
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('play');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.35 });
  heroes.forEach((h) => io.observe(h));

  // Replay: remove the class, force a reflow, add it back
  document.querySelectorAll('[data-replay]').forEach((btn) => btn.addEventListener('click', () => {
    const hero = btn.closest('[data-hero]');
    hero.classList.remove('play');
    void hero.offsetWidth;
    hero.classList.add('play');
  }));
})();
