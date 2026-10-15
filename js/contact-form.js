(function () {
  var form = document.getElementById('contactForm');
  if (!form) return;

  var status = document.getElementById('contactStatus');

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var endpoint = form.getAttribute('data-endpoint');

    if (form.website && form.website.value) {
      form.reset();
      status.textContent = 'Thanks. We will be in touch shortly.';
      return;
    }

    var data = {
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      phone: form.phone.value.trim(),
      reason: form.reason.value,
      message: form.message.value.trim(),
      source: 'contact-page-form',
      page: window.location.pathname
    };

    if (!data.name || !data.email || !data.reason || !data.message) return;

    if (!endpoint) {
      status.textContent = 'This form is not connected yet.';
      return;
    }

    status.textContent = 'Sending...';
    var body = new URLSearchParams(data);
    fetch(endpoint, { method: 'POST', mode: 'no-cors', body: body })
      .then(function () {
        status.textContent = 'Thanks. We will be in touch shortly.';
        form.reset();
      }).catch(function () {
        status.textContent = 'Something went wrong. Please try again.';
      });
  });
})();
