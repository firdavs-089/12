// DOM elementlari
const watchBtn = document.getElementById('watchBtn');
const downloadBtn = document.getElementById('downloadBtn');
const modalOverlay = document.getElementById('modalOverlay');
const videoModal = document.getElementById('videoModal');
const downloadModal = document.getElementById('downloadModal');
const closeModals = document.querySelectorAll('.close-modal');
const loadingOverlay = document.getElementById('loadingOverlay');

// Modal oynalarni boshqarish
function openModal(modal) {
    modalOverlay.style.display = 'flex';
    modal.style.display = 'block';
    
    if (modal === videoModal) {
        downloadModal.style.display = 'none';
        // Video yuklash simulatsiyasi
        setTimeout(() => {
            document.querySelector('.video-container').innerHTML = `
                <iframe width="100%" height="315" src="/video.mkv" 
                frameborder="0" allowfullscreen></iframe>
            `;
        }, 2000);
    } else {
        videoModal.style.display = 'none';
    }
}

function closeModalsAll() {
    modalOverlay.style.display = 'none';
    videoModal.style.display = 'none';
    downloadModal.style.display = 'none';
}

// Tugmalarga hodisalar
watchBtn.addEventListener('click', () => openModal(videoModal));
downloadBtn.addEventListener('click', () => openModal(downloadModal));

closeModals.forEach(btn => {
    btn.addEventListener('click', closeModalsAll);
});

modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
        closeModalsAll();
    }
});

// Yuklash sifatini tanlash
document.querySelectorAll('.quality-option').forEach(option => {
    option.addEventListener('click', function() {
        const quality = this.textContent.trim();
        showLoading(`${quality} sifatida yuklanmoqda...`);
        
        // 3 soniyadan keyin yopish (aslida yuklash tugaganda yopiladi)
        setTimeout(() => {
            hideLoading();
            closeModalsAll();
        }, 3000);
    });
});

// Yuklash animatsiyasi
function showLoading(message = "Yuklanmoqda...") {
    document.querySelector('.loading-text').textContent = message;
    loadingOverlay.style.display = 'flex';
}

function hideLoading() {
    loadingOverlay.style.display = 'none';
}

// Like/dislike funksiyasi
document.querySelector('.like-btn').addEventListener('click', function() {
    this.innerHTML = '<i class="fas fa-thumbs-up"></i>';
    this.style.color = '#4CAF50';
    document.querySelector('.dislike-btn').innerHTML = '<i class="far fa-thumbs-down"></i>';
    document.querySelector('.dislike-btn').style.color = '#fff';
});

document.querySelector('.dislike-btn').addEventListener('click', function() {
    this.innerHTML = '<i class="fas fa-thumbs-down"></i>';
    this.style.color = '#f44336';
    document.querySelector('.like-btn').innerHTML = '<i class="far fa-thumbs-up"></i>';
    document.querySelector('.like-btn').style.color = '#fff';
});




// loading animatsasyi
// Animatsiyani ko'rsatish
function showSimpleLoading() {
    document.getElementById('simpleLoading').style.display = 'block';
    document.body.classList.add('loading-active');
}

// Animatsiyani yashirish
function hideSimpleLoading() {
    document.getElementById('simpleLoading').style.display = 'none';
    document.body.classList.remove('loading-active');
}

// Foydalanish misoli
showSimpleLoading(); // Yuklashni boshlash

// 3 soniyadan keyin to'xtatish (aslida yuklash tugaganda to'xtatiladi)
setTimeout(hideSimpleLoading, 3000);










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














  
//  galley
 const galleryImages = document.querySelectorAll('#galleryGrid img');
  const modal = document.getElementById('galleryModal');
  const modalImg = document.getElementById('modalImage');
  const counter = document.getElementById('counter');

  let currentIndex = 0;

  galleryImages.forEach((img, index) => {
    img.addEventListener('click', () => {
      currentIndex = index;
      showImage();
    });
  });

  function showImage() {
    modal.style.display = 'flex';
    modalImg.src = galleryImages[currentIndex].src;
    counter.textContent = `${currentIndex + 1} / ${galleryImages.length}`;
  }

  function closeModal() {
    modal.style.display = 'none';
  }

  function changeImage(dir) {
    currentIndex += dir;
    if (currentIndex < 0) currentIndex = galleryImages.length - 1;
    if (currentIndex >= galleryImages.length) currentIndex = 0;
    showImage();
  }

  document.addEventListener('keydown', (e) => {
    if (modal.style.display === 'flex') {
      if (e.key === 'Escape') closeModal();
      if (e.key === 'ArrowLeft') changeImage(-1);
      if (e.key === 'ArrowRight') changeImage(1);
    }
  });
