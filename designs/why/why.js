(function () {
  const ICONS = {
    compass: ['c:12:12:10', 'm16.2 7.8-2.1 6.3-6.3 2.1 2.1-6.3z'],
    link: ['M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7', 'M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7'],
    chart: ['M3 3v18h18', 'M18 17V9', 'M13 17V5', 'M8 17v-3'],
    msg: ['M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z', 'M8 10h.01M12 10h.01M16 10h.01'],
  };
  const icon = (name, size = 26) => `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${ICONS[name].map((d) => {
    if (d.startsWith('c:')) { const [, cx, cy, r] = d.split(':'); return `<circle cx="${cx}" cy="${cy}" r="${r}"></circle>`; }
    return `<path d="${d}"></path>`;
  }).join('')}</svg>`;
  const arrow = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>';

  // Brief Section 05 — the four differentiators
  const points = [
    { icon: 'compass', en: 'Strategy Before Execution', th: 'กลยุทธ์ก่อนลงมือทำ', desc: 'เริ่มจากการทำความเข้าใจธุรกิจ กลุ่มเป้าหมาย และเป้าหมายที่ต้องการ ก่อนเลือกช่องทางและวางแผนดำเนินงาน' },
    { icon: 'link', en: 'Connected Marketing', th: 'การตลาดที่เชื่อมโยงกัน', desc: 'เชื่อมโยงโฆษณา คอนเทนต์ เว็บไซต์ และข้อมูล เพื่อให้แต่ละส่วนสนับสนุนเป้าหมายเดียวกัน' },
    { icon: 'chart', en: 'Measurement & Optimization', th: 'วัดผลและปรับปรุงต่อเนื่อง', desc: 'วัดผลตามตัวชี้วัดที่ตกลงร่วมกัน วิเคราะห์สิ่งที่เกิดขึ้น และนำข้อมูลมาใช้ปรับปรุงแผนงาน' },
    { icon: 'msg', en: 'Transparent Communication', th: 'สื่อสารอย่างโปร่งใส', desc: 'สื่อสารขอบเขตงาน งบประมาณ ความคืบหน้า และผลการดำเนินงานอย่างชัดเจน' },
  ];
  const esc = (s) => s.replace(/&/g, '&amp;');
  const no = (i) => String(i + 1).padStart(2, '0');

  const renderers = {
    glass: () => points.map((p, i) => `
      <article class="g-card a-up">
        <div class="g-top"><span class="g-ic">${icon(p.icon)}</span><span class="g-no">${no(i)}</span></div>
        <h3>${esc(p.en)}</h3>
        <p class="g-th">${p.th}</p>
        <p class="g-desc">${p.desc}</p>
      </article>`).join(''),

    rail: () => points.map((p, i) => `
      <article class="r-item a-up">
        <span class="r-line" aria-hidden="true"></span>
        <span class="r-no">${no(i)}</span>
        <span class="r-ic">${icon(p.icon, 22)}</span>
        <h3>${esc(p.en)}</h3>
        <p class="r-th">${p.th}</p>
        <p class="r-desc">${p.desc}</p>
      </article>`).join(''),

    pills: () => points.map((p) => `
      <article class="p-item a-up">
        <span class="p-ic">${icon(p.icon, 24)}</span>
        <div><h3>${esc(p.en)}</h3><p>${p.desc}</p></div>
      </article>`).join(''),

    panels: () => points.map((p, i) => `
      <article class="pn a-up${i === 0 ? ' is-active' : ''}" tabindex="0">
        <span class="pn-no">${no(i)}</span>
        <div class="pn-body">
          <span class="pn-ic">${icon(p.icon, 28)}</span>
          <h3>${esc(p.en)}</h3>
          <p class="pn-th">${p.th}</p>
          <p class="pn-desc">${p.desc}</p>
        </div>
      </article>`).join(''),

    checks: () => points.map((p) => `
      <li class="ck a-up">
        <svg class="ck-mark" viewBox="0 0 40 40" aria-hidden="true"><circle cx="20" cy="20" r="18" pathLength="1"/><path d="m12 20.5 5.5 5.5L28 15" pathLength="1"/></svg>
        <div><h3>${esc(p.en)} <small>${p.th}</small></h3><p>${p.desc}</p></div>
      </li>`).join(''),
  };

  document.querySelectorAll('[data-render]').forEach((el) => { el.innerHTML = renderers[el.dataset.render](); });
  document.querySelectorAll('[data-arrow]').forEach((el) => { el.innerHTML = arrow; });

  // Entrance animation on scroll + replay
  const io = new IntersectionObserver((entries) => entries.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add('play'); io.unobserve(e.target); }
  }), { threshold: 0.25 });
  document.querySelectorAll('[data-wy]').forEach((s) => io.observe(s));
  document.querySelectorAll('[data-replay]').forEach((btn) => btn.addEventListener('click', () => {
    const sec = btn.closest('[data-wy]');
    sec.classList.remove('play');
    void sec.offsetWidth;
    sec.classList.add('play');
  }));

  // 4 — expanding panels: hover, focus or click makes a panel the active one
  const panels = document.querySelectorAll('.wy4 .pn');
  const activate = (pn) => panels.forEach((p) => p.classList.toggle('is-active', p === pn));
  panels.forEach((pn) => ['mouseenter', 'focus', 'click'].forEach((ev) => pn.addEventListener(ev, () => activate(pn))));
})();
