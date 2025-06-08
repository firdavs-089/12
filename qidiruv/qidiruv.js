const movies = [
  {
    id: "1",
    title: "Avengers",
    image: "https://i.imgur.com/UePbdph.jpg",
    description: "Marvel qahramonlari birgalikda dunyoni qutqaradi.",
    link: "films/avengers.html"
  },
  {
    id: "2",
    title: "Inception",
    image: "https://i.imgur.com/Yo0pA6D.jpg",
    description: "O'ylar ichidagi o'yin - real va tush oralig'ida.",
    link: "films/inception.html"
  },
  {
    id: "3",
    title: "Avatar",
    image: "https://i.imgur.com/DRqytcY.jpg",
    description: "Pandora sayyorasidagi jang va muhabbat.",
    link: "films/avatar.html"
  },
  {
    id: "4",
    title: "Titanic",
    image: "https://i.imgur.com/2QhY9eS.jpg",
    description: "Tarixdagi eng mashhur kemaning fojiaviy sarguzashti.",
    link: "films/titanic.html"
  }
];
searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase().trim();
  resultContainer.innerHTML = "";

  if (query === "") return;

  const foundMovies = movies.filter(movie =>
    movie.title.toLowerCase().includes(query)
  );

  if (foundMovies.length > 0) {
    foundMovies.forEach(movie => {
      resultContainer.innerHTML += `
        <div class="card">
          <img src="${movie.image}" alt="${movie.title}">
          <div class="card-content">
            <h2>${movie.title}</h2>
            <p><strong>ID:</strong> ${movie.id}</p>
            <p>${movie.description}</p>
            <a class="play-btn" href="${movie.link}"><i class="fas fa-play"></i></a>
          </div>
        </div>
      `;
    });
  } else {
    resultContainer.innerHTML = "<p style='text-align:center; color:#999;'>Hech narsa topilmadi...</p>";
  }
});
