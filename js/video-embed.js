(function () {
  var frame = document.getElementById('walkthroughVideo');
  if (!frame) return;

  var isNarrow = window.matchMedia('(max-width: 640px)').matches;
  var src = isNarrow ? frame.dataset.portrait : frame.dataset.landscape;
  frame.classList.toggle('is-portrait', isNarrow);

  var iframe = document.createElement('iframe');
  iframe.src = src;
  iframe.title = 'How Does It Work: video walkthrough';
  iframe.loading = 'lazy';
  iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
  iframe.allowFullscreen = true;
  frame.appendChild(iframe);
})();
