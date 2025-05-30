// Wait for the DOM to be fully loaded before running scripts
document.addEventListener('DOMContentLoaded', () => {
  // Hero Slideshow Functionality
  const initHeroSlideshow = () => {
    const slides = document.querySelectorAll('.hero-slide');
    const indicators = document.querySelectorAll('.indicator');
    let currentSlide = 0;
    let slideInterval;

    // Function to show a specific slide
    const showSlide = (index) => {
      // Remove active class from all slides and indicators
      slides.forEach((slide) => slide.classList.remove('active'));
      indicators.forEach((indicator) => indicator.classList.remove('active'));

      // Add active class to current slide and indicator
      slides[index].classList.add('active');
      indicators[index].classList.add('active');

      currentSlide = index;
    };

    // Function to go to next slide
    const nextSlide = () => {
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide(currentSlide);
    };

    // Function to start automatic slideshow
    const startSlideshow = () => {
      slideInterval = setInterval(nextSlide, 5000); // Change slide every 4 seconds
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

    // Pause slideshow on hover (optional)
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
  };

  // Initialize slideshow when DOM is ready
  initHeroSlideshow();

  // Mobile menu toggle
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');

  // Mobile products dropdown toggle
  const mobileProductsButton = document.getElementById(
    'mobile-products-button'
  );
  const mobileProductsMenu = document.getElementById('mobile-products-menu');
  const mobileProductsButtonSvg = mobileProductsButton
    ? mobileProductsButton.querySelector('svg')
    : null;

  // Desktop products dropdown toggle (for aria attributes, actual visibility is CSS driven)
  const desktopProductsButton = document.getElementById(
    'desktop-products-button'
  );
  const desktopProductsMenu = document.getElementById('desktop-products-menu');

  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', () => {
      const isExpanded = mobileMenu.classList.toggle('hidden');
      mobileMenuButton.setAttribute('aria-expanded', !isExpanded); // True if menu is NOT hidden (visible)

      // If mobile menu is closed, also ensure product submenu is closed and its button aria is updated
      if (
        isExpanded &&
        mobileProductsMenu &&
        !mobileProductsMenu.classList.contains('hidden')
      ) {
        mobileProductsMenu.classList.add('hidden');
        if (mobileProductsButton) {
          mobileProductsButton.setAttribute('aria-expanded', 'false');
          if (mobileProductsButtonSvg)
            mobileProductsButtonSvg.style.transform = ''; // Reset arrow
        }
      }
    });
  }

  if (mobileProductsButton && mobileProductsMenu) {
    mobileProductsButton.addEventListener('click', (e) => {
      e.preventDefault(); // Prevent page jump if it's an anchor
      const isExpanded = mobileProductsMenu.classList.toggle('hidden');
      mobileProductsButton.setAttribute('aria-expanded', !isExpanded); // True if menu is NOT hidden
      if (mobileProductsButtonSvg) {
        // Rotate arrow icon
        mobileProductsButtonSvg.style.transform = !isExpanded
          ? 'rotate(180deg)'
          : '';
      }
    });
  }

  // Handle ARIA for desktop dropdown (visibility is CSS driven by :hover)
  if (desktopProductsButton && desktopProductsMenu) {
    const dropdownParent = desktopProductsButton.closest('.dropdown'); // Get the parent .dropdown element

    if (dropdownParent) {
      dropdownParent.addEventListener('mouseenter', () => {
        desktopProductsButton.setAttribute('aria-expanded', 'true');
      });

      dropdownParent.addEventListener('mouseleave', () => {
        desktopProductsButton.setAttribute('aria-expanded', 'false');
      });

      // For keyboard accessibility
      desktopProductsButton.addEventListener('focus', () => {
        desktopProductsButton.setAttribute('aria-expanded', 'true');
      });

      // Need to handle focusout carefully to not close when focusing on menu items
      // A more robust solution might involve checking relatedTarget
      const menuItems =
        desktopProductsMenu.querySelectorAll('a[role="menuitem"]');
      const lastMenuItem = menuItems[menuItems.length - 1];

      if (lastMenuItem) {
        lastMenuItem.addEventListener('blur', (event) => {
          // If focus moves outside the dropdown menu, close it
          if (
            !desktopProductsMenu.contains(event.relatedTarget) &&
            event.relatedTarget !== desktopProductsButton
          ) {
            desktopProductsButton.setAttribute('aria-expanded', 'false');
          }
        });
      }
      // Close dropdown if Escape key is pressed
      dropdownParent.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
          desktopProductsButton.setAttribute('aria-expanded', 'false');
          desktopProductsButton.focus(); // Return focus to the button
        }
      });
    }
  }

  // Set current year in footer
  const currentYearElement = document.getElementById('currentYear');
  if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear();
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      // Ensure it's a valid ID selector and not just "#"
      if (href.length > 1 && href.startsWith('#')) {
        try {
          const targetElement = document.querySelector(href);
          if (targetElement) {
            e.preventDefault(); // Only prevent default if we found an element to scroll to
            targetElement.scrollIntoView({
              behavior: 'smooth',
            });

            // If it's a mobile menu link, close the mobile menu
            if (
              mobileMenu &&
              !mobileMenu.classList.contains('hidden') &&
              mobileMenu.contains(this)
            ) {
              mobileMenu.classList.add('hidden');
              mobileMenuButton.setAttribute('aria-expanded', 'false');
              // Also close product submenu if open
              if (
                mobileProductsMenu &&
                !mobileProductsMenu.classList.contains('hidden')
              ) {
                mobileProductsMenu.classList.add('hidden');
                if (mobileProductsButton)
                  mobileProductsButton.setAttribute('aria-expanded', 'false');
                if (mobileProductsButtonSvg)
                  mobileProductsButtonSvg.style.transform = '';
              }
            }
          } else {
            console.warn(`Smooth scroll target not found: ${href}`);
          }
        } catch (error) {
          console.error(`Invalid selector for smooth scroll: ${href}`, error);
        }
      }
    });
  });

  // NEW: Add subtle parallax effect to hero section
  const heroSection = document.querySelector('.hero-bg');
  if (heroSection) {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const rate = scrolled * -0.5;

      // Only apply on larger screens to avoid performance issues on mobile
      if (window.innerWidth > 768) {
        heroSection.style.transform = `translateY(${rate}px)`;
      }
    });
  }

  // NEW: Add intersection observer for fade-in animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Observe service cards and gallery items for fade-in effect
  document.querySelectorAll('.service-card, .gallery-item').forEach((el) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
  });
});
