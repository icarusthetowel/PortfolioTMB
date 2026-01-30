// Dark Mode Toggle
const themeToggle = document.querySelector(".theme-toggle");
const themeToggleMobile = document.querySelector(".theme-toggle-mobile");
const htmlElement = document.documentElement;

// Check for saved theme preference or system preference
function getPreferredTheme() {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
        return savedTheme;
    }
    // Check system preference
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

// Apply theme
function applyTheme(theme) {
    if (theme === "dark") {
        htmlElement.setAttribute("data-theme", "dark");
    } else {
        htmlElement.removeAttribute("data-theme");
    }
    localStorage.setItem("theme", theme);

    // Update button labels for mobile
    const mobileLabel = document.querySelector(".theme-toggle-mobile span");
    if (mobileLabel) {
        mobileLabel.textContent = theme === "dark" ? "Light Mode" : "Dark Mode";
    }
}

// Toggle theme
function toggleTheme() {
    const currentTheme = htmlElement.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    applyTheme(newTheme);
}

// Initialize theme on page load
applyTheme(getPreferredTheme());

// Add event listeners to both toggle buttons
if (themeToggle) {
    themeToggle.addEventListener("click", toggleTheme);
}

if (themeToggleMobile) {
    themeToggleMobile.addEventListener("click", toggleTheme);
}

// Listen for system theme changes
window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
    // Only auto-switch if user hasn't manually set a preference
    if (!localStorage.getItem("theme")) {
        applyTheme(e.matches ? "dark" : "light");
    }
});
