document.addEventListener("DOMContentLoaded", () => {
  // --- Mobile Navigation Toggle ---
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      navLinks.classList.toggle("active");
      navToggle.classList.toggle("active"); // For hamburger animation
    });

    // Close nav when a link is clicked
    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        navToggle.classList.remove("active");
      });
    });
  }

  // --- Smooth Scrolling ---
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");

      // Prevent default only if it's an internal link
      if (href.startsWith("#") && href.length > 1) {
        e.preventDefault();
        const targetElement = document.querySelector(href);
        if (targetElement) {
          // Calculate offset for fixed navbar
          const navbarHeight = document.querySelector('.header')?.offsetHeight || 0;
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }
      } else if (href === "#") {
        // Scroll to top if href is just '#'
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      // Allow default behavior for external links or file links (like resume)
    });
  });


  // --- Section Fade-in Animation on Scroll ---
  const sections = document.querySelectorAll(".section");

  if (sections.length > 0) {
    const observerOptions = {
      root: null, // relative to document viewport
      rootMargin: '0px',
      threshold: 0.1 // trigger when 10% of the section is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); // Stop observing once visible
        }
      });
    }, observerOptions);

    sections.forEach(section => {
      observer.observe(section);
    });
  }

  // --- Optional: Simple Typing Effect ---
  // Uncomment this section if you want a basic typing effect

  function typeWriter(element, text, speed = 70) {
    if (!element) return; // Exit if element doesn't exist
    element.textContent = ''; // Clear existing text
    let i = 0;
    function type() {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
        setTimeout(type, speed);
      }
    }
    type();
  }

  const heroRoleElement = document.querySelector('.hero-role');
  if (heroRoleElement) {
    const roleText = heroRoleElement.textContent; // Get text from HTML
     // Add a small delay before starting
     setTimeout(() => typeWriter(heroRoleElement, roleText), 500);
  }
 

});