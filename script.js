// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        if (hamburger) {
            hamburger.classList.remove('active');
        }
    });
});

// Active Navigation Link on Scroll
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const offsetTop = target.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for Fade-in Animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for storytelling animations
const elementsToAnimate = document.querySelectorAll(
    '.chapter-content, .project-card, .milestone, .achievement-card, .contact-method, .future-stat'
);

elementsToAnimate.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(el);
});

// Disable animations for hero section
const heroSection = document.querySelector('.hero');
if (heroSection) {
    const heroElements = heroSection.querySelectorAll('.hero-content, .hero-actions, .hero-social');
    heroElements.forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
    });
}

// Stagger animation for milestones and achievements
const staggerObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
        }
    });
}, observerOptions);

// Apply stagger to milestone and achievement grids
document.querySelectorAll('.milestone, .achievement-card, .future-stat').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    staggerObserver.observe(el);
});

// Navbar Background on Scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
});

// Dynamic Year in Footer
const currentYear = new Date().getFullYear();
const yearElement = document.getElementById('current-year');
if (yearElement) {
    yearElement.textContent = currentYear;
}

// Parallax effect for hero section - DISABLED
// window.addEventListener('scroll', () => {
//     const scrolled = window.pageYOffset;
//     const hero = document.querySelector('.hero');
//     if (hero && scrolled < window.innerHeight) {
//         hero.style.transform = `translateY(${scrolled * 0.5}px)`;
//         hero.style.opacity = 1 - (scrolled / window.innerHeight) * 0.5;
//     }
// });

// Add reading progress indicator
const createReadingProgress = () => {
    const progressBar = document.createElement('div');
    progressBar.id = 'reading-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(135deg, #007acc, #00bcd4);
        z-index: 9999;
        transition: width 0.1s ease;
        box-shadow: 0 2px 15px rgba(0, 122, 204, 0.5);
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = `${scrolled}%`;
    });
};

createReadingProgress();

// Smooth reveal for chapter sections
const chapterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
        }
    });
}, {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
});

document.querySelectorAll('.chapter').forEach(chapter => {
    chapterObserver.observe(chapter);
});

// Add hover effect to project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.borderColor = '#87a96b';
    });
    card.addEventListener('mouseleave', function() {
        this.style.borderColor = '#f1f5f9';
    });
});

// Animate numbers in stats (optional enhancement)
const animateNumbers = () => {
    const stats = document.querySelectorAll('.stat-number, .achievement-value');
    
    const numberObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                const target = entry.target;
                const text = target.textContent;
                const number = parseInt(text.replace(/[^0-9]/g, ''));
                
                if (!isNaN(number) && number > 0) {
                    target.classList.add('animated');
                    let current = 0;
                    const increment = number / 30;
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= number) {
                            target.textContent = text;
                            clearInterval(timer);
                        } else {
                            if (text.includes('+')) {
                                target.textContent = Math.floor(current) + '+';
                            } else if (text.includes('%')) {
                                target.textContent = Math.floor(current) + '%';
                            } else if (text.includes('k')) {
                                target.textContent = Math.floor(current / 1000) + 'k+';
                            } else {
                                target.textContent = Math.floor(current);
                            }
                        }
                    }, 30);
                }
            }
        });
    }, { threshold: 0.5 });

    stats.forEach(stat => numberObserver.observe(stat));
};

// Only animate numbers if they're simple integers (not infinity symbol)
setTimeout(animateNumbers, 1000);

// Console message for developers
console.log('%c📖 Welcome to My Data Science Journey!', 'color: #007acc; font-size: 20px; font-weight: bold;');
console.log('%cThis portfolio tells the story of my journey from curiosity to production ML.', 'color: #4fc3f7; font-size: 14px;');
console.log('%cInterested in the code? Check out the repository!', 'color: #858585; font-size: 12px;');

// Performance optimization: Throttle scroll events
let ticking = false;
const optimizedScroll = () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            // Scroll-dependent updates
            ticking = false;
        });
        ticking = true;
    }
};

// Add smooth transitions to skill badges
document.querySelectorAll('.skill-badge').forEach(badge => {
    badge.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px) scale(1.05)';
    });
    badge.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});
