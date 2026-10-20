(function () {
  const ICONS = {
    mega: ['m3 11 18-5v12L3 14v-3z', 'M11.6 16.8a3 3 0 1 1-5.8-1.6'],
    pen: ['M12 20h9', 'M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z'],
    globe: ['c:12:12:10', 'M2 12h20', 'M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z'],
    chart: ['M3 3v18h18', 'M18 17V9', 'M13 17V5', 'M8 17v-3'],
  };
  const icon = (name, size = 26) => `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${ICONS[name].map((d) => {
    if (d.startsWith('c:')) { const [, cx, cy, r] = d.split(':'); return `<circle cx="${cx}" cy="${cy}" r="${r}"></circle>`; }
    return `<path d="${d}"></path>`;
  }).join('')}</svg>`;

  // Content from the brief (Section 04) + the descriptions already on the site
  const services = [
    { icon: 'mega', title: 'Performance Marketing', sum: 'วางแผนและจัดการโฆษณาแบบมีเป้าหมาย', desc: 'เพิ่มการมองเห็น ดึงดูดลูกค้า และสร้างยอดขายที่วัดผลได้',
      tags: ['Google Ads', 'Meta Ads', 'Instagram Ads', 'TikTok Ads'],
      list: ['Google Ads', 'Meta Ads และ Instagram Ads', 'TikTok Ads', 'วิเคราะห์กลุ่มเป้าหมาย งบประมาณ และประสิทธิภาพแคมเปญ', 'ติดตาม Conversion และปรับปรุงตามข้อมูล'],
      cta: 'ปรึกษาด้านโฆษณา' },
    { icon: 'pen', title: 'Creative Production', sum: 'สร้างสรรค์เนื้อหาที่สื่อสารตรงกลุ่มเป้าหมาย', desc: 'สื่อสารแบรนด์อย่างมีพลัง ด้วยคอนเทนต์ที่น่าจดจำ',
      tags: ['ภาพโฆษณา', 'กราฟิก', 'คอนเทนต์', 'วิดีโอ'],
      list: ['ออกแบบกราฟิก', 'วางแผนและผลิตคอนเทนต์', 'ผลิตวิดีโอสำหรับสื่อออนไลน์', 'พัฒนาชิ้นงานให้สอดคล้องกับแคมเปญและแบรนด์'],
      cta: 'ปรึกษาด้านครีเอทีฟ' },
    { icon: 'globe', title: 'Website & Conversion', sum: 'พัฒนาเว็บไซต์ที่รองรับการทำการตลาดและการติดต่อ', desc: 'ออกแบบเว็บไซต์ที่สวยงาม ใช้งานง่าย และตอบโจทย์ธุรกิจ',
      tags: ['เว็บไซต์', 'Landing Page', 'Conversion'],
      list: ['Website Development', 'Landing Page Design', 'Conversion Optimization', 'ปรับประสบการณ์ใช้งานบนมือถือ', 'วางระบบวัดผลพฤติกรรมและ Conversion'],
      cta: 'ปรึกษาด้านเว็บไซต์' },
    { icon: 'chart', title: 'Strategy & Analytics', sum: 'เชื่อมโยงการตลาดเข้ากับเป้าหมายทางธุรกิจ', desc: 'ใช้ข้อมูลจริงในการตัดสินใจ เพื่อผลลัพธ์ที่ดียิ่งขึ้น',
      tags: ['วิเคราะห์ตลาด', 'วางกลยุทธ์', 'ติดตามผล'],
      list: ['วิเคราะห์ตลาดและคู่แข่ง', 'วางกลยุทธ์และแผนการตลาด', 'กำหนดตัวชี้วัดตามวัตถุประสงค์', 'จัดทำรายงานและข้อเสนอแนะเพื่อปรับปรุง'],
      cta: 'ปรึกษาด้านกลยุทธ์' },
  ];

  const esc = (s) => s.replace(/&/g, '&amp;');
  const no = (i) => String(i + 1).padStart(2, '0');
  const list = (s) => `<ul class="ticks">${s.list.map((l) => `<li>${esc(l)}</li>`).join('')}</ul>`;
  const tags = (s) => `<ul class="tags">${s.tags.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>`;
  const arrow = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>';

  const renderers = {
    // 1 — card turns navy on hover and reveals bullets + CTA
    cards: () => services.map((s, i) => `
      <article class="c1 a-up" tabindex="0">
        <div class="c1-top"><span class="c1-ic">${icon(s.icon)}</span><span class="c1-no">${no(i)}</span></div>
        <h3>${esc(s.title)}</h3>
        <p class="c1-desc">${esc(s.desc)}</p>
        <div class="c1-foot" aria-hidden="true">${tags(s)}<span class="c1-hint">ดูรายละเอียด<i>+</i></span></div>
        <div class="c1-more"><div>${list(s)}<a href="#contact" class="c1-cta">${esc(s.cta)} <span>${arrow}</span></a></div></div>
      </article>`).join(''),

    // 2 — vertical tabs with auto-advance progress bar
    tabs: () => `
      <div class="tablist" role="tablist" aria-orientation="vertical" aria-label="บริการ">
        ${services.map((s, i) => `
          <button class="tab${i === 0 ? ' is-active' : ''}" role="tab" id="s2-tab-${i}" aria-controls="s2-panel-${i}" aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}">
            <span class="tab-no">${no(i)}</span>
            <span class="tab-text"><b>${esc(s.title)}</b><small>${esc(s.sum)}</small></span>
            <i class="tab-bar" aria-hidden="true"></i>
          </button>`).join('')}
      </div>
      <div class="panels">
        ${services.map((s, i) => `
          <div class="panel${i === 0 ? ' is-active' : ''}" role="tabpanel" id="s2-panel-${i}" aria-labelledby="s2-tab-${i}"${i === 0 ? '' : ' hidden'}>
            <div class="panel-top"><span class="panel-ic">${icon(s.icon, 30)}</span><span class="panel-no">${no(i)} / 04</span></div>
            <h3>${esc(s.title)}</h3>
            <p class="panel-desc">${esc(s.sum)} — ${esc(s.desc)}</p>
            ${list(s)}
            ${tags(s)}
            <a href="#contact" class="btn-gold">${esc(s.cta)} <span class="btn-arrow">${arrow}</span></a>
          </div>`).join('')}
      </div>`,

    // 3 — first service as the large spotlight tile
    bento: () => services.map((s, i) => i === 0 ? `
      <article class="b-card b-feature a-up">
        <span class="b-badge">Google · Meta · TikTok Ads</span>
        <span class="b-ic">${icon(s.icon, 30)}</span>
        <h3>${esc(s.title)}</h3>
        <p class="b-desc">${esc(s.sum)} ${esc(s.desc)}</p>
        ${list(s)}
        <a href="#contact" class="btn-gold">${esc(s.cta)} <span class="btn-arrow">${arrow}</span></a>
      </article>` : `
      <article class="b-card a-up">
        <div class="b-head"><span class="b-ic">${icon(s.icon)}</span><span class="b-no">${no(i)}</span></div>
        <h3>${esc(s.title)}</h3>
        <p class="b-desc">${esc(s.desc)}</p>
        ${tags(s)}
        <a href="#contact" class="b-link">${esc(s.cta)} <span>${arrow}</span></a>
      </article>`).join(''),

    // 4 — expandable rows
    accordion: () => services.map((s, i) => `
      <div class="acc-item a-up${i === 0 ? ' is-open' : ''}">
        <button class="acc-head" type="button" id="s4-head-${i}" aria-expanded="${i === 0}" aria-controls="s4-body-${i}">
          <span class="acc-no">${no(i)}</span>
          <span class="acc-title">${esc(s.title)}<small>${esc(s.sum)}</small></span>
          <span class="acc-ic">${icon(s.icon, 22)}</span>
          <span class="acc-plus" aria-hidden="true"></span>
        </button>
        <div class="acc-body" id="s4-body-${i}" role="region" aria-labelledby="s4-head-${i}">
          <div class="acc-inner">
            <p class="acc-desc">${esc(s.desc)}</p>
            ${list(s)}
            <div class="acc-foot">${tags(s)}<a href="#contact" class="acc-cta">${esc(s.cta)} <span>${arrow}</span></a></div>
          </div>
        </div>
      </div>`).join(''),

    // 5 — four cards around the central hub
    hub: () => services.map((s, i) => `
      <article class="h-card h-card-${i + 1} a-up">
        <div class="h-head"><span class="h-ic">${icon(s.icon)}</span><span class="h-no">${no(i)}</span></div>
        <h3>${esc(s.title)}</h3>
        <p>${esc(s.sum)}</p>
        ${tags(s)}
        <a href="#contact" class="h-link">${esc(s.cta)} <span>${arrow}</span></a>
      </article>`).join(''),
  };

  document.querySelectorAll('[data-render]').forEach((el) => { el.innerHTML = renderers[el.dataset.render](); });

  // Entrance animation when each section scrolls into view
  const io = new IntersectionObserver((entries) => entries.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add('play'); io.unobserve(e.target); }
  }), { threshold: 0.25 });
  document.querySelectorAll('[data-sv]').forEach((s) => io.observe(s));

  document.querySelectorAll('[data-replay]').forEach((btn) => btn.addEventListener('click', () => {
    const sec = btn.closest('[data-sv]');
    sec.classList.remove('play');
    void sec.offsetWidth;
    sec.classList.add('play');
  }));

  // 2 — tabs: click / arrow keys, auto-advance when the progress bar finishes
  const tabWrap = document.querySelector('.sv2 .tabs-wrap');
  if (tabWrap) {
    const tabs = [...tabWrap.querySelectorAll('[role="tab"]')];
    const panels = [...tabWrap.querySelectorAll('[role="tabpanel"]')];
    const activate = (idx, focus) => {
      tabs.forEach((t, i) => {
        const on = i === idx;
        t.classList.toggle('is-active', on);
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
        const step = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key];
        if (step) { e.preventDefault(); activate((i + step + tabs.length) % tabs.length, true); }
      });
      // The bar animation pauses on hover/focus, so this only fires while idle
      t.querySelector('.tab-bar').addEventListener('animationend', () => activate((i + 1) % tabs.length));
    });
  }

  // Background toggle: bg-service photo vs. the original plain backgrounds
  const bgButtons = document.querySelectorAll('[data-bg]');
  bgButtons.forEach((b) => b.addEventListener('click', () => {
    document.body.classList.toggle('bg-photo', b.dataset.bg === 'photo');
    bgButtons.forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
  }));

  // 3 — pointer-following spotlight on bento cards
  document.querySelectorAll('.sv3 .b-card').forEach((card) => card.addEventListener('pointermove', (e) => {
    const r = card.getBoundingClientRect();
    card.style.setProperty('--mx', `${e.clientX - r.left}px`);
    card.style.setProperty('--my', `${e.clientY - r.top}px`);
  }));

  // 4 — accordion: one row open at a time
  document.querySelectorAll('.sv4 .acc-head').forEach((head) => head.addEventListener('click', () => {
    const item = head.parentElement;
    const willOpen = !item.classList.contains('is-open');
    item.parentElement.querySelectorAll('.acc-item').forEach((it) => {
      it.classList.remove('is-open');
      it.querySelector('.acc-head').setAttribute('aria-expanded', 'false');
    });
    if (willOpen) {
      item.classList.add('is-open');
      head.setAttribute('aria-expanded', 'true');
    }
  }));
})();
