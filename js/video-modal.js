(function () {
  var frame = document.getElementById('homeVideoFrame');
  if (!frame) return;

  var defaultHTML = frame.innerHTML;
  var player = null;

  function bindTrigger() {
    var trigger = document.getElementById('homeVideoTrigger');
    if (trigger) trigger.addEventListener('click', play);
  }

  function suppressCaptions(e) {
    try { e.target.setOption('captions', 'track', {}); } catch (err) {}
    try { e.target.unloadModule('captions'); } catch (err) {}
  }

  function reset() {
    if (player && typeof player.destroy === 'function') {
      try { player.destroy(); } catch (err) {}
    }
    player = null;
    frame.classList.remove('is-playing', 'is-portrait');
    frame.innerHTML = defaultHTML;
    bindTrigger();
  }

  function onStateChange(e) {
    if (e.data === YT.PlayerState.ENDED) reset();
  }

  function onReady(e) {
    suppressCaptions(e);
  }

  function createPlayer(videoId) {
    player = new YT.Player('homeYtPlayerTarget', {
      videoId: videoId,
      host: 'https://www.youtube-nocookie.com',
      playerVars: { autoplay: 1, rel: 0, modestbranding: 1, cc_load_policy: 0 },
      events: { onReady: onReady, onApiChange: suppressCaptions, onStateChange: onStateChange }
    });
  }

  function loadApiThenPlay(videoId) {
    if (window.YT && window.YT.Player) {
      createPlayer(videoId);
      return;
    }
    var existingReady = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = function () {
      if (typeof existingReady === 'function') existingReady();
      createPlayer(videoId);
    };
    if (!document.getElementById('youtube-iframe-api')) {
      var tag = document.createElement('script');
      tag.id = 'youtube-iframe-api';
      tag.src = 'https://www.youtube.com/iframe_api';
      document.head.appendChild(tag);
    }
  }

  function play() {
    var isNarrow = window.matchMedia('(max-width: 640px)').matches;
    var videoId = isNarrow ? frame.dataset.portraitId : frame.dataset.landscapeId;
    frame.classList.add('is-playing');
    frame.classList.toggle('is-portrait', isNarrow);
    frame.innerHTML = '<div id="homeYtPlayerTarget"></div>';

    loadApiThenPlay(videoId);
  }

  bindTrigger();
})();
