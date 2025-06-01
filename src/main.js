// Import your CSS
import './styles/main.css';

// Import animation libraries if using them
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Lenis from 'lenis';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Import your modules
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
});
