import Lenis from 'lenis';
import { gsap } from 'gsap';

export function initSmoothScroll() {
  // Initialize Lenis smooth scroll
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
    direction: 'vertical', // vertical, horizontal
    gestureDirection: 'vertical', // vertical, horizontal, both
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
  });

  // Listen for the scroll event and update the progress
  lenis.on('scroll', (e) => {
    // You can add scroll-based animations here
    // console.log(e);
  });

  // Use requestAnimationFrame to continuously update the scroll
  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);

  // Integrate Lenis with GSAP ScrollTrigger
  lenis.on('scroll', gsap.ticker.add);

  gsap.ticker.lagSmoothing(0);

  // Stop smooth scroll when user prefers reduced motion
  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  );

  if (prefersReducedMotion.matches) {
    lenis.destroy();
  }

  // Handle smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href.length > 1 && href.startsWith('#')) {
        e.preventDefault();

        const target = document.querySelector(href);
        if (target) {
          lenis.scrollTo(target, {
            offset: -100, // Account for fixed header
            duration: 2,
          });
        }
      }
    });
  });

  return lenis;
}
