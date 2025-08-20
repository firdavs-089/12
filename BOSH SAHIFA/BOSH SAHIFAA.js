





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
 const storiesEl = document.getElementById("stories");
window.currentIndex = null;

const storyData = [
  { img: "/telekanalr-img/nega.jpg", video: "/story mp4/neja.mp4", title: "Neja 2025yil uzbek tilida", link: "#" },
  { img: "/telekanalr-img/wednesday-img.jpg", video: "/story mp4/wednesday-2-fasl.mp4", title: "Venzdey / Uensday 1-fasl 2-fasl", link: "/seriialr toplami/Venzdey2-fasli.html" },
  { img: "/telekanalr-img/kalmar o'yini.webp", video: "/story mp4/Kalmar-o'yini.mp4", title: "Kalmar o'yini  3-fasl", link: "/seriialr toplami/kalmar-oyini-3-fasl.html" },
  { img: "/telekanalr-img/marvel img.jpg", video: "/story mp4/marvel.mp4", title: "Marvel ", link: "#" },
  { img: "/telekanalr-img/sonic img.jpg", video: "/story mp4/sonik.mp4", title: "Sonic, uzbek tilida", link: "#" },
  { img: "/telekanalr-img/super oila.webp", video: "/story mp4/super-oila.mp4", title: "Super oila ", link: "#" },
  { img: "/telekanalr-img/osiris.jpg", video: "/story mp4/osiris.mp4", title: "Osiris", link: "#" },
  { img: "/kinlar-img/S chizig'i.webp", video: "/story mp4/s-chizigi.mp4", title: "S chizig'i seriali", link: "/seriialr toplami/S chiziqi.html" },
  { img: "/kinlar-img/garry potir - story.webp", video: "/story mp4/garry potir.mp4", title: "Garri Potter 1 2 3 4 5 6 7 8 barcha qismlari Uzbek tilida", link: "/seriialr toplami/garry-potr.html" },
  { img: "/", video: "video5.mp4", title: "Kino 5", link: "#" },
  { img: "/", video: "video5.mp4", title: "Kino 5", link: "#" },
  { img: "/", video: "video5.mp4", title: "Kino 5", link: "#" },
  { img: "/", video: "video5.mp4", title: "Kino 5", link: "#" },
 
];

storyData.forEach((s, i) => {
  const item = document.createElement("div");
  item.className = "story-item";
  item.innerHTML = `<img src="${s.img}" alt="Story ${i+1}">`;
  item.onclick = () => openModal(i);
  storiesEl.appendChild(item);
});

function openModal(index) {
  window.currentIndex = index;
  document.getElementById("storyVideo").src = storyData[index].video;
  document.getElementById("storyTitle").textContent = storyData[index].title;
  document.getElementById("watchBtn").onclick = () => window.location.href = storyData[index].link;
  document.getElementById("modal").style.display = "flex";
}
function closeModal() {
  document.getElementById("modal").style.display = "none";
  document.getElementById("storyVideo").pause();
}
function changeStory(dir) {
  if (window.currentIndex === null) return;
  window.currentIndex = (window.currentIndex + dir + storyData.length) % storyData.length;
  openModal(window.currentIndex);
}




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
      '/multfilmlar img/k-pop iblis.jpg ',
      '/multfilmlar img/Lilo va stich kinoda premyuera img.jpg',
      '/multfilmlar img/uch bahodir img.jpg'
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