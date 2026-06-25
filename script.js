/* =====================================================================
   CẦM ĐỒ TORO — script.js  (vanilla, module hoá theo từng tính năng)
   ===================================================================== */
(function () {
  'use strict';

  var doc = document;
  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ----------------------------------------------------------------
     1. MENU MOBILE  (hamburger morph + overlay + khoá cuộn)
     ---------------------------------------------------------------- */
  (function mobileMenu() {
    var toggle = doc.getElementById('nav-toggle');
    var menu = doc.getElementById('mobile-menu');
    if (!toggle || !menu) return;

    function setOpen(open) {
      doc.body.classList.toggle('menu-open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? 'Đóng menu' : 'Mở menu');
      menu.setAttribute('aria-hidden', open ? 'false' : 'true');
      doc.body.style.overflow = open ? 'hidden' : '';
    }

    toggle.addEventListener('click', function () {
      setOpen(!doc.body.classList.contains('menu-open'));
    });

    // Đóng menu khi bấm vào một liên kết
    menu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () { setOpen(false); });
    });

    // Đóng bằng phím Esc
    doc.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && doc.body.classList.contains('menu-open')) setOpen(false);
    });
  })();

  /* ----------------------------------------------------------------
     2. HEADER STICKY  (đổi nền khi cuộn)
     ---------------------------------------------------------------- */
  (function stickyHeader() {
    var header = doc.querySelector('.site-header');
    if (!header) return;
    var ticking = false;

    function update() {
      header.classList.toggle('is-scrolled', window.scrollY > 12);
      ticking = false;
    }
    window.addEventListener('scroll', function () {
      if (!ticking) { window.requestAnimationFrame(update); ticking = true; }
    }, { passive: true });
    update();
  })();

  /* ----------------------------------------------------------------
     3. REVEAL ON SCROLL  (IntersectionObserver, không dùng scroll listener)
     ---------------------------------------------------------------- */
  (function revealOnScroll() {
    var items = doc.querySelectorAll('.reveal');
    if (!items.length) return;

    if (prefersReduced || !('IntersectionObserver' in window)) {
      items.forEach(function (el) { el.classList.add('is-in'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { entry.target.classList.add('is-in'); io.unobserve(entry.target); }
      });
    }, { threshold: 0.16, rootMargin: '0px 0px -8% 0px' });

    items.forEach(function (el) { io.observe(el); });
  })();

  /* ----------------------------------------------------------------
     4. NAV ACTIVE  (đánh dấu mục đang xem)
     ---------------------------------------------------------------- */
  (function activeNav() {
    var links = Array.prototype.slice.call(doc.querySelectorAll('.nav__link'));
    if (!links.length || !('IntersectionObserver' in window)) return;

    var map = {};
    links.forEach(function (link) {
      var id = link.getAttribute('href').replace('#', '');
      var section = doc.getElementById(id);
      if (section) map[id] = link;
    });

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          links.forEach(function (l) { l.classList.remove('is-active'); });
          if (map[entry.target.id]) map[entry.target.id].classList.add('is-active');
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });

    Object.keys(map).forEach(function (id) { io.observe(doc.getElementById(id)); });
  })();

  /* ----------------------------------------------------------------
     5. FAQ ACCORDION  (mở 1 mục, đóng các mục khác)
     ---------------------------------------------------------------- */
  (function faqAccordion() {
    var list = doc.getElementById('faq-list');
    if (!list) return;

    list.querySelectorAll('.faq__q').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var item = btn.closest('.faq__item');
        var isOpen = item.classList.contains('is-open');

        list.querySelectorAll('.faq__item').forEach(function (it) {
          it.classList.remove('is-open');
          it.querySelector('.faq__q').setAttribute('aria-expanded', 'false');
        });

        if (!isOpen) {
          item.classList.add('is-open');
          btn.setAttribute('aria-expanded', 'true');
        }
      });
    });
  })();

  /* ----------------------------------------------------------------
     6. FORM TƯ VẤN  (validate phía client + mô phỏng gửi)
     ---------------------------------------------------------------- */
  (function consultForm() {
    var form = doc.getElementById('consult-form');
    if (!form) return;

    var nameEl = doc.getElementById('f-name');
    var phoneEl = doc.getElementById('f-phone');
    var success = doc.getElementById('form-success');

    function setError(input, msg) {
      var field = input.closest('.field');
      var err = field.querySelector('.field__err');
      field.classList.toggle('has-error', !!msg);
      if (err) err.textContent = msg || '';
      return !msg;
    }

    function validPhone(v) {
      var digits = v.replace(/[^\d+]/g, '');
      // Di động VN: 0xxxxxxxxx (10 số) hoặc +84xxxxxxxxx
      return /^0\d{9}$/.test(digits) || /^\+84\d{9}$/.test(digits);
    }

    // Xoá lỗi khi người dùng gõ lại
    [nameEl, phoneEl].forEach(function (el) {
      el.addEventListener('input', function () { setError(el, ''); });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var ok = true;

      if (!nameEl.value.trim()) ok = setError(nameEl, 'Vui lòng nhập họ tên.') && ok;
      else setError(nameEl, '');

      if (!phoneEl.value.trim()) ok = setError(phoneEl, 'Vui lòng nhập số điện thoại.') && ok;
      else if (!validPhone(phoneEl.value)) ok = setError(phoneEl, 'Số điện thoại chưa hợp lệ (VD: 0828796266).') && ok;
      else setError(phoneEl, '');

      if (!ok) {
        var firstErr = form.querySelector('.has-error input');
        if (firstErr) firstErr.focus();
        return;
      }

      /* ============================================================
         TÍCH HỢP THẬT TẠI ĐÂY:
         Gửi dữ liệu form tới API / email / Google Sheet / Telegram...
         Ví dụ:
           fetch('https://api-cua-ban/lead', {
             method: 'POST',
             headers: { 'Content-Type': 'application/json' },
             body: JSON.stringify(Object.fromEntries(new FormData(form)))
           });
         Hiện tại chỉ MÔ PHỎNG gửi thành công phía client.
         ============================================================ */

      if (success) {
        success.hidden = false;
        success.scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth', block: 'center' });
      }
      form.querySelector('button[type="submit"]').disabled = true;

      // Reset nhẹ sau vài giây để có thể gửi tiếp (tuỳ chọn)
      setTimeout(function () {
        form.reset();
        if (success) success.hidden = true;
        form.querySelector('button[type="submit"]').disabled = false;
      }, 6000);
    });
  })();

  /* ----------------------------------------------------------------
     7. MÁY TÍNH LÃI MINH HOẠ
     ---------------------------------------------------------------- */
  (function loanCalc() {
    var amount = doc.getElementById('c-amount');
    var rate = doc.getElementById('c-rate');
    var termRow = doc.getElementById('c-term-row');
    var amountOut = doc.getElementById('c-amount-out');
    var monthlyOut = doc.getElementById('c-monthly');
    var totalOut = doc.getElementById('c-total');
    if (!amount || !rate || !termRow) return;

    var vnd = new Intl.NumberFormat('vi-VN');
    var term = 3;

    function fmt(n) { return vnd.format(Math.round(n)) + ' ₫'; }

    function sliderFill() {
      var pct = ((amount.value - amount.min) / (amount.max - amount.min)) * 100;
      amount.style.setProperty('--p', pct + '%');
    }

    function recalc() {
      var principal = Number(amount.value);
      var r = Number(rate.value) / 100;
      var monthly = principal * r;
      if (amountOut) amountOut.textContent = fmt(principal);
      if (monthlyOut) monthlyOut.textContent = fmt(monthly);
      if (totalOut) totalOut.textContent = fmt(monthly * term);
      sliderFill();
    }

    amount.addEventListener('input', recalc);
    rate.addEventListener('change', recalc);

    termRow.querySelectorAll('.chip').forEach(function (chip) {
      chip.addEventListener('click', function () {
        termRow.querySelectorAll('.chip').forEach(function (c) { c.classList.remove('is-active'); });
        chip.classList.add('is-active');
        term = Number(chip.getAttribute('data-term'));
        recalc();
      });
    });

    recalc();
  })();

  /* ----------------------------------------------------------------
     8. NĂM BẢN QUYỀN
     ---------------------------------------------------------------- */
  (function year() {
    var el = doc.getElementById('year');
    if (el) el.textContent = new Date().getFullYear();
  })();

})();
