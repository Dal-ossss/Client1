// Scroll Progress Bar
const scrollProgress = document.getElementById('scrollProgress');
window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    scrollProgress.style.width = scrolled + '%';
});

// Create Floating Particles
const particlesContainer = document.getElementById('particles');
const particleCount = 20;

for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 15 + 's';
    particle.style.animationDuration = (15 + Math.random() * 10) + 's';
    particle.style.width = (2 + Math.random() * 4) + 'px';
    particle.style.height = particle.style.width;
    particlesContainer.appendChild(particle);
}

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Portfolio Filtering
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        button.classList.add('active');
        
        // Get filter value
        const filterValue = button.getAttribute('data-filter');
        
        // Filter items with animation
        portfolioItems.forEach(item => {
            if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                item.style.display = 'block';
                item.style.animation = 'fadeInUp 0.5s ease forwards';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// Smooth Scrolling for Navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// Scroll Animations - Intersection Observer
const observerOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
};

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            
            // Trigger staggered animations for child items
            const staggerItems = entry.target.querySelectorAll('.stagger-item');
            staggerItems.forEach((item, index) => {
                setTimeout(() => {
                    item.classList.add('is-visible');
                }, index * 100);
            });
        }
    });
}, observerOptions);

// Observe fade-in sections
document.querySelectorAll('.fade-in-section').forEach(section => {
    fadeObserver.observe(section);
});

// Observe individual animate-on-scroll elements
document.querySelectorAll('.animate-on-scroll').forEach(el => {
    fadeObserver.observe(el);
});

// Counter Animation
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counters = entry.target.querySelectorAll('h3[data-target]');
            counters.forEach(counter => {
                const target = parseInt(counter.getAttribute('data-target'));
                const duration = 2000;
                const increment = target / (duration / 16);
                let current = 0;
                
                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        counter.textContent = Math.floor(current) + '+';
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target + '+';
                    }
                };
                
                updateCounter();
            });
            counterObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

const aboutStats = document.querySelector('.about-stats');
if (aboutStats) {
    counterObserver.observe(aboutStats);
}

// Portfolio Image Modal
const portfolioGrid = document.querySelector('.portfolio-grid');
const imageModal = document.getElementById('imageModal');
const modalImage = document.getElementById('modalImage');
const closeModal = document.querySelector('.close-modal');

if (portfolioGrid && imageModal && modalImage && closeModal) {
    // Open modal when clicking on any portfolio item
    portfolioGrid.addEventListener('click', function(e) {
        const portfolioItem = e.target.closest('.portfolio-item');
        if (portfolioItem) {
            const img = portfolioItem.querySelector('img');
            if (img) {
                modalImage.src = img.src;
                modalImage.alt = img.alt;
                imageModal.classList.add('active');
                document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
            }
        }
    });

    // Close modal when clicking the close button
    closeModal.addEventListener('click', function() {
        imageModal.classList.remove('active');
        document.body.style.overflow = '';
    });

    // Close modal when clicking outside the image
    imageModal.addEventListener('click', function(e) {
        if (e.target === imageModal) {
            imageModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Close modal when pressing Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && imageModal.classList.contains('active')) {
            imageModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// Contact Form Handling (only if form exists)
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = contactForm.name.value;
        const email = contactForm.email.value;
        const subject = contactForm.subject.value;
        const message = contactForm.message.value;
        
        // Basic validation
        if (!name || !email || !subject || !message) {
            showMessage('Please fill in all fields.', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showMessage('Please enter a valid email address.', 'error');
            return;
        }
        
        // Simulate form submission
        showMessage('Message sent successfully! (This is a demo)', 'success');
        contactForm.reset();
    });
}

// Email validation function
function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// Show message function
function showMessage(message, type) {
    if (!contactForm) return;
    
    // Remove existing messages
    const existingMessage = document.querySelector('.message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create message element
    const messageDiv = document.createElement('div');
    messageDiv.className = `message message-${type}`;
    messageDiv.textContent = message;
    
    // Add to form
    contactForm.appendChild(messageDiv);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        messageDiv.remove();
    }, 3000);
}

// Add scroll effect to header/nav
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    
    if (window.scrollY > 100) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// Portfolio item hover effects enhancement
portfolioItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'translateY(-10px)';
        item.style.boxShadow = '0 20px 40px rgba(0,0,0,0.2)';
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.transform = 'translateY(0)';
        item.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const heroImage = document.querySelector('.hero-image');
    const heroText = document.querySelector('.hero-text');
    
    if (heroImage && scrolled < window.innerHeight) {
        heroImage.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
    if (heroText && scrolled < window.innerHeight) {
        heroText.style.transform = `translateY(${scrolled * 0.2}px)`;
    }
});

// Initialize portfolio with 'all' filter active
document.addEventListener('DOMContentLoaded', () => {
    // Trigger the 'all' filter to show all items initially
    const allButton = document.querySelector('.filter-btn[data-filter="all"]');
    if (allButton) {
        allButton.click();
    }
    
    // Add staggered animation delay to portfolio items
    portfolioItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.05}s`;
    });
    
    // Add staggered animation delay to service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
    
    // Add staggered animation delay to skill categories
    const skillCategories = document.querySelectorAll('.skill-category');
    skillCategories.forEach((cat, index) => {
        cat.style.animationDelay = `${index * 0.1}s`;
    });
});

// Typing effect for hero title
document.addEventListener('DOMContentLoaded', () => {
    const typingText = document.querySelector('.typing-text');
    if (typingText) {
        const text = typingText.textContent;
        typingText.textContent = '';
        typingText.style.visibility = 'visible';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                typingText.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        };
        
        // Start typing after a delay
        setTimeout(typeWriter, 1000);
    }
});

// Add magnetic effect to buttons
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });
    
    btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0, 0)';
    });
});

// Skill items hover animation
document.querySelectorAll('.skill-category li').forEach(li => {
    li.addEventListener('mouseenter', () => {
        li.style.paddingLeft = '30px';
    });
    
    li.addEventListener('mouseleave', () => {
        li.style.paddingLeft = '20px';
    });
});

// Video Modal for Profile Picture
const profileImage = document.getElementById('profileImage');
const playButton = document.getElementById('playButton');
const heroImageContainer = document.querySelector('.hero-image');
const videoModal = document.getElementById('videoModal');
const profileVideo = document.getElementById('profileVideo');
const closeVideoModal = document.querySelector('.close-video-modal');

if (heroImageContainer && videoModal && profileVideo && closeVideoModal) {
    // Open video modal when clicking on profile image or play button
    heroImageContainer.addEventListener('click', function() {
        videoModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        profileVideo.currentTime = 0; // Reset video to beginning
        profileVideo.play();
    });

    // Close video modal when clicking the close button
    closeVideoModal.addEventListener('click', function() {
        videoModal.classList.remove('active');
        document.body.style.overflow = '';
        profileVideo.pause();
    });

    // Close video modal when clicking outside the video
    videoModal.addEventListener('click', function(e) {
        if (e.target === videoModal) {
            videoModal.classList.remove('active');
            document.body.style.overflow = '';
            profileVideo.pause();
        }
    });

    // Close video modal when pressing Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && videoModal.classList.contains('active')) {
            videoModal.classList.remove('active');
            document.body.style.overflow = '';
            profileVideo.pause();
        }
    });

    // Pause video when it ends
    profileVideo.addEventListener('ended', function() {
        videoModal.classList.remove('active');
        document.body.style.overflow = '';
    });
}
