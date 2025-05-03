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
        // Only close if the menu is active (prevents closing on desktop link clicks)
        if (navLinks.classList.contains("active")) {
            navLinks.classList.remove("active");
            navToggle.classList.remove("active");
        }
      });
    });
  }

  // --- Smooth Scrolling ---
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");

      // Prevent default only if it's an internal link to an element ID
      if (href.startsWith("#") && href.length > 1) {
        const targetElement = document.querySelector(href);
        if (targetElement) {
          e.preventDefault(); // Prevent default only if target element exists

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


  /* --- Add this NEW block instead --- */
// --- Subtle Element Scroll Animations ---
const animatedElements = document.querySelectorAll(".project-card, .skill-item, .section"); // Include .section for general fade-in still

if (animatedElements.length > 0) {
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15 // Trigger slightly later if preferred
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Add different classes based on element type if needed
        if (entry.target.classList.contains('project-card') || entry.target.classList.contains('skill-item')) {
            entry.target.classList.add('animate-in');
        } else if (entry.target.classList.contains('section')) {
             entry.target.classList.add('visible'); // Keep general section fade-in
        }
        observer.unobserve(entry.target); // Stop observing once animated
      }
    });
  }, observerOptions);

  animatedElements.forEach(el => {
    observer.observe(el);
  });
}
/* --- End of NEW block --- */


  // --- Optional: Simple Typing Effect ---
  function typeWriter(element, text, speed = 70) {
    if (!element) return; // Exit if element doesn't exist
    const originalText = text || element.textContent; // Use provided text or existing
    element.textContent = ''; // Clear existing text before typing
    let i = 0;
    function type() {
      if (i < originalText.length) {
        element.textContent += originalText.charAt(i);
        i++;
        setTimeout(type, speed);
      }
    }
     // Start typing immediately or after a short delay
    setTimeout(type, 300); // Small delay before starting
  }

  const heroRoleElement = document.querySelector('.hero-role');
  if (heroRoleElement) {
    // Ensure we capture the text content before clearing it
    const roleText = heroRoleElement.textContent;
    typeWriter(heroRoleElement, roleText); // Pass the text explicitly
  }


// --- NEW Code Block: Client-Side Form Validation ---
const contactForm = document.getElementById('contact-form');
const nameInput = document.getElementById('form-name');
const emailInput = document.getElementById('form-email');
const messageInput = document.getElementById('form-message');

const nameError = document.getElementById('name-error');
const emailError = document.getElementById('email-error');
const messageError = document.getElementById('message-error');

// Basic email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// --- Find and REPLACE the entire 'if (contactForm) { ... }' block ---
if (contactForm) {
    const formStatus = document.getElementById('form-status'); // Get the status message element
    const submitButton = contactForm.querySelector('button[type="submit"]'); // Get the submit button

    contactForm.addEventListener('submit', function(event) {
        event.preventDefault(); // ALWAYS prevent default submission now

        let isValid = true;

        // --- Start: Keep Existing Validation Logic ---
        nameError.textContent = '';
        emailError.textContent = '';
        messageError.textContent = '';
        formStatus.textContent = ''; // Clear previous status messages
        formStatus.className = 'form-status-message'; // Reset status style
        nameInput.classList.remove('invalid');
        emailInput.classList.remove('invalid');
        messageInput.classList.remove('invalid');

        if (nameInput.value.trim() === '') {
            nameError.textContent = 'Please enter your name.';
            nameInput.classList.add('invalid');
            isValid = false;
        }
        if (emailInput.value.trim() === '') {
            emailError.textContent = 'Please enter your email address.';
             emailInput.classList.add('invalid');
            isValid = false;
        } else if (!emailRegex.test(emailInput.value.trim())) {
            emailError.textContent = 'Please enter a valid email address.';
             emailInput.classList.add('invalid');
            isValid = false;
        }
        if (messageInput.value.trim() === '') {
            messageError.textContent = 'Please enter your message.';
             messageInput.classList.add('invalid');
            isValid = false;
        }
        // --- End: Keep Existing Validation Logic ---

        // If form is NOT valid, stop here
        if (!isValid) {
            formStatus.textContent = 'Please correct the errors above.';
            formStatus.classList.add('error');
            console.log("Form validation failed.");
            return; // Exit the function
        }

        // --- Start: NEW AJAX Submission Logic ---
        console.log("Form validation passed. Attempting AJAX submission...");

        // Disable button and show sending message
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...'; // Change button text
        formStatus.textContent = 'Sending your message...';
        formStatus.className = 'form-status-message sending'; // Add sending class

        const formData = new FormData(contactForm);
        const formAction = contactForm.getAttribute('action');

        fetch(formAction, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json' // Important for Formspree AJAX
            }
        })
        .then(response => {
            if (response.ok) {
                // Success!
                console.log("Form submitted successfully via AJAX.");
                formStatus.textContent = 'Message Sent! Thank you.';
                formStatus.className = 'form-status-message success';
                contactForm.reset(); // Clear the form fields
                submitButton.textContent = 'Send Message'; // Reset button text
                submitButton.disabled = false; // Re-enable button
            } else {
                // Server error (e.g., Formspree issue)
                response.json().then(data => { // Try to get error details from Formspree
                  if (Object.hasOwn(data, 'errors')) {
                    formStatus.textContent = data["errors"].map(error => error["message"]).join(", ");
                  } else {
                    formStatus.textContent = 'Oops! There was a problem submitting your form. Please try again later.';
                  }
                  formStatus.className = 'form-status-message error';
                  console.error("Form submission failed (server response).", data);
                  submitButton.textContent = 'Send Message'; // Reset button text
                  submitButton.disabled = false; // Re-enable button
                })
            }
        })
        .catch(error => {
            // Network error or other fetch issue
            console.error("Form submission failed (network error).", error);
            formStatus.textContent = 'Oops! A network error occurred. Please check your connection and try again.';
            formStatus.className = 'form-status-message error';
            submitButton.textContent = 'Send Message'; // Reset button text
            submitButton.disabled = false; // Re-enable button
        });
        // --- End: NEW AJAX Submission Logic ---
    });
}
// --- End of Replaced 'if (contactForm) { ... }' block ---


}); // End of DOMContentLoaded
