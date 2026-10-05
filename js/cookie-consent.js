(function () {
  var KEY = 'hg_cookie_ok';
  try { if (localStorage.getItem(KEY) === '1') return; } catch (e) { return; }

  var bar = document.createElement('div');
  bar.className = 'cookie-bar';
  bar.setAttribute('role', 'region');
  bar.setAttribute('aria-label', 'Cookie notice');
  bar.innerHTML = '<p>We use a small amount of browser storage to remember your preferences. See our <a href="privacy.html">Privacy Policy</a>.</p>' +
    '<button type="button" class="btn btn-primary">Got It</button>';
  document.body.appendChild(bar);

  bar.querySelector('button').addEventListener('click', function () {
    try { localStorage.setItem(KEY, '1'); } catch (e) {}
    bar.remove();
  });
})();
