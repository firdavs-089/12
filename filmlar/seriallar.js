 // Seriallar ma'lumotlari
        const serials = [
            { 
                title: "E bo'limining marvaridi", 
                desc: "Tarjima film", 
                img: "/kino-img/e guruhi.jpg",
                link: "/serriallar/e bolimini marvaridi.html" 
            },
            
           
        ];

        // Sahifalash sozlamalari
        let cardsPerPage = 12; // Boshlang'ich qiymat
        let currentPage = 1;
        
        // Ekran o'lchamiga qarab kartalar sonini sozlash
        function updateCardsPerPage() {
            if (window.innerWidth <= 480) {
                cardsPerPage = 8;
            } else if (window.innerWidth <= 768) {
                cardsPerPage = 10;
            } else {
                cardsPerPage = 12;
            }
            displayCards(currentPage);
            setupPagination();
        }
        
        // Kartalarni ko'rsatish funksiyasi
        function displayCards(page) {
            const cardsContainer = document.getElementById('cardsContainer');
            cardsContainer.innerHTML = '';
            
            const startIndex = (page - 1) * cardsPerPage;
            const endIndex = startIndex + cardsPerPage;
            const paginatedSerials = serials.slice(startIndex, endIndex);
            
            paginatedSerials.forEach(serial => {
                const card = document.createElement('div');
                card.className = 'card';
                card.innerHTML = `
                    <div class="card-img" style="background-image: url('${serial.img}')"></div>
                    <div class="card-content">
                        <h3 class="card-title">${serial.title}</h3>
                        <p class="card-desc">${serial.desc}</p>
                        <a href="${serial.link}" class="watch-btn">Online Ko'rish</a>
                    </div>
                `;
                cardsContainer.appendChild(card);
            });
        }
        
        // Pagination yaratish funksiyasi
        function setupPagination() {
            const pagination = document.getElementById('pagination');
            pagination.innerHTML = '';
            
            const pageCount = Math.ceil(serials.length / cardsPerPage);
            
            // Oldingi sahifa tugmasi
            const prevLi = document.createElement('li');
            prevLi.innerHTML = `<button id="prevBtn" ${currentPage === 1 ? 'disabled' : ''}>&lt;</button>`;
            pagination.appendChild(prevLi);
            
            // Sahifa raqamlari (1, 2, 3, ...)
            const maxVisiblePages = 5; // Ko'rsatiladigan maksimal sahifa soni
            let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
            let endPage = Math.min(pageCount, startPage + maxVisiblePages - 1);
            
            if (endPage - startPage + 1 < maxVisiblePages) {
                startPage = Math.max(1, endPage - maxVisiblePages + 1);
            }
            
            // Birinchi sahifa
            if (startPage > 1) {
                const firstLi = document.createElement('li');
                firstLi.innerHTML = `<button class="page-btn">1</button>`;
                pagination.appendChild(firstLi);
                
                if (startPage > 2) {
                    const dotsLi = document.createElement('li');
                    dotsLi.innerHTML = `<button disabled>...</button>`;
                    pagination.appendChild(dotsLi);
                }
            }
            
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


// Carousel functionality
const carouselStates = {
  featuredCarousel: { currentIndex: 0 },
  popularCarousel: { currentIndex: 0 },
  newCarousel: { currentIndex: 0 }
};

function slideCarousel(carouselId, direction) {
  const carousel = document.getElementById(carouselId);
  const cards = carousel.children;
  const cardWidth = cards[0].offsetWidth + 20; // including gap
  const visibleCards = Math.floor(carousel.parentElement.offsetWidth / cardWidth);
  const maxIndex = Math.max(0, cards.length - visibleCards);

  carouselStates[carouselId].currentIndex += direction;

  if (carouselStates[carouselId].currentIndex < 0) {
    carouselStates[carouselId].currentIndex = maxIndex;
  } else if (carouselStates[carouselId].currentIndex > maxIndex) {
    carouselStates[carouselId].currentIndex = 0;
  }

  const translateX = -carouselStates[carouselId].currentIndex * cardWidth;
  carousel.style.transform = `translateX(${translateX}px)`;
}

// Auto-slide for featured carousel
setInterval(() => {
  slideCarousel('featuredCarousel', 1);
}, 5000);

// Loading animation
function animateCards() {
  const cards = document.querySelectorAll('.loading');
  cards.forEach((card, index) => {
    setTimeout(() => {
      card.style.animationDelay = `${index * 0.1}s`;
      card.classList.remove('loading');
    }, index * 100);
  });
}

// Touch/swipe support for mobile
let startX = 0;
let currentCarousel = null;

document.addEventListener('touchstart', (e) => {
  startX = e.touches[0].clientX;
  currentCarousel = e.target.closest('.carousel-container')?.querySelector('.carousel')?.id;
});

document.addEventListener('touchend', (e) => {
  if (!currentCarousel) return;

  const endX = e.changedTouches[0].clientX;
  const diff = startX - endX;

  if (Math.abs(diff) > 50) {
    slideCarousel(currentCarousel, diff > 0 ? 1 : -1);
  }
});
            // Asosiy sahifalar
            for (let i = startPage; i <= endPage; i++) {
                const li = document.createElement('li');
                li.innerHTML = `<button class="page-btn ${i === currentPage ? 'active' : ''}">${i}</button>`;
                pagination.appendChild(li);
            }
            
            // Oxirgi sahifa
            if (endPage < pageCount) {
                if (endPage < pageCount - 1) {
                    const dotsLi = document.createElement('li');
                    dotsLi.innerHTML = `<button disabled>...</button>`;
                    pagination.appendChild(dotsLi);
                }
                
                const lastLi = document.createElement('li');
                lastLi.innerHTML = `<button class="page-btn">${pageCount}</button>`;
                pagination.appendChild(lastLi);
            }
            
            // Keyingi sahifa tugmasi
            const nextLi = document.createElement('li');
            nextLi.innerHTML = `<button id="nextBtn" ${currentPage === pageCount ? 'disabled' : ''}>&gt;</button>`;
            pagination.appendChild(nextLi);
            
            // Tugmalarga hodisalar qo'shish
            document.querySelectorAll('.page-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    currentPage = parseInt(btn.textContent);
                    displayCards(currentPage);
                    setupPagination();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                });
            });
            
            document.getElementById('prevBtn').addEventListener('click', () => {
                if (currentPage > 1) {
                    currentPage--;
                    displayCards(currentPage);
                    setupPagination();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
            });
            
            document.getElementById('nextBtn').addEventListener('click', () => {
                if (currentPage < pageCount) {
                    currentPage++;
                    displayCards(currentPage);
                    setupPagination();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
            });
        }
        
        // Dastlabki yuklash
        updateCardsPerPage();
        
        // Oynani o'lchamini o'zgartirganda qayta sozlash
        window.addEventListener('resize', updateCardsPerPage);