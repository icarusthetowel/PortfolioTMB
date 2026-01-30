// Mobile Menu Toggle and Navigation
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const menuClose = document.querySelector(".menu-close");

if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
        const isOpen = navLinks.getAttribute("data-open") === "true";
        navLinks.setAttribute("data-open", (!isOpen).toString());
        menuToggle.setAttribute("aria-expanded", (!isOpen).toString());
    });
}

if (menuClose && navLinks) {
    menuClose.addEventListener("click", () => {
        navLinks.setAttribute("data-open", "false");
        menuToggle.setAttribute("aria-expanded", "false");
    });
}

// Close menu when clicking on any navigation link
if (navLinks) {
    const navLinkItems = navLinks.querySelectorAll("a");
    navLinkItems.forEach(link => {
        link.addEventListener("click", () => {
            navLinks.setAttribute("data-open", "false");
            menuToggle.setAttribute("aria-expanded", "false");
        });
    });
}

// Close menu when clicking outside
document.addEventListener("click", (e) => {
    if (navLinks && menuToggle) {
        const isOpen = navLinks.getAttribute("data-open") === "true";
        if (isOpen && !navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
            navLinks.setAttribute("data-open", "false");
            menuToggle.setAttribute("aria-expanded", "false");
        }
    }
});

// Update year in footer
const yearTarget = document.getElementById("current-year");
if (yearTarget) {
    yearTarget.textContent = new Date().getFullYear().toString();
}
