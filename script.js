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
`;
document.body.appendChild(themeToggleBtn);

// بررسی حالت ذخیره‌شده در localStorage
let currentTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', currentTheme);
updateThemeIcon();

themeToggleBtn.addEventListener('click', () => {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    localStorage.setItem('theme', currentTheme);
    updateThemeIcon();
    // انیمیشن کوچک
    themeToggleBtn.style.transform = 'scale(0.9)';
    setTimeout(() => {
        themeToggleBtn.style.transform = 'scale(1)';
    }, 150);
});

function updateThemeIcon() {
    if (currentTheme === 'dark') {
        themeToggleBtn.innerHTML = '☀️';
    } else {
        themeToggleBtn.innerHTML = '🌙';
    }
}

// ========== انیمیشن‌های ورود نرم ==========
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// عناصری که باید انیمیشن بگیرند
const animatedElements = document.querySelectorAll('.feature-card, .hero h1, .hero p, .hero-actions');
animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
});

// ========== افکت‌های اضافی برای کارت‌ها ==========
document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    });

    card.addEventListener('mouseleave', () => {
        card.style.setProperty('--mouse-x', '50%');
        card.style.setProperty('--mouse-y', '50%');
    });
});

// ========== نرم‌کردن اسکرول برای لینک‌های داخلی ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
