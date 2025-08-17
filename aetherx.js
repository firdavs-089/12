// Loading animation
window.addEventListener('load', function () {
    setTimeout(function () {
        document.querySelector('.loading').style.display = 'none';
    }, 1500);
});


document.addEventListener('DOMContentLoaded', function () {
    // Menu toggle functionality
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    document.body.appendChild(overlay);

    menuToggle.addEventListener('click', function () {
        this.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        overlay.style.display = mobileMenu.classList.contains('active') ? 'block' : 'none';
    });

    overlay.addEventListener('click', function () {
        menuToggle.classList.remove('active');
        mobileMenu.classList.remove('active');
        overlay.style.display = 'none';
    });

    // Language change functionality
    const langOptions = document.querySelectorAll('.lang-option');
    const currentLang = document.querySelector('.current-lang');

    langOptions.forEach(option => {
        option.addEventListener('click', function () {
            const lang = this.getAttribute('data-lang');
            currentLang.textContent = lang === 'uz' ? 'O\'Z' : 'RU';

            // Show page loader
            const pageLoader = document.querySelector('.page-loader');
            const loaderLine = document.querySelector('.loader-line');

            pageLoader.style.display = 'block';
            loaderLine.style.width = '0';

            // Animate loader
            setTimeout(() => {
                loaderLine.style.width = '100%';
            }, 10);

            // Simulate page reload
            setTimeout(() => {
                // In a real app, you would change the language here
                // window.location.reload();

                // For demo purposes, we'll just hide the loader
                setTimeout(() => {
                    pageLoader.style.display = 'none';
                }, 300);
            }, 1000);
        });
    });

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Hover effects for buttons
    const authButtons = document.querySelectorAll('.auth-btn, .mobile-auth-btn');

    authButtons.forEach(button => {
        button.addEventListener('mouseenter', function () {
            if (this.classList.contains('register-btn')) {
                this.style.transform = 'scale(1.05)';
            } else {
                this.style.transform = 'scale(1.03)';
            }
        });

        button.addEventListener('mouseleave', function () {
            this.style.transform = 'scale(1)';
        });
    });
});


















// Movie data
const movies = [
    { title: "Ajdar o'rgatuvchi", rating: 8.0, quality: "1", image: "/kinlar-img/ajdar o'rgatuvchi img.webp" },
    { title: "Kulgiga aylangan haqiqat", rating: 8.8, quality: "2", image: "/kinlar-img/kulgiga-aylangan-haqiat img.webp" },
    { title: "Yura davri dunyosi ", rating: 8.6, quality: "3", image: "/kinlar-img/yura-davri-dunyosi-img.webp" },
    { title: "Yagona tana", rating: 9.0, quality: "4", image: "/kinlar-img/yagona tana img.webp" },
    { title: "Osiris yirtqich", rating: 8.9, quality: "5", image: "/kinlar-img/Osiris  Yirtqich rasmi.webp" },
    { title: "K-pop 2025", rating: 8.8, quality: "6", image: "/multfilmlar img/k-pop img.webp" },
    { title: "neja 2 ", rating: 9.2, quality: "7", image: "/kinlar-img/nega-2-img.webp" },
    { title: "Kalmar o'yini 3-fasl", rating: 8.7, quality: "8", image: "/kinlar-img/kalmar o'yini 3 img.jpg" },
    { title: "Wednesday 2-fasl", rating: 8.6, quality: "9", image: "/kinlar-img/Wednesday  img.webp" },
    { title: "S chizig'i", rating: 8.4, quality: "10", image: "/kinlar-img/S chizig'i.webp" }
];

// Render movies
const trendingMovies = document.getElementById('trendingMovies');
movies.forEach(movie => {
    trendingMovies.innerHTML += `
                <div class="movie-card">
                    <img src="${movie.image}" alt="${movie.title}">
                    <div class="movie-badge">${movie.quality}</div>
                    <div class="movie-info">
                        <h3 class="movie-title">${movie.title}</h3>
                        <div class="movie-rating">
                            <i class="fas fa-star"></i>
                            <span>${movie.rating}</span>
                        </div>
                    </div>
                </div>
            `;
});


// FAQ accordion
const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
        item.classList.toggle('active');
    });
});

// Slider functionality
let currentPosition = 0;
const sliderRow = document.querySelector('.movies-row');
const movieCards = document.querySelectorAll('.movie-card');
const cardWidth = movieCards[0].offsetWidth + 10; // including gap

document.querySelector('.slider-next').addEventListener('click', function () {
    if (currentPosition > -(movieCards.length * cardWidth - 5 * cardWidth)) {
        currentPosition -= cardWidth * 2;
        sliderRow.style.transform = `translateX(${currentPosition}px)`;
    }
});

document.querySelector('.slider-prev').addEventListener('click', function () {
    if (currentPosition < 0) {
        currentPosition += cardWidth * 2;
        sliderRow.style.transform = `translateX(${currentPosition}px)`;
    }
});












// slayed
