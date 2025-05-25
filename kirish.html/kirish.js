// DOM Elements
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const loginToggle = document.getElementById('loginToggle');
const registerToggle = document.getElementById('registerToggle');
const forgotPasswordLink = document.getElementById('forgotPasswordLink');
const refreshCaptchaBtn = document.getElementById('refreshCaptcha');
const captchaCode = document.getElementById('captchaCode');
const googleLoginBtn = document.getElementById('googleLogin');
const facebookLoginBtn = document.getElementById('facebookLogin');
const profileImageInput = document.getElementById('profileImage');
const fileUploadLabel = document.querySelector('.file-upload-label');
const loginPasswordToggle = document.getElementById('loginPasswordToggle');
const registerPasswordToggle = document.getElementById('registerPasswordToggle');
const notificationContainer = document.getElementById('notificationContainer');

// Current captcha value
let currentCaptcha = 'AB7K9';

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    generateCaptcha();
    showNotification('Aetherx.film - Filmlar dunyosiga hush kelibsiz!', 'info');
    addInputAnimations();
});

// Form Toggle Functions
loginToggle.addEventListener('click', () => {
    switchForm('login');
});

registerToggle.addEventListener('click', () => {
    switchForm('register');
});

function switchForm(formType) {
    if (formType === 'login') {
        // Switch to login
        loginForm.classList.add('active');
        registerForm.classList.remove('active');
        loginToggle.classList.add('active');
        registerToggle.classList.remove('active');
    } else {
        // Switch to register
        registerForm.classList.add('active');
        loginForm.classList.remove('active');
        registerToggle.classList.add('active');
        loginToggle.classList.remove('active');
        generateCaptcha();
    }
}

// Password Toggle Functions
loginPasswordToggle.addEventListener('click', () => {
    togglePassword('loginPassword', 'loginPasswordToggle');
});

registerPasswordToggle.addEventListener('click', () => {
    togglePassword('registerPassword', 'registerPasswordToggle');
});

function togglePassword(inputId, toggleId) {
    const input = document.getElementById(inputId);
    const toggle = document.getElementById(toggleId);
    const icon = toggle.querySelector('i');
    
    if (input.type === 'password') {
        input.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        input.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
}

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
}

refreshCaptchaBtn.addEventListener('click', () => {
    generateCaptcha();
    showNotification('Captcha yangilandi!', 'info');
});

// File Upload Handling
profileImageInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            fileUploadLabel.innerHTML = `
                <div class="upload-icon">
                    <i class="fas fa-check-circle"></i>
                </div>
                <span class="upload-text">${file.name}</span>
            `;
            fileUploadLabel.style.borderColor = '#00ff00';
            fileUploadLabel.style.color = '#00ff00';
        };
        reader.readAsDataURL(file);
        showNotification('Rasm muvaffaqiyatli tanlandi!', 'success');
    }
});

// Form Submissions
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    handleLogin();
});

registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    handleRegister();
});

function handleLogin() {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    // Validation
    if (!email || !password) {
        showNotification('Barcha maydonlarni to\'ldiring!', 'error');
        return;
    }

    if (!isValidEmail(email) && !isValidUsername(email)) {
        showNotification('Email yoki login noto\'g\'ri formatda!', 'error');
        return;
    }

    if (password.length < 6) {
        showNotification('Parol kamida 6 ta belgidan iborat bo\'lishi kerak!', 'error');
        return;
    }

    // Show loading
    showLoading('loginBtn', 'Kirilmoqda...');
    
    // Simulate API call
    setTimeout(() => {
        hideLoading('loginBtn', 'Kirish');
        showNotification('Aetherx.film - Filmlar dunyosiga hush kelibsiz!', 'success');
        
        // Add success animation
        const container = document.querySelector('.cinema-frame');
        container.style.animation = 'successPulse 0.6s ease-in-out';
        setTimeout(() => {
            container.style.animation = 'containerGlow 3s ease-in-out infinite alternate';
        }, 600);
        
        // Redirect logic here
        setTimeout(() => {
            showNotification('Bosh sahifaga yo\'naltirilmoqda...', 'info');
        }, 2000);
    }, 2000);
}

function handleRegister() {
    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const captchaInput = document.getElementById('captchaInput').value;

    // Validation
    if (!fullName || !email || !password || !captchaInput) {
        showNotification('Barcha maydonlarni to\'ldiring!', 'error');
        return;
    }

    if (!isValidEmail(email)) {
        showNotification('Email noto\'g\'ri formatda!', 'error');
        return;
    }

    if (password.length < 8) {
        showNotification('Parol kamida 8 ta belgidan iborat bo\'lishi kerak!', 'error');
        return;
    }

    if (!isStrongPassword(password)) {
        showNotification('Parol kamida bitta katta harf, kichik harf va raqam bo\'lishi kerak!', 'error');
        return;
    }

    if (captchaInput.toUpperCase() !== currentCaptcha) {
        showNotification('Captcha kodi noto\'g\'ri!', 'error');
        generateCaptcha();
        document.getElementById('captchaInput').value = '';
        return;
    }

    // Show loading
    showLoading('registerBtn', 'Ro\'yxatdan o\'tilmoqda...');
    
    // Simulate API call
    setTimeout(() => {
        hideLoading('registerBtn', 'Tasdiqlash');
        showNotification('Aetherx.film - Filmlar dunyosiga hush kelibsiz! Ro\'yxatdan o\'tish muvaffaqiyatli yakunlandi.', 'success');
        
        // Add success animation
        const container = document.querySelector('.cinema-frame');
        container.style.animation = 'successPulse 0.6s ease-in-out';
        setTimeout(() => {
            container.style.animation = 'containerGlow 3s ease-in-out infinite alternate';
        }, 600);
        
        // Clear form
        registerForm.reset();
        fileUploadLabel.innerHTML = `
            <div class="upload-icon">
                <i class="fas fa-cloud-upload-alt"></i>
            </div>
            <span class="upload-text">Rasm tanlang</span>
        `;
        fileUploadLabel.style.borderColor = '#333';
        fileUploadLabel.style.color = '#ccc';
        
        // Switch to login after successful registration
        setTimeout(() => {
            switchForm('login');
            showNotification('Endi tizimga kirishingiz mumkin!', 'info');
        }, 3000);
    }, 2500);
}

