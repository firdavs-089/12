// Global Variables
let currentScreenshot = 0
const screenshots = [
  "/placeholder.svg?height=600&width=1000",
  "/placeholder.svg?height=600&width=1000",
  "/placeholder.svg?height=600&width=1000",
  "/placeholder.svg?height=600&width=1000",
]

// Video Player Variables
let isPlaying = false
let currentTime = 0
let duration = 0
let volume = 1
let playbackRate = 1
let isFullscreen = false
let isDragging = false
let controlsTimeout

// DOM Elements
const loadingScreen = document.getElementById("loadingScreen")
const loadingProgress = document.getElementById("loadingProgress")
const loadingPercentage = document.getElementById("loadingPercentage")
const backBtn = document.getElementById("backBtn")
const likeBtn = document.getElementById("likeBtn")
const dislikeBtn = document.getElementById("dislikeBtn")
const playBtn = document.getElementById("playBtn")
const trailerBtn = document.getElementById("trailerBtn")
const downloadBtn = document.getElementById("downloadBtn")

// Video Player Elements
const videoPlayerSection = document.getElementById("videoPlayerSection")
const videoPlayer = document.getElementById("videoPlayer")
const mainVideo = document.getElementById("mainVideo")
const videoOverlay = document.getElementById("videoOverlay")
const playOverlay = document.getElementById("playOverlay")
const videoControls = document.getElementById("videoControls")
const playPauseBtn = document.getElementById("playPauseBtn")
const rewindBtn = document.getElementById("rewindBtn")
const forwardBtn = document.getElementById("forwardBtn")
const volumeBtn = document.getElementById("volumeBtn")
const volumeSlider = document.getElementById("volumeSlider")
const speedBtn = document.getElementById("speedBtn")
const speedMenu = document.getElementById("speedMenu")
const fullscreenBtn = document.getElementById("fullscreenBtn")
const progressBar = document.getElementById("progressBar")
const progressPlayed = document.getElementById("progressPlayed")
const progressHandle = document.getElementById("progressHandle")
const currentTimeDisplay = document.getElementById("currentTime")
const totalTimeDisplay = document.getElementById("totalTime")

// Other Elements
const trailerModal = document.getElementById("trailerModal")
const trailerClose = document.getElementById("trailerClose")
const trailerVideo = document.getElementById("trailerVideo")
const lightbox = document.getElementById("lightbox")
const lightboxImage = document.getElementById("lightboxImage")
const lightboxCounter = document.getElementById("lightboxCounter")
const lightboxClose = document.getElementById("lightboxClose")
const lightboxPrev = document.getElementById("lightboxPrev")
const lightboxNext = document.getElementById("lightboxNext")
const commentForm = document.getElementById("commentForm")
const commentCaptcha = document.getElementById("commentCaptcha")
const commentCaptchaRefresh = document.getElementById("commentCaptchaRefresh")
const commentCaptchaInput = document.getElementById("commentCaptchaInput")
const commentBtn = document.getElementById("commentBtn")
const telegramBtn = document.getElementById("telegramBtn")
const scrollTopBtn = document.getElementById("scrollTopBtn")
const commentsSection = document.getElementById("commentsSection")
const notificationContainer = document.getElementById("notificationContainer")

// Loading Screen
function simulateLoading() {
  let progress = 0
  const interval = setInterval(() => {
    progress += Math.random() * 15
    if (progress >= 100) {
      progress = 100
      clearInterval(interval)
      setTimeout(() => {
        loadingScreen.classList.add("hidden")
      }, 500)
    }
    loadingProgress.style.width = progress + "%"
    loadingPercentage.textContent = Math.round(progress) + "%"
  }, 100)
}

// Notification System
function showNotification(message, type = "info") {
  const notification = document.createElement("div")
  notification.className = `notification ${type}`
  notification.textContent = message

  notificationContainer.appendChild(notification)

  setTimeout(() => {
    notification.classList.add("show")
  }, 100)

  setTimeout(() => {
    notification.classList.remove("show")
    setTimeout(() => {
      if (notificationContainer.contains(notification)) {
        notificationContainer.removeChild(notification)
      }
    }, 300)
  }, 3000)
}

// Video Player Functions
function initializeVideoPlayer() {
  if (!mainVideo) return

  // Set up video event listeners
  mainVideo.addEventListener("loadedmetadata", onVideoLoadedMetadata)
  mainVideo.addEventListener("timeupdate", onVideoTimeUpdate)
  mainVideo.addEventListener("ended", onVideoEnded)
  mainVideo.addEventListener("play", onVideoPlay)
  mainVideo.addEventListener("pause", onVideoPause)
  mainVideo.addEventListener("volumechange", onVolumeChange)
  mainVideo.addEventListener("loadstart", onVideoLoadStart)
  mainVideo.addEventListener("canplay", onVideoCanPlay)

  // Disable default controls
  mainVideo.controls = false

  console.log("Video player initialized")
}

