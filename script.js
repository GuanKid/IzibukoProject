// Utility function to throttle function calls
function throttle(func, limit) {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    }
  }
  
  // Toggle navigation menu
  function toggleNav() {
    const navLinks = document.getElementById("nav-links");
    const navbar = document.querySelector(".navbar");
    navLinks.classList.toggle("show");
    navbar.classList.toggle("nav-open");
  }
  
  // Smooth scroll to section
  function smoothScroll(target) {
    const element = document.querySelector(target);
    window.scrollTo({
      behavior: 'smooth',
      top: element.offsetTop - 60 // Adjust for navbar height
    });
  }
  
  // Intersection Observer callback
  function handleIntersection(entries, observer) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      }
    });
  }
  
  // Initialize Google Map
  function initMap() {
    const mapDiv = document.getElementById('map');
    if (mapDiv) {
      const location = { lat: -33.8625, lng: 25.5233 }; // Approximate coordinates for Gqebera
      const map = new google.maps.Map(mapDiv, {
        zoom: 15,
        center: location,
        styles: [
          {
            featureType: "all",
            elementType: "labels.text.fill",
            stylers: [{ color: "#007acc" }]
          },
          {
            featureType: "all",
            elementType: "labels.text.stroke",
            stylers: [{ color: "#ffffff" }]
          }
          // Add more custom styles here
        ]
      });
      const marker = new google.maps.Marker({
        position: location,
        map: map,
        title: '6 chalumna street motherwell 5, Gqebera 6211',
        animation: google.maps.Animation.DROP
      });
    }
  }
  
  // Handle form submission
  function handleFormSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
  
    // Here you would typically send the form data to a server
    // For this example, we'll just log it to the console
    console.log('Form submitted:', data);
  
    // Show success message
    const successMessage = document.createElement('div');
    successMessage.textContent = 'Thank you for your message. We will get back to you soon!';
    successMessage.classList.add('success-message');
    form.appendChild(successMessage);
  
    // Reset form and remove success message after 3 seconds
    setTimeout(() => {
      form.reset();
      successMessage.remove();
    }, 3000);
  }
  
  // Update active navigation link based on scroll position
  function updateActiveNavLink() {
    const sections = document.querySelectorAll('.grid-item');
    const navLinks = document.querySelectorAll('.nav-links a');
  
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionBottom = sectionTop + section.offsetHeight;
      const scrollPosition = window.scrollY;
  
      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
        const correspondingLink = document.querySelector(`.nav-links a[href="#${section.id}"]`);
        navLinks.forEach(link => link.classList.remove('active'));
        if (correspondingLink) {
          correspondingLink.classList.add('active');
        }
      }
    });
  }
  
  // Main initialization function
  function init() {
    const sections = document.querySelectorAll(".grid-item");
    const options = {
      threshold: 0.1,
      rootMargin: "0px 0px -100px 0px"
    };
  
    const observer = new IntersectionObserver(handleIntersection, options);
    sections.forEach(section => observer.observe(section));
  
    // Event listeners
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        smoothScroll(this.getAttribute('href'));
      });
    });
  
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
      contactForm.addEventListener('submit', handleFormSubmit);
    }
  
    window.addEventListener('scroll', throttle(updateActiveNavLink, 100));
  
    // Initialize map
    if (typeof google !== 'undefined') {
      initMap();
    } else {
      console.error('Google Maps API not loaded');
    }
  }
  
  // Run initialization when DOM is loaded
  document.addEventListener("DOMContentLoaded", init);