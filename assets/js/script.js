(function () {
  // Hero entrance animation (content stays visible if JS doesn't run)
  const hero = document.querySelector('[data-hero]');
  if (hero) requestAnimationFrame(() => hero.classList.add('play'));

  // Count numbers like "+320%" up from 0; the final text is already in the HTML if JS or motion is off
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function countUp(el) {
    const m = el.textContent.trim().match(/^([+-]?)(\d+)(.*)$/);
    if (!m || reduceMotion) return;
    const [, sign, num, suffix] = m;
    const target = Number(num);
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min((now - start) / 1400, 1);
      el.textContent = sign + Math.round(target * (1 - Math.pow(1 - t, 3))) + suffix;
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  // Section entrance animations: play once when scrolled into view
  const revealObserver = new IntersectionObserver((entries) => entries.forEach((e) => {
    if (e.isIntersecting) {
      e.target.classList.add('play');
      e.target.querySelectorAll('[data-count]').forEach(countUp);
      revealObserver.unobserve(e.target);
    }
  }), { threshold: 0.2 });
  document.querySelectorAll('[data-reveal]').forEach((el) => revealObserver.observe(el));

  // Contact: open / closed badge from Bangkok time (Mon–Sat 09:00–18:00)
  const bkk = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Bangkok' }));
  const isOpen = bkk.getDay() !== 0 && bkk.getHours() >= 9 && bkk.getHours() < 18;
  document.querySelectorAll('[data-open-status]').forEach((el) => {
    el.textContent = isOpen ? 'เปิดให้บริการตอนนี้' : 'นอกเวลาทำการ';
    el.classList.add(isOpen ? 'is-open' : 'is-closed');
  });

  // Click tracking for Google Ads / GA4 (phone_click, line_click, facebook_click)
  window.dataLayer = window.dataLayer || [];
  document.querySelectorAll('[data-track]').forEach((el) => el.addEventListener('click', () => {
    window.dataLayer.push({ event: el.dataset.track });
  }));

  // Footer: current year + back-to-top
  document.querySelectorAll('[data-year]').forEach((el) => { el.textContent = new Date().getFullYear(); });
  document.querySelectorAll('[data-to-top]').forEach((b) => b.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
  }));

  // Preloader: fade out once everything has loaded (fallback after 4s so slow images can't block the page)
  const preloader = document.querySelector('[data-preloader]');
  if (preloader) {
    const hidePreloader = () => {
      if (preloader.classList.contains('is-done')) return;
      preloader.classList.add('is-done');
      document.documentElement.classList.remove('is-loading');
      setTimeout(() => preloader.remove(), 700);
    };
    if (document.readyState === 'complete') hidePreloader();
    else window.addEventListener('load', hidePreloader);
    setTimeout(hidePreloader, 4000);
  }

  // Floating CTA: show once the hero has scrolled out of view
  const floatCta = document.querySelector('[data-float-cta]');
  const heroSection = document.querySelector('.hero');
  if (floatCta && heroSection) {
    new IntersectionObserver(([e]) => {
      const show = !e.isIntersecting && e.boundingClientRect.top < 0;
      floatCta.classList.toggle('is-visible', show);
      floatCta.inert = !show;
    }).observe(heroSection);
  }

  // Sticky header: add a shadow once the page scrolls
  const header = document.querySelector('[data-header]');
  const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 8);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // Mobile menu drawer
  const toggle = document.querySelector('[data-menu-toggle]');
  const menu = document.querySelector('[data-menu]');

  function setMenu(open) {
    document.body.classList.toggle('menu-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'ปิดเมนู' : 'เปิดเมนู');
    menu.inert = !open;
    if (open) {
      menu.querySelector('a').focus({ preventScroll: true });
    } else if (menu.contains(document.activeElement)) {
      toggle.focus({ preventScroll: true });
    }
  }

  toggle.addEventListener('click', () => setMenu(!document.body.classList.contains('menu-open')));
  menu.querySelectorAll('a, [data-menu-close]').forEach((el) => el.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && document.body.classList.contains('menu-open')) setMenu(false);
  });
  // Close the drawer if the viewport grows back to desktop width
  window.matchMedia('(min-width: 1101px)').addEventListener('change', (e) => { if (e.matches) setMenu(false); });
})();
