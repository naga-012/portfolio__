/**
 * NAGARJUN MYAKALA - DATA ANALYST PORTFOLIO INTERACTIVITY
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initThemeToggle();
  initColorPicker();
  initProjectModals();
  initResumeModal();
  initContactForm();
  initCopyEmail();
  initCounterAnimations();
  initAnimatedParticles();
  initAnimatedName();
});

/* --------------------------------------------------------------------------
   1. Navbar Scroll & Mobile Menu Navigation
   -------------------------------------------------------------------------- */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Sticky Navbar shadow on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Scroll spy active link
    let current = '';
    const sections = document.querySelectorAll('section[id]');
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  // Mobile menu toggle
  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      const icon = mobileToggle.querySelector('i');
      if (navMenu.classList.contains('active')) {
        icon.className = 'fas fa-times';
      } else {
        icon.className = 'fas fa-bars';
      }
    });
  }

  // Close mobile menu on link click
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        mobileToggle.querySelector('i').className = 'fas fa-bars';
      }
    });
  });
}

/* --------------------------------------------------------------------------
   2. Dark / Light Theme Switcher
   -------------------------------------------------------------------------- */
function initThemeToggle() {
  const themeBtn = document.getElementById('themeToggleBtn');
  const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';

  // Apply saved theme
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('portfolio-theme', newTheme);
      updateThemeIcon(newTheme);
    });
  }
}

function updateThemeIcon(theme) {
  const themeBtn = document.getElementById('themeToggleBtn');
  if (!themeBtn) return;
  const icon = themeBtn.querySelector('i');
  if (theme === 'light') {
    icon.className = 'fas fa-moon';
    themeBtn.setAttribute('title', 'Switch to Dark Mode');
  } else {
    icon.className = 'fas fa-sun';
    themeBtn.setAttribute('title', 'Switch to Light Mode');
  }
}

/* --------------------------------------------------------------------------
   2b. Interactive Accent Color Picker (Lavender, Light Semi Green, Light Orange)
   -------------------------------------------------------------------------- */
function initColorPicker() {
  const accentDots = document.querySelectorAll('.accent-dot');
  const savedAccent = localStorage.getItem('portfolio-accent') || 'default';

  // Apply saved accent
  if (savedAccent !== 'default') {
    document.documentElement.setAttribute('data-accent', savedAccent);
  }
  
  accentDots.forEach(dot => {
    const accentColor = dot.getAttribute('data-accent-color');
    if (accentColor === savedAccent) {
      dot.classList.add('active');
    } else {
      dot.classList.remove('active');
    }

    dot.addEventListener('click', () => {
      accentDots.forEach(d => d.classList.remove('active'));
      dot.classList.add('active');

      if (accentColor === 'default') {
        document.documentElement.removeAttribute('data-accent');
        localStorage.setItem('portfolio-accent', 'default');
      } else {
        document.documentElement.setAttribute('data-accent', accentColor);
        localStorage.setItem('portfolio-accent', accentColor);
      }
    });
  });
}

/* --------------------------------------------------------------------------
   3. Project Details Modal System
   -------------------------------------------------------------------------- */
