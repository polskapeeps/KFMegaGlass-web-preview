export function initMobileMenu() {
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

  // Mobile menu functionality
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
          if (mobileProductsButtonSvg) {
            mobileProductsButtonSvg.style.transform = ''; // Reset arrow
          }
        }
      }
    });
  }

  // Mobile products dropdown functionality
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
}
