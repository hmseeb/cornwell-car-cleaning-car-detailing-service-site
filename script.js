/* ============================================
   CORNWELL CAR CLEANING — SCRIPTS
   ============================================ */

(function () {
  'use strict';

  /* ---- Navbar: scroll behavior ---- */
  const navbar = document.getElementById('navbar');
  function handleNavbarScroll() {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', handleNavbarScroll, { passive: true });
  handleNavbarScroll();

  /* ---- Navbar: mobile toggle ---- */
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  navToggle.addEventListener('click', function () {
    navLinks.classList.toggle('open');
    const isOpen = navLinks.classList.contains('open');
    navToggle.setAttribute('aria-expanded', isOpen);
  });

  // Close nav when a link is clicked
  navLinks.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      navLinks.classList.remove('open');
    });
  });

  /* ---- Smooth scroll for anchor links ---- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const navbarHeight = navbar.offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - navbarHeight - 16;
        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
      }
    });
  });

  /* ---- Scroll animations ---- */
  const animateEls = document.querySelectorAll(
    '.service-card, .testimonial-card, .why-list li, .gallery-item, .contact-item'
  );

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    animateEls.forEach(function (el, i) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(28px)';
      el.style.transition = 'opacity 0.55s ease ' + (i * 0.07) + 's, transform 0.55s ease ' + (i * 0.07) + 's';
      observer.observe(el);
    });

    document.addEventListener('animationend', function () {}, { once: true });
  }

  // Add .visible class styles via JS
  document.head.insertAdjacentHTML('beforeend', '<style>.visible { opacity: 1 !important; transform: translateY(0) !important; }</style>');

  /* ---- Contact form ---- */
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      // Simple validation
      const name = document.getElementById('name').value.trim();
      const phone = document.getElementById('phone').value.trim();

      if (!name) {
        showFieldError('name', 'Please enter your full name.');
        return;
      }
      if (!phone) {
        showFieldError('phone', 'Please enter your phone number.');
        return;
      }

      // Simulate form submission (no backend)
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;

      setTimeout(function () {
        contactForm.style.display = 'none';
        formSuccess.classList.add('visible');
      }, 800);
    });

    // Clear error on input
    contactForm.querySelectorAll('input, select, textarea').forEach(function (el) {
      el.addEventListener('input', function () {
        clearFieldError(el.id);
      });
    });
  }

  function showFieldError(fieldId, message) {
    clearFieldError(fieldId);
    const field = document.getElementById(fieldId);
    if (!field) return;
    field.style.borderColor = '#ef4444';
    const err = document.createElement('p');
    err.id = fieldId + '-error';
    err.style.cssText = 'color:#ef4444;font-size:0.8125rem;margin-top:5px;';
    err.textContent = message;
    field.parentNode.appendChild(err);
    field.focus();
  }

  function clearFieldError(fieldId) {
    const field = document.getElementById(fieldId);
    if (field) field.style.borderColor = '';
    const err = document.getElementById(fieldId + '-error');
    if (err) err.remove();
  }

  /* ---- Active nav link on scroll ---- */
  const sections = document.querySelectorAll('section[id]');
  function updateActiveNav() {
    const scrollPos = window.scrollY + navbar.offsetHeight + 40;
    sections.forEach(function (section) {
      const top = section.offsetTop;
      const bottom = top + section.offsetHeight;
      const id = section.getAttribute('id');
      const navLink = document.querySelector('.nav-links a[href="#' + id + '"]');
      if (navLink) {
        if (scrollPos >= top && scrollPos < bottom) {
          navLink.style.color = '#ffffff';
          navLink.style.fontWeight = '600';
        } else {
          navLink.style.color = '';
          navLink.style.fontWeight = '';
        }
      }
    });
  }
  window.addEventListener('scroll', updateActiveNav, { passive: true });

})();
