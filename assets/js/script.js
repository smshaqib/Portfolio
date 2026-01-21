// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

// Check for saved theme preference or default to 'dark'
const currentTheme = window.localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', currentTheme);

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const theme = html.getAttribute('data-theme');
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        html.setAttribute('data-theme', newTheme);
        window.localStorage.setItem('theme', newTheme);
    });
}

// Sidebar (mobile) toggle
const sidebar = document.getElementById('sidebar');
const sidebarToggle = document.getElementById('sidebarToggle');
const sidebarBackdrop = document.getElementById('sidebarBackdrop');

const openSidebar = () => {
    if (!sidebar) return;
    sidebar.classList.add('open');
    if (sidebarBackdrop) sidebarBackdrop.classList.add('open');
};

const closeSidebar = () => {
    if (!sidebar) return;
    sidebar.classList.remove('open');
    if (sidebarBackdrop) sidebarBackdrop.classList.remove('open');
};

if (sidebarToggle) {
    sidebarToggle.addEventListener('click', () => {
        if (!sidebar) return;
        const isOpen = sidebar.classList.contains('open');
        if (isOpen) closeSidebar();
        else openSidebar();
    });
}

if (sidebarBackdrop) {
    sidebarBackdrop.addEventListener('click', closeSidebar);
}

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 24;
            const targetPosition = target.offsetTop - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
        // Close sidebar on mobile after navigation
        closeSidebar();
    });
});

// Navbar scroll effect (legacy navbar may not exist anymore; keep safe)
const navbar = document.getElementById('navbar');
if (navbar) {
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        if (currentScroll > 100) navbar.classList.add('scrolled');
        else navbar.classList.remove('scrolled');
    });
}

// Intersection Observer for Fade-in Animations
const fadeElements = document.querySelectorAll('.fade-in');

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animationPlayState = 'running';
            fadeObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

fadeElements.forEach((el, index) => {
    el.style.animationDelay = `${index * 0.1}s`;
    el.style.animationPlayState = 'paused';
    fadeObserver.observe(el);
});

// Parallax Effect for Hero Section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-content');
    const heroVisual = document.querySelector('.hero-visual');

    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.3}px)`;
        // Faster fade out to prevent overlap with next section
        hero.style.opacity = Math.max(0, 1 - (scrolled / window.innerHeight) * 1.5);
    }

    if (heroVisual && scrolled < window.innerHeight) {
        heroVisual.style.transform = `translateY(${scrolled * 0.2}px)`;
    }
});

// Add active state to navigation links based on scroll position
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.sidebar-link, .nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').slice(1) === current) {
            item.classList.add('active');
        }
    });
});

// Add typing effect to hero title (optional enhancement)
const heroTitle = document.querySelector('.hero-content h1');
if (heroTitle) {
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    let i = 0;

    const typeWriter = () => {
        if (i < text.length) {
            heroTitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        }
    };

    // Start typing effect after a short delay
    setTimeout(typeWriter, 500);
}

// Counter animation for stats
const animateCounter = (element, target, duration = 2000) => {
    let start = 0;
    const increment = target / (duration / 16);

    const updateCounter = () => {
        start += increment;
        if (start < target) {
            if (target % 1 !== 0) {
                element.textContent = start.toFixed(2);
            } else {
                element.textContent = Math.floor(start) + '+';
            }
            requestAnimationFrame(updateCounter);
        } else {
            if (target % 1 !== 0) {
                element.textContent = target.toFixed(2);
            } else {
                element.textContent = target + '+';
            }
        }
    };

    updateCounter();
};

// Trigger counter animation when stats come into view
const statNumbers = document.querySelectorAll('.stat-number');
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = parseFloat(entry.target.textContent);
            entry.target.textContent = '0';
            animateCounter(entry.target, target);
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(stat => {
    statsObserver.observe(stat);
});

// Add smooth reveal animation for cards on scroll
const cards = document.querySelectorAll('.project-card, .research-card, .award-card, .skill-card, .experience-card');

const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
            cardObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.6s ease';
    cardObserver.observe(card);
});

// Easter egg: Console message
console.log('%c👋 Hello, curious developer!', 'font-size: 20px; font-weight: bold; color: #6366f1;');
console.log('%cInterested in how this was built? Check out the source!', 'font-size: 14px; color: #9ca3af;');
console.log('%c🚀 Built with vanilla HTML, CSS, and JavaScript', 'font-size: 12px; color: #8b5cf6;');
console.log('%c📧 Contact: shaqib15-4614@diu.edu.bd', 'font-size: 12px; color: #ec4899;');

// Preload images for better performance
const preloadImages = () => {
    const images = document.querySelectorAll('img[data-src]');
    images.forEach(img => {
        img.src = img.dataset.src;
    });
};

// Call preload after page load
window.addEventListener('load', preloadImages);

// Add copy email functionality
const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
emailLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const email = link.textContent;
        navigator.clipboard.writeText(email).then(() => {
            // Create temporary tooltip
            const tooltip = document.createElement('div');
            tooltip.textContent = 'Email copied!';
            tooltip.style.cssText = `
                        position: fixed;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        background: var(--accent-primary);
                        color: white;
                        padding: 1rem 2rem;
                        border-radius: 8px;
                        font-weight: 600;
                        z-index: 10000;
                        animation: fadeInUp 0.3s ease;
                    `;
            document.body.appendChild(tooltip);

            setTimeout(() => {
                tooltip.style.animation = 'fadeOut 0.3s ease';
                setTimeout(() => tooltip.remove(), 300);
            }, 2000);

            // Also open email client
            window.location.href = link.href;
        }).catch(err => {
            console.error('Failed to copy email:', err);
            window.location.href = link.href;
        });
    });
});
