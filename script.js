// Mobile menu toggle
const mobileMenuButton = document.getElementById("mobile-menu-button");
const mobileMenu = document.getElementById("mobile-menu");
const mobileProductsButton = document.getElementById(
  "mobile-products-button"
);
const mobileProductsMenu = document.getElementById(
  "mobile-products-menu"
);

mobileMenuButton.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});

mobileProductsButton.addEventListener("click", (e) => {
  e.preventDefault(); // Prevent page jump if it's an anchor
  mobileProductsMenu.classList.toggle("hidden");
});

// Set current year in footer
document.getElementById("currentYear").textContent =
  new Date().getFullYear();

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href");
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth",
      });
    }
  });
});