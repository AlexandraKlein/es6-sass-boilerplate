function videoPlayer() {
  const video = document.getElementById('video');
  const btn = document.getElementById('play-pause-button');
  const progress = document.getElementById('progress');
  const progressBar = document.getElementById('progress-bar');
  const stopBtn = document.getElementById('stop-button');
  const replayBtn = document.getElementById('replay-button');
  const decVolBtn = document.getElementById('volume-dec-button');
  const incVolBtn = document.getElementById('volume-inc-button');
  const volumeDisplay = document.getElementById('volume');
  const muteBtn = document.getElementById('mute-button');
  const fullscreen = document.getElementById('fullscreen-button');
  const videoWrapper = document.querySelector('.video-wrapper');


  function togglePlayPause() {
    if (video.paused || video.ended) {
      btn.title = 'pause';
      btn.className = 'pause';
      videoWrapper.classList.add('playing');
      video.play();
    } else {
      btn.title = 'play';
      btn.className = 'play';
      videoWrapper.classList.remove('playing');
      video.pause();
    }
  }

  function changeButtonType(btn, value) {
    btn.title = value;
    btn.className = value;
  }

  function changeVolume(direction) {
    if (direction === '+') video.volume += video.volume == 1 ? 0 : 0.1;
    else video.volume -= (video.volume == 0 ? 0 : 0.1);
    video.volume = parseFloat(video.volume).toFixed(1);
    volumeDisplay.style.height = `${video.volume * 100}%`;
  }

  function toggleMute() {
    const btn = document.getElementById('mute-button');
    if (video.muted) {
      changeButtonType(btn, 'mute');
      video.muted = false;
    } else {
      changeButtonType(btn, 'unmute');
      video.muted = true;
    }
  }

  function updateProgressBar() {
    let percentage = Math.floor((100 / video.duration) * video.currentTime);
    progressBar.value = percentage;
    progressBar.style.width = `${percentage}%`;
  }

  function seek(e) {
    const offset = this.getBoundingClientRect();
    const totalWidth = progress.offsetWidth;
    let left = (e.pageX - offset.left);
    let percentage = ( left / totalWidth );
    let vidTime = video.duration * percentage;
    video.currentTime = vidTime;
  }

  function stopPlayer() {
    video.pause();
    video.currentTime = 0;
    videoWrapper.classList.remove('playing');
    changeButtonType(btn, 'play');
  }

  function resetPlayer() {
    progressBar.value = 0;
    video.currentTime = 0;
    video.play();
    changeButtonType(btn, 'pause');
  }

  function onVideoEnd() {
    video.load();
    changeButtonType(btn, 'play');
  }

  function toggleFullScreen() {
    if (!document.mozFullScreen && !document.webkitFullScreen) {
      if (video.mozRequestFullScreen) {
        video.mozRequestFullScreen();
      } else {
        video.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
      }
    } else {
      if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else {
        document.webkitCancelFullScreen();
      }
    }
  }

  document.addEventListener('keydown', function(e) {
    if (e.keyCode == 13) {
      toggleFullScreen();
    }
  }, false);

  video.addEventListener('timeupdate', updateProgressBar, false);
  video.addEventListener('ended', onVideoEnd, false);
  video.addEventListener('click', togglePlayPause);
  btn.addEventListener('click', togglePlayPause);
  stopBtn.addEventListener('click', stopPlayer);
  decVolBtn.addEventListener('click', ()=> changeVolume('-'));
  incVolBtn.addEventListener('click', ()=> changeVolume('+'));
  muteBtn.addEventListener('click', toggleMute);
  replayBtn.addEventListener('click', resetPlayer);
  progress.addEventListener('click', seek);
  fullscreen.addEventListener('click', toggleFullScreen);
}

$(document).on('workOnEnterCompleted', videoPlayer);
