// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const mobileMenu = document.querySelector('.mobile-menu');

mobileMenuBtn.addEventListener('click', () => {
  mobileMenuBtn.classList.toggle('active');
  mobileMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
const mobileLinks = document.querySelectorAll('.mobile-menu a');
mobileLinks.forEach(link => {
  link.addEventListener('click', () => {
    mobileMenuBtn.classList.remove('active');
    mobileMenu.classList.remove('active');
  });
});

// Portfolio Filtering
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Remove active class from all buttons
    filterBtns.forEach(btn => btn.classList.remove('active'));
    
    // Add active class to clicked button
    btn.classList.add('active');
    
    // Get filter value
    const filterValue = btn.getAttribute('data-filter');
    
    // Filter portfolio items
    portfolioItems.forEach(item => {
      if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
        item.style.display = 'block';
        setTimeout(() => {
          item.style.opacity = '1';
          item.style.transform = 'scale(1)';
        }, 10);
      } else {
        item.style.opacity = '0';
        item.style.transform = 'scale(0.8)';
        setTimeout(() => {
          item.style.display = 'none';
        }, 300);
      }
    });
  });
});

// Testimonial Slider
const testimonialSlider = document.querySelector('.testimonials-slider');
const testimonialContainers = document.querySelectorAll('.testimonial-container');
const prevBtn = document.querySelector('.testimonial-prev');
const nextBtn = document.querySelector('.testimonial-next');
const dots = document.querySelectorAll('.dot');

let currentIndex = 0;
const totalSlides = testimonialContainers.length;

// Function to update slider position
function updateSlider() {
  testimonialSlider.style.transform = `translateX(-${currentIndex * 100}%)`;
  
  // Update dots
  dots.forEach((dot, index) => {
    dot.classList.toggle('active', index === currentIndex);
  });
}

// Next button click
nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % totalSlides;
  updateSlider();
});

// Previous button click
prevBtn.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
  updateSlider();
});

// Dot click
dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    currentIndex = index;
    updateSlider();
  });
});

// Auto slide (optional)
let autoSlideInterval;

function startAutoSlide() {
  autoSlideInterval = setInterval(() => {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateSlider();
  }, 5000);
}

function stopAutoSlide() {
  clearInterval(autoSlideInterval);
}

// Start auto slide
startAutoSlide();

// Stop auto slide on hover
testimonialSlider.addEventListener('mouseenter', stopAutoSlide);
testimonialSlider.addEventListener('mouseleave', startAutoSlide);

// Contact Form Submission
const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const message = document.getElementById('message').value;
    
    // Here you would typically send the form data to a server
    // For demonstration, we'll just show an alert
    alert(`Thank you for your message, ${name}! We will get back to you soon.`);
    
    // Reset form
    contactForm.reset();
  });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
      const headerHeight = document.querySelector('.header').offsetHeight;
      const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// Scroll animations
const animateOnScroll = () => {
  const elements = document.querySelectorAll('.service-card, .portfolio-item, .testimonial-card, .contact-card, .publication-card, .about-content > div');
  
  elements.forEach(element => {
    const elementPosition = element.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    
    if (elementPosition < windowHeight - 100) {
      element.classList.add('animate-in');
    }
  });
};

// Add animation class
document.addEventListener('DOMContentLoaded', () => {
  // Add animation CSS
  const style = document.createElement('style');
  style.textContent = `
    .service-card, .portfolio-item, .testimonial-card, .contact-card, .publication-card, .about-content > div {
      opacity: 0;
      transform: translateY(30px);
      transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .animate-in {
      opacity: 1;
      transform: translateY(0);
    }
  `;
  document.head.appendChild(style);
  
  // Initial check
  animateOnScroll();
  
  // Check on scroll
  window.addEventListener('scroll', animateOnScroll);
});

// Sticky header effect
window.addEventListener('scroll', () => {
  const header = document.querySelector('.header');
  
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
    // Add scrolled style
    if (!document.querySelector('#header-scroll-style')) {
      const style = document.createElement('style');
      style.id = 'header-scroll-style';
      style.textContent = `
        .header.scrolled {
          box-shadow: var(--shadow);
          background-color: rgba(255, 255, 255, 0.98);
        }
      `;
      document.head.appendChild(style);
    }
  } else {
    header.classList.remove('scrolled');
  }
});