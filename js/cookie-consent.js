(function () {
  var KEY = 'hg_cookie_consent';
  var existing;
  try { existing = localStorage.getItem(KEY); } catch (e) { return; }
  if (existing) return;

  var bar = document.createElement('div');
  bar.className = 'cookie-bar';
  bar.setAttribute('role', 'region');
  bar.setAttribute('aria-label', 'Cookie notice');
  bar.innerHTML = '<p>We use cookies to understand site traffic and remember your preferences. See our <a href="privacy.html">Privacy Policy</a>.</p>' +
    '<button type="button" class="btn btn-outline" data-cookie-decline>Decline</button>' +
    '<button type="button" class="btn btn-primary" data-cookie-accept>Accept</button>';
  document.body.appendChild(bar);

  function respond(value) {
    try { localStorage.setItem(KEY, value); } catch (e) {}
    if (value === 'granted' && typeof window.gtag === 'function') {
      window.gtag('consent', 'update', { analytics_storage: 'granted' });
    }
    bar.remove();
  }

  bar.querySelector('[data-cookie-accept]').addEventListener('click', function () { respond('granted'); });
  bar.querySelector('[data-cookie-decline]').addEventListener('click', function () { respond('denied'); });
})();
