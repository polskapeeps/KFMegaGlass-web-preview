export function initGlassEffects() {
  // Enhanced intersection observer for glass theme animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';

        // Add glass glow effect on scroll into view
        if (entry.target.classList.contains('service-card')) {
          entry.target.style.boxShadow = '0 16px 48px rgba(59, 130, 246, 0.15)';
        }
      }
    });
  }, observerOptions);

  // Observe service cards and gallery items for enhanced fade-in effect
  document.querySelectorAll('.service-card, .gallery-item').forEach((el) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition =
      'opacity 0.8s ease-out, transform 0.8s ease-out, box-shadow 0.8s ease-out';
    observer.observe(el);
  });

  // Dynamic glass effects
  addDynamicGlassEffects();
  controlBackgroundShapes();
}

function addDynamicGlassEffects() {
  // Enhanced hover effects for glass cards
  document
    .querySelectorAll('.glass-card, .glass-card-strong')
    .forEach((card) => {
      card.addEventListener('mouseenter', () => {
        card.style.background = 'rgba(255, 255, 255, 0.1)';
        card.style.borderColor = 'rgba(59, 130, 246, 0.3)';
      });

      card.addEventListener('mouseleave', () => {
        // Reset to original glass styling
        if (card.classList.contains('glass-card-strong')) {
          card.style.background = 'rgba(255, 255, 255, 0.08)';
        } else {
          card.style.background = 'rgba(255, 255, 255, 0.05)';
        }
        card.style.borderColor = 'rgba(255, 255, 255, 0.1)';
      });
    });

  // Enhanced gallery item interactions
  document.querySelectorAll('.gallery-item').forEach((item) => {
    item.addEventListener('mouseenter', () => {
      item.style.transform = 'scale(1.05) rotate(1deg)';
      item.style.boxShadow = '0 25px 70px rgba(59, 130, 246, 0.25)';
    });

    item.addEventListener('mouseleave', () => {
      item.style.transform = 'scale(1) rotate(0deg)';
      item.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.3)';
    });
  });

  // Enhanced service card hover effects
  document.querySelectorAll('.service-card').forEach((card) => {
    const icon = card.querySelector('.bg-gradient-to-br');

    card.addEventListener('mouseenter', () => {
      if (icon) {
        icon.style.transform = 'scale(1.1) rotate(5deg)';
        icon.style.boxShadow =
          '0 12px 35px rgba(59, 130, 246, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3)';
      }
    });

    card.addEventListener('mouseleave', () => {
      if (icon) {
        icon.style.transform = 'scale(1) rotate(0deg)';
        icon.style.boxShadow =
          '0 8px 25px rgba(59, 130, 246, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)';
      }
    });
  });

  // Contact card hover effects
  document.querySelectorAll('.contact-card .glass-card').forEach((card) => {
    card.addEventListener('mouseenter', () => {
      card.style.background = 'rgba(59, 130, 246, 0.1)';
      card.style.borderColor = 'rgba(59, 130, 246, 0.4)';
      card.style.transform = 'scale(1.05)';
    });

    card.addEventListener('mouseleave', () => {
      card.style.background = 'rgba(255, 255, 255, 0.06)';
      card.style.borderColor = 'rgba(59, 130, 246, 0.2)';
      card.style.transform = 'scale(1)';
    });
  });
}

function controlBackgroundShapes() {
  const shapes = document.querySelectorAll('.bg-shape');

  // Pause animations when page is not visible for performance
  document.addEventListener('visibilitychange', () => {
    shapes.forEach((shape) => {
      if (document.hidden) {
        shape.style.animationPlayState = 'paused';
      } else {
        shape.style.animationPlayState = 'running';
      }
    });
  });
}