function onVideoLoadedMetadata() {
  duration = mainVideo.duration
  totalTimeDisplay.textContent = formatTime(duration)
  console.log("Video metadata loaded, duration:", duration)
}

function onVideoTimeUpdate() {
  if (!isDragging) {
    currentTime = mainVideo.currentTime
    updateProgressBar()
    currentTimeDisplay.textContent = formatTime(currentTime)
  }
}

function onVideoPlay() {
  isPlaying = true
  playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>'
  videoPlayer.classList.add("playing")
  showControlsTemporarily()
}

function onVideoPause() {
  isPlaying = false
  playPauseBtn.innerHTML = '<i class="fas fa-play"></i>'
  videoPlayer.classList.remove("playing")
}

function onVideoEnded() {
  isPlaying = false
  playPauseBtn.innerHTML = '<i class="fas fa-replay"></i>'
  videoPlayer.classList.remove("playing")
  showNotification("Video tugadi", "info")
}

function onVolumeChange() {
  updateVolumeDisplay()
}

function onVideoLoadStart() {
  console.log("Video loading started")
}

function onVideoCanPlay() {
  console.log("Video can play")
}

// Play/Pause Functions
function togglePlayPause() {
  try {
    if (mainVideo.paused || mainVideo.ended) {
      const playPromise = mainVideo.play()
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            console.log("Video playing")
          })
          .catch((error) => {
            console.error("Play error:", error)
            showNotification("Video ijro etishda xatolik", "error")
          })
      }
    } else {
      mainVideo.pause()
      console.log("Video paused")
    }
  } catch (error) {
    console.error("Toggle play/pause error:", error)
  }
}

// Seek Functions
function rewindVideo() {
  try {
    const newTime = Math.max(0, mainVideo.currentTime - 10)
    mainVideo.currentTime = newTime
    showNotification("10 soniya orqaga", "info")
  } catch (error) {
    console.error("Rewind error:", error)
  }
}

function forwardVideo() {
  try {
    const newTime = Math.min(duration, mainVideo.currentTime + 10)
    mainVideo.currentTime = newTime
    showNotification("10 soniya oldinga", "info")
  } catch (error) {
    console.error("Forward error:", error)
  }
}

// Volume Functions
function toggleMute() {
  try {
    if (mainVideo.muted) {
      mainVideo.muted = false
      mainVideo.volume = volume
      showNotification("Ovoz yoqildi", "success")
    } else {
      volume = mainVideo.volume
      mainVideo.muted = true
      showNotification("Ovoz o'chirildi", "info")
    }
    updateVolumeDisplay()
  } catch (error) {
    console.error("Mute toggle error:", error)
  }
}

function updateVolume() {
  try {
    const newVolume = volumeSlider.value / 100
    mainVideo.volume = newVolume
    mainVideo.muted = false
    volume = newVolume
    updateVolumeDisplay()
  } catch (error) {
    console.error("Volume update error:", error)
  }
}

function updateVolumeDisplay() {
  const currentVolume = mainVideo.muted ? 0 : mainVideo.volume
  volumeSlider.value = currentVolume * 100

  if (currentVolume === 0 || mainVideo.muted) {
    volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>'
  } else if (currentVolume < 0.5) {
    volumeBtn.innerHTML = '<i class="fas fa-volume-down"></i>'
  } else {
    volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>'
  }
}

// Speed Functions
function changeSpeed(speed) {
  try {
    mainVideo.playbackRate = speed
    playbackRate = speed
    speedBtn.innerHTML = `<span>${speed}x</span>`

    // Update active speed option
    document.querySelectorAll(".speed-option").forEach((option) => {
      option.classList.remove("active")
    })
    const activeOption = document.querySelector(`[data-speed="${speed}"]`)
    if (activeOption) {
      activeOption.classList.add("active")
    }

    showNotification(`Tezlik: ${speed}x`, "info")
  } catch (error) {
    console.error("Speed change error:", error)
  }
}

