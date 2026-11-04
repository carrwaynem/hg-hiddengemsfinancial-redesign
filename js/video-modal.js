(function () {
  var trigger = document.getElementById('homeVideoTrigger');
  var frame = document.getElementById('homeVideoFrame');
  if (!trigger || !frame) return;

  var played = false;

  function suppressCaptions(e) {
    try { e.target.setOption('captions', 'track', {}); } catch (err) {}
    try { e.target.unloadModule('captions'); } catch (err) {}
  }

  function createPlayer(videoId) {
    new YT.Player('homeYtPlayerTarget', {
      videoId: videoId,
      host: 'https://www.youtube-nocookie.com',
      playerVars: { autoplay: 1, rel: 0, modestbranding: 1, cc_load_policy: 0 },
      events: { onReady: suppressCaptions, onApiChange: suppressCaptions }
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
    if (played) return;
    played = true;

    var isNarrow = window.matchMedia('(max-width: 640px)').matches;
    var videoId = isNarrow ? frame.dataset.portraitId : frame.dataset.landscapeId;
    frame.classList.add('is-playing');
    frame.classList.toggle('is-portrait', isNarrow);
    frame.innerHTML = '<div id="homeYtPlayerTarget"></div>';

    loadApiThenPlay(videoId);
  }

  trigger.addEventListener('click', play);
})();
