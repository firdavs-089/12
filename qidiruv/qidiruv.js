  const movies = [
      {
        name: "Avatar",
        year: "2009",
        image: "https://image.tmdb.org/t/p/w500/2TeJfUZMGolfDdW6DKhfIWqvq8y.jpg",
        link: "movie1.html"
      },
      {
        name: "Oppenheimer",
        year: "2023",
        image: "https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0xP3vQYC8eQEOX1dJ.jpg",
        link: "movie2.html"
      },
      {
        name: "The Flash",
        year: "2023",
        image: "https://image.tmdb.org/t/p/w500/rktDFPbfHfUbArZ6OOOKsXcv0Bm.jpg",
        link: "movie3.html"
      }
    ];

    function searchMovies() {
      const query = document.getElementById('searchInput').value.toLowerCase();
      const results = document.getElementById('results');
      results.innerHTML = '';

      const filtered = movies.filter(m => m.name.toLowerCase().includes(query));

      filtered.forEach(m => {
        results.innerHTML += `
          <div class="card">
            <div class="hd-label">HD</div>
            <img src="${m.image}" alt="${m.name}">
          
            <div class="info">
              <h3>${m.name}</h3>
              <p>${m.year} • Action</p>
              <a href="${m.link}" class="watch-btn">Online Ko‘rish</a>
            </div>
          </div>
        `;
        window.scrollTo({ top: 200, behavior: 'smooth' });
      });
    }

    function goBack() {
      document.body.style.animation = 'slideOut 0.5s ease forwards';
      setTimeout(() => window.history.back(), 500);
    }

    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
      }
    `;
    document.head.appendChild(style);