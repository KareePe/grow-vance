(function () {
  const LOGO_DIR = '../../assets/img/clients/';
  const logos = [
    { file: 'nexora.svg', name: 'NEXORA' },
    { file: 'kana.svg', name: 'KANA' },
    { file: 'bluepeak.svg', name: 'BluePeak' },
    { file: 'lumiere.svg', name: 'LUMIÈRE' },
    { file: 'thai-wellness.svg', name: 'THAI WELLNESS', tall: true },
    { file: 'aurora.svg', name: 'AURORA' },
  ];

  // The first quote is the one already on the site. The others are clearly-labelled slots
  // waiting for real client quotes (the brief forbids invented testimonials).
  const quotes = [
    { text: 'ทีมงาน GROWVANCE ดูแลใกล้ชิดมากครับ ให้คำแนะนำที่เข้าใจธุรกิจของเรา และรายงานผลอย่างโปร่งใส ทำให้เรามั่นใจในทุกแคมเปญ', name: 'คุณกิตติพงศ์ วงศ์ชวลิต', role: 'เจ้าของธุรกิจ E-Commerce', initial: 'ก' },
    { sample: true, text: 'พื้นที่สำหรับคำรับรองจริงจากลูกค้า — เล่าว่าทำงานร่วมกันอย่างไร และเห็นการเปลี่ยนแปลงอะไรบ้าง', name: 'ชื่อลูกค้า', role: 'ตำแหน่ง · ประเภทธุรกิจ', initial: '?' },
    { sample: true, text: 'พื้นที่สำหรับคำรับรองจริงจากลูกค้า — ควรได้รับอนุญาตให้เผยแพร่ชื่อ ตำแหน่ง และรูปภาพก่อนใช้งาน', name: 'ชื่อลูกค้า', role: 'ตำแหน่ง · ประเภทธุรกิจ', initial: '?' },
  ];

  const headText = `
    <p class="eyebrow">เสียงจากลูกค้าของเรา</p>
    <h2>ความไว้วางใจที่เราภูมิใจ</h2>
    <p class="lead">จากธุรกิจที่เลือกให้เราดูแลการตลาด</p>`;
  const quoteMark = '<svg class="qmark" viewBox="0 0 48 36" aria-hidden="true"><path d="M0 36V22C0 9.7 6.6 2.3 19.8 0l2 5.4C14.6 7.3 11 11.5 11 18h9v18H0zm26 0V22C26 9.7 32.6 2.3 45.8 0l2 5.4C40.6 7.3 37 11.5 37 18h9v18H26z"/></svg>';
  const stars = '<span class="stars" aria-label="5 ดาว">★★★★★</span>';
  const logoImg = (l, cls = '') => `<img class="${cls}${l.tall ? ' is-tall' : ''}" src="${LOGO_DIR}${l.file}" alt="${l.name}" loading="lazy">`;

  const quoteInner = (q) => `
    ${q.sample ? '<span class="sample">ตัวอย่าง — รอข้อความจริง</span>' : ''}
    ${quoteMark}
    ${q.sample ? '' : stars}
    <blockquote>${q.text}</blockquote>
    <figcaption><span class="avatar">${q.initial}</span><span><b>${q.name}</b><small>${q.role}</small></span></figcaption>`;

  document.querySelectorAll('[data-head]').forEach((el) => { el.innerHTML = headText; });
  document.querySelectorAll('[data-head-text]').forEach((el) => { el.innerHTML = headText; });
  document.querySelectorAll('[data-quote]').forEach((el) => {
    const q = quotes[Number(el.dataset.quote)];
    el.innerHTML = quoteInner(q);
    if (q.sample) el.classList.add('is-sample');
  });

  const logoRenderers = {
    // Two copies so the track can loop seamlessly
    marquee: () => [...logos, ...logos].map((l, i) => `<span class="m-logo"${i >= logos.length ? ' aria-hidden="true"' : ''}>${logoImg(l)}</span>`).join(''),
    row: () => logos.map((l) => `<span class="r-logo">${logoImg(l)}</span>`).join(''),
    grid: () => logos.map((l) => `<div class="g-logo a-up">${logoImg(l)}</div>`).join(''),
    spot: () => logos.map((l) => `<div class="sp-logo">${logoImg(l)}</div>`).join(''),
    bar: () => logos.map((l) => `<span class="b-logo">${logoImg(l)}</span>`).join(''),
  };
  document.querySelectorAll('[data-logos]').forEach((el) => { el.innerHTML = logoRenderers[el.dataset.logos](); });

  const renderers = {
    carousel: () => quotes.map((q, i) => `
      <figure class="car-card${q.sample ? ' is-sample' : ''}" aria-roledescription="slide" aria-label="${i + 1} จาก ${quotes.length}">${quoteInner(q)}</figure>`).join(''),
    wall: () => quotes.map((q, i) => `
      <figure class="w-card a-up${i === 0 ? ' w-feature' : ''}${q.sample ? ' is-sample' : ''}">${quoteInner(q)}</figure>`).join(''),
  };
  document.querySelectorAll('[data-render]').forEach((el) => { el.innerHTML = renderers[el.dataset.render](); });

  // Entrance on scroll + replay
  const play = (sec) => { sec.classList.remove('play'); void sec.offsetWidth; sec.classList.add('play'); };
  const io = new IntersectionObserver((entries) => entries.forEach((e) => {
    if (e.isIntersecting) { play(e.target); io.unobserve(e.target); }
  }), { threshold: 0.25 });
  document.querySelectorAll('[data-ts]').forEach((s) => io.observe(s));
  document.querySelectorAll('[data-replay]').forEach((b) => b.addEventListener('click', () => play(b.closest('[data-ts]'))));

  // 2 — carousel: arrows, dots, auto-advance (pauses on hover/focus)
  const car = document.querySelector('.car');
  if (car) {
    const track = car.querySelector('.car-track');
    const cards = [...track.children];
    const dots = document.querySelector('[data-car-dots]');
    dots.innerHTML = cards.map((_, i) => `<button type="button" aria-label="รีวิวที่ ${i + 1}"></button>`).join('');
    const dotBtns = [...dots.children];
    let idx = 0;
    const perView = () => (window.innerWidth <= 700 ? 1 : window.innerWidth <= 1100 ? 2 : 2);
    const maxIdx = () => Math.max(0, cards.length - perView());
    const go = (i) => {
      idx = (i + maxIdx() + 1) % (maxIdx() + 1);
      const step = cards[0].offsetWidth + parseFloat(getComputedStyle(track).columnGap || 0);
      track.style.transform = `translateX(${-idx * step}px)`;
      dotBtns.forEach((d, j) => { d.classList.toggle('is-active', j === idx); d.hidden = j > maxIdx(); });
    };
    document.querySelector('[data-car-prev]').addEventListener('click', () => go(idx - 1));
    document.querySelector('[data-car-next]').addEventListener('click', () => go(idx + 1));
    dotBtns.forEach((d, i) => d.addEventListener('click', () => go(i)));
    let timer = setInterval(() => go(idx + 1), 6000);
    const pause = () => clearInterval(timer);
    const resume = () => { clearInterval(timer); timer = setInterval(() => go(idx + 1), 6000); };
    car.addEventListener('mouseenter', pause); car.addEventListener('mouseleave', resume);
    car.addEventListener('focusin', pause); car.addEventListener('focusout', resume);
    window.addEventListener('resize', () => go(idx));
    go(0);
  }
})();
