(function () {
  const ICONS = {
    phone: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z"/></svg>',
    line: '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3C6.5 3 2 6.6 2 11c0 3.9 3.5 7.2 8.3 7.9.3.1.8.2.9.5.1.3.1.7 0 1l-.1.8c0 .3-.2 1 .9.5s5.9-3.5 8.1-6C21.4 14.1 22 12.6 22 11c0-4.4-4.5-8-10-8z"/></svg>',
    facebook: '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M14 8h3V4h-3c-2.8 0-4 1.7-4 4.3V10H7v4h3v8h4v-8h3l1-4h-4V8.6c0-.4.3-.6.6-.6z"/></svg>',
  };
  document.querySelectorAll('[data-icon]').forEach((el) => { el.outerHTML = ICONS[el.dataset.icon]; });

  // Open / closed badge from Bangkok time (Mon–Sat 09:00–18:00)
  const now = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Bangkok' }));
  const open = now.getDay() !== 0 && now.getHours() >= 9 && now.getHours() < 18;
  document.querySelectorAll('[data-status]').forEach((el) => {
    el.textContent = open ? 'เปิดให้บริการตอนนี้' : 'นอกเวลาทำการ';
    el.classList.add(open ? 'is-open' : 'is-closed');
  });

  // Entrance on scroll + replay
  const play = (sec) => { sec.classList.remove('play'); void sec.offsetWidth; sec.classList.add('play'); };
  const io = new IntersectionObserver((entries) => entries.forEach((e) => {
    if (e.isIntersecting) { play(e.target); io.unobserve(e.target); }
  }), { threshold: 0.3 });
  document.querySelectorAll('[data-ct]').forEach((s) => io.observe(s));
  document.querySelectorAll('[data-replay]').forEach((b) => b.addEventListener('click', () => play(b.closest('[data-ct]'))));
})();