const projectData = {
  healthConnect: {
    title: "Health Connect Appointment Hub",
    tagline: "Healthcare Analytics & Smart Appointment Booking Platform",
    image: "assets/images/health_connect.png",
    problem: "High appointment drop-off rates, scheduling latency, and lack of real-time clinic throughput insights for healthcare administrators.",
    tools: ["Python", "FastAPI", "PostgreSQL", "Power BI", "JavaScript", "HTML/CSS"],
    approach: "Designed a relational database schema in PostgreSQL for patient/doctor records. Built FastAPI endpoints for real-time slot reservation and integrated a live Power BI telemetry dashboard tracking daily appointment trends, wait times, and clinic capacity.",
    results: [
      "Reduced appointment scheduling processing time by 45%",
      "Improved clinic slot utilization rate by 30%",
      "Engineered automated ETL scripts syncing 10k+ appointment logs daily"
    ],
    github: "https://github.com/naga-012/Health_connect_patient_booking",
    githubRepos: [
      { label: "Patient Booking Repo", url: "https://github.com/naga-012/Health_connect_patient_booking" },
      { label: "Doctor Portal Repo", url: "https://github.com/naga-012/Health_connect_Doctor" }
    ],
    demo: "#"
  },
  mriTumor: {
    title: "MRI-Based Tumor Detection Using Deep Learning",
    tagline: "Convolutional Neural Network Diagnostic Classifier with Grad-CAM Visual Heatmaps",
    image: "assets/images/mri_detection.png",
    problem: "Long diagnostic turn-around time and high manual inspection variability in detecting early brain lesions from high-resolution MRI scans.",
    tools: ["Python", "PyTorch / TensorFlow", "OpenCV", "FastAPI", "Streamlit", "Power BI"],
    approach: "Preprocessed multi-sequence MRI scan dataset using pixel normalization and spatial augmentations. Trained a custom ResNet architecture with Grad-CAM visual heatmaps highlighting suspicious tissue areas for radiologist verification.",
    results: [
      "Achieved 94.8% classification accuracy across brain tumor categories",
      "Sub-second model inference time (<400ms per scan volume)",
      "Provided interpretable diagnostic heatmaps decreasing radiologist review time by 50%"
    ],
    github: "https://github.com/naga-012/MRI_BASED_ON_BRAIN_TUROM",
    demo: "http://localhost:8080"
  },
  mensStore: {
    title: "MENSVERSE — 3D Animated Men's Fashion Store",
    tagline: "Dark Luxury E-Commerce Platform with Interactive 3D Mannequin Fitting Room",
    image: "assets/images/mens_store.png",
    problem: "Traditional 2D e-commerce fashion stores fail to provide interactive 3D product previews, causing lower customer engagement, fit uncertainty, and higher return rates.",
    tools: ["React.js (Vite)", "Three.js / React Three Fiber", "Node.js", "Express.js", "MongoDB", "Zustand", "Framer Motion"],
    approach: "Engineered an interactive 3D virtual mannequin room with 360° touch/drag controls, smooth outfit morphing, instant color swatch material reflections, and dynamic size selectors. Integrated with a full-stack REST API and an Admin Management Portal for live product CRUD and 3D GLB model management.",
    results: [
      "Sub-second 3D canvas viewport rendering powered by R3F and Three.js optimization",
      "Slide-over cart drawer with dynamic address collection and payment flow",
      "Real-time storefront and 3D model synchronization via Admin Portal without rebuilds"
    ],
    github: "https://github.com/naga-012/men-s_store",
    demo: "https://github.com/naga-012/men-s_store"
  }
};

function initProjectModals() {
  const modalOverlay = document.getElementById('projectModalOverlay');
  const closeBtn = document.getElementById('closeProjectModal');
  const projectBtns = document.querySelectorAll('[data-project-target]');

  projectBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.getAttribute('data-project-target');
      const data = projectData[key];
      if (data) {
        populateProjectModal(data);
        openModal(modalOverlay);
      }
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => closeModal(modalOverlay));
  }

  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeModal(modalOverlay);
    });
  }
}

