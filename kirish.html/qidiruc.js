document.addEventListener('DOMContentLoaded', function() {
    // Tema almashish
    const themeToggle = document.querySelector('.theme-toggle');
    themeToggle.addEventListener('click', toggleTheme);
    
    // Namuna kino ma'lumotlari
    const movies = [
        {
            id: 1,
            title: "Maxliqalr / Daxshat ",
            year: 2025,
            genre: "Tarjima film",
            rating: "8.8",
            image: "/kino-img/maxluqlar.png",
            link: "/movi-player/maxluqlar.html"
        },
        {
            id: 2,
            title: "Qizil ipak ",
            year: 2025,
            genre: "Tarjima film",
            rating: "5.9",
            image: "/kino-img/qizil ipak.png",
            link: "/movi-player/qizil ipak.html"
        },
        {
            id: 3,
            title: "Viduthalay 1 ",
            year: 2025,
            genre: "Tarjima film",
            rating: "8.8",
            image: "/kino-img/viduthaliy.webp",
            link: "/movi-player/viduthaliy.html"
        },
        {
            id: 4,
            title: "Doni Dark ",
            year: 2025,
            genre: "Tarjima film",
            rating: "8.1",
            image: "/kino-img/xoror.png",
            link: "/movi-player/doni dark .html"
        },
        {
            id: 5,
            title: "Amaran ",
            year: 2025,
            genre: "Tarjima film",
            rating: "1.3",
            image: "/kino-img/amaran.png",
            link: "/movi-player/doni dark .html"
        },
        {
            id: 6,
            title: "E bo'limining marvaridi ",
            year: 2025,
            genre: "Tarjima film",
            rating: "1.0",
            image: "/kino-img/e guruhi.jpg",
            link: "/serriallar/e bolimini marvaridi.html"
        },
        
        
    ];
    
    // Kino kartalarini yaratish
    renderMovies(movies);
    
    // Qidiruv funksiyasi
    const searchInput = document.querySelector('.search-input');
    searchInput.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        const filteredMovies = movies.filter(movie => 
            movie.title.toLowerCase().includes(searchTerm) || 
            movie.genre.toLowerCase().includes(searchTerm) ||
            movie.year.toString().includes(searchTerm)
        );
        renderMovies(filteredMovies);
    });
    
    // Orqaga qaytish tugmasi
    const backButton = document.querySelector('.back-button');
    backButton.addEventListener('click', function() {
        window.history.back();
    });
});

function toggleTheme() {
    document.body.classList.toggle('light-theme');
    document.body.classList.toggle('dark-theme');
    
    const themeIcon = document.querySelector('.theme-toggle i');
    if (document.body.classList.contains('light-theme')) {
        themeIcon.classList.remove('fa-lightbulb');
        themeIcon.classList.add('fa-moon');
    } else {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-lightbulb');
    }
}

function renderMovies(movies) {
    const moviesContainer = document.querySelector('.movies-container');
    moviesContainer.innerHTML = '';
    
    if (movies.length === 0) {
        moviesContainer.innerHTML = '<p class="no-results">Hech qanday kino topilmadi</p>';
        return;
    }
    
    movies.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.className = 'movie-card';
        movieCard.innerHTML = `
            <a href="${movie.link}">
                <img src="${movie.image}" alt="${movie.title}" class="movie-poster">
                <div class="movie-info">
                    <h3 class="movie-title">${movie.title}</h3>
                    <p class="movie-details">${movie.year} • ${movie.genre} • ⭐ ${movie.rating}</p>
                    <p class="movie-id">ID: ${movie.id}</p>
                </div>
            </a>
        `;
        moviesContainer.appendChild(movieCard);
    });
}