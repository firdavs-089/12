





        // Loading Screen
window.addEventListener("load", () => {
  setTimeout(() => {
    document.getElementById("loading-screen").style.display = "none"
    document.getElementById("main-content").style.display = "block"
    document.body.style.overflow = "auto"
  }, 3000)
})

// Menu Toggle
const menuToggle = document.getElementById("menu-toggle")
const menuClose = document.getElementById("menu-close")
const sideMenu = document.getElementById("side-menu")

menuToggle.addEventListener("click", () => {
  sideMenu.classList.add("active")
})

menuClose.addEventListener("click", () => {
  sideMenu.classList.remove("active")
})

// Close menu when clicking outside
document.addEventListener("click", (e) => {
  if (!sideMenu.contains(e.target) && !menuToggle.contains(e.target)) {
    sideMenu.classList.remove("active")
  }
})

// Theme Toggle
const themeToggle = document.getElementById("theme-toggle")
let isDark = true

themeToggle.addEventListener("click", () => {
  isDark = !isDark
  if (isDark) {
    document.body.classList.remove("light-theme")
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>'
  } else {
    document.body.classList.add("light-theme")
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>'
  }
})

// story
 
   document.addEventListener('DOMContentLoaded', function() {
            const stories = document.querySelectorAll('.story');
            const modal = document.getElementById('storyModal');
            const closeBtn = document.querySelector('.close-btn');
            const video = document.getElementById('storyVideo');
            const leftArrow = document.querySelector('.arrow-left');
            const rightArrow = document.querySelector('.arrow-right');
            const watchBtn = document.querySelector('.watch-btn');
            const progressBar = document.getElementById('progressBar');
            
            let currentStoryIndex = 0;
            let touchStartX = 0;
            let touchEndX = 0;
            let progressInterval;
            let storiesData = [];
            
            // Load stories data
            stories.forEach((story, index) => {
                storiesData.push({
                    video: story.getAttribute('data-video'),
                    poster: story.getAttribute('data-poster')
                });
                
                // Create progress segments
                const segment = document.createElement('div');
                segment.className = 'progress-segment';
                segment.innerHTML = '<div class="progress-fill"></div>';
                progressBar.appendChild(segment);
            });
            
            const progressSegments = document.querySelectorAll('.progress-segment');
            const progressFills = document.querySelectorAll('.progress-fill');
            
            // Open modal when story is clicked
            stories.forEach((story, index) => {
                story.addEventListener('click', () => {
                    currentStoryIndex = index;
                    openStory(index);
                });
            });
            
            // Close modal
            closeBtn.addEventListener('click', closeModal);
            
            // Navigation arrows
            leftArrow.addEventListener('click', () => {
                navigateStory(-1);
            });
            
            rightArrow.addEventListener('click', () => {
                navigateStory(1);
            });
            
            // Watch online button
            watchBtn.addEventListener('click', () => {
                alert('Opening full movie...');
                // window.location.href = 'watch.html?movie=' + currentStoryIndex;
            });
            
            // Touch events for mobile swipe
            modal.addEventListener('touchstart', (e) => {
                touchStartX = e.changedTouches[0].screenX;
                clearInterval(progressInterval);
            }, false);
            
            modal.addEventListener('touchmove', (e) => {
                e.preventDefault();
            }, { passive: false });
            
            modal.addEventListener('touchend', (e) => {
                touchEndX = e.changedTouches[0].screenX;
                handleSwipe();
                startProgressBar();
            }, false);
            
            function openStory(index) {
                if (index < 0 || index >= storiesData.length) return;
                
                currentStoryIndex = index;
                const story = storiesData[index];
                
                // Reset all progress bars
                progressFills.forEach(fill => {
                    fill.style.width = '0%';
                    fill.style.transition = 'none';
                });
                
                // Set video source
                video.src = story.video;
                video.poster = story.poster;
                
                // Show modal
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
                
                // Play video
                video.load();
                video.play().catch(e => console.log('Autoplay prevented:', e));
                
                // Start progress bar
                startProgressBar();
            }
            
            function closeModal() {
                modal.classList.remove('active');
                video.pause();
                document.body.style.overflow = 'auto';
                clearInterval(progressInterval);
                
                // Reset progress bars
                progressFills.forEach(fill => {
                    fill.style.width = '0%';
                });
            }
            
            function navigateStory(direction) {
                clearInterval(progressInterval);
                currentStoryIndex += direction;
                
                if (currentStoryIndex < 0) {
                    currentStoryIndex = storiesData.length - 1;
                } else if (currentStoryIndex >= storiesData.length) {
                    currentStoryIndex = 0;
                }
                
                openStory(currentStoryIndex);
            }
            
            function handleSwipe() {
                if (touchEndX < touchStartX - 50) {
                    // Swipe left - next story
                    navigateStory(1);
                }
                
                if (touchEndX > touchStartX + 50) {
                    // Swipe right - previous story
                    navigateStory(-1);
                }
            }
            
            function startProgressBar() {
                clearInterval(progressInterval);
                
                // Reset all progress bars
                progressFills.forEach(fill => {
                    fill.style.width = '0%';
                    fill.style.transition = 'none';
                });
                
                // Set transition for current segment
                progressFills[currentStoryIndex].style.transition = 'width 5s linear';
                progressFills[currentStoryIndex].style.width = '100%';
                
                // After 5 seconds, go to next story
                progressInterval = setTimeout(() => {
                    navigateStory(1);
                }, 5000);
            }
            
            // Close modal when clicking outside content
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    closeModal();
                }
            });
            
            // Handle video end
            video.addEventListener('ended', () => {
                navigateStory(1);
            });
        });





        // carousel
        let currentIndex = 0;
    const carousel = document.getElementById('carousel');
    const slides = document.querySelectorAll('.slide');

    function moveSlide(step) {
      currentIndex = (currentIndex + step + slides.length) % slides.length;
      carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    setInterval(() => moveSlide(1), 7000);



     document.addEventListener('DOMContentLoaded', function() {
            const btn = document.getElementById('barchasiBtn');
            
            // Create border elements
            for (let i = 0; i < 4; i++) {
                const border = document.createElement('span');
                border.className = 'btn-border';
                border.style.animationDelay = `${i * 1}s`;
                btn.appendChild(border);
            }
        });












        // multfilmlar


         const rasm = document.getElementById('rasm');
    const rasmlar = [
      'https://images.uzmovi.tv/2025-05-30/9493bfb62031040befcf4e8a0c45f97d.jpg',
      'https://images.uzmovi.tv/2025-04-06/b2c4b80ed03ef95b48949bf1fea039e6.jpg',
      'https://images.uzmovi.tv/2025-03-15/6374661d4ffc73734e91ce6d73ad481b.jpg'
    ];
    let index = 0;

    function yangilashRasm() {
      rasm.style.transform = 'scale(0.95)';
      setTimeout(() => {
        rasm.src = rasmlar[index];
        rasm.style.transform = 'scale(1)';
      }, 150);
    }

    function oldinga() {
      index = (index - 1 + rasmlar.length) % rasmlar.length;
      yangilashRasm();
    }

    function orqaga() {
      index = (index + 1) % rasmlar.length;
      yangilashRasm();
    }












    // top kinolar
        function toggleAccordion(header) {
      const isActive = header.classList.contains('active');
      document.querySelectorAll('.accordion-header').forEach(h => {
        h.classList.remove('active');
        h.querySelector('span i').classList.replace('fa-minus', 'fa-plus');
      });
      document.querySelectorAll('.accordion-content').forEach(c => c.style.display = 'none');

      if (!isActive) {
        header.classList.add('active');
        header.querySelector('span i').classList.replace('fa-plus', 'fa-minus');
        header.nextElementSibling.style.display = 'block';
      }
    }

    function like(button) {
      const countSpan = button.nextElementSibling;
      let count = parseInt(countSpan.innerText);
      countSpan.innerText = count + 1;
    }

    



    // reklamniy baner 
      window.addEventListener('load', () => {
    const wrapper = document.getElementById('adBannerWrapper');
    const video = document.getElementById('adVideo');
    const muteBtn = document.getElementById('muteToggle');
    const closeBtn = document.getElementById('closeBtn');
    const timerText = document.getElementById('timerText');

    const showDelay = 2000; // 2 sekunddan keyin ko‘rsatish
    const closeEnableDelay = 10000; // X tugmasi 10s dan keyin faollashadi

    // 1. Bannerni ko‘rsatish
    setTimeout(() => {
      wrapper.classList.add('show');

      // 2. X tugmasi uchun taymer
      let countdown = closeEnableDelay / 1000;
      timerText.textContent = `${countdown}s`;
      const timerInterval = setInterval(() => {
        countdown--;
        if (countdown > 0) {
          timerText.textContent = `${countdown}s`;
        } else {
          clearInterval(timerInterval);
          timerText.textContent = '';
          closeBtn.classList.add('enabled');
          closeBtn.style.cursor = 'pointer';
        }
      }, 1000);
    }, showDelay);

    // 3. X tugmasi bosilsa, banner yashiriladi
    closeBtn.addEventListener('click', () => {
      if (closeBtn.classList.contains('enabled')) {
        wrapper.classList.remove('show');
      }
    });

    // 4. Video tugasa, banner yashiriladi
    video.addEventListener('ended', () => {
      wrapper.classList.remove('show');
    });

    // 5. Ovoz tugmasi ishlashi
    muteBtn.addEventListener('click', () => {
      video.muted = !video.muted;
      const icon = muteBtn.querySelector('i');
      icon.className = video.muted
        ? 'fa-solid fa-volume-xmark'
        : 'fa-solid fa-volume-high';
    });
  });











  // reklamniy banner 2
  document.getElementById('closeStaticBanner').addEventListener('click', function () {
      document.getElementById('staticBanner').style.display = 'none';
    });