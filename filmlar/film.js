 // Yangilangan JavaScript
        document.addEventListener('DOMContentLoaded', function() {
            // Loading screen
            setTimeout(function() {
                document.querySelector('.loading-screen').style.opacity = '0';
                setTimeout(function() {
                    document.querySelector('.loading-screen').style.display = 'none';
                }, 1000);
            }, 2000);
            
          
            // Fullscreen
            fullscreenBtn.addEventListener('click', function() {
                const player = document.getElementById('main-video-player');
                
                if (!document.fullscreenElement) {
                    if (player.requestFullscreen) {
                        player.requestFullscreen();
                    } else if (player.webkitRequestFullscreen) {
                        player.webkitRequestFullscreen();
                    } else if (player.msRequestFullscreen) {
                        player.msRequestFullscreen();
                    }
                    
                    fullscreenBtn.innerHTML = '<i class="fas fa-compress"></i>';
                } else {
                    if (document.exitFullscreen) {
                        document.exitFullscreen();
                    } else if (document.webkitExitFullscreen) {
                        document.webkitExitFullscreen();
                    } else if (document.msExitFullscreen) {
                        document.msExitFullscreen();
                    }
                    
                    fullscreenBtn.innerHTML = '<i class="fas fa-expand"></i>';
                }
            });
            
            document.addEventListener('fullscreenchange', function() {
                if (!document.fullscreenElement) {
                    fullscreenBtn.innerHTML = '<i class="fas fa-expand"></i>';
                }
            });
            
            // Screenshot modal functionality
            const screenshotModal = document.getElementById('screenshot-modal');
            const modalImage = document.getElementById('modal-image');
            const screenshotItems = document.querySelectorAll('.screenshot-item');
            const closeModal = document.querySelectorAll('.close-modal');
            const prevImageBtn = document.getElementById('prev-image');
            const nextImageBtn = document.getElementById('next-image');
            
            let currentImageIndex = 0;
            const images = Array.from(screenshotItems).map(item => item.getAttribute('data-image'));
            
            screenshotItems.forEach((item, index) => {
                item.addEventListener('click', function() {
                    currentImageIndex = index;
                    modalImage.src = this.getAttribute('data-image');
                    screenshotModal.classList.add('show');
                    document.body.style.overflow = 'hidden';
                });
            });
            
            closeModal.forEach(btn => {
                btn.addEventListener('click', function() {
                    screenshotModal.classList.remove('show');
                    document.getElementById('trailer-modal').classList.remove('show');
                    document.body.style.overflow = 'auto';
                    
                    // Pause trailer video when closing modal
                    const trailerPlayer = document.getElementById('trailer-player');
                    trailerPlayer.pause();
                });
            });
            
            prevImageBtn.addEventListener('click', function() {
                currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
                modalImage.src = images[currentImageIndex];
                animateImageChange();
            });
            
            nextImageBtn.addEventListener('click', function() {
                currentImageIndex = (currentImageIndex + 1) % images.length;
                modalImage.src = images[currentImageIndex];
                animateImageChange();
            });
            
            function animateImageChange() {
                modalImage.style.opacity = '0';
                setTimeout(() => {
                    modalImage.style.opacity = '1';
                }, 300);
            }
            
            // Close modal when clicking outside the content
            window.addEventListener('click', function(event) {
                if (event.target === screenshotModal) {
                    screenshotModal.classList.remove('show');
                    document.body.style.overflow = 'auto';
                }
                
                if (event.target === document.getElementById('trailer-modal')) {
                    document.getElementById('trailer-modal').classList.remove('show');
                    document.getElementById('trailer-player').pause();
                    document.body.style.overflow = 'auto';
                }
            });
            
            // Keyboard navigation for modal
            document.addEventListener('keydown', function(e) {
                if (screenshotModal.classList.contains('show')) {
                    if (e.key === 'ArrowLeft') {
                        prevImageBtn.click();
                    } else if (e.key === 'ArrowRight') {
                        nextImageBtn.click();
                    } else if (e.key === 'Escape') {
                        screenshotModal.classList.remove('show');
                        document.body.style.overflow = 'auto';
                    }
                }
            });
            
            // Trailer modal functionality
            const trailerModal = document.getElementById('trailer-modal');
            const watchTrailerBtn = document.getElementById('watch-trailer');
            const trailerPlayer = document.getElementById('trailer-player');
            
            watchTrailerBtn.addEventListener('click', function() {
                trailerModal.classList.add('show');
                document.body.style.overflow = 'hidden';
                trailerPlayer.play();
            });
            
            // Comment form submission
            const commentForm = document.getElementById('comment-form');
            
            commentForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const captchaInput = document.getElementById('captcha-input');
                const captchaCode = document.getElementById('captcha-code').textContent;
                
                if (captchaInput.value.toUpperCase() !== captchaCode) {
                    showNotification('Noto\'g\'ri captcha kodi!', 'error');
                    return;
                }
                
                // Here you would typically send the comment to the server
                showNotification('Izohingiz qabul qilindi!', 'success');
                commentForm.reset();
                
                // Generate new captcha
                generateCaptcha();
            });
            
            // Generate random captcha
            function generateCaptcha() {
                const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
                let captcha = '';
                
                for (let i = 0; i < 6; i++) {
                    captcha += chars.charAt(Math.floor(Math.random() * chars.length));
                }
                
                document.getElementById('captcha-code').textContent = captcha;
            }
            
            // Show notification
            function showNotification(message, type = 'info') {
                const notification = document.createElement('div');
                notification.className = `notification ${type}`;
                notification.textContent = message;
                document.body.appendChild(notification);
                
                setTimeout(() => {
                    notification.classList.add('show');
                }, 10);
                
                setTimeout(() => {
                    notification.classList.remove('show');
                    setTimeout(() => {
                        document.body.removeChild(notification);
                    }, 300);
                }, 3000);
            }
            
            // Initial captcha generation
            generateCaptcha();
            
            // Online watch button
            document.getElementById('watch-online').addEventListener('click', function() {
                videoPlayer.play();
                window.scrollTo({
                    top: document.getElementById('main-video-player').offsetTop - 20,
                    behavior: 'smooth'
                });
            });
            
            // Download button
            document.getElementById('download-movie').addEventListener('click', function() {
                showNotification('Kino yuklab olish boshlanadi...', 'info');
                // Actual download functionality would go here
            });
            
            // Animation for movie cards on scroll
            const movieCards = document.querySelectorAll('.movie-card');
            
            function checkCards() {
                movieCards.forEach((card, index) => {
                    const cardTop = card.getBoundingClientRect().top;
                    const windowHeight = window.innerHeight;
                    
                    if (cardTop < windowHeight - 100) {
                        setTimeout(() => {
                            card.classList.add('visible');
                        }, index * 100);
                    }
                });
            }
            
            // Check on load
            checkCards();
            
            // Check on scroll
            window.addEventListener('scroll', checkCards);
            
            // Initial check for cards in viewport
            setTimeout(checkCards, 500);
        });











        