// Fullscreen Functions
function toggleFullscreen() {
  try {
    if (!isFullscreen) {
      // Enter fullscreen
      if (videoPlayer.requestFullscreen) {
        videoPlayer.requestFullscreen()
      } else if (videoPlayer.webkitRequestFullscreen) {
        videoPlayer.webkitRequestFullscreen()
      } else if (videoPlayer.mozRequestFullScreen) {
        videoPlayer.mozRequestFullScreen()
      } else if (videoPlayer.msRequestFullscreen) {
        videoPlayer.msRequestFullscreen()
      }
    } else {
      // Exit fullscreen
      if (document.exitFullscreen) {
        document.exitFullscreen()
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen()
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen()
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen()
      }
    }
  } catch (error) {
    console.error("Fullscreen toggle error:", error)
  }
}

function onFullscreenChange() {
  isFullscreen = !!(
    document.fullscreenElement ||
    document.webkitFullscreenElement ||
    document.mozFullScreenElement ||
    document.msFullscreenElement
  )

  if (isFullscreen) {
    fullscreenBtn.innerHTML = '<i class="fas fa-compress"></i>'
    videoPlayer.classList.add("fullscreen")
    showNotification("Fullscreen rejimi", "success")
  } else {
    fullscreenBtn.innerHTML = '<i class="fas fa-expand"></i>'
    videoPlayer.classList.remove("fullscreen")
    showNotification("Fullscreen chiqildi", "info")
  }
}

// Progress Bar Functions
function updateProgressBar() {
  if (duration > 0) {
    const progress = (currentTime / duration) * 100
    progressPlayed.style.width = progress + "%"
    progressHandle.style.left = progress + "%"
  }
}

function seekVideo(e) {
  try {
    const rect = progressBar.getBoundingClientRect()
    const clickX = e.clientX - rect.left
    const percentage = Math.max(0, Math.min(1, clickX / rect.width))
    const newTime = percentage * duration

    mainVideo.currentTime = newTime
    currentTime = newTime
    updateProgressBar()

    console.log("Seeked to:", newTime)
  } catch (error) {
    console.error("Seek error:", error)
  }
}

// Progress Bar Dragging
function startDragging(e) {
  isDragging = true
  document.addEventListener("mousemove", onDrag)
  document.addEventListener("mouseup", stopDragging)
  document.addEventListener("touchmove", onDrag)
  document.addEventListener("touchend", stopDragging)
  e.preventDefault()
}

function onDrag(e) {
  if (!isDragging) return

  const clientX = e.clientX || (e.touches && e.touches[0].clientX)
  if (!clientX) return

  const rect = progressBar.getBoundingClientRect()
  const percentage = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width))
  const newTime = percentage * duration

  progressPlayed.style.width = percentage * 100 + "%"
  progressHandle.style.left = percentage * 100 + "%"
  currentTimeDisplay.textContent = formatTime(newTime)
}

function stopDragging(e) {
  if (!isDragging) return

  const clientX = e.clientX || (e.changedTouches && e.changedTouches[0].clientX)
  if (clientX) {
    const rect = progressBar.getBoundingClientRect()
    const percentage = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width))
    const newTime = percentage * duration

    mainVideo.currentTime = newTime
    currentTime = newTime
  }

  isDragging = false
  document.removeEventListener("mousemove", onDrag)
  document.removeEventListener("mouseup", stopDragging)
  document.removeEventListener("touchmove", onDrag)
  document.removeEventListener("touchend", stopDragging)
}

// Controls Visibility
function showControlsTemporarily() {
  videoPlayer.classList.add("show-controls")
  clearTimeout(controlsTimeout)
  controlsTimeout = setTimeout(() => {
    if (isPlaying) {
      videoPlayer.classList.remove("show-controls")
    }
  }, 3000)
}

