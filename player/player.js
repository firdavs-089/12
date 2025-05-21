// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Loading Screen
    const loadingScreen = document.getElementById('loadingScreen');
    const mainContainer = document.querySelector('.main-container');
    
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        loadingScreen.style.visibility = 'hidden';
        mainContainer.classList.add('loaded');
    }, 2000);
    
    // Video Player
    const videoPlayer = document.getElementById('moviePlayer');
    const playOverlay = document.getElementById('playOverlay');
    const videoControls = document.getElementById('videoControls');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const progressFilled = document.querySelector('.progress-filled');
    const progressHandle = document.querySelector('.progress-handle');
    const progressContainer = document.querySelector('.progress-container');
    const volumeBtn = document.getElementById('volumeBtn');
    const volumeFilled = document.querySelector('.volume-filled');
    const volumeHandle = document.querySelector('.volume-handle');
    const volumeProgress = document.querySelector('.volume-progress');
    const fullscreenBtn = document.getElementById('fullscreenBtn');
    const currentTimeEl = document.querySelector('.current-time');
    const durationEl = document.querySelector('.duration');
    const rewindBtn = document.querySelector('.rewind-btn');
    const forwardBtn = document.querySelector('.forward-btn');
    
    let isPlaying = false;
    let isMuted = false;
    let isFullscreen = false;
    let hideControlsTimeout;
    
    // Play/Pause functionality
    function togglePlay() {
        if (videoPlayer.paused) {
            videoPlayer.play();
            playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
            playOverlay.classList.add('hidden');
            isPlaying = true;
            
            // Hide controls after a delay
            clearTimeout(hideControlsTimeout);
            hideControlsTimeout = setTimeout(() => {
                if (isPlaying) {
                    videoControls.style.opacity = '0';
                }
            }, 3000);
        } else {
            videoPlayer.pause();
            playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
            playOverlay.classList.remove('hidden');
            isPlaying = false;
            
            // Always show controls when paused
            videoControls.style.opacity = '1';
            clearTimeout(hideControlsTimeout);
        }
    }
    
    // Event listeners for play/pause
    playOverlay.addEventListener('click', togglePlay);
    playPauseBtn.addEventListener('click', togglePlay);
    videoPlayer.addEventListener('click', function(e) {
        e.stopPropagation();
        togglePlay();
    });
    
    // Show controls on mouse move
    document.querySelector('.video-container').addEventListener('mousemove', function() {
        videoControls.style.opacity = '1';
        
        clearTimeout(hideControlsTimeout);
        if (isPlaying) {
            hideControlsTimeout = setTimeout(() => {
                videoControls.style.opacity = '0';
            }, 3000);
        }
    });
    
    // Update progress bar
    videoPlayer.addEventListener('timeupdate', function() {
        const percent = (videoPlayer.currentTime / videoPlayer.duration) * 100;
        progressFilled.style.width = `${percent}%`;
        progressHandle.style.left = `${percent}%`;
        
        // Update current time
        const currentMinutes = Math.floor(videoPlayer.currentTime / 60);
        const currentSeconds = Math.floor(videoPlayer.currentTime % 60);
        currentTimeEl.textContent = `${currentMinutes.toString().padStart(2, '0')}:${currentSeconds.toString().padStart(2, '0')}`;
    });
    
    // Set video time on progress bar click
    progressContainer.addEventListener('click', function(e) {
        const rect = this.getBoundingClientRect();
        const pos = (e.clientX - rect.left) / rect.width;
        videoPlayer.currentTime = pos * videoPlayer.duration;
    });
    
    // Update duration when metadata is loaded
    videoPlayer.addEventListener('loadedmetadata', function() {
        const durationMinutes = Math.floor(videoPlayer.duration / 60);
        const durationSeconds = Math.floor(videoPlayer.duration % 60);
        durationEl.textContent = `${durationMinutes.toString().padStart(2, '0')}:${durationSeconds.toString().padStart(2, '0')}`;
    });
    
    // Volume control
    volumeBtn.addEventListener('click', function() {
        if (videoPlayer.muted) {
            videoPlayer.muted = false;
            volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
            volumeFilled.style.width = `${videoPlayer.volume * 100}%`;
            volumeHandle.style.left = `${videoPlayer.volume * 100}%`;
            isMuted = false;
        } else {
            videoPlayer.muted = true;
            volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
            volumeFilled.style.width = '0';
            volumeHandle.style.left = '0';
            isMuted = true;
        }
    });
    
    // Set volume on volume bar click
    volumeProgress.addEventListener('click', function(e) {
        const rect = this.getBoundingClientRect();
        const pos = (e.clientX - rect.left) / rect.width;
        videoPlayer.volume = pos;
        volumeFilled.style.width = `${pos * 100}%`;
        volumeHandle.style.left = `${pos * 100}%`;
        
        if (pos === 0) {
            volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
            isMuted = true;
        } else {
            volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
            isMuted = false;
        }
    });
    
    // Fullscreen control
    fullscreenBtn.addEventListener('click', function() {
        if (!isFullscreen) {
            if (videoPlayer.requestFullscreen) {
                videoPlayer.requestFullscreen();
            } else if (videoPlayer.webkitRequestFullscreen) {
                videoPlayer.webkitRequestFullscreen();
            } else if (videoPlayer.msRequestFullscreen) {
                videoPlayer.msRequestFullscreen();
            }
            fullscreenBtn.innerHTML = '<i class="fas fa-compress"></i>';
            isFullscreen = true;
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
            fullscreenBtn.innerHTML = '<i class="fas fa-expand"></i>';
            isFullscreen = false;
        }
    });
    
    // Rewind and forward
    rewindBtn.addEventListener('click', function() {
        videoPlayer.currentTime = Math.max(videoPlayer.currentTime - 10, 0);
    });
    
    forwardBtn.addEventListener('click', function() {
        videoPlayer.currentTime = Math.min(videoPlayer.currentTime + 10, videoPlayer.duration);
    });
    
    // Watch Options
    const watchOptions = document.querySelectorAll('.watch-option');
    const trailerModal = document.getElementById('trailerModal');
    const closeTrailer = document.getElementById('closeTrailer');
    const trailerPlayer = document.getElementById('trailerPlayer');
    const trailerPlayBtn = document.getElementById('trailerPlayBtn');
    
    watchOptions.forEach(option => {
        option.addEventListener('click', function() {
            watchOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            const target = this.getAttribute('data-target');
            if (target === 'trailer') {
                trailerModal.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            }
        });
    });
    
    closeTrailer.addEventListener('click', function() {
        trailerModal.style.display = 'none';
        document.body.style.overflow = 'auto';
        trailerPlayer.pause();
    });
    
    trailerPlayBtn.addEventListener('click', function() {
        if (trailerPlayer.paused) {
            trailerPlayer.play();
            trailerPlayBtn.innerHTML = '<i class="fas fa-pause"></i>';
        } else {
            trailerPlayer.pause();
            trailerPlayBtn.innerHTML = '<i class="fas fa-play"></i>';
        }
    });
    
    // Scene Lightbox
    const sceneItems = document.querySelectorAll('.scene-item');
    const sceneLightbox = document.getElementById('sceneLightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const closeLightbox = document.getElementById('closeLightbox');
    const prevLightboxImg = document.getElementById('prevLightboxImg');
    const nextLightboxImg = document.getElementById('nextLightboxImg');
    
    let currentSceneIndex = 0;
    
    sceneItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            const imgSrc = this.getAttribute('data-src');
            lightboxImage.src = imgSrc;
            currentSceneIndex = index;
            sceneLightbox.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
    });
    
    closeLightbox.addEventListener('click', function() {
        sceneLightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    prevLightboxImg.addEventListener('click', function() {
        currentSceneIndex = (currentSceneIndex - 1 + sceneItems.length) % sceneItems.length;
        lightboxImage.src = sceneItems[currentSceneIndex].getAttribute('data-src');
    });
    
    nextLightboxImg.addEventListener('click', function() {
        currentSceneIndex = (currentSceneIndex + 1) % sceneItems.length;
        lightboxImage.src = sceneItems[currentSceneIndex].getAttribute('data-src');
    });
    
    // Rules Modal
    const rulesBtn = document.getElementById('rulesBtn');
    const rulesModal = document.getElementById('rulesModal');
    const closeRules = document.getElementById('closeRules');
    
    rulesBtn.addEventListener('click', function() {
        rulesModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        setTimeout(() => {
            rulesModal.classList.add('active');
        }, 10);
    });
    
    closeRules.addEventListener('click', function() {
        rulesModal.classList.remove('active');
        setTimeout(() => {
            rulesModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }, 300);
    });
    
    // Scenes Navigation
    const scenesContainer = document.querySelector('.scenes-container');
    const prevScene = document.querySelector('.prev-scene');
    const nextScene = document.querySelector('.next-scene');
    
    prevScene.addEventListener('click', function() {
        scenesContainer.scrollBy({
            left: -300,
            behavior: 'smooth'
        });
    });
    
    nextScene.addEventListener('click', function() {
        scenesContainer.scrollBy({
            left: 300,
            behavior: 'smooth'
        });
    });
    
    // Like/Dislike Counter
    const likeBtn = document.getElementById('likeBtn');
    const dislikeBtn = document.getElementById('dislikeBtn');
    const likeCount = document.getElementById('likeCount');
    const dislikeCount = document.getElementById('dislikeCount');
    
    let hasLiked = false;
    let hasDisliked = false;
    
    likeBtn.addEventListener('click', function() {
        if (!hasLiked) {
            likeCount.textContent = parseInt(likeCount.textContent) + 1;
            hasLiked = true;
            
            if (hasDisliked) {
                dislikeCount.textContent = parseInt(dislikeCount.textContent) - 1;
                hasDisliked = false;
            }
        }
    });
    
    dislikeBtn.addEventListener('click', function() {
        if (!hasDisliked) {
            dislikeCount.textContent = parseInt(dislikeCount.textContent) + 1;
            hasDisliked = true;
            
            if (hasLiked) {
                likeCount.textContent = parseInt(likeCount.textContent) - 1;
                hasLiked = false;
            }
        }
    });
    
    // Share Button
    const shareBtn = document.getElementById('shareBtn');
    
    shareBtn.addEventListener('click', function() {
        if (navigator.share) {
            navigator.share({
                title: 'Shaddod Kelin (Hind Kino, Premyera)',
                text: 'Shaddod kelin hind kinosi premyerasi Aetherx.film saytida',
                url: window.location.href
            })
            .catch(error => console.log('Ulashishda xatolik:', error));
        } else {
            // Fallback for browsers that don't support Web Share API
            const tempInput = document.createElement('input');
            document.body.appendChild(tempInput);
            tempInput.value = window.location.href;
            tempInput.select();
            document.execCommand('copy');
            document.body.removeChild(tempInput);
            
            alert('Havola nusxalandi!');
        }
    });
    
    // Star Rating
    const stars = document.querySelectorAll('.star-rating i');
    let currentRating = 0;
    
    stars.forEach(star => {
        star.addEventListener('mouseover', function() {
            const rating = parseInt(this.getAttribute('data-rating'));
            highlightStars(rating);
        });
        
        star.addEventListener('mouseout', function() {
            highlightStars(currentRating);
        });
        
        star.addEventListener('click', function() {
            currentRating = parseInt(this.getAttribute('data-rating'));
            highlightStars(currentRating);
        });
    });
    
    function highlightStars(rating) {
        stars.forEach(star => {
            const starRating = parseInt(star.getAttribute('data-rating'));
            if (starRating <= rating) {
                star.classList.remove('far');
                star.classList.add('fas');
            } else {
                star.classList.remove('fas');
                star.classList.add('far');
            }
        });
    }
    
    // Captcha Refresh
    const refreshCaptcha = document.getElementById('refreshCaptcha');
    const captchaText = document.getElementById('captchaText');
    
    refreshCaptcha.addEventListener('click', generateCaptcha);
    
    function generateCaptcha() {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let captcha = '';
        
        for (let i = 0; i < 6; i++) {
            captcha += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        
        captchaText.textContent = captcha;
    }
    
    // Comment Form Submission
    const commentForm = document.getElementById('commentForm');
    
    commentForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const comment = document.getElementById('comment').value;
        const captchaInput = document.getElementById('captchaInput').value;
        
        if (captchaInput !== captchaText.textContent) {
            alert('Captcha noto\'g\'ri kiritildi!');
            return;
        }
        
        // Here you would normally send the comment to a server
        // For demo purposes, we'll just add it to the page
        
        const commentsContainer = document.querySelector('.comments-container');
        const newComment = document.createElement('div');
        newComment.className = 'comment';
        
        let starIcons = '';
        for (let i = 1; i <= 5; i++) {
            if (i <= currentRating) {
                starIcons += '<i class="fas fa-star"></i>';
            } else {
                starIcons += '<i class="far fa-star"></i>';
            }
        }
        
        newComment.innerHTML = `
            <div class="comment-header">
                <div class="comment-user">
                    <div class="user-avatar">
                        <img src="https://via.placeholder.com/50" alt="User">
                    </div>
                    <div class="user-info">
                        <h4>${name}</h4>
                        <span class="comment-date">${new Date().toLocaleDateString()}</span>
                    </div>
                </div>
                <div class="comment-rating">
                    ${starIcons}
                </div>
            </div>
            <div class="comment-body">
                <p>${comment}</p>
            </div>
            <div class="comment-footer">
                <button class="comment-action">
                    <i class="fas fa-thumbs-up"></i>
                    <span>0</span>
                </button>
                <button class="comment-action">
                    <i class="fas fa-thumbs-down"></i>
                    <span>0</span>
                </button>
                <button class="comment-action">
                    <i class="fas fa-reply"></i>
                    <span>Javob berish</span>
                </button>
            </div>
        `;
        
        commentsContainer.prepend(newComment);
        
        // Reset form
        commentForm.reset();
        currentRating = 0;
        highlightStars(0);
        generateCaptcha();
        
        // Update comment count
        const commentCount = document.querySelector('.comment-count');
        const count = parseInt(commentCount.textContent.replace(/[()]/g, '')) + 1;
        commentCount.textContent = `(${count})`;
        
        // Scroll to the new comment with animation
        newComment.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    
    // Back to Top Button
    const backToTop = document.getElementById('backToTop');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });
    
    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Handle keyboard events for lightbox and trailer
    document.addEventListener('keydown', function(e) {
        // ESC key
        if (e.key === 'Escape') {
            if (sceneLightbox.style.display === 'flex') {
                sceneLightbox.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
            
            if (trailerModal.style.display === 'flex') {
                trailerModal.style.display = 'none';
                document.body.style.overflow = 'auto';
                trailerPlayer.pause();
            }
            
            if (rulesModal.style.display === 'flex') {
                rulesModal.classList.remove('active');
                setTimeout(() => {
                    rulesModal.style.display = 'none';
                    document.body.style.overflow = 'auto';
                }, 300);
            }
        }
        
        // Left arrow key for lightbox
        if (e.key === 'ArrowLeft' && sceneLightbox.style.display === 'flex') {
            currentSceneIndex = (currentSceneIndex - 1 + sceneItems.length) % sceneItems.length;
            lightboxImage.src = sceneItems[currentSceneIndex].getAttribute('data-src');
        }
        
        // Right arrow key for lightbox
        if (e.key === 'ArrowRight' && sceneLightbox.style.display === 'flex') {
            currentSceneIndex = (currentSceneIndex + 1) % sceneItems.length;
            lightboxImage.src = sceneItems[currentSceneIndex].getAttribute('data-src');
        }
    });
    
    // Touch events for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    // For lightbox swipe
    lightboxImage.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    lightboxImage.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        if (touchEndX < touchStartX - 50) {
            // Swipe left
            currentSceneIndex = (currentSceneIndex + 1) % sceneItems.length;
            lightboxImage.src = sceneItems[currentSceneIndex].getAttribute('data-src');
        }
        
        if (touchEndX > touchStartX + 50) {
            // Swipe right
            currentSceneIndex = (currentSceneIndex - 1 + sceneItems.length) % sceneItems.length;
            lightboxImage.src = sceneItems[currentSceneIndex].getAttribute('data-src');
        }
    }
    
    // Initialize
    generateCaptcha();
});