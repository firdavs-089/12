
// video player
  const video = document.getElementById("video");
  const playOverlay = document.getElementById("playOverlay");
  const playPauseBtn = document.getElementById("playPauseBtn");
  const muteBtn = document.getElementById("muteBtn");
  const progress = document.getElementById("progress");
  const timeCurrent = document.getElementById("timeCurrent");
  const timeDuration = document.getElementById("timeDuration");
  const pipBtn = document.getElementById("pipBtn");
  const fullscreenBtn = document.getElementById("fullscreenBtn");
  const container = document.getElementById("playerWrapper");

  function formatTime(t) {
    const m = Math.floor(t / 60);
    const s = Math.floor(t % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  }

  function togglePlay() {
    video.paused ? video.play() : video.pause();
  }

  function toggleMute() {
    video.muted = !video.muted;
    muteBtn.innerHTML = video.muted
      ? '<i class="fa-solid fa-volume-xmark"></i>'
      : '<i class="fa-solid fa-volume-high"></i>';
  }

  function updateProgress() {
    progress.value = (video.currentTime / video.duration) * 100;
    timeCurrent.textContent = formatTime(video.currentTime);
  }

  function setProgress() {
    video.currentTime = (progress.value / 100) * video.duration;
  }

  function updateIcons() {
    playPauseBtn.innerHTML = video.paused
      ? '<i class="fa-solid fa-play"></i>'
      : '<i class="fa-solid fa-pause"></i>';
    playOverlay.classList.toggle("hidden", !video.paused);
  }

  async function togglePiP() {
    try {
      if (video !== document.pictureInPictureElement) {
        await video.requestPictureInPicture();
      } else {
        await document.exitPictureInPicture();
      }
    } catch (e) {
      alert("PiP qo'llab-quvvatlanmaydi.");
    }
  }

  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      container.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }

  video.addEventListener("loadedmetadata", () => {
    timeDuration.textContent = formatTime(video.duration);
    updateProgress();
  });

  playPauseBtn.addEventListener("click", togglePlay);
  playOverlay.addEventListener("click", togglePlay);
  video.addEventListener("click", togglePlay);
  video.addEventListener("timeupdate", updateProgress);
  video.addEventListener("play", updateIcons);
  video.addEventListener("pause", updateIcons);
  muteBtn.addEventListener("click", toggleMute);
  progress.addEventListener("input", setProgress);
  pipBtn.addEventListener("click", togglePiP);
  fullscreenBtn.addEventListener("click", toggleFullscreen);

  let controlsTimeout;
  function showControls() {
    container.classList.add("controls-visible");
    clearTimeout(controlsTimeout);
    controlsTimeout = setTimeout(() => {
      container.classList.remove("controls-visible");
    }, 3000);
  }

  container.addEventListener("mousemove", showControls);
  container.addEventListener("touchstart", showControls);
  showControls();










