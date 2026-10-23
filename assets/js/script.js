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

  // Contact: open / closed badge from Bangkok time (Mon–Sat 09:00–21:00)
  const bkk = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Bangkok' }));
  const isOpen = bkk.getDay() !== 0 && bkk.getHours() >= 9 && bkk.getHours() < 21;
  document.querySelectorAll('[data-open-status]').forEach((el) => {
    el.textContent = isOpen ? 'เปิดให้บริการตอนนี้' : 'นอกเวลาทำการ';
    el.classList.add(isOpen ? 'is-open' : 'is-closed');
  });

  // Review slider: scroll-snap does the swiping; this adds arrows, dots and autoplay
  document.querySelectorAll('[data-slider]').forEach((slider) => {
    const track = slider.querySelector('[data-slider-track]');
    const slides = [...track.children];
    const dotsWrap = slider.querySelector('[data-slider-dots]');
    let current = 0;

    const dots = slides.map((_, i) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 't-dot';
      dot.setAttribute('aria-label', `รีวิวที่ ${i + 1}`);
      dot.addEventListener('click', () => goTo(i));
      dotsWrap.append(dot);
      return dot;
    });

    // Layout is only read on interaction, never at startup (avoids a forced reflow)
    const goTo = (i) => {
      const n = (i + slides.length) % slides.length;
      track.scrollTo({ left: n * track.clientWidth, behavior: reduceMotion ? 'auto' : 'smooth' });
    };
    const setCurrent = (i) => {
      current = i;
      dots.forEach((d, j) => d.setAttribute('aria-current', String(j === i)));
    };
    setCurrent(0);

    // Whichever slide is mostly in view becomes current (covers swipes, arrows and dots)
    const io = new IntersectionObserver((entries) => entries.forEach((e) => {
      if (e.isIntersecting) setCurrent(slides.indexOf(e.target));
    }), { root: track, threshold: 0.6 });
    slides.forEach((s) => io.observe(s));

    slider.querySelector('[data-slider-prev]').addEventListener('click', () => goTo(current - 1));
    slider.querySelector('[data-slider-next]').addEventListener('click', () => goTo(current + 1));
    track.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') { e.preventDefault(); goTo(current - 1); }
      if (e.key === 'ArrowRight') { e.preventDefault(); goTo(current + 1); }
    });

    // Autoplay every 6s; pauses while hovered, focused, touched or off-screen
    if (reduceMotion) return;
    let paused = false;
    let visible = false;
    const pause = () => { paused = true; };
    const resume = () => { paused = false; };
    slider.addEventListener('mouseenter', pause);
    slider.addEventListener('mouseleave', resume);
    slider.addEventListener('focusin', pause);
    slider.addEventListener('focusout', resume);
    track.addEventListener('touchstart', pause, { passive: true });
    new IntersectionObserver(([e]) => { visible = e.isIntersecting; }).observe(slider);
    setInterval(() => {
      if (!paused && visible && !document.hidden) goTo(current + 1);
    }, 6000);
  });

  // Click tracking for Google Ads / GA4 (phone_click, line_click)
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
  // No initial call: reading scrollY during startup forces a full-page layout (long task on mobile).
  // A restored scroll position fires a scroll event anyway.
  const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 8);
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

  // Modals: [data-modal-open="id"] opens a <dialog>; close button, Esc (native) or a backdrop click closes it
  document.querySelectorAll('[data-modal-open]').forEach((btn) => {
    const dialog = document.getElementById(btn.dataset.modalOpen);
    if (!dialog || typeof dialog.showModal !== 'function') return;
    btn.addEventListener('click', () => dialog.showModal());
    dialog.querySelectorAll('[data-modal-close]').forEach((el) => el.addEventListener('click', () => dialog.close()));
    dialog.addEventListener('click', (e) => { if (e.target === dialog) dialog.close(); });
  });
})();
