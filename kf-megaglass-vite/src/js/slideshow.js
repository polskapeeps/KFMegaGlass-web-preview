export function initHeroSlideshow() {
  const slides = document.querySelectorAll('.hero-slide');
  const indicators = document.querySelectorAll('.indicator');
  let currentSlide = 0;
  let slideInterval;

  if (slides.length === 0) return; // Exit if no slides found

  // Function to show a specific slide
  const showSlide = (index) => {
    // Remove active class from all slides and indicators
    slides.forEach((slide) => slide.classList.remove('active'));
    indicators.forEach((indicator) => indicator.classList.remove('active'));

    // Add active class to current slide and indicator
    slides[index].classList.add('active');
    if (indicators[index]) {
      indicators[index].classList.add('active');
    }

    currentSlide = index;
  };

  // Function to go to next slide
  const nextSlide = () => {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  };

  // Function to start automatic slideshow
  const startSlideshow = () => {
    slideInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
  };

  // Function to stop automatic slideshow
  const stopSlideshow = () => {
    clearInterval(slideInterval);
  };

  // Add click listeners to indicators
  indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
      showSlide(index);
      stopSlideshow(); // Stop auto-play when user manually selects
      setTimeout(startSlideshow, 8000); // Resume auto-play after 8 seconds
    });
  });

  // Pause slideshow on hover
  const heroSection = document.querySelector('.hero-bg');
  if (heroSection) {
    heroSection.addEventListener('mouseenter', stopSlideshow);
    heroSection.addEventListener('mouseleave', startSlideshow);
  }

  // Start the slideshow
  startSlideshow();

  // Handle visibility change (pause when tab is not active)
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      stopSlideshow();
    } else {
      startSlideshow();
    }
  });

  // Enhanced parallax effect for glass theme
  if (heroSection) {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const rate = scrolled * -0.3; // Reduced rate for subtlety

      // Only apply on larger screens to avoid performance issues on mobile
      if (window.innerWidth > 768) {
        heroSection.style.transform = `translateY(${rate}px)`;
      }
    });
  }
}
