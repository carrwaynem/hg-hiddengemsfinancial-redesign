(function () {
  var frame = document.getElementById('walkthroughVideo');
  if (!frame) return;

  var GATE_SECONDS = 240; // prompt the lead popup once the video reaches 4:00
  var isNarrow = window.matchMedia('(max-width: 640px)').matches;
  var videoId = isNarrow ? frame.dataset.portraitId : frame.dataset.landscapeId;
  frame.classList.toggle('is-portrait', isNarrow);

  var player = null;
  var gated = false;
  var polling = false;

  function poll() {
    if (gated) { polling = false; return; }
    if (player && typeof player.getCurrentTime === 'function' && player.getCurrentTime() >= GATE_SECONDS) {
      gated = true;
      polling = false;
      document.dispatchEvent(new Event('hg:open-lead'));
      return;
    }
    setTimeout(poll, 2000);
  }

  function onStateChange(e) {
    if (e.data === YT.PlayerState.PLAYING && !polling && !gated) {
      polling = true;
      poll();
    }
  }

  function createPlayer() {
    player = new YT.Player('ytPlayerTarget', {
      videoId: videoId,
      host: 'https://www.youtube-nocookie.com',
      playerVars: { rel: 0, modestbranding: 1 },
      events: { onStateChange: onStateChange }
    });
  }

  if (window.YT && window.YT.Player) {
    createPlayer();
  } else {
    var existingReady = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = function () {
      if (typeof existingReady === 'function') existingReady();
      createPlayer();
    };
    if (!document.getElementById('youtube-iframe-api')) {
      var tag = document.createElement('script');
      tag.id = 'youtube-iframe-api';
      tag.src = 'https://www.youtube.com/iframe_api';
      document.head.appendChild(tag);
    }
  }
})();
