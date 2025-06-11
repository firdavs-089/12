// Loading animatsiyani yopish
        window.addEventListener('load', function() {
            setTimeout(function() {
                document.querySelector('.loading-screen').style.display = 'none';
            }, 3000);
        });
        
        // Video player funksiyalari
        const video = document.getElementById('main-video');
        const playPauseIcon = document.getElementById('play-pause-icon');
        const bigPlayBtn = document.querySelector('.big-play-btn');
        const volumeIcon = document.getElementById('volume-icon');
        const progressBar = document.getElementById('progress-bar');
        const currentTimeElement = document.getElementById('current-time');
        const durationElement = document.getElementById('duration');
        const speedDisplay = document.getElementById('speed-display');
        const likeIcon = document.getElementById('like-icon');
        const likeCount = document.getElementById('like-count');
        
        let isLiked = false;
        let currentImageIndex = 0;
        const galleryImages = [
            '/kinlar-lavhalar//kinlar-lavhalar/balirina -1.webp',
            '/kinlar-lavhalar//kinlar-lavhalar/balirina -2.webp',
            '/kinlar-lavhalar//kinlar-lavhalar/balirina -3.webp',
            '/kinlar-lavhalar//kinlar-lavhalar/balirina -4.webp'
        ];
        
        video.addEventListener('timeupdate', updateProgressBar);
        video.addEventListener('loadedmetadata', updateDuration);
        video.addEventListener('play', updatePlayPauseIcon);
        video.addEventListener('pause', updatePlayPauseIcon);
        video.addEventListener('ended', videoEnded);
        
        function updateProgressBar() {
            const progress = (video.currentTime / video.duration) * 100;
            progressBar.style.width = `${progress}%`;
            
            // Joriy vaqtni yangilash
            const minutes = Math.floor(video.currentTime / 60);
            const seconds = Math.floor(video.currentTime % 60);
            currentTimeElement.textContent = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
        }
        
        function updateDuration() {
            const minutes = Math.floor(video.duration / 60);
            const seconds = Math.floor(video.duration % 60);
            durationElement.textContent = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
        }
        
        function updatePlayPauseIcon() {
            if (video.paused) {
                playPauseIcon.classList.remove('fa-pause');
                playPauseIcon.classList.add('fa-play');
                bigPlayBtn.style.display = 'flex';
            } else {
                playPauseIcon.classList.remove('fa-play');
                playPauseIcon.classList.add('fa-pause');
                bigPlayBtn.style.display = 'none';
            }
        }
        
        function videoEnded() {
            bigPlayBtn.style.display = 'flex';
        }
        
        function togglePlayPause() {
            if (video.paused) {
                video.play();
            } else {
                video.pause();
            }
        }
        
        function toggleMute() {
            video.muted = !video.muted;
            if (video.muted) {
                volumeIcon.classList.remove('fa-volume-up');
                volumeIcon.classList.add('fa-volume-mute');
            } else {
                volumeIcon.classList.remove('fa-volume-mute');
                volumeIcon.classList.add('fa-volume-up');
            }
        }
        
        function setVolume(value) {
            video.volume = value;
            if (value == 0) {
                volumeIcon.classList.remove('fa-volume-up');
                volumeIcon.classList.add('fa-volume-mute');
            } else {
                volumeIcon.classList.remove('fa-volume-mute');
                volumeIcon.classList.add('fa-volume-up');
            }
        }
        
        function seekVideo(event) {
            const progressBar = event.currentTarget;
            const clickPosition = event.offsetX;
            const progressBarWidth = progressBar.clientWidth;
            const seekTime = (clickPosition / progressBarWidth) * video.duration;
            video.currentTime = seekTime;
        }
        
        function setSpeed(speed) {
            video.playbackRate = speed;
            speedDisplay.textContent = `${speed}x`;
            
            // Remove active class from all options
            document.querySelectorAll('.speed-option').forEach(option => {
                option.classList.remove('active-speed');
            });
            
            // Add active class to clicked option
            event.target.classList.add('active-speed');
        }
        
        function toggleFullScreen() {
            if (!document.fullscreenElement) {
                video.requestFullscreen().catch(err => {
                    alert(`Fullscreen error: ${err.message}`);
                });
            } else {
                document.exitFullscreen();
            }
        }
        
        function toggleLike() {
            isLiked = !isLiked;
            
            if (isLiked) {
                likeIcon.classList.remove('far');
                likeIcon.classList.add('fas');
                likeIcon.classList.add('like-animation');
                likeCount.textContent = parseInt(likeCount.textContent) + 1;
                
                // Remove animation class after animation completes
                setTimeout(() => {
                    likeIcon.classList.remove('like-animation');
                }, 500);
            } else {
                likeIcon.classList.remove('fas');
                likeIcon.classList.add('far');
                likeCount.textContent = parseInt(likeCount.textContent) - 1;
            }
        }
        
        // Video player ko'rsatish
        function showVideoPlayer(type) {
            const player = document.getElementById('movie-player');
            player.style.display = 'block';
            player.classList.add('animate-slide-up');
            
            if (type === 'movie') {
                video.src = 'https://fayllar1.ru/33/kinolar/Balerina%202025%201080p%20(asilmedia.net).mp4';
            }
            
            // Scroll to player
            player.scrollIntoView({ behavior: 'smooth' });
        }
        
        // Yuklab olish variantlarini ko'rsatish
        function showDownloadOptions() {
            const options = document.getElementById('download-options');
            options.style.display = 'block';
            options.classList.add('animate-slide-up');
            
            // Scroll to options
            options.scrollIntoView({ behavior: 'smooth' });
        }
        
        function downloadMovie(quality) {
            alert(`Film ${quality} sifatida yuklab olinmoqda...`);
        }
        
        function downloadViaTelegram() {
            alert("Telegram orqali yuklash bosildi!");
        }
        
        // Treylerni ko'rsatish
        function showTrailer() {
            document.getElementById('trailer-modal').style.display = 'flex';
            document.getElementById('trailer-modal').querySelector('video').play();
        }
        
        // Modal oynani yopish
        function closeModal() {
            document.getElementById('trailer-modal').style.display = 'none';
            document.getElementById('image-modal').style.display = 'none';
            document.getElementById('trailer-modal').querySelector('video').pause();
        }
        
        // Rasm modalini ochish
        function openGalleryImage(index) {
            currentImageIndex = index;
            const modal = document.getElementById('image-modal');
            const modalImg = document.getElementById('modal-image');
            modal.style.display = 'flex';
            modalImg.src = galleryImages[index];
        }
        
        function prevImage() {
            currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
            document.getElementById('modal-image').src = galleryImages[currentImageIndex];
        }
        
        function nextImage() {
            currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
            document.getElementById('modal-image').src = galleryImages[currentImageIndex];
        }