// Utility Functions
function formatTime(seconds) {
  if (isNaN(seconds)) return "00:00"

  const hours = Math.floor(seconds / 3600)
  const mins = Math.floor((seconds % 3600) / 60)
  const secs = Math.floor(seconds % 60)

  if (hours > 0) {
    return `${hours.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  } else {
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }
}

// Keyboard Shortcuts
function handleKeyboard(e) {
  if (videoPlayerSection.style.display === "block") {
    switch (e.key) {
      case " ":
      case "k":
      case "K":
        e.preventDefault()
        togglePlayPause()
        break
      case "ArrowLeft":
        e.preventDefault()
        rewindVideo()
        break
      case "ArrowRight":
        e.preventDefault()
        forwardVideo()
        break
      case "ArrowUp":
        e.preventDefault()
        const newVolumeUp = Math.min(100, Number.parseInt(volumeSlider.value) + 10)
        volumeSlider.value = newVolumeUp
        updateVolume()
        break
      case "ArrowDown":
        e.preventDefault()
        const newVolumeDown = Math.max(0, Number.parseInt(volumeSlider.value) - 10)
        volumeSlider.value = newVolumeDown
        updateVolume()
        break
      case "f":
      case "F":
        e.preventDefault()
        toggleFullscreen()
        break
      case "m":
      case "M":
        e.preventDefault()
        toggleMute()
        break
    }
  }

  // Other keyboard shortcuts
  if (lightbox.classList.contains("active")) {
    switch (e.key) {
      case "Escape":
        closeLightbox()
        break
      case "ArrowLeft":
        prevScreenshot()
        break
      case "ArrowRight":
        nextScreenshot()
        break
    }
  }

  if (trailerModal.classList.contains("active") && e.key === "Escape") {
    closeTrailer()
  }
}

// Like/Dislike Functions
function handleLike() {
  const countElement = likeBtn.querySelector(".count")
  let count = Number.parseInt(countElement.textContent)
  count++
  countElement.textContent = count
  likeBtn.style.background = "var(--primary-red)"
  showNotification("Film yoqdi!", "success")
}

function handleDislike() {
  const countElement = dislikeBtn.querySelector(".count")
  let count = Number.parseInt(countElement.textContent)
  count++
  countElement.textContent = count
  dislikeBtn.style.background = "var(--light-gray)"
  showNotification("Fikringiz qabul qilindi", "info")
}

// Screenshot Gallery Functions
function openLightbox(index) {
  currentScreenshot = index
  lightboxImage.src = screenshots[index]
  lightboxCounter.textContent = `${index + 1} / ${screenshots.length}`
  lightbox.classList.add("active")
  document.body.style.overflow = "hidden"
}

function closeLightbox() {
  lightbox.classList.remove("active")
  document.body.style.overflow = "auto"
}

function nextScreenshot() {
  currentScreenshot = (currentScreenshot + 1) % screenshots.length
  lightboxImage.src = screenshots[currentScreenshot]
  lightboxCounter.textContent = `${currentScreenshot + 1} / ${screenshots.length}`
}

function prevScreenshot() {
  currentScreenshot = (currentScreenshot - 1 + screenshots.length) % screenshots.length
  lightboxImage.src = screenshots[currentScreenshot]
  lightboxCounter.textContent = `${currentScreenshot + 1} / ${screenshots.length}`
}

// Trailer Functions
function openTrailer() {
  trailerModal.classList.add("active")
  document.body.style.overflow = "hidden"
  trailerVideo.play()
}

function closeTrailer() {
  trailerModal.classList.remove("active")
  document.body.style.overflow = "auto"
  trailerVideo.pause()
  trailerVideo.currentTime = 0
}

// Comment Functions
function generateCaptcha() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
  let captcha = ""
  for (let i = 0; i < 5; i++) {
    captcha += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  commentCaptcha.textContent = captcha
}

function submitComment(e) {
  e.preventDefault()

  const name = document.getElementById("commentName").value
  const email = document.getElementById("commentEmail").value
  const comment = document.getElementById("commentText").value
  const captchaInput = commentCaptchaInput.value
  const captchaCode = commentCaptcha.textContent

  if (captchaInput.toUpperCase() !== captchaCode) {
    showNotification("Captcha kodi noto'g'ri!", "error")
    generateCaptcha()
    commentCaptchaInput.value = ""
    return
  }

  showNotification("Izohingiz muvaffaqiyatli yuborildi!", "success")
  commentForm.reset()
  generateCaptcha()
}

// Scroll Functions
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  })
}

function scrollToComments() {
  commentsSection.scrollIntoView({
    behavior: "smooth",
  })
}

function handleScroll() {
  const scrolled = window.pageYOffset

  // Show/hide scroll to top button
  if (scrolled > 500) {
    scrollTopBtn.classList.add("show")
  } else {
    scrollTopBtn.classList.remove("show")
  }
}

// Touch/Swipe Functions
let touchStartX = 0
let touchStartY = 0

function handleTouchStart(e) {
  touchStartX = e.touches[0].clientX
  touchStartY = e.touches[0].clientY
}

function handleTouchEnd(e) {
  if (!touchStartX || !touchStartY) return

  const touchEndX = e.changedTouches[0].clientX
  const touchEndY = e.changedTouches[0].clientY

  const diffX = touchStartX - touchEndX
  const diffY = touchStartY - touchEndY

  // Only handle horizontal swipes in lightbox
  if (lightbox.classList.contains("active") && Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
    if (diffX > 0) {
      nextScreenshot()
    } else {
      prevScreenshot()
    }
  }

  touchStartX = 0
  touchStartY = 0
}

// Event Listeners
document.addEventListener("DOMContentLoaded", () => {
  // Start loading simulation
  simulateLoading()

  // Generate initial captcha
  generateCaptcha()

  // Initialize video player
  initializeVideoPlayer()

  // Header buttons
  backBtn.addEventListener("click", () => {
    window.history.back()
  })

  likeBtn.addEventListener("click", handleLike)
  dislikeBtn.addEventListener("click", handleDislike)

  // Movie poster buttons
  playBtn.addEventListener("click", () => {
    videoPlayerSection.style.display = "block"
    videoPlayerSection.scrollIntoView({ behavior: "smooth" })
    showNotification("Video player ochildi", "success")
  })

  trailerBtn.addEventListener("click", openTrailer)
  downloadBtn.addEventListener("click", () => {
    showNotification("Yuklab olish boshlandi...", "success")
  })

  // Video player controls
  if (playPauseBtn) playPauseBtn.addEventListener("click", togglePlayPause)
  if (rewindBtn) rewindBtn.addEventListener("click", rewindVideo)
  if (forwardBtn) forwardBtn.addEventListener("click", forwardVideo)
  if (volumeBtn) volumeBtn.addEventListener("click", toggleMute)
  if (volumeSlider) volumeSlider.addEventListener("input", updateVolume)
  if (fullscreenBtn) fullscreenBtn.addEventListener("click", toggleFullscreen)
  if (playOverlay) playOverlay.addEventListener("click", togglePlayPause)

  // Progress bar events
  if (progressBar) {
    progressBar.addEventListener("click", seekVideo)
    progressHandle.addEventListener("mousedown", startDragging)
    progressHandle.addEventListener("touchstart", startDragging)
  }

  // Speed control
  document.querySelectorAll(".speed-option").forEach((option) => {
    option.addEventListener("click", () => {
      const speed = Number.parseFloat(option.dataset.speed)
      changeSpeed(speed)
    })
  })

  // Fullscreen change events
  document.addEventListener("fullscreenchange", onFullscreenChange)
  document.addEventListener("webkitfullscreenchange", onFullscreenChange)
  document.addEventListener("mozfullscreenchange", onFullscreenChange)
  document.addEventListener("MSFullscreenChange", onFullscreenChange)

  // Video player mouse movement
  if (videoPlayer) {
    videoPlayer.addEventListener("mousemove", showControlsTemporarily)
    videoPlayer.addEventListener("click", showControlsTemporarily)
  }

  // Trailer modal
  trailerClose.addEventListener("click", closeTrailer)
  document.getElementById("trailerOverlay").addEventListener("click", closeTrailer)

  // Screenshot gallery
  document.querySelectorAll(".screenshot-item").forEach((item, index) => {
    item.addEventListener("click", () => openLightbox(index))
  })

  // Lightbox controls
  lightboxClose.addEventListener("click", closeLightbox)
  lightboxPrev.addEventListener("click", prevScreenshot)
  lightboxNext.addEventListener("click", nextScreenshot)
  document.getElementById("lightboxOverlay").addEventListener("click", closeLightbox)

  // Comment form
  commentForm.addEventListener("submit", submitComment)
  commentCaptchaRefresh.addEventListener("click", generateCaptcha)

  // Floating action buttons
  commentBtn.addEventListener("click", scrollToComments)
  scrollTopBtn.addEventListener("click", scrollToTop)
  telegramBtn.addEventListener("click", () => {
    window.open("https://t.me/doppi_uzzb", "_blank")
  })

  // Scroll events
  window.addEventListener("scroll", handleScroll)

  // Touch events for mobile swipe
  lightbox.addEventListener("touchstart", handleTouchStart)
  lightbox.addEventListener("touchend", handleTouchEnd)

  // Keyboard events
  document.addEventListener("keydown", handleKeyboard)

  // Movie cards click events
  document.querySelectorAll(".movie-card").forEach((card) => {
    card.addEventListener("click", () => {
      showNotification("Film sahifasiga o'tilmoqda...", "info")
    })
  })

  // Social media links
  document.querySelector(".instagram-btn").addEventListener("click", () => {
    window.open("https://www.instagram.com/aetherx_uz?igsh=cXF4aWJibGg1cXV3", "_blank")
  })

  document.querySelector(".youtube-btn").addEventListener("click", () => {
    window.open("https://youtube.com/@aetherxfilm", "_blank")
  })
})

// Initialize on page load
window.addEventListener("load", () => {
  console.log("Movie website loaded successfully!")
})
