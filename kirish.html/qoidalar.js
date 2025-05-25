// DOM Elements
const termsScroll = document.getElementById('termsScroll');
const progressBar = document.getElementById('progressBar');
const progressText = document.getElementById('progressText');
const agreeTerms = document.getElementById('agreeTerms');
const captchaCode = document.getElementById('captchaCode');
const captchaInput = document.getElementById('captchaInput');
const refreshCaptchaBtn = document.getElementById('refreshCaptcha');
const acceptBtn = document.getElementById('acceptBtn');
const declineBtn = document.getElementById('declineBtn');
const modalOverlay = document.getElementById('modalOverlay');
const modalOkBtn = document.getElementById('modalOkBtn');
const notificationContainer = document.getElementById('notificationContainer');

// Current captcha value
let currentCaptcha = 'XY9K2';
let hasScrolledToBottom = false;
let captchaValid = false;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    generateCaptcha();
    showNotification('Sayt qoidalarini diqqat bilan o\'qing!', 'info');
    addDynamicAnimations();
    updateAcceptButton();
});

// Scroll Progress Tracking
termsScroll.addEventListener('scroll', () => {
    const scrollTop = termsScroll.scrollTop;
    const scrollHeight = termsScroll.scrollHeight - termsScroll.clientHeight;
    const scrollPercentage = (scrollTop / scrollHeight) * 100;
    
    progressBar.style.width = scrollPercentage + '%';
    progressText.textContent = Math.round(scrollPercentage) + '%';
    
    // Check if user has scrolled to bottom
    if (scrollPercentage >= 95 && !hasScrolledToBottom) {
        hasScrolledToBottom = true;
        showNotification('Barcha qoidalarni o\'qidingiz! Endi roziman belgisin qo\'ying.', 'success');
        updateAcceptButton();
    }
});

// Checkbox Change Handler
agreeTerms.addEventListener('change', () => {
    updateAcceptButton();
    if (agreeTerms.checked) {
        showNotification('Qoidalarni qabul qildingiz!', 'success');
    }
});

// Captcha Functions
function generateCaptcha() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 5; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    currentCaptcha = result;
    captchaCode.textContent = result;
    
    // Add generation animation
    captchaCode.style.transform = 'rotateY(180deg)';
    setTimeout(() => {
        captchaCode.style.transform = 'rotateY(0deg)';
    }, 200);
    
    // Reset captcha validation
    captchaValid = false;
    captchaInput.value = '';
    updateAcceptButton();
}

refreshCaptchaBtn.addEventListener('click', () => {
    generateCaptcha();
    showNotification('Captcha yangilandi!', 'info');
});

// Captcha Input Validation
captchaInput.addEventListener('input', () => {
    const inputValue = captchaInput.value.toUpperCase();
    
    if (inputValue === currentCaptcha) {
        captchaValid = true;
        captchaInput.style.borderColor = '#00ff00';
        captchaInput.style.boxShadow = '0 0 15px rgba(0, 255, 0, 0.5)';
        showNotification('Captcha to\'g\'ri!', 'success');
    } else {
        captchaValid = false;
        captchaInput.style.borderColor = '#ff4444';
        captchaInput.style.boxShadow = '0 0 15px rgba(255, 68, 68, 0.5)';
    }
    
    updateAcceptButton();
});

// Update Accept Button State
function updateAcceptButton() {
    const canAccept = hasScrolledToBottom && agreeTerms.checked && captchaValid;
    acceptBtn.disabled = !canAccept;
    
    if (canAccept) {
        acceptBtn.style.opacity = '1';
        acceptBtn.style.cursor = 'pointer';
    } else {
        acceptBtn.style.opacity = '0.5';
        acceptBtn.style.cursor = 'not-allowed';
    }
}

// Button Event Handlers
acceptBtn.addEventListener('click', () => {
    if (!acceptBtn.disabled) {
        handleAccept();
    }
});

declineBtn.addEventListener('click', () => {
    handleDecline();
});

