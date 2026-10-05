(function () {
  var modal = document.getElementById('leadModal');
  if (!modal) return;

  var form = document.getElementById('leadForm');
  var emailInput = document.getElementById('leadEmail');
  var status = document.getElementById('leadStatus');
  var IDLE_MS = 10000;
  var SCROLL_PX = 400;
  var STORAGE_KEY = 'hg_lead_seen';
  var idleTimer = null;
  var opened = false;

  function alreadySeen() {
    try { return localStorage.getItem(STORAGE_KEY) === '1'; } catch (e) { return false; }
  }

  function markSeen() {
    try { localStorage.setItem(STORAGE_KEY, '1'); } catch (e) {}
  }

  function open() {
    if (opened || alreadySeen()) return;
    opened = true;
    modal.hidden = false;
    document.body.style.overflow = 'hidden';
    emailInput.focus();
  }

  function close() {
    modal.hidden = true;
    document.body.style.overflow = '';
    markSeen();
  }

  function resetIdle() {
    clearTimeout(idleTimer);
    idleTimer = setTimeout(open, IDLE_MS);
  }

  ['mousemove', 'keydown', 'touchstart', 'click'].forEach(function (evt) {
    document.addEventListener(evt, resetIdle, { passive: true });
  });

  window.addEventListener('scroll', function () {
    if (window.scrollY > SCROLL_PX) open();
  }, { passive: true });

  resetIdle();

  document.querySelectorAll('[data-open-lead]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      opened = false;
      try { localStorage.removeItem(STORAGE_KEY); } catch (e) {}
      open();
    });
  });

  modal.querySelector('[data-lead-close]').addEventListener('click', close);
  modal.addEventListener('click', function (e) {
    if (e.target === modal) close();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !modal.hidden) close();
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var endpoint = form.getAttribute('data-endpoint');
    var email = emailInput.value.trim();
    if (!email) return;

    if (!endpoint) {
      status.textContent = 'Signup is not connected yet.';
      return;
    }

    status.textContent = 'Sending...';
    fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email, source: 'homepage-lead-magnet' })
    }).then(function (res) {
      if (!res.ok) throw new Error('bad status');
      status.textContent = 'You are on the list. Check your inbox for the guide.';
      form.reset();
      markSeen();
    }).catch(function () {
      status.textContent = 'Something went wrong. Please try again.';
    });
  });
})();
