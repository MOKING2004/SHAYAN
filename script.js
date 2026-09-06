// script.js

// ========== مدیریت حالت دارک/روشن ==========
const themeToggleBtn = document.createElement('button');
themeToggleBtn.innerHTML = '🌙';
themeToggleBtn.setAttribute('aria-label', 'تغییر حالت نمایش');
themeToggleBtn.id = 'theme-toggle';
themeToggleBtn.style.cssText = `
    position: fixed;
    bottom: 25px;
    left: 25px;
    z-index: 1000;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 2px solid var(--color-gold);
    background: var(--color-surface);
    color: var(--color-gold);
    font-size: 1.5rem;
    cursor: pointer;
    box-shadow: var(--shadow-md);
    transition: all var(--transition-base);
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: var(--font-family);
`;
document.body.appendChild(themeToggleBtn);

let currentTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', currentTheme);
updateThemeIcon();

themeToggleBtn.addEventListener('click', () => {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    localStorage.setItem('theme', currentTheme);
    updateThemeIcon();
    themeToggleBtn.style.transform = 'scale(0.9)';
    setTimeout(() => {
        themeToggleBtn.style.transform = 'scale(1)';
    }, 150);
});

function updateThemeIcon() {
    themeToggleBtn.innerHTML = currentTheme === 'dark' ? '☀️' : '🌙';
}

// ========== سیستم اعلان (Toast) ==========
function showToast(message, type = 'success') {
    let container = document.getElementById('toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    container.appendChild(toast);

    // حذف خودکار بعد از 3 ثانیه
    setTimeout(() => {
        if (toast.parentNode) {
            toast.remove();
        }
    }, 3000);
}

// ========== مدیریت منوی همبرگری ==========
function initHamburgerMenu() {
    const hamburger = document.querySelector('.hamburger');
    const mainNav = document.querySelector('.main-nav');
    if (hamburger && mainNav) {
        hamburger.addEventListener('click', () => {
            mainNav.classList.toggle('open');
            hamburger.classList.toggle('active');
        });

        // بستن منو هنگام کلیک روی لینک
        mainNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mainNav.classList.remove('open');
                hamburger.classList.remove('active');
            });
        });
    }
}

// ========== انیمیشن‌های ورود عمومی ==========
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    if (animatedElements.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
}

// ========== نرم‌کردن اسکرول برای لینک‌های داخلی ==========
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

// ========== اجرای توابع اولیه ==========
document.addEventListener('DOMContentLoaded', () => {
    initHamburgerMenu();
    initScrollAnimations();
    initSmoothScroll();
});

// ========== در دسترس قرار دادن showToast در سطح سراسری ==========
window.showToast = showToast;
