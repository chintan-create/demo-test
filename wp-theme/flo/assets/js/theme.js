(function () {
  // 1. Slide-out navigation menu
  var toggleBtn = document.querySelector('.menu-toggle-btn');
  var drawer = document.getElementById('slideout-nav');
  var backdrop = document.getElementById('slideout-backdrop');
  var closeBtn = document.querySelector('.drawer-close-btn');

  if (toggleBtn && drawer && backdrop) {
    function openMenu() {
      drawer.hidden = false;
      backdrop.hidden = false;
      requestAnimationFrame(function () {
        drawer.classList.add('open');
        backdrop.classList.add('open');
      });
      toggleBtn.setAttribute('aria-expanded', 'true');
      if (closeBtn) closeBtn.focus();
    }

    function closeMenu() {
      drawer.classList.remove('open');
      backdrop.classList.remove('open');
      toggleBtn.setAttribute('aria-expanded', 'false');
      setTimeout(function () {
        drawer.hidden = true;
        backdrop.hidden = true;
      }, 280);
      toggleBtn.focus();
    }

    toggleBtn.addEventListener('click', openMenu);
    if (closeBtn) closeBtn.addEventListener('click', closeMenu);
    backdrop.addEventListener('click', closeMenu);
    drawer.querySelectorAll('.drawer-links a').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && drawer.classList.contains('open')) closeMenu();
    });
  }

  // 2. Accessible FAQ Accordion + Load More
  var triggers = document.querySelectorAll('.faq-trigger');
  triggers.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var item = btn.closest('.faq-item');
      var panel = item.querySelector('.faq-panel');
      var symbol = btn.querySelector('.faq-symbol');
      var expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', expanded ? 'false' : 'true');
      item.classList.toggle('open', !expanded);
      if (panel) panel.hidden = expanded;
      if (symbol) symbol.textContent = expanded ? '+' : '\u2212';
    });
  });

  var loadMoreBtn = document.getElementById('faq-load-more');
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', function () {
      var extras = document.querySelectorAll('.faq-extra');
      extras.forEach(function (el) { el.hidden = false; });
      loadMoreBtn.style.display = 'none';
    });
  }
})();