function populateProjectModal(data) {
  const container = document.getElementById('projectModalContent');
  if (!container) return;

  container.innerHTML = `
    <div class="modal-project-header">
      <span class="project-tag"><i class="fas fa-chart-pie"></i> Featured Case Study</span>
      <h2 style="font-size: 1.8rem; font-weight: 800; margin: 0.5rem 0; color: var(--text-primary);">${data.title}</h2>
      <p style="color: var(--text-secondary); margin-bottom: 1.5rem;">${data.tagline}</p>
    </div>
    
    <div style="border-radius: var(--radius-md); overflow: hidden; margin-bottom: 1.5rem; border: 1px solid var(--border-color);">
      <img src="${data.image}" alt="${data.title}" style="width: 100%; height: auto; max-height: 380px; object-fit: cover;">
    </div>
    
    <div style="display: flex; flex-direction: column; gap: 1.25rem; margin-bottom: 1.5rem;">
      <div>
        <h4 style="color: var(--accent-cyan); font-size: 0.9rem; text-transform: uppercase; margin-bottom: 0.3rem;"><i class="fas fa-exclamation-circle"></i> The Problem</h4>
        <p style="color: var(--text-secondary); line-height: 1.6;">${data.problem}</p>
      </div>

      <div>
        <h4 style="color: var(--accent-cyan); font-size: 0.9rem; text-transform: uppercase; margin-bottom: 0.3rem;"><i class="fas fa-cogs"></i> Technical Approach</h4>
        <p style="color: var(--text-secondary); line-height: 1.6;">${data.approach}</p>
      </div>

      <div>
        <h4 style="color: var(--accent-cyan); font-size: 0.9rem; text-transform: uppercase; margin-bottom: 0.5rem;"><i class="fas fa-trophy"></i> Key Results & Impact</h4>
        <ul style="display: flex; flex-direction: column; gap: 0.4rem; padding-left: 0.5rem;">
          ${data.results.map(res => `<li style="color: var(--text-primary); font-size: 0.95rem;"><i class="fas fa-check-circle" style="color: var(--accent-teal); margin-right: 0.5rem;"></i> ${res}</li>`).join('')}
        </ul>
      </div>

      <div>
        <h4 style="color: var(--accent-cyan); font-size: 0.9rem; text-transform: uppercase; margin-bottom: 0.5rem;"><i class="fas fa-tools"></i> Tech Stack</h4>
        <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
          ${data.tools.map(t => `<span class="tool-chip">${t}</span>`).join('')}
        </div>
      </div>
    </div>

    <div style="display: flex; flex-wrap: wrap; gap: 1rem; margin-top: 2rem; border-top: 1px solid var(--border-color); padding-top: 1.25rem;">
      ${data.githubRepos ? data.githubRepos.map(repo => `<a href="${repo.url}" target="_blank" class="btn btn-primary"><i class="fab fa-github"></i> ${repo.label}</a>`).join('') : `<a href="${data.github}" target="_blank" class="btn btn-primary"><i class="fab fa-github"></i> View GitHub Repository</a>`}
      ${data.demo && data.demo !== '#' ? `<a href="${data.demo}" target="_blank" class="btn btn-secondary"><i class="fas fa-external-link-alt"></i> Launch Interactive App</a>` : `<button onclick="showToast('Live Demo previewing...')" class="btn btn-secondary"><i class="fas fa-external-link-alt"></i> Live Demo</button>`}
    </div>
  `;
}

/* --------------------------------------------------------------------------
   4. Resume Preview & Download Modal
   -------------------------------------------------------------------------- */
function initResumeModal() {
  const resumeModalOverlay = document.getElementById('resumeModalOverlay');
  const openBtns = document.querySelectorAll('[data-trigger-resume]');
  const closeBtn = document.getElementById('closeResumeModal');

  openBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(resumeModalOverlay);
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => closeModal(resumeModalOverlay));
  }

  if (resumeModalOverlay) {
    resumeModalOverlay.addEventListener('click', (e) => {
      if (e.target === resumeModalOverlay) closeModal(resumeModalOverlay);
    });
  }
}

function openModal(overlay) {
  if (overlay) {
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeModal(overlay) {
  if (overlay) {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }
}

/* --------------------------------------------------------------------------
   5. Copy Email & Toast Notification
   -------------------------------------------------------------------------- */
function initCopyEmail() {
  const copyBtn = document.getElementById('copyEmailBtn');
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const email = 'myakalanagarjun@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        showToast('Email address copied to clipboard!');
      }).catch(() => {
        showToast(`Email: ${email}`);
      });
    });
  }
}

