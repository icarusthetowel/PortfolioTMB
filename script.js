const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const yearTarget = document.getElementById("current-year");

if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
        const isOpen = navLinks.getAttribute("data-open") === "true";
        navLinks.setAttribute("data-open", (!isOpen).toString());
        menuToggle.setAttribute("aria-expanded", (!isOpen).toString());
    });
}

if (yearTarget) {
    yearTarget.textContent = new Date().getFullYear().toString();
}
