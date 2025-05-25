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

// Hero Carousel
let currentSlide = 0
const slides = document.querySelectorAll(".carousel-slide")
const dots = document.querySelectorAll(".dot")
const prevBtn = document.getElementById("prev-btn")
const nextBtn = document.getElementById("next-btn")

function showSlide(index) {
  slides.forEach((slide) => slide.classList.remove("active"))
  dots.forEach((dot) => dot.classList.remove("active"))

  slides[index].classList.add("active")
  dots[index].classList.add("active")
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length
  showSlide(currentSlide)
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length
  showSlide(currentSlide)
}

nextBtn.addEventListener("click", nextSlide)
prevBtn.addEventListener("click", prevSlide)

// Dot navigation
dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    currentSlide = index
    showSlide(currentSlide)
  })
})

// Auto-play carousel
setInterval(nextSlide, 5000)

// Coming Soon Carousel
let comingCurrentSlide = 0
const comingTrack = document.getElementById("coming-track")
const comingPrev = document.getElementById("coming-prev")
const comingNext = document.getElementById("coming-next")
const comingSoonCards = document.querySelectorAll(".coming-card")

function moveComingCarousel(direction) {
  const cardWidth = 320 // 300px width + 20px gap
  const maxSlides = comingSoonCards.length - 3 // Show 3 cards at once

  comingCurrentSlide += direction

  if (comingCurrentSlide < 0) {
    comingCurrentSlide = 0
  } else if (comingCurrentSlide > maxSlides) {
    comingCurrentSlide = maxSlides
  }

  const translateX = -comingCurrentSlide * cardWidth
  comingTrack.style.transform = `translateX(${translateX}px)`
}

comingPrev.addEventListener("click", () => moveComingCarousel(-1))
comingNext.addEventListener("click", () => moveComingCarousel(1))

// Search functionality
const searchInput = document.querySelector(".search-input")
searchInput.addEventListener("input", (e) => {
  const query = e.target.value.toLowerCase()
  console.log("Searching for:", query)
  // Add search logic here
})

// Telegram Button
const telegramBtn = document.getElementById("telegram-btn")
telegramBtn.addEventListener("click", () => {
  window.open("https://t.me/doppi_uzzb", "_blank")
})

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Movie card hover effects
const movieCards = document.querySelectorAll(".movie-card")
movieCards.forEach((card) => {
  card.addEventListener("mouseenter", () => {
    card.style.transform = "translateY(-10px) scale(1.02)"
  })

  card.addEventListener("mouseleave", () => {
    card.style.transform = "translateY(0) scale(1)"
  })
})

// Coming soon cards animation
comingSoonCards.forEach((card) => {
  card.addEventListener("mouseenter", () => {
    const overlay = card.querySelector(".coming-overlay")
    overlay.style.transform = "translateY(0)"
  })

  card.addEventListener("mouseleave", () => {
    const overlay = card.querySelector(".coming-overlay")
    overlay.style.transform = "translateY(100%)"
  })
})

// Navbar scroll effect
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar")
  if (window.scrollY > 100) {
    navbar.style.background = "rgba(0, 0, 0, 0.95)"
  } else {
    navbar.style.background = "rgba(0, 0, 0, 0.9)"
  }
})

// Add loading animation to buttons
const buttons = document.querySelectorAll("button")
buttons.forEach((button) => {
  button.addEventListener("click", function () {
    this.style.transform = "scale(0.95)"
    setTimeout(() => {
      this.style.transform = "scale(1)"
    }, 150)
  })
})

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1"
      entry.target.style.transform = "translateY(0)"
    }
  })
}, observerOptions)

// Observe elements for animation
document.querySelectorAll(".movie-card, .feature-item, .coming-card").forEach((el) => {
  el.style.opacity = "0"
  el.style.transform = "translateY(30px)"
  el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
  observer.observe(el)
})

// Add ripple effect to buttons
function createRipple(event) {
  const button = event.currentTarget
  const circle = document.createElement("span")
  const diameter = Math.max(button.clientWidth, button.clientHeight)
  const radius = diameter / 2

  circle.style.width = circle.style.height = `${diameter}px`
  circle.style.left = `${event.clientX - button.offsetLeft - radius}px`
  circle.style.top = `${event.clientY - button.offsetTop - radius}px`
  circle.classList.add("ripple")

  const ripple = button.getElementsByClassName("ripple")[0]
  if (ripple) {
    ripple.remove()
  }

  button.appendChild(circle)
}

// Add ripple effect CSS
const rippleCSS = `
.ripple {
    position: absolute;
    border-radius: 50%;
    transform: scale(0);
    animation: ripple 600ms linear;
    background-color: rgba(255, 255, 255, 0.6);
}

@keyframes ripple {
    to {
        transform: scale(4);
        opacity: 0;
    }
}
`

const style = document.createElement("style")
style.textContent = rippleCSS
document.head.appendChild(style)

// Apply ripple effect to buttons
document.querySelectorAll("button").forEach((button) => {
  button.addEventListener("click", createRipple)
})

// Auto-play coming soon carousel
setInterval(() => {
  moveComingCarousel(1)
}, 4000)

// Handle window resize
window.addEventListener("resize", () => {
  // Reset carousels on resize
  comingCurrentSlide = 0
  comingTrack.style.transform = "translateX(0)"
  currentSlide = 0
  showSlide(currentSlide)
})

// Keyboard navigation
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") {
    prevSlide()
  } else if (e.key === "ArrowRight") {
    nextSlide()
  } else if (e.key === "Escape") {
    sideMenu.classList.remove("active")
  }
})

// Performance optimization
function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Optimized scroll handler
const optimizedScrollHandler = debounce(() => {
  const navbar = document.querySelector(".navbar")
  if (window.scrollY > 100) {
    navbar.style.background = "rgba(0, 0, 0, 0.95)"
  } else {
    navbar.style.background = "rgba(0, 0, 0, 0.9)"
  }
}, 10)

window.addEventListener("scroll", optimizedScrollHandler)
