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

     const wrapper = document.getElementById('adBannerWrapper');
  const video = document.getElementById('adVideo');
  const muteBtn = document.getElementById('muteToggle');
  const closeBtn = document.getElementById('closeBtn');
  const timerText = document.getElementById('timerText');

  const showDelay = 1000;
  const closeEnableDelay = 10000;

  // Chiqarish animatsiyasi
  setTimeout(() => {
    wrapper.classList.add('show');
  }, showDelay);

  // X tugmasi 10 sekunddan keyin faollashadi
  let countdown = closeEnableDelay / 1000;
  const timer = setInterval(() => {
    countdown--;
    timerText.textContent = countdown > 0 ? `${countdown}s` : '';
    if (countdown <= 0) {
      clearInterval(timer);
      closeBtn.classList.add('enabled');
      closeBtn.style.cursor = 'pointer';
    }
  }, 1000);

  // X tugmasi bosilganda bannerni yopish
  closeBtn.addEventListener('click', () => {
    if (closeBtn.classList.contains('enabled')) {
      wrapper.classList.remove('show');
    }
  });

  // Video tugasa, banner pastga tushadi
  video.addEventListener('ended', () => {
    wrapper.classList.remove('show');
  });

  // Ovoz tugmasi
  muteBtn.addEventListener('click', () => {
    video.muted = !video.muted;
    const icon = muteBtn.querySelector('i');
    icon.className = video.muted ? 'fa-solid fa-volume-xmark' : 'fa-solid fa-volume-high';
  });












  // Sizning kinolar ma'lumotlaringiz (o'zingiz qo'shasiz)
        const moviesData = [
            {
                title: "S chizig'i / Sevgi g'altak",
                img: "/kinlar-img/S chizig'i.webp",
                desc: "2025, seriallar.",
                link: "/seriialr toplami/S chiziqi.html"
            },
            {
                title: "Venzdey / Uensday 1-fasl 2-fasl",
                img: "/kinlar-img/Wednesday  img.webp",
                desc: "2025, seriallar.",
                link: "/seriialr toplami/Venzdey2-fasli.html"
            },
            {
                title: "Kalmar o'yini 3-fasl",
                img: "/kinlar-img/kalmar o'yini 3 img.jpg",
                desc: "2025, seriallar.",
                link: "/seriialr toplami/kalmar-oyini-3-fasl.html"
            },
          
            // ... bu yerga yana kinolar qo'shishingiz mumkin
            // Har bir kino uchun title, img, desc, link maydonlari bo'lishi kerak
        ];
        
        // Sahifalash sozlamalari
        const moviesPerPage = 10;
        let currentPage = 1;
        
        // DOM elementlari
        const moviesContainer = document.getElementById('moviesContainer');
        const paginationContainer = document.getElementById('pagination');
        
        // Kinolarni sahifalab ko'rsatish
        function displayMovies(page) {
            const startIndex = (page - 1) * moviesPerPage;
            const endIndex = startIndex + moviesPerPage;
            const moviesToShow = moviesData.slice(startIndex, endIndex);
            
            moviesContainer.innerHTML = '';
            
            moviesToShow.forEach(movie => {
                const movieCard = document.createElement('div');
                movieCard.className = 'movie-card';
                movieCard.innerHTML = `
                    <img src="${movie.img}" alt="${movie.title}" class="movie-img">
                    <div class="movie-info">
                        <h3 class="movie-title">${movie.title}</h3>
                        <p class="movie-desc">${movie.desc}</p>
                        <a href="${movie.link}" class="watch-btn">Online ko'rish</a>
                    </div>
                `;
                moviesContainer.appendChild(movieCard);
            });
        }
        
        // Paginationni yaratish
        function setupPagination() {
            const totalPages = Math.ceil(moviesData.length / moviesPerPage);
            paginationContainer.innerHTML = '';
            
            // Oldingi sahifaga tugmasi
            if (currentPage > 1) {
                const prevBtn = document.createElement('button');
                prevBtn.className = 'page-btn';
                prevBtn.textContent = '...';
                prevBtn.addEventListener('click', () => {
                    currentPage--;
                    displayMovies(currentPage);
                    setupPagination();
                });
                paginationContainer.appendChild(prevBtn);
            }
            
            // Sahifa raqamlari
            for (let i = 1; i <= totalPages; i++) {
                const pageBtn = document.createElement('button');
                pageBtn.className = `page-btn ${i === currentPage ? 'active' : ''}`;
                pageBtn.textContent = i;
                pageBtn.addEventListener('click', () => {
                    currentPage = i;
                    displayMovies(currentPage);
                    setupPagination();
                });
                paginationContainer.appendChild(pageBtn);
            }
            
            // Keyingi sahifaga tugmasi
            if (currentPage < totalPages) {
                const nextBtn = document.createElement('button');
                nextBtn.className = 'page-btn';
                nextBtn.textContent = '...';
                nextBtn.addEventListener('click', () => {
                    currentPage++;
                    displayMovies(currentPage);
                    setupPagination();
                });
                paginationContainer.appendChild(nextBtn);
            }
        }
        
        // Dastlabki yuklash
        displayMovies(currentPage);
        setupPagination();