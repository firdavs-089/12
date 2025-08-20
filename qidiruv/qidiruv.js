  const movies = [
      {
        name: "Ajdar oʻrgatuvchilar / Ajdarni qo'lga o'rgatish ",
        year: "2025, tajima film",
        image: "/kinlar-img/ajdar o'rgatuvchi img.webp",
        link: "/filmlar/ajdar-orgatuvchi.html"
      },
      {
        name: "Kosmik koloniya / Boshqaruv xonasi Premyera  ",
        year: "2025, tajima film",
        image: "/kinlar-img/kosmik kalonya img.webp",
        link: "/filmlar/Kosmink kaloniya.html"
      },
      {
        name: "Kulga aylangan haqiqat  ",
        year: "2025, tajima film",
        image: "/kinlar-img/kulgiga-aylangan-haqiat img.webp",
        link: "/filmlar/Kulga aylangan haqiqat.html"
      },
      {
        name: " Maskan / Qariyalar uyi Premyera 2025   ",
        year: "2025, tajima film",
        image: "/kinlar-img/maskan img.webp",
        link: "/filmlar/maskan.html"
      },
     
      {
        name: " Matakumba xazinasi Uzbek tilida 1976  ",
        year: "2025, tajima film",
        image: "/kinlar-img/Matakumba xazinas img.jpg",
        link: "/filmlar/Matakumba xazinas.html"
      },
      {
        name: " O'tgan yozda nima qilganingni bilaman Premyera  ",
        year: "2025, tajima film",
        image: "/kinlar-img/o'tgan yozda nima qilganimni bilmayman img.webp",
        link: "/filmlar/O'tgan yozda nima qilganingni bilaman Premyera 2025 .html"
      },
      {
        name: " Olov pazanda / Anapurani : Ovqat ma'budasi 2023 ",
        year: "2025, tajima film",
        image: "/kinlar-img/olov pazanda.jpg",
        link: "/filmlar/olov pazanda.html"
      },
      {
        name: " Osiris / Yirtqich : Osiris missiyasi Uzbek tilida  ",
        year: "2025, tajima film",
        image: "/kinlar-img/Osiris  Yirtqich rasmi.webp",
        link: "/filmlar/osiris.html"
      },
      {
        name: " Qotil kampir / Pichoq tutgan kampir 2025 ",
        year: "2025, tajima film",
        image: "/kinlar-img/qotil kampir img.webp",
        link: "/filmlar/qotil kampir.html"
      },
      {
        name: " Supermen / Superman Premyera 2025 ",
        year: "2025, tajima film",
        image: "/kinlar-img/superman.webp",
        link: "/filmlar/superman.html"
      },
      {
        name: " Yagona tana / Birgalikda Premyera 2025 ",
        year: "2025, tajima film",
        image: "/kinlar-img/yagona tana img.webp",
        link: "/filmlar/yagona tana.html"
      },
      {
        name: " Yura davri dunyosi : Qayta tug'ilish Premyera 2025  ",
        year: "2025, tajima film",
        image: "/kinlar-img/yura-davri-dunyosi-img.webp",
        link: "/filmlar/yura-davri-dunyosi.html"
      },
      {
        name: "Garri Potter 1 2 3 4 5 6 7 8 barcha qismlari Uzbek tilida  ",
        year: "2025, tajima film",
        image: "/kinlar-img/garry potirrrr- img.png",
        link: "/seriialr toplami/garry-potr.html"
      },
      {
        name: "Kalmar o'yini 3-fasl / Igra Kalmara 3-sezon ",
        year: "2025, tajima film",
        image: "/kinlar-img/kalmar o'yini 3 img.jpg",
        link: "/seriialr toplami/kalmar-oyini-3-fasl.html"
      },
      {
        name: "Qum odam / Qumodam O'zbek tilida Serial Premyera  ",
        year: "2025, tajima film",
        image: "/kinlar-img/qum-odam-img.webp",
        link: "/seriialr toplami/Qum-odam.html"
      },
      {
        name: "S chizig'i / Sevgi g'altak  ",
        year: "2025, tajima film",
        image: "/kinlar-img/S chizig'i.webp",
        link: "/seriialr toplami/S chiziqi.html"
      },
      {
        name: "Titanlar DC va Netflix seriali ",
        year: "2025, tajima film",
        image: "/kinlar-img/titanlar img.jpg",
        link: "/seriialr toplami/titanlar-dc.html"
      },
      {
        name: "Venzdey / Uensday 1-fasl 2-fasl ",
        year: "2025, tajima film",
        image: "/kinlar-img/Wednesday  img.webp",
        link: "/seriialr toplami/Venzdey2-fasli.html"
      },
      {
        name: "Orol. Unutilmas sayohat (qozoq filmi, premyera) ",
        year: "2025, tajima film",
        image: "/kinlar-img/orol img",
        link: "/yangi-filmlar/orol.html"
      },
     
    ];

    function searchMovies() {
      const query = document.getElementById('searchInput').value.toLowerCase();
      const results = document.getElementById('results');
      results.innerHTML = '';

      const filtered = movies.filter(m => m.name.toLowerCase().includes(query));

      filtered.forEach(m => {
        results.innerHTML += `
          <div class="card">
            <div class="hd-label">FULLHD</div>
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