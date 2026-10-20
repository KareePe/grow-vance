(function () {
  const ICONS = {
    search: ['c:11:11:7', 'm21 21-4.3-4.3'],
    map: ['M9 4 3 6v14l6-2 6 2 6-2V4l-6 2z', 'M9 4v14', 'M15 6v14'],
    rocket: ['M4.5 16.5c-1.5 1.3-2 5-2 5s3.7-.5 5-2c.7-.8.7-2.1-.1-2.9a2.2 2.2 0 0 0-2.9-.1z', 'm12 15-3-3a22 22 0 0 1 2-3.9A12.9 12.9 0 0 1 22 2c0 2.7-.8 7.5-6 11a22.4 22.4 0 0 1-4 2z', 'M9 12H4s.6-3 2-4c1.6-1.1 5 0 5 0', 'M12 15v5s3-.6 4-2c1.1-1.6 0-5 0-5'],
    chart: ['M3 3v18h18', 'M18 17V9', 'M13 17V5', 'M8 17v-3'],
    refresh: ['M21 12a9 9 0 1 1-3-6.7L21 8', 'M21 3v5h-5'],
  };
  const icon = (name, size = 26) => `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${ICONS[name].map((d) => {
    if (d.startsWith('c:')) { const [, cx, cy, r] = d.split(':'); return `<circle cx="${cx}" cy="${cy}" r="${r}"></circle>`; }
    return `<path d="${d}"></path>`;
  }).join('')}</svg>`;
  const arrow = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>';

  // Brief Section 06
  const steps = [
    { icon: 'search', en: 'Discover', th: 'ทำความเข้าใจธุรกิจ', desc: 'เก็บข้อมูลเป้าหมาย กลุ่มลูกค้า สถานการณ์ปัจจุบัน และข้อจำกัดของธุรกิจ' },
    { icon: 'map', en: 'Strategize', th: 'วางแผนการตลาด', desc: 'เลือกช่องทาง กลยุทธ์ งบประมาณ และตัวชี้วัดที่สอดคล้องกับเป้าหมาย' },
    { icon: 'rocket', en: 'Execute', th: 'ลงมือดำเนินงาน', desc: 'จัดการแคมเปญ ผลิตคอนเทนต์ หรือพัฒนาเว็บไซต์ตามขอบเขตที่ตกลง' },
    { icon: 'chart', en: 'Measure', th: 'ติดตามและวิเคราะห์', desc: 'ตรวจสอบข้อมูล Conversion และผลการดำเนินงานตามตัวชี้วัด' },
    { icon: 'refresh', en: 'Optimize', th: 'ปรับปรุงต่อเนื่อง', desc: 'สรุปสิ่งที่เรียนรู้และกำหนดแนวทางดำเนินงานรอบถัดไป' },
  ];
  const no = (i) => String(i + 1).padStart(2, '0');
  const headText = `
    <p class="eyebrow">Our Process</p>
    <h2>ขั้นตอนการทำงานที่ชัดเจน</h2>
    <p class="lead">โปร่งใส เป็นระบบ เน้นผลลัพธ์ — ทุกโปรเจกต์มีแผนงานชัดเจน ตั้งแต่เริ่มต้นจนถึงการวัดผล</p>`;

  const renderers = {
    timeline: () => steps.map((s, i) => `
      <li class="t1-step">
        <span class="t1-node">${icon(s.icon, 24)}</span>
        <small>${no(i)} · ${s.en}</small>
        <b>${s.th}</b>
        <p>${s.desc}</p>
      </li>`).join(''),

    vertical: () => steps.map((s, i) => `
      <li class="t2-step" data-step>
        <span class="t2-dot">${no(i)}</span>
        <div class="t2-card">
          <div class="t2-top"><span class="t2-ic">${icon(s.icon, 22)}</span><small>${s.en}</small></div>
          <b>${s.th}</b>
          <p>${s.desc}</p>
        </div>
      </li>`).join(''),

    loop: () => steps.map((s, i) => `
      <button type="button" class="node${i === 0 ? ' is-active' : ''}" role="tab" aria-selected="${i === 0}" data-node="${i}">
        <span class="node-ic">${icon(s.icon, 22)}</span>
        <span class="node-label">${s.en}</span>
      </button>`).join(''),

    stairs: () => steps.map((s, i) => `
      <li class="t4-step a-up">
        <div class="t4-card">
          <span class="t4-no">${no(i)}</span>
          <span class="t4-ic">${icon(s.icon, 24)}</span>
          <small>${s.en}</small>
          <b>${s.th}</b>
          <p>${s.desc}</p>
        </div>
      </li>`).join(''),

    stepper: () => steps.map((s, i) => `
      <button type="button" class="t5-tab${i === 0 ? ' is-active' : ''}" role="tab" aria-selected="${i === 0}" aria-controls="t5-panel-${i}" id="t5-tab-${i}" data-tab="${i}">
        <span class="t5-num">${i + 1}</span>
        <span class="t5-name">${s.en}</span>
        <i class="t5-bar" aria-hidden="true"></i>
      </button>`).join(''),

    stepperPanels: () => steps.map((s, i) => `
      <div class="t5-panel${i === 0 ? ' is-active' : ''}" role="tabpanel" id="t5-panel-${i}" aria-labelledby="t5-tab-${i}"${i === 0 ? '' : ' hidden'}>
        <span class="t5-big">${no(i)}</span>
        <div class="t5-body">
          <span class="t5-ic">${icon(s.icon, 30)}</span>
          <small>Step ${i + 1} of 5 · ${s.en}</small>
          <h3>${s.th}</h3>
          <p>${s.desc}</p>
          ${i === steps.length - 1
            ? `<a href="#" class="btn-gold">เริ่มต้นกับเรา — ปรึกษาแผนการตลาด <span class="btn-arrow">${arrow}</span></a>`
            : `<button type="button" class="t5-next" data-next="${i + 1}">ขั้นถัดไป: ${steps[i + 1].en} <span aria-hidden="true">→</span></button>`}
        </div>
      </div>`).join(''),
  };

  document.querySelectorAll('[data-render]').forEach((el) => el.insertAdjacentHTML('beforeend', renderers[el.dataset.render]()));
  document.querySelectorAll('[data-head]').forEach((el) => { el.innerHTML = headText; });
  document.querySelectorAll('[data-head-only]').forEach((el) => { el.innerHTML = headText; });
  document.querySelectorAll('[data-arrow]').forEach((el) => { el.innerHTML = arrow; });

  // Entrance on scroll + replay
  const play = (sec) => { sec.classList.remove('play'); void sec.offsetWidth; sec.classList.add('play'); };
  const io = new IntersectionObserver((entries) => entries.forEach((e) => {
    if (e.isIntersecting) { play(e.target); io.unobserve(e.target); }
  }), { threshold: 0.25 });
  document.querySelectorAll('[data-pr]').forEach((s) => io.observe(s));
  document.querySelectorAll('[data-replay]').forEach((b) => b.addEventListener('click', () => play(b.closest('[data-pr]'))));

  // 2 — rail fills and steps light up as the list scrolls through the viewport
  const t2 = document.querySelector('.t2');
  if (t2) {
    const rail = t2.querySelector('[data-rail]');
    const items = t2.querySelectorAll('[data-step]');
    const update = () => {
      const r = t2.getBoundingClientRect();
      const mid = window.innerHeight * 0.6;
      const p = Math.min(Math.max((mid - r.top) / r.height, 0), 1);
      rail.style.transform = `scaleY(${p})`;
      items.forEach((it) => it.classList.toggle('is-on', it.getBoundingClientRect().top < mid));
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
  }

  // 3 — loop nodes drive the detail panel
  const detail = document.querySelector('[data-detail]');
  const nodes = document.querySelectorAll('[data-node]');
  const showStep = (i) => {
    const s = steps[i];
    nodes.forEach((n, j) => { n.classList.toggle('is-active', j === i); n.setAttribute('aria-selected', String(j === i)); });
    detail.innerHTML = `
      <div class="t3-card">
        <span class="t3-no">${no(i)} / 05</span>
        <small>${s.en}</small>
        <h3>${s.th}</h3>
        <p>${s.desc}</p>
        <a href="#" class="btn-gold">ปรึกษาแผนการตลาด <span class="btn-arrow">${arrow}</span></a>
      </div>`;
  };
  if (detail) {
    showStep(0);
    nodes.forEach((n) => n.addEventListener('click', () => showStep(Number(n.dataset.node))));
  }

  // 5 — stepper: click, arrow keys, "next" button, auto-advance when the bar fills
  const t5 = document.querySelector('.t5');
  if (t5) {
    const tabs = [...t5.querySelectorAll('[data-tab]')];
    const panels = [...t5.querySelectorAll('.t5-panel')];
    const activate = (idx, focus) => {
      tabs.forEach((t, i) => {
        const on = i === idx;
        t.classList.toggle('is-active', on);
        t.classList.toggle('is-done', i < idx);
        t.setAttribute('aria-selected', String(on));
        t.tabIndex = on ? 0 : -1;
        panels[i].hidden = !on;
        panels[i].classList.toggle('is-active', on);
      });
      if (focus) tabs[idx].focus();
    };
    tabs.forEach((t, i) => {
      t.addEventListener('click', () => activate(i));
      t.addEventListener('keydown', (e) => {
        const step = { ArrowRight: 1, ArrowLeft: -1 }[e.key];
        if (step) { e.preventDefault(); activate((i + step + tabs.length) % tabs.length, true); }
      });
      t.querySelector('.t5-bar').addEventListener('animationend', () => activate((i + 1) % tabs.length));
    });
    t5.addEventListener('click', (e) => {
      const next = e.target.closest('[data-next]');
      if (next) activate(Number(next.dataset.next));
    });
  }
})();
