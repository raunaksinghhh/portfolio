// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const mobileMenu = document.querySelector('.mobile-menu');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    
    // Change icon based on menu state
    const icon = mobileMenuBtn.querySelector('i');
    if (mobileMenu.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Close mobile menu when clicking on a link
const mobileLinks = document.querySelectorAll('.mobile-menu a');
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        const icon = mobileMenuBtn.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80, // Adjust for header height
                behavior: 'smooth'
            });
        }
    });
});

// Simple testimonial slider
let currentSlide = 0;
const testimonialSlides = document.querySelectorAll('.testimonial-slide');
const totalSlides = testimonialSlides.length;

// Hide all slides except the first one
if (testimonialSlides.length > 0) {
    testimonialSlides.forEach((slide, index) => {
        if (index !== 0) {
            slide.style.display = 'none';
        }
    });
}

// Function to show the next slide
function nextSlide() {
    testimonialSlides[currentSlide].style.display = 'none';
    currentSlide = (currentSlide + 1) % totalSlides;
    testimonialSlides[currentSlide].style.display = 'block';
    testimonialSlides[currentSlide].style.opacity = 0;
    
    // Fade in animation
    let opacity = 0;
    const fadeIn = setInterval(() => {
        opacity += 0.1;
        testimonialSlides[currentSlide].style.opacity = opacity;
        if (opacity >= 1) clearInterval(fadeIn);
    }, 30);
}

// Auto-rotate testimonials every 5 seconds if there are multiple slides
if (totalSlides > 1) {
    setInterval(nextSlide, 5000);
}

// Reveal animations on scroll
const revealElements = document.querySelectorAll('.tech-item, .project-card, .timeline-item');

function checkReveal() {
    const triggerBottom = window.innerHeight * 0.8;
    
    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        
        if (elementTop < triggerBottom) {
            element.style.opacity = 1;
            element.style.transform = 'translateY(0)';
        }
    });
}

// Set initial state for reveal elements
revealElements.forEach(element => {
    element.style.opacity = 0;
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
});

// Check for elements to reveal on initial load and scroll
window.addEventListener('load', checkReveal);
window.addEventListener('scroll', checkReveal);

// Add active class to navigation links based on scroll position
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

function highlightNavLink() {
    const scrollPosition = window.scrollY + 100; // Adjust for header height
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Add active class to nav links on scroll
window.addEventListener('scroll', highlightNavLink);
window.addEventListener('load', highlightNavLink); 