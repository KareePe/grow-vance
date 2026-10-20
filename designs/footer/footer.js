(function () {
  const ICONS = {
    phone: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z"/></svg>',
    line: '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3C6.5 3 2 6.6 2 11c0 3.9 3.5 7.2 8.3 7.9.3.1.8.2.9.5.1.3.1.7 0 1l-.1.8c0 .3-.2 1 .9.5s5.9-3.5 8.1-6C21.4 14.1 22 12.6 22 11c0-4.4-4.5-8-10-8z"/></svg>',
    facebook: '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M14 8h3V4h-3c-2.8 0-4 1.7-4 4.3V10H7v4h3v8h4v-8h3l1-4h-4V8.6c0-.4.3-.6.6-.6z"/></svg>',
    clock: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
    up: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>',
  };
  const year = new Date().getFullYear();

  const links = {
    services: [['#services', 'Performance Marketing'], ['#services', 'Creative Production'], ['#services', 'Website & Conversion'], ['#services', 'Strategy & Analytics']],
    menu: [['#', 'หน้าแรก'], ['#services', 'บริการของเรา'], ['#work', 'ผลงานของเรา'], ['#why', 'เกี่ยวกับเรา'], ['#process', 'วิธีการทำงาน'], ['#contact', 'ติดต่อเรา']],
  };
  // TODO: replace "#" with the real Facebook page URL
  const contacts = [
    { icon: 'phone', label: 'โทรศัพท์', value: '099-696-3642', href: 'tel:0996963642' },
    { icon: 'line', label: 'LINE Official', value: '@growvance', href: 'https://line.me/R/ti/p/@growvance' },
    { icon: 'facebook', label: 'Facebook', value: 'GROWVANCE', href: '#' },
    { icon: 'clock', label: 'เวลาทำการ', value: 'จันทร์–เสาร์ 09.00–18.00 น.' },
  ];
  const esc = (s) => s.replace(/&/g, '&amp;');

  const brand = `<img src="../../assets/img/logo-mark.png" alt="" width="30" height="30"><span>GROW<b>VANCE</b></span>`;
  document.querySelectorAll('[data-brand]').forEach((el) => { el.innerHTML = `<span class="brand-tile">${brand.split('<span>')[0]}</span><span class="brand-word">GROW<b>VANCE</b></span>`; el.setAttribute('aria-label', 'GROWVANCE หน้าแรก'); });

  document.querySelectorAll('[data-links]').forEach((el) => {
    el.innerHTML = links[el.dataset.links].map(([h, t]) => `<li><a href="${h}">${esc(t)}</a></li>`).join('');
  });
  document.querySelectorAll('[data-contacts]').forEach((el) => {
    el.className = 'f-contacts';
    el.innerHTML = contacts.map((c) => `<li>${c.href ? `<a href="${c.href}">` : '<span>'}<i>${ICONS[c.icon]}</i>${c.value}${c.href ? '</a>' : '</span>'}</li>`).join('');
  });
  document.querySelectorAll('[data-socials]').forEach((el) => {
    el.innerHTML = contacts.filter((c) => c.href && c.icon !== 'phone').concat(contacts[0])
      .map((c) => `<a href="${c.href}" class="social social-${c.icon}" aria-label="${c.label}">${ICONS[c.icon]}</a>`).join('');
  });
  document.querySelectorAll('[data-icon-before]').forEach((el) => { el.insertAdjacentHTML('afterbegin', ICONS[el.dataset.iconBefore]); });
  document.querySelectorAll('[data-cards]').forEach((el) => {
    el.innerHTML = contacts.map((c) => `
      <${c.href ? `a href="${c.href}"` : 'div'} class="f5-card f5-${c.icon}">
        <span class="f5-ic">${ICONS[c.icon]}</span>
        <span><small>${c.label}</small><b>${c.value}</b></span>
      </${c.href ? 'a' : 'div'}>`).join('');
  });

  // Bottom bar: copyright · Privacy · Terms · back-to-top
  document.querySelectorAll('[data-bottom]').forEach((el) => {
    el.innerHTML = `
      <span>© ${year} GROWVANCE. All rights reserved.</span>
      <nav class="legal" aria-label="ข้อมูลทางกฎหมาย"><a href="#">Privacy Policy</a><a href="#">Terms of Service</a></nav>
      <button type="button" class="to-top" aria-label="กลับขึ้นด้านบน">${ICONS.up}</button>`;
  });
  document.querySelectorAll('.to-top').forEach((b) => b.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' })));
})();
