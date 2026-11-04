(function () {
  var trigger = document.getElementById('homeVideoTrigger');
  var frame = document.getElementById('homeVideoFrame');
  if (!trigger || !frame) return;

  function play() {
    var isNarrow = window.matchMedia('(max-width: 640px)').matches;
    var videoId = isNarrow ? frame.dataset.portraitId : frame.dataset.landscapeId;
    frame.classList.add('is-playing');
    frame.classList.toggle('is-portrait', isNarrow);
    frame.innerHTML = '';

    var iframe = document.createElement('iframe');
    iframe.className = 'vsl-iframe';
    iframe.src = 'https://www.youtube-nocookie.com/embed/' + videoId + '?autoplay=1&rel=0&modestbranding=1';
    iframe.title = 'Introduction to Hidden Gems Financial';
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
    iframe.allowFullscreen = true;
    frame.appendChild(iframe);
  }

  trigger.addEventListener('click', play);
})();