// Social Login Handlers
googleLoginBtn.addEventListener('click', () => {
    showNotification('Google orqali kirish...', 'info');
    showLoading('googleLogin', 'Ulanmoqda...');
    
    setTimeout(() => {
        hideLoading('googleLogin', '<i class="fab fa-google"></i> Google');
        showNotification('Aetherx.film online kino teatrga xush kelibsiz!', 'success');
    }, 1500);
});

facebookLoginBtn.addEventListener('click', () => {
    showNotification('Facebook orqali kirish...', 'info');
    showLoading('facebookLogin', 'Ulanmoqda...');
    
    setTimeout(() => {
        hideLoading('facebookLogin', '<i class="fab fa-facebook-f"></i> Facebook');
        showNotification('Aetherx.film online kino teatrga xush kelibsiz!', 'success');
    }, 1500);
});

// Forgot Password Handler
forgotPasswordLink.addEventListener('click', (e) => {
    e.preventDefault();
    const email = prompt('Parolni tiklash uchun emailingizni kiriting:');
    if (email && isValidEmail(email)) {
        showNotification('Parolni tiklash havolasi emailingizga yuborildi!', 'info');
    } else if (email) {
        showNotification('Email noto\'g\'ri formatda!', 'error');
    }
});

// Utility Functions
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidUsername(username) {
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    return usernameRegex.test(username);
}

function isStrongPassword(password) {
    const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/;
    return strongRegex.test(password);
}

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
            icon = 'fa-exclamation-circle';
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

// Input Animations
function addInputAnimations() {
    const inputs = document.querySelectorAll('input');
    
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            const formGroup = input.closest('.form-group');
            if (formGroup) {
                formGroup.style.transform = 'scale(1.02)';
                formGroup.style.transition = 'transform 0.3s ease';
            }
        });
        
        input.addEventListener('blur', () => {
            const formGroup = input.closest('.form-group');
            if (formGroup) {
                formGroup.style.transform = 'scale(1)';
            }
        });
        
        // Real-time validation feedback
        input.addEventListener('input', () => {
            validateInput(input);
        });
    });
}

function validateInput(input) {
    const value = input.value;
    const inputType = input.type;
    const inputId = input.id;
    
    // Remove previous validation classes
    input.classList.remove('valid', 'invalid');
    
    if (value.length === 0) return;
    
    let isValid = true;
    
    switch(inputId) {
        case 'loginEmail':
        case 'registerEmail':
            isValid = isValidEmail(value) || (inputId === 'loginEmail' && isValidUsername(value));
            break;
        case 'loginPassword':
            isValid = value.length >= 6;
            break;
        case 'registerPassword':
            isValid = value.length >= 8 && isStrongPassword(value);
            break;
        case 'fullName':
            isValid = value.length >= 2;
            break;
        case 'captchaInput':
            isValid = value.toUpperCase() === currentCaptcha;
            break;
    }
    
    if (isValid) {
        input.style.borderColor = '#00ff00';
        input.style.boxShadow = '0 0 10px rgba(0, 255, 0, 0.3)';
    } else {
        input.style.borderColor = '#ff4444';
        input.style.boxShadow = '0 0 10px rgba(255, 68, 68, 0.3)';
    }
}

// Add success animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes successPulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
`;
document.head.appendChild(style);

// Add dynamic fire particles
function addDynamicFireParticles() {
    const fireBackground = document.querySelector('.fire-background');
    
    setInterval(() => {
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
    }, 500);
}

// Add dynamic sparks
function addDynamicSparks() {
    const sparksContainer = document.querySelector('.sparks-container');
    
    setInterval(() => {
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
    }, 800);
}

// Initialize dynamic animations
addDynamicFireParticles();
addDynamicSparks();

// Add keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Enter key to submit active form
    if (e.key === 'Enter' && e.target.tagName !== 'BUTTON') {
        const activeForm = document.querySelector('.auth-form.active');
        if (activeForm) {
            const submitBtn = activeForm.querySelector('.submit-btn');
            if (submitBtn && !submitBtn.disabled) {
                submitBtn.click();
            }
        }
    }
    
    // Tab key to switch between forms
    if (e.key === 'Tab' && e.ctrlKey) {
        e.preventDefault();
        const isLoginActive = loginForm.classList.contains('active');
        switchForm(isLoginActive ? 'register' : 'login');
    }
});

// Add mouse trail effect
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
    if (Math.random() < 0.1) {
        createTrailParticle(e.clientX, e.clientY);
    }
});

function createTrailParticle(x, y) {
    const particle = document.createElement('div');
    particle.style.position = 'fixed';
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    particle.style.width = '3px';
    particle.style.height = '3px';
    particle.style.background = '#ff0000';
    particle.style.borderRadius = '50%';
    particle.style.pointerEvents = 'none';
    particle.style.zIndex = '999';
    particle.style.boxShadow = '0 0 10px #ff0000';
    particle.style.animation = 'trailFade 1s ease-out forwards';
    
    document.body.appendChild(particle);
    
    setTimeout(() => {
        if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
        }
    }, 1000);
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