modalOkBtn.addEventListener('click', () => {
    hideModal();
    // Redirect to main page or dashboard
    showNotification('Bosh sahifaga yo\'naltirilmoqda...', 'info');
    setTimeout(() => {
        // window.location.href = 'index.html'; // Uncomment for actual redirect
        showNotification('Aetherx.film ga xush kelibsiz!', 'success');
    }, 2000);
});

// Accept Handler
function handleAccept() {
    if (!hasScrolledToBottom) {
        showNotification('Avval barcha qoidalarni o\'qing!', 'error');
        return;
    }
    
    if (!agreeTerms.checked) {
        showNotification('Qoidalarni qabul qilish uchun belgi qo\'ying!', 'error');
        return;
    }
    
    if (!captchaValid) {
        showNotification('Captcha kodini to\'g\'ri kiriting!', 'error');
        return;
    }
    
    // Show loading
    showLoading('acceptBtn', 'Tasdiqlash...');
    
    // Simulate processing
    setTimeout(() => {
        hideLoading('acceptBtn', '<i class="fas fa-check-circle"></i> Qabul qilish');
        showModal();
        showNotification('Qoidalar muvaffaqiyatli qabul qilindi!', 'success');
        
        // Save acceptance to localStorage
        localStorage.setItem('aetherx_terms_accepted', 'true');
        localStorage.setItem('aetherx_terms_date', new Date().toISOString());
    }, 2000);
}

// Decline Handler
function handleDecline() {
    const confirmDecline = confirm('Haqiqatan ham sayt qoidalarini rad etmoqchimisiz?\n\nRad etish holida saytdan foydalana olmaysiz.');
    
    if (confirmDecline) {
        showNotification('Qoidalar rad etildi. Saytdan chiqilmoqda...', 'error');
        
        // Clear any stored data
        localStorage.removeItem('aetherx_terms_accepted');
        localStorage.removeItem('aetherx_terms_date');
        
        setTimeout(() => {
            // window.location.href = 'about:blank'; // Uncomment for actual redirect
            showNotification('Saytdan chiqildi.', 'info');
        }, 2000);
    }
}

// Modal Functions
function showModal() {
    modalOverlay.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function hideModal() {
    modalOverlay.classList.remove('show');
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside
modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
        hideModal();
    }
});

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    let icon;
    switch(type) {
        case 'success':
            icon = 'fa-check-circle';
            break;
        case 'error':
            icon = 'fa-exclamation-triangle';
            break;
        case 'info':
            icon = 'fa-info-circle';
            break;
        default:
            icon = 'fa-info-circle';
    }
    
    notification.innerHTML = `
        <i class="fas ${icon}"></i>
        ${message}
    `;
    
    notificationContainer.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Hide notification after 5 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

// Loading States
function showLoading(elementId, loadingText) {
    const element = document.getElementById(elementId);
    const originalText = element.innerHTML;
    element.disabled = true;
    element.setAttribute('data-original-text', originalText);
    element.innerHTML = `<span class="loading"></span>${loadingText}`;
}

function hideLoading(elementId, originalText) {
    const element = document.getElementById(elementId);
    element.disabled = false;
    element.innerHTML = originalText || element.getAttribute('data-original-text');
}

// Dynamic Animations
function addDynamicAnimations() {
    addDynamicFireParticles();
    addDynamicSparks();
    addScrollAnimations();
}

// Add dynamic fire particles
function addDynamicFireParticles() {
    const fireBackground = document.querySelector('.fire-background');
    
    setInterval(() => {
        if (fireBackground.children.length < 20) {
            const particle = document.createElement('div');
            particle.className = 'fire-particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDuration = (Math.random() * 2 + 2) + 's';
            particle.style.animationDelay = '0s';
            
            fireBackground.appendChild(particle);
            
            // Remove particle after animation
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            }, 4000);
        }
    }, 600);
}

