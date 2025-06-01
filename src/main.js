// Import CSS
import './styles/main.css';

// Import animation libraries
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Lenis from 'lenis';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Import modules
import { initHeroSlideshow } from './js/slideshow.js';
import { initMobileMenu } from './js/navigation.js';
import { initGlassEffects } from './js/glass-effects.js';
import { initSmoothScroll } from './js/smooth-scroll.js';

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
  console.log('🚀 KF Megaglass - Vite powered!');

  // Initialize all modules
  initHeroSlideshow();
  initMobileMenu();
  initGlassEffects();
  initSmoothScroll();

  // Initialize AOS
  AOS.init({
    duration: 1000,
    once: true,
    offset: 100,
    easing: 'ease-out-cubic',
  });

  // Set current year in footer
  const currentYearElement = document.getElementById('currentYear');
  if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear();
  }

  // Enhanced animations with GSAP
  gsap.from('.glass-card-hero', {
    duration: 1.5,
    y: 100,
    opacity: 0,
    ease: 'power3.out',
  });

  // Service cards animation
  gsap.from('.service-card', {
    duration: 1,
    y: 50,
    opacity: 0,
    stagger: 0.2,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '#services',
      start: 'top 80%',
    },
  });

  // Gallery items animation
  gsap.from('.gallery-item', {
    duration: 1,
    y: 30,
    opacity: 0,
    stagger: 0.15,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '#gallery',
      start: 'top 80%',
    },
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href.length > 1 && href.startsWith('#')) {
        try {
          const targetElement = document.querySelector(href);
          if (targetElement) {
            e.preventDefault();
            targetElement.scrollIntoView({
              behavior: 'smooth',
            });

            // Close mobile menu if open
            const mobileMenu = document.getElementById('mobile-menu');
            const mobileMenuButton =
              document.getElementById('mobile-menu-button');
            if (
              mobileMenu &&
              !mobileMenu.classList.contains('hidden') &&
              mobileMenu.contains(this)
            ) {
              mobileMenu.classList.add('hidden');
              mobileMenuButton.setAttribute('aria-expanded', 'false');
            }
          }
        } catch (error) {
          console.error(`Invalid selector for smooth scroll: ${href}`, error);
        }
      }
    });
  });

  // Performance optimization - respect reduced motion
  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  );
  if (prefersReducedMotion.matches) {
    document.querySelectorAll('.float-1, .float-2, .float-3').forEach((el) => {
      el.style.animation = 'none';
    });

    document.querySelectorAll('.bg-shape').forEach((shape) => {
      shape.style.animation = 'none';
    });
  }
});
