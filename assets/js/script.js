(function () {
  const ICONS = {
    mega: ['m3 11 18-5v12L3 14v-3z', 'M11.6 16.8a3 3 0 1 1-5.8-1.6'],
    pen: ['M12 20h9', 'M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z'],
    globe: ['c:12:12:10', 'M2 12h20', 'M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z'],
    chart: ['M3 3v18h18', 'M18 17V9', 'M13 17V5', 'M8 17v-3'],
    compass: ['c:12:12:10', 'm16.2 7.8-2.1 6.3-6.3 2.1 2.1-6.3z'],
    link: ['M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7', 'M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7'],
    msg: ['M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z', 'M8 10h.01M12 10h.01M16 10h.01'],
    search: ['c:11:11:7', 'm21 21-4.3-4.3'],
    map: ['M9 4 3 6v14l6-2 6 2 6-2V4l-6 2z', 'M9 4v14', 'M15 6v14'],
    rocket: ['M4.5 16.5c-1.5 1.3-2 5-2 5s3.7-.5 5-2c.7-.8.7-2.1-.1-2.9a2.2 2.2 0 0 0-2.9-.1z', 'm12 15-3-3a22 22 0 0 1 2-3.9A12.9 12.9 0 0 1 22 2c0 2.7-.8 7.5-6 11a22.4 22.4 0 0 1-4 2z', 'M9 12H4s.6-3 2-4c1.6-1.1 5 0 5 0', 'M12 15v5s3-.6 4-2c1.1-1.6 0-5 0-5'],
    refresh: ['M21 12a9 9 0 1 1-3-6.7L21 8', 'M21 3v5h-5'],
  };

  // Paths prefixed with "c:cx:cy:r" render as circles
  function icon(name, size = 26) {
    const shapes = ICONS[name].map((d) => {
      if (d.startsWith('c:')) {
        const [, cx, cy, r] = d.split(':');
        return `<circle cx="${cx}" cy="${cy}" r="${r}"></circle>`;
      }
      return `<path d="${d}"></path>`;
    }).join('');
    return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${shapes}</svg>`;
  }

  const unsplash = (id) => `https://images.unsplash.com/photo-${id}?w=1200&q=75&auto=format&fit=crop`;

  const data = {
    // Bullet lists and CTAs from the brief (Section 04)
    services: [
      { icon: icon('mega'), title: 'Performance Marketing', desc: 'เพิ่มการมองเห็น ดึงดูดลูกค้า และสร้างยอดขายที่วัดผลได้',
        tags: ['Google Ads', 'Meta Ads', 'Instagram Ads', 'TikTok Ads'],
        list: ['Google Ads', 'Meta Ads และ Instagram Ads', 'TikTok Ads', 'วิเคราะห์กลุ่มเป้าหมาย งบประมาณ และประสิทธิภาพแคมเปญ', 'ติดตาม Conversion และปรับปรุงตามข้อมูล'],
        cta: 'ปรึกษาด้านโฆษณา' },
      { icon: icon('pen'), title: 'Creative Production', desc: 'สื่อสารแบรนด์อย่างมีพลัง ด้วยคอนเทนต์ที่น่าจดจำ',
        tags: ['ภาพโฆษณา', 'กราฟิก', 'คอนเทนต์', 'วิดีโอ'],
        list: ['ออกแบบกราฟิก', 'วางแผนและผลิตคอนเทนต์', 'ผลิตวิดีโอสำหรับสื่อออนไลน์', 'พัฒนาชิ้นงานให้สอดคล้องกับแคมเปญและแบรนด์'],
        cta: 'ปรึกษาด้านครีเอทีฟ' },
      { icon: icon('globe'), title: 'Website &amp; Conversion', desc: 'ออกแบบเว็บไซต์ที่สวยงาม ใช้งานง่าย และตอบโจทย์ธุรกิจ',
        tags: ['เว็บไซต์', 'Landing Page', 'Conversion'],
        list: ['Website Development', 'Landing Page Design', 'Conversion Optimization', 'ปรับประสบการณ์ใช้งานบนมือถือ', 'วางระบบวัดผลพฤติกรรมและ Conversion'],
        cta: 'ปรึกษาด้านเว็บไซต์' },
      { icon: icon('chart'), title: 'Strategy &amp; Analytics', desc: 'ใช้ข้อมูลจริงในการตัดสินใจ เพื่อผลลัพธ์ที่ดียิ่งขึ้น',
        tags: ['วิเคราะห์ตลาด', 'วางกลยุทธ์', 'ติดตามผล'],
        list: ['วิเคราะห์ตลาดและคู่แข่ง', 'วางกลยุทธ์และแผนการตลาด', 'กำหนดตัวชี้วัดตามวัตถุประสงค์', 'จัดทำรายงานและข้อเสนอแนะเพื่อปรับปรุง'],
        cta: 'ปรึกษาด้านกลยุทธ์' },
    ],
    // Brief Section 05 — the four differentiators
    why: [
      { icon: icon('compass'), en: 'Strategy Before Execution', th: 'กลยุทธ์ก่อนลงมือทำ', desc: 'เริ่มจากการทำความเข้าใจธุรกิจ กลุ่มเป้าหมาย และเป้าหมายที่ต้องการ ก่อนเลือกช่องทางและวางแผนดำเนินงาน' },
      { icon: icon('link'), en: 'Connected Marketing', th: 'การตลาดที่เชื่อมโยงกัน', desc: 'เชื่อมโยงโฆษณา คอนเทนต์ เว็บไซต์ และข้อมูล เพื่อให้แต่ละส่วนสนับสนุนเป้าหมายเดียวกัน' },
      { icon: icon('chart'), en: 'Measurement &amp; Optimization', th: 'วัดผลและปรับปรุงต่อเนื่อง', desc: 'วัดผลตามตัวชี้วัดที่ตกลงร่วมกัน วิเคราะห์สิ่งที่เกิดขึ้น และนำข้อมูลมาใช้ปรับปรุงแผนงาน' },
      { icon: icon('msg'), en: 'Transparent Communication', th: 'สื่อสารอย่างโปร่งใส', desc: 'สื่อสารขอบเขตงาน งบประมาณ ความคืบหน้า และผลการดำเนินงานอย่างชัดเจน' },
    ],
    // Photos from Unsplash (free to use under the Unsplash License); unbranded so they don't imply a real client
    cases: [
      { img: unsplash('1741896135512-084b251887f7'), alt: 'ขวดเซรั่มบำรุงผิวบนพื้นสีชมพู', cat: 'E-Commerce', name: 'แบรนด์ความงาม', v1: '+320%', l1: 'ยอดขายเพิ่มขึ้น', v2: '-42%', l2: 'ต้นทุนต่อผลลัพธ์' },
      { img: unsplash('1414235077428-338989a2e8c0'), alt: 'จานอาหารบนโต๊ะในร้านอาหาร', cat: 'Restaurant &amp; F&amp;B', name: 'ร้านอาหาร', v1: '+215%', l1: 'ยอดการจอง', v2: '+68%', l2: 'ผู้ติดตามใหม่' },
      { img: unsplash('1486312338219-ce68d2c6f44d'), alt: 'มือกำลังพิมพ์บนแล็ปท็อป', cat: 'B2B Business', name: 'ธุรกิจเทคโนโลยี', v1: '+180%', l1: 'Lead เพิ่มขึ้น', v2: '-55%', l2: 'ต้นทุนต่อผลลัพธ์' },
    ],
    // Brief Section 06
    steps: [
      { icon: icon('search', 24), en: 'Discover', th: 'ทำความเข้าใจธุรกิจ', desc: 'เก็บข้อมูลเป้าหมาย กลุ่มลูกค้า สถานการณ์ปัจจุบัน และข้อจำกัดของธุรกิจ' },
      { icon: icon('map', 24), en: 'Strategize', th: 'วางแผนการตลาด', desc: 'เลือกช่องทาง กลยุทธ์ งบประมาณ และตัวชี้วัดที่สอดคล้องกับเป้าหมาย' },
      { icon: icon('rocket', 24), en: 'Execute', th: 'ลงมือดำเนินงาน', desc: 'จัดการแคมเปญ ผลิตคอนเทนต์ หรือพัฒนาเว็บไซต์ตามขอบเขตที่ตกลง' },
      { icon: icon('chart', 24), en: 'Measure', th: 'ติดตามและวิเคราะห์', desc: 'ตรวจสอบข้อมูล Conversion และผลการดำเนินงานตามตัวชี้วัด' },
      { icon: icon('refresh', 24), en: 'Optimize', th: 'ปรับปรุงต่อเนื่อง', desc: 'สรุปสิ่งที่เรียนรู้และกำหนดแนวทางดำเนินงานรอบถัดไป' },
    ],
    // SVG logos in assets/img/clients; `tall` marks the stacked mark that needs extra height
    clients: [
      { file: 'nexora.svg', name: 'NEXORA' },
      { file: 'kana.svg', name: 'KANA' },
      { file: 'bluepeak.svg', name: 'BluePeak' },
      { file: 'lumiere.svg', name: 'LUMIÈRE' },
      { file: 'thai-wellness.svg', name: 'THAI WELLNESS', tall: true },
      { file: 'aurora.svg', name: 'AURORA' },
    ],
  };

  const templates = {
    // Card turns navy on hover/focus and reveals the bullet list + CTA
    services: (s, i) => `
      <article class="svc-card a-up" tabindex="0">
        <div class="svc-top"><span class="svc-icon">${s.icon}</span><span class="svc-no">0${i + 1}</span></div>
        <h3>${s.title}</h3>
        <p class="svc-desc">${s.desc}</p>
        <div class="svc-foot" aria-hidden="true">
          <ul class="svc-tags">${s.tags.map((t) => `<li>${t}</li>`).join('')}</ul>
          <span class="svc-hint">ดูรายละเอียด<i>+</i></span>
        </div>
        <div class="svc-more">
          <ul class="svc-list">${s.list.map((l) => `<li>${l}</li>`).join('')}</ul>
          <a href="#contact" class="svc-cta">${s.cta} <span class="svc-cta-arrow"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"></path></svg></span></a>
        </div>
      </article>`,
    why: (w, i) => `
      <article class="why-card a-up">
        <div class="why-card-top"><span class="why-icon">${w.icon}</span><span class="why-no">0${i + 1}</span></div>
        <h3>${w.en}</h3>
        <p class="why-th">${w.th}</p>
        <p class="why-desc">${w.desc}</p>
      </article>`,
    // Bento: photo fills the card, name + stats sit on a navy gradient
    cases: (c, i) => `
      <article class="case-card case-${i + 1} a-up">
        <img src="${c.img}" alt="${c.alt}" loading="lazy" decoding="async">
        <span class="case-cat">${c.cat}</span>
        <div class="case-body">
          <h3 class="case-name">${c.name}</h3>
          <div class="case-stats">
            <div><span class="case-value" data-count>${c.v1}</span><span class="case-label">${c.l1}</span></div>
            <div><span class="case-value" data-count>${c.v2}</span><span class="case-label">${c.l2}</span></div>
          </div>
        </div>
      </article>`,
    steps: (p, i) => `
      <li class="t1-step">
        <span class="t1-node">${p.icon}</span>
        <small>0${i + 1} · ${p.en}</small>
        <b>${p.th}</b>
        <p>${p.desc}</p>
      </li>`,
    clients: (cl) => `<span class="client-logo"><img class="${cl.tall ? 'is-tall' : ''}" src="assets/img/clients/${cl.file}" alt="${cl.name}" loading="lazy"></span>`,
  };

  // Prepend each list into its [data-list="..."] container, so static items (e.g. the Work CTA tile) stay last
  document.querySelectorAll('[data-list]').forEach((el) => {
    const key = el.dataset.list;
    el.insertAdjacentHTML('afterbegin', data[key].map(templates[key]).join(''));
  });

  // Logo marquee: append a hidden copy of the logos so the track loops seamlessly
  document.querySelectorAll('.logo-marquee-track').forEach((track) => {
    const copy = data.clients.map(templates.clients).join('').replace(/<span class="client-logo">/g, '<span class="client-logo" aria-hidden="true">');
    track.insertAdjacentHTML('beforeend', copy);
  });

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