// Add dynamic sparks
function addDynamicSparks() {
    const sparksContainer = document.querySelector('.sparks-container');
    
    setInterval(() => {
        if (sparksContainer.children.length < 30) {
            const spark = document.createElement('div');
            spark.className = 'spark';
            spark.style.top = Math.random() * 100 + '%';
            spark.style.left = Math.random() * 100 + '%';
            spark.style.animationDuration = (Math.random() * 2 + 3) + 's';
            spark.style.animationDelay = '0s';
            
            sparksContainer.appendChild(spark);
            
            // Remove spark after animation
            setTimeout(() => {
                if (spark.parentNode) {
                    spark.parentNode.removeChild(spark);
                }
            }, 5000);
        }
    }, 1000);
}

// Add scroll animations for terms sections
function addScrollAnimations() {
    const sections = document.querySelectorAll('.terms-section');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'slideInLeft 0.6s ease-out';
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        observer.observe(section);
    });
}

// Add slide in animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInLeft {
        from {
            opacity: 0;
            transform: translateX(-30px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
`;
document.head.appendChild(style);

// Keyboard Shortcuts
document.addEventListener('keydown', (e) => {
    // Escape key to close modal
    if (e.key === 'Escape' && modalOverlay.classList.contains('show')) {
        hideModal();
    }
    
    // Enter key to accept if button is enabled
    if (e.key === 'Enter' && !acceptBtn.disabled) {
        acceptBtn.click();
    }
    
    // Space key to toggle checkbox
    if (e.key === ' ' && e.target.tagName !== 'INPUT') {
        e.preventDefault();
        agreeTerms.checked = !agreeTerms.checked;
        agreeTerms.dispatchEvent(new Event('change'));
    }
});

// Auto-scroll hint
let scrollHintShown = false;
setTimeout(() => {
    if (!scrollHintShown && !hasScrolledToBottom) {
        showNotification('Qoidalarni o\'qish uchun pastga aylantiring!', 'info');
        scrollHintShown = true;
    }
}, 5000);

// Check if terms were previously accepted
if (localStorage.getItem('aetherx_terms_accepted') === 'true') {
    const acceptedDate = localStorage.getItem('aetherx_terms_date');
    if (acceptedDate) {
        const date = new Date(acceptedDate).toLocaleDateString('uz-UZ');
        showNotification(`Siz ${date} sanasida qoidalarni qabul qilgansiz.`, 'info');
    }
}

// Add mouse trail effect for terms page
let mouseTrail = [];
document.addEventListener('mousemove', (e) => {
    mouseTrail.push({
        x: e.clientX,
        y: e.clientY,
        time: Date.now()
    });
    
    // Keep only recent trail points
    mouseTrail = mouseTrail.filter(point => Date.now() - point.time < 1000);
    
    // Create trail particle occasionally
    if (Math.random() < 0.05) {
        createTrailParticle(e.clientX, e.clientY);
    }
});

function createTrailParticle(x, y) {
    const particle = document.createElement('div');
    particle.style.position = 'fixed';
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    particle.style.width = '2px';
    particle.style.height = '2px';
    particle.style.background = '#ff0000';
    particle.style.borderRadius = '50%';
    particle.style.pointerEvents = 'none';
    particle.style.zIndex = '999';
    particle.style.boxShadow = '0 0 8px #ff0000';
    particle.style.animation = 'trailFade 0.8s ease-out forwards';
    
    document.body.appendChild(particle);
    
    setTimeout(() => {
        if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
        }
    }, 800);
}

// Add trail fade animation
const trailStyle = document.createElement('style');
trailStyle.textContent = `
    @keyframes trailFade {
        0% {
            opacity: 1;
            transform: scale(1);
        }
        100% {
            opacity: 0;
            transform: scale(0);
        }
    }
`;
document.head.appendChild(trailStyle);

// Add reading time estimation
function estimateReadingTime() {
    const text = termsScroll.textContent;
    const wordsPerMinute = 200; // Average reading speed
    const words = text.trim().split(/\s+/).length;
    const readingTime = Math.ceil(words / wordsPerMinute);
    
    showNotification(`Taxminiy o'qish vaqti: ${readingTime} daqiqa`, 'info');
}

// Show reading time after 2 seconds
setTimeout(estimateReadingTime, 2000);