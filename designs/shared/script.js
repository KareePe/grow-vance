(function () {
  window.dataLayer = window.dataLayer || [];
  const track = (event, detail) => window.dataLayer.push(Object.assign({ event }, detail));

  // Sticky header: compact once the page scrolls
  const header = document.querySelector('[data-header]');
  if (header) {
    const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // Mobile hamburger menu
  const toggle = document.querySelector('[data-menu-toggle]');
  if (toggle) {
    toggle.addEventListener('click', () => {
      const open = document.body.classList.toggle('menu-open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    document.querySelectorAll('[data-menu] a').forEach((a) => a.addEventListener('click', () => {
      document.body.classList.remove('menu-open');
      toggle.setAttribute('aria-expanded', 'false');
    }));
  }

  // FAQ: keep only one <details> open per group
  document.querySelectorAll('[data-faq]').forEach((group) => {
    const items = group.querySelectorAll('details');
    items.forEach((d) => d.addEventListener('toggle', () => {
      if (d.open) items.forEach((o) => { if (o !== d) o.open = false; });
    }));
  });

  // Service CTAs preselect the matching option in the lead form
  document.querySelectorAll('[data-service]').forEach((a) => a.addEventListener('click', () => {
    const select = document.querySelector('[data-lead-form] select[name="service"]');
    if (select) select.value = a.dataset.service;
  }));

  // Click tracking (phone_click, line_click, ...)
  document.querySelectorAll('[data-track]').forEach((el) => el.addEventListener('click', () => track(el.dataset.track)));

  // Lead form: validation, honeypot, thank-you state
  document.querySelectorAll('[data-lead-form]').forEach((form) => {
    const rules = {
      name: (v) => v.trim().length >= 2 || 'กรุณากรอกชื่อ',
      phone: (v) => /^0\d{8,9}$/.test(v.replace(/[\s-]/g, '')) || 'กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง เช่น 0812345678',
      service: (v) => v !== '' || 'กรุณาเลือกบริการที่สนใจ',
      consent: (_, el) => el.checked || 'กรุณายอมรับนโยบายความเป็นส่วนตัว',
    };

    const showError = (name, msg) => {
      const field = form.elements[name];
      const slot = form.querySelector(`[data-error-for="${name}"]`);
      if (field) field.setAttribute('aria-invalid', msg ? 'true' : 'false');
      if (slot) slot.textContent = msg || '';
    };

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (form.elements.website && form.elements.website.value) return; // bot

      let firstInvalid = null;
      Object.keys(rules).forEach((name) => {
        const el = form.elements[name];
        if (!el) return;
        const result = rules[name](el.value, el);
        showError(name, result === true ? '' : result);
        if (result !== true && !firstInvalid) firstInvalid = el;
      });
      if (firstInvalid) { firstInvalid.focus(); return; }

      // TODO: send to CRM / email endpoint before showing success
      track('form_submit_success', { service: form.elements.service && form.elements.service.value });
      form.hidden = true;
      const success = form.parentElement.querySelector('[data-form-success]');
      if (success) { success.hidden = false; success.focus(); }
    });

    form.addEventListener('input', (e) => {
      if (e.target.name in rules && e.target.getAttribute('aria-invalid') === 'true') showError(e.target.name, '');
    });
  });

  document.querySelectorAll('[data-year]').forEach((el) => { el.textContent = new Date().getFullYear(); });
})();
