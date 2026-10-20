(function () {
  const unsplash = (id, w = 900) => `https://images.unsplash.com/photo-${id}?w=${w}&q=75&auto=format&fit=crop`;

  // Same content as the live site's Work section
  const cases = [
    { img: '1741896135512-084b251887f7', alt: 'ขวดเซรั่มบำรุงผิวบนพื้นสีชมพู', cat: 'E-Commerce', name: 'แบรนด์ความงาม', v1: '+320%', l1: 'ยอดขายเพิ่มขึ้น', v2: '-42%', l2: 'ต้นทุนต่อผลลัพธ์' },
    { img: '1414235077428-338989a2e8c0', alt: 'จานอาหารบนโต๊ะในร้านอาหาร', cat: 'Restaurant &amp; F&amp;B', name: 'ร้านอาหาร', v1: '+215%', l1: 'ยอดการจอง', v2: '+68%', l2: 'ผู้ติดตามใหม่' },
    { img: '1486312338219-ce68d2c6f44d', alt: 'มือกำลังพิมพ์บนแล็ปท็อป', cat: 'B2B Business', name: 'ธุรกิจเทคโนโลยี', v1: '+180%', l1: 'Lead เพิ่มขึ้น', v2: '-55%', l2: 'ต้นทุนต่อผลลัพธ์' },
  ];

  const headText = `
    <p class="eyebrow">ผลงานของเรา</p>
    <h2>ตัวอย่างผลลัพธ์จากธุรกิจจริง</h2>
    <p class="lead">เรามีประสบการณ์ดูแลธุรกิจหลากหลายประเภท ด้วยกลยุทธ์ที่เหมาะสมกับแต่ละอุตสาหกรรม</p>`;
  const moreLink = '<a href="#" class="link-more">ดูผลงานทั้งหมด <span>→</span></a>';
  const arrowUp = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17 17 7M8 7h9v9"/></svg>';
  const arrow = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>';
  const img = (c, w, cls = '') => `<img class="${cls}" src="${unsplash(c.img, w)}" alt="${c.alt}" loading="lazy" decoding="async">`;
  const stats = (c, cls = 'stats') => `
    <div class="${cls}">
      <div><span class="val" data-count>${c.v1}</span><span class="lbl">${c.l1}</span></div>
      <div><span class="val" data-count>${c.v2}</span><span class="lbl">${c.l2}</span></div>
    </div>`;

  const renderers = {
    // 1 — tall image cards, all info on a dark gradient at the bottom
    overlay: () => cases.map((c) => `
      <article class="o-card a-up">
        ${img(c, 800)}
        <span class="cat">${c.cat}</span>
        <span class="o-arrow" aria-hidden="true">${arrowUp}</span>
        <div class="o-body">
          <h3>${c.name}</h3>
          ${stats(c)}
        </div>
      </article>`).join(''),

    // 2 — one large case + clickable list of the others
    featured: () => `
      <div class="f-main" aria-live="polite">
        ${cases.map((c, i) => `
          <article class="f-slide${i === 0 ? ' is-active' : ''}" data-f="${i}">
            <div class="f-media">${img(c, 1200)}<span class="cat">${c.cat}</span></div>
            <div class="f-info">
              <span class="f-no">0${i + 1}</span>
              <h3>${c.name}</h3>
              ${stats(c)}
              <a href="#" class="btn-gold">ปรึกษาแผนการตลาด <span class="btn-arrow">${arrow}</span></a>
            </div>
          </article>`).join('')}
      </div>
      <div class="f-list" role="tablist" aria-label="เลือกผลงาน">
        ${cases.map((c, i) => `
          <button type="button" class="f-item${i === 0 ? ' is-active' : ''}" role="tab" aria-selected="${i === 0}" data-f-btn="${i}">
            ${img(c, 240)}
            <span class="f-item-text"><small>${c.cat}</small><b>${c.name}</b><em>${c.v1} ${c.l1}</em></span>
          </button>`).join('')}
      </div>`,

    // 3 — horizontal scroll-snap slider
    slides: () => cases.map((c, i) => `
      <article class="s-slide">
        <div class="s-media">${img(c, 1000)}</div>
        <div class="s-info">
          <span class="cat cat-light">${c.cat}</span>
          <span class="s-no">0${i + 1} / 0${cases.length}</span>
          <h3>${c.name}</h3>
          ${stats(c)}
          <a href="#" class="btn-gold">ปรึกษาแผนการตลาด <span class="btn-arrow">${arrow}</span></a>
        </div>
      </article>`).join(''),

    // 4 — front: photo, back: results
    flip: () => cases.map((c) => `
      <article class="fl-card a-up" tabindex="0" aria-label="${c.name}">
        <div class="fl-inner">
          <div class="fl-face fl-front">
            ${img(c, 800)}
            <span class="cat">${c.cat}</span>
            <div class="fl-front-body"><h3>${c.name}</h3><span class="fl-hint">ดูผลลัพธ์ ↻</span></div>
          </div>
          <div class="fl-face fl-back">
            <span class="cat cat-light">${c.cat}</span>
            <h3>${c.name}</h3>
            ${stats(c, 'stats stats-stack')}
            <a href="#" class="btn-gold">ปรึกษาแผนการตลาด <span class="btn-arrow">${arrow}</span></a>
          </div>
        </div>
      </article>`).join(''),

    // 5 — mosaic on navy + a CTA tile
    bento: () => cases.map((c, i) => `
      <article class="bn-card bn-${i + 1} a-up">
        ${img(c, i === 0 ? 1200 : 800)}
        <span class="cat">${c.cat}</span>
        <div class="bn-body"><h3>${c.name}</h3>${stats(c)}</div>
      </article>`).join('') + `
      <article class="bn-cta a-up">
        <p class="bn-cta-kicker">ธุรกิจของคุณ</p>
        <h3>อยากเห็นผลลัพธ์แบบนี้<br>กับธุรกิจของคุณ?</h3>
        <p>พูดคุยกับทีมงานเพื่อวางเป้าหมายและตัวชี้วัดที่เหมาะกับธุรกิจของคุณ</p>
        <a href="#" class="btn-gold">ปรึกษาแผนการตลาด <span class="btn-arrow">${arrow}</span></a>
      </article>`,
  };

  document.querySelectorAll('[data-render]').forEach((el) => { el.innerHTML = renderers[el.dataset.render](); });
  document.querySelectorAll('[data-head]').forEach((el) => {
    el.innerHTML = el.classList.contains('head-center') ? headText : `<div>${headText}</div>${moreLink}`;
  });
  document.querySelectorAll('[data-head-text]').forEach((el) => { el.innerHTML = headText; });

  // Count-up for "+320%" style values
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finals = new WeakMap();
  function countUp(el) {
    if (!finals.has(el)) finals.set(el, el.textContent.trim());
    const final = finals.get(el);
    const m = final.match(/^([+-]?)(\d+)(.*)$/);
    if (!m || reduceMotion) { el.textContent = final; return; }
    const [, sign, num, suffix] = m;
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min((now - start) / 1400, 1);
      el.textContent = sign + Math.round(Number(num) * (1 - Math.pow(1 - t, 3))) + suffix;
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }
  const play = (sec) => {
    sec.classList.remove('play');
    void sec.offsetWidth;
    sec.classList.add('play');
    sec.querySelectorAll('[data-count]').forEach(countUp);
  };

  const io = new IntersectionObserver((entries) => entries.forEach((e) => {
    if (e.isIntersecting) { play(e.target); io.unobserve(e.target); }
  }), { threshold: 0.25 });
  document.querySelectorAll('[data-wk]').forEach((s) => io.observe(s));
  document.querySelectorAll('[data-replay]').forEach((btn) => btn.addEventListener('click', () => play(btn.closest('[data-wk]'))));

  // 2 — featured switcher
  const fWrap = document.querySelector('.f-wrap');
  if (fWrap) {
    const slides = fWrap.querySelectorAll('[data-f]');
    const btns = fWrap.querySelectorAll('[data-f-btn]');
    btns.forEach((b) => b.addEventListener('click', () => {
      const idx = b.dataset.fBtn;
      btns.forEach((x) => { const on = x === b; x.classList.toggle('is-active', on); x.setAttribute('aria-selected', String(on)); });
      slides.forEach((s) => {
        const on = s.dataset.f === idx;
        s.classList.toggle('is-active', on);
        if (on) s.querySelectorAll('[data-count]').forEach(countUp);
      });
    }));
  }

  // 3 — slider: buttons, dots and drag-to-scroll
  const track = document.querySelector('.s-track');
  if (track) {
    const slides = [...track.children];
    const dots = document.querySelector('[data-dots]');
    dots.innerHTML = slides.map((_, i) => `<button type="button" aria-label="ผลงานที่ ${i + 1}"${i === 0 ? ' class="is-active"' : ''}></button>`).join('');
    const dotBtns = [...dots.children];
    const current = () => slides.reduce((best, s, i) => (Math.abs(s.offsetLeft - track.scrollLeft - track.offsetLeft) < Math.abs(slides[best].offsetLeft - track.scrollLeft - track.offsetLeft) ? i : best), 0);
    const go = (i) => track.scrollTo({ left: slides[Math.max(0, Math.min(i, slides.length - 1))].offsetLeft - slides[0].offsetLeft, behavior: 'smooth' });
    document.querySelector('[data-prev]').addEventListener('click', () => go(current() - 1));
    document.querySelector('[data-next]').addEventListener('click', () => go(current() + 1));
    dotBtns.forEach((d, i) => d.addEventListener('click', () => go(i)));
    track.addEventListener('scroll', () => {
      const c = current();
      dotBtns.forEach((d, i) => d.classList.toggle('is-active', i === c));
    }, { passive: true });

    let down = false; let startX = 0; let startLeft = 0;
    track.addEventListener('pointerdown', (e) => {
      if (e.pointerType !== 'mouse') return;
      down = true; startX = e.clientX; startLeft = track.scrollLeft;
      track.classList.add('is-dragging');
    });
    window.addEventListener('pointermove', (e) => { if (down) track.scrollLeft = startLeft - (e.clientX - startX); });
    window.addEventListener('pointerup', () => {
      if (!down) return;
      down = false;
      track.classList.remove('is-dragging');
      go(current());
    });
  }

  // 4 — flip on tap for touch screens (mouse users flip on hover via CSS)
  const canHover = window.matchMedia('(hover: hover)').matches;
  document.querySelectorAll('.fl-card').forEach((card) => {
    card.addEventListener('click', (e) => { if (!canHover && !e.target.closest('a')) card.classList.toggle('is-flipped'); });
    card.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); card.classList.toggle('is-flipped'); } });
  });
})();