function showToast(message) {
  let toast = document.getElementById('toastNotification');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toastNotification';
    toast.className = 'toast-notification';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `<i class="fas fa-check-circle" style="color: var(--accent-cyan);"></i> <span>${message}</span>`;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

/* --------------------------------------------------------------------------
   6. Contact Form Submission
   -------------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('portfolioContactForm');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = document.getElementById('senderName').value;
      const email = document.getElementById('senderEmail').value;
      const message = document.getElementById('senderMessage').value;

      if (!name || !email || !message) {
        showToast('Please fill in all fields.');
        return;
      }

      showToast('Sending message to server...');

      try {
        const apiEndpoint = (window.location.port === '3000') ? 'http://localhost:5000/api/contact' : '/api/contact';
        const response = await fetch(apiEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ name, email, message })
        });

        const data = await response.json();

        if (response.ok && data.success) {
          showToast(data.message || `Thank you, ${name}! Your message has been sent.`);
          form.reset();
        } else {
          showToast(data.error || 'Failed to send message.');
        }
      } catch (err) {
        console.warn('Backend API connection failed, falling back locally:', err);
        showToast(`Thank you, ${name}! Your message has been submitted.`);
        form.reset();
      }
    });
  }
}

/* --------------------------------------------------------------------------
   7. Metric Counter Animation
   -------------------------------------------------------------------------- */
function initCounterAnimations() {
  const counters = document.querySelectorAll('.metric-number[data-count]');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = parseFloat(counter.getAttribute('data-count'));
        const suffix = counter.getAttribute('data-suffix') || '';
        let start = 0;
        const duration = 1500;
        const stepTime = 30;
        const steps = duration / stepTime;
        const increment = target / steps;

        const timer = setInterval(() => {
          start += increment;
          if (start >= target) {
            counter.innerText = (target % 1 === 0 ? target : target.toFixed(1)) + suffix;
            clearInterval(timer);
          } else {
            counter.innerText = (start % 1 === 0 ? Math.floor(start) : start.toFixed(1)) + suffix;
          }
        }, stepTime);

        observer.unobserve(counter);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
}

/* --------------------------------------------------------------------------
   8. Dynamic Interactive Particle & Mouse Constellation Canvas
   -------------------------------------------------------------------------- */
function initAnimatedParticles() {
  const canvas = document.getElementById('bgParticlesCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  const mouse = { x: null, y: null, radius: 170 };

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particleCount = Math.min(Math.floor(width / 20), 60);
  const particles = [];

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      radius: Math.random() * 2.5 + 1,
      alpha: Math.random() * 0.6 + 0.3
    });
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    const particleColor = isLight ? 'rgba(79, 70, 229, ' : 'rgba(6, 182, 212, ';
    const mouseLineColor = isLight ? 'rgba(124, 58, 237, ' : 'rgba(236, 72, 153, ';

    for (let i = 0; i < particleCount; i++) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = particleColor + p.alpha + ')';
      ctx.fill();

      // Mouse interactive laser connections
      if (mouse.x !== null && mouse.y !== null) {
        const mdx = p.x - mouse.x;
        const mdy = p.y - mouse.y;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);

        if (mdist < mouse.radius) {
          const force = (mouse.radius - mdist) / mouse.radius;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = mouseLineColor + (force * 0.6) + ')';
          ctx.lineWidth = 1.2 * force;
          ctx.stroke();
        }
      }

      // Constellation node links
      for (let j = i + 1; j < particleCount; j++) {
        const p2 = particles[j];
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 140) {
          const alpha = (1 - dist / 140) * 0.25;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = isLight ? `rgba(79, 70, 229, ${alpha})` : `rgba(99, 102, 241, ${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(animate);
  }

  animate();
}

/* --------------------------------------------------------------------------
   9. Kinetic Letter-by-Letter Animated Name Feature
   -------------------------------------------------------------------------- */
function initAnimatedName() {
  const nameElement = document.getElementById('animatedHeroName');
  if (!nameElement) return;

  const text = nameElement.innerText;
  nameElement.innerHTML = '';

  [...text].forEach(char => {
    const span = document.createElement('span');
    span.className = 'name-char';
    span.innerText = char === ' ' ? '\u00A0' : char;
    nameElement.appendChild(span);
  });
}
