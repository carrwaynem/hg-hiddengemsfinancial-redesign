(function () {
  var trigger = document.getElementById('homeVideoTrigger');
  var modal = document.getElementById('videoModal');
  if (!trigger || !modal) return;

  var frame = document.getElementById('homeWalkthroughVideo');
  var closeBtn = modal.querySelector('[data-video-close]');
  var player = null;

  function destroyPlayer() {
    if (player && typeof player.destroy === 'function') {
      player.destroy();
    }
    player = null;
    var target = document.getElementById('homeYtPlayerTarget');
    if (target) {
      var fresh = document.createElement('div');
      fresh.id = 'homeYtPlayerTarget';
      target.parentNode.replaceChild(fresh, target);
    }
  }

  function createPlayer() {
    var isNarrow = window.matchMedia('(max-width: 640px)').matches;
    var videoId = isNarrow ? frame.dataset.portraitId : frame.dataset.landscapeId;
    frame.classList.toggle('is-portrait', isNarrow);
    player = new YT.Player('homeYtPlayerTarget', {
      videoId: videoId,
      host: 'https://www.youtube-nocookie.com',
      playerVars: { rel: 0, modestbranding: 1, autoplay: 1 }
    });
  }

  function loadPlayer() {
    if (window.YT && window.YT.Player) {
      createPlayer();
      return;
    }
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

  function open() {
    modal.hidden = false;
    document.body.style.overflow = 'hidden';
    loadPlayer();
  }

  function close() {
    modal.hidden = true;
    document.body.style.overflow = '';
    destroyPlayer();
  }

  trigger.addEventListener('click', open);
  closeBtn.addEventListener('click', close);
  modal.addEventListener('click', function (e) {
    if (e.target === modal) close();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !modal.hidden) close();
  });
})();
