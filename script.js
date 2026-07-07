/* ============================================
   ARUN SHAJI — Portfolio Interactions
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ── 1. PRELOADER ──────────────────────────
  const preloader = document.getElementById('preloader');
  window.addEventListener('load', () => {
    setTimeout(() => {
      preloader.classList.add('loaded');
      document.body.classList.remove('loading');
    }, 1200);
  });
  // Fallback: force hide after 3s
  setTimeout(() => {
    preloader.classList.add('loaded');
    document.body.classList.remove('loading');
  }, 3000);

  // ── 2. CUSTOM CURSOR ─────────────────────
  const cursorDot = document.getElementById('cursor-dot');
  const cursorOutline = document.getElementById('cursor-outline');

  if (cursorDot && cursorOutline) {
    let mouseX = 0;
    let mouseY = 0;
    let outlineX = 0;
    let outlineY = 0;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      // Instantly position the dot
      cursorDot.style.left = `${mouseX}px`;
      cursorDot.style.top = `${mouseY}px`;
    });

    // Trail the outline smoothly
    function animateCursor() {
      outlineX += (mouseX - outlineX) * 0.15;
      outlineY += (mouseY - outlineY) * 0.15;

      cursorOutline.style.left = `${outlineX}px`;
      cursorOutline.style.top = `${outlineY}px`;

      requestAnimationFrame(animateCursor);
    }
    requestAnimationFrame(animateCursor);

    // Hover state for interactive items
    const hoverables = document.querySelectorAll('a, button, input, textarea, select, .hamburger, .social-btn, .project-link');
    hoverables.forEach(el => {
      el.addEventListener('mouseenter', () => {
        document.body.classList.add('cursor-hover');
      });
      el.addEventListener('mouseleave', () => {
        document.body.classList.remove('cursor-hover');
      });
    });
  }

  // ── 3. PARTICLE BACKGROUND ────────────────
  const canvas = document.getElementById('particles-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animId;

    function resizeCanvas() {
      const hero = canvas.parentElement;
      canvas.width = hero.offsetWidth;
      canvas.height = hero.offsetHeight;
    }

    class Particle {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.4; // Slightly slower, more natural drift
        this.speedY = (Math.random() - 0.5) * 0.4;
        this.opacity = Math.random() * 0.25 + 0.05;
        this.color = Math.random() > 0.5
          ? `rgba(16,185,129,${this.opacity})` // Emerald Green particle
          : `rgba(52,211,153,${this.opacity})`; // Mint Green particle
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }

    function initParticles() {
      particles = [];
      const count = Math.min(80, Math.floor((canvas.width * canvas.height) / 12000));
      for (let i = 0; i < count; i++) {
        particles.push(new Particle());
      }
    }

    function animateParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      animId = requestAnimationFrame(animateParticles);
    }

    resizeCanvas();
    initParticles();
    animateParticles();

    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        resizeCanvas();
        initParticles();
      }, 200);
    });
  }

  // ── 4. TYPING EFFECT ─────────────────────
  const typingEl = document.querySelector('.typing-text');
  if (typingEl) {
    const roles = [
      'Full-Stack Developer',
      'MEAN Stack Developer',
      'MERN Stack Developer',
      'Angular Developer',
      'React Developer',
      'Node.js Developer'
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
      const currentRole = roles[roleIndex];

      if (!isDeleting) {
        typingEl.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        if (charIndex === currentRole.length) {
          isDeleting = true;
          setTimeout(typeEffect, 2000);
          return;
        }
        setTimeout(typeEffect, 80);
      } else {
        typingEl.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        if (charIndex === 0) {
          isDeleting = false;
          roleIndex = (roleIndex + 1) % roles.length;
          setTimeout(typeEffect, 500);
          return;
        }
        setTimeout(typeEffect, 40);
      }
    }
    setTimeout(typeEffect, 1500);
  }

  // ── 5. SCROLL PROGRESS ───────────────────
  const scrollProgress = document.getElementById('scroll-progress');

  function updateScrollProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? scrollTop / docHeight : 0;
    if (scrollProgress) {
      scrollProgress.style.transform = `scaleX(${progress})`;
    }
  }

  // ── 6. NAVBAR ─────────────────────────────
  const navbar = document.querySelector('.navbar');
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  function handleNavScroll() {
    if (navbar) {
      navbar.classList.toggle('scrolled', window.scrollY > 50);
    }

    // Active link based on section
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  }

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });
  }

  // Smooth scroll for nav links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        const navHeight = navbar ? navbar.offsetHeight : 0;
        const targetPos = target.offsetTop - navHeight;
        window.scrollTo({
          top: targetPos,
          behavior: 'smooth'
        });
      }
    });
  });

  // Unified scroll handler
  window.addEventListener('scroll', () => {
    updateScrollProgress();
    handleNavScroll();
    handleBackToTop();
  }, { passive: true });

  // ── 7. SCROLL ANIMATIONS ──────────────────
  const animateElements = document.querySelectorAll('.animate-on-scroll');
  const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        scrollObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  animateElements.forEach(el => scrollObserver.observe(el));

  // ── 8. COUNTER ANIMATION ──────────────────
  const statNumbers = document.querySelectorAll('.stat-number');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-target'));
        const suffix = el.getAttribute('data-suffix') || '+';
        animateCounter(el, target, suffix);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(el => counterObserver.observe(el));

  function animateCounter(el, target, suffix) {
    const duration = 2000;
    const startTime = performance.now();

    function easeOutQuart(t) {
      return 1 - Math.pow(1 - t, 4);
    }

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutQuart(progress);
      const currentValue = Math.floor(easedProgress * target);
      el.textContent = currentValue + suffix;

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = target + suffix;
      }
    }
    requestAnimationFrame(update);
  }

  // ── 9. SKILL BAR ANIMATION ────────────────
  const skillItems = document.querySelectorAll('.skill-item');
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        const bar = entry.target.querySelector('.skill-progress');
        if (bar) {
          const progress = bar.getAttribute('data-progress');
          setTimeout(() => {
            bar.style.width = progress + '%';
          }, 200);
        }
        skillObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  skillItems.forEach(el => skillObserver.observe(el));

  // ── 10. PROJECT CARD TILT ─────────────────
  const projectCards = document.querySelectorAll('.project-card');

  projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      if (window.innerWidth < 1024) return;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -8;
      const rotateY = ((x - centerX) / centerX) * 8;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
      card.style.transition = 'transform 0.5s ease';
      setTimeout(() => { card.style.transition = ''; }, 500);
    });

    card.addEventListener('mouseenter', () => {
      card.style.transition = 'none';
    });
  });

  // ── 11. CONTACT FORM ──────────────────────
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const formData = new FormData(contactForm);
      const name = formData.get('name');
      const email = formData.get('email');
      const userSubject = formData.get('subject');
      const message = formData.get('message');

      // Validation
      if (!name || !email || !userSubject || !message) {
        showToast('Please fill in all fields', 'error');
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        showToast('Please enter a valid email', 'error');
        return;
      }

      // Check if user has replaced the placeholder access key
      const accessKey = formData.get('access_key');
      if (accessKey === 'YOUR_ACCESS_KEY_HERE') {
        showToast('Please set your Web3Forms Access Key in index.html!', 'error');
        return;
      }

      // Loading state
      const submitBtn = contactForm.querySelector('.btn-submit');
      const originalBtnText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Sending...';

      // Submit via Fetch
      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(Object.fromEntries(formData))
      })
      .then(async (response) => {
        let json = await response.json();
        if (response.status === 200) {
          showToast('Message sent successfully! 🎉', 'success');
          contactForm.reset();
        } else {
          showToast(json.message || 'Something went wrong!', 'error');
        }
      })
      .catch((error) => {
        console.error(error);
        showToast('Form submission failed!', 'error');
      })
      .then(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
      });
    });
  }

  function showToast(message, type = 'success') {
    // Remove existing toasts
    document.querySelectorAll('.toast').forEach(t => t.remove());

    const toast = document.createElement('div');
    toast.className = 'toast';
    const icon = type === 'success' ? '✓' : '⚠';
    if (type === 'error') {
      toast.style.borderColor = 'rgba(255,107,53,0.3)';
      toast.style.color = '#ff6b35';
    }
    toast.innerHTML = `<span class="toast-icon">${icon}</span><span>${message}</span>`;
    document.body.appendChild(toast);

    requestAnimationFrame(() => {
      toast.classList.add('show');
    });

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 400);
    }, 3500);
  }

  // ── 12. BACK TO TOP ───────────────────────
  const backToTop = document.getElementById('back-to-top');

  function handleBackToTop() {
    if (backToTop) {
      backToTop.classList.toggle('visible', window.scrollY > 500);
    }
  }

  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ── INITIALIZE ────────────────────────────
  updateScrollProgress();
  handleNavScroll();
  handleBackToTop();
});
