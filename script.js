// Scroll to top on page refresh
if (history.scrollRestoration) {
    history.scrollRestoration = "manual";
}
window.scrollTo(0, 0);

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const menuClose = document.querySelector(".menu-close");
const yearTarget = document.getElementById("current-year");

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

if (yearTarget) {
    yearTarget.textContent = new Date().getFullYear().toString();
}

// Rotating Subtitle Animation
// Phrases to rotate through (in order)
const subtitlePhrases = [
    "Full-Stack Developer",
    "AI-Integrated Apps",
    "Python • JavaScript"
];

const rotatingText = document.querySelector(".rotating-text");
const subtitleElement = document.querySelector(".animate-sequence-3");

if (rotatingText && subtitleElement) {
    let currentIndex = 0;
    const rotationInterval = 3000; // Time each phrase is visible (3s)
    const transitionDuration = 400; // Match CSS transition (0.4s)

    // Function to rotate to next phrase
    function rotateSubtitle() {
        // Fade out current text
        rotatingText.classList.add("fade-out");

        // After fade out, change text and fade in
        setTimeout(() => {
            currentIndex = (currentIndex + 1) % subtitlePhrases.length;
            rotatingText.textContent = subtitlePhrases[currentIndex];
            rotatingText.classList.remove("fade-out");
            rotatingText.classList.add("fade-in");

            // Remove fade-in class after animation completes
            setTimeout(() => {
                rotatingText.classList.remove("fade-in");
            }, transitionDuration);
        }, transitionDuration);
    }

    // Start rotation after intro animation completes
    function startRotation() {
        // Check for reduced motion preference
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        
        // Set interval for rotation (slightly longer if reduced motion)
        setInterval(rotateSubtitle, prefersReducedMotion ? rotationInterval + 500 : rotationInterval);
    }

    // Listen for animation end on subtitle, with fallback timeout
    let animationStarted = false;

    subtitleElement.addEventListener("animationend", () => {
        if (!animationStarted) {
            animationStarted = true;
            // Small delay after intro animation before starting rotation
            setTimeout(startRotation, 1500);
        }
    });

    // Fallback: if animationend doesn't fire, start after safe timeout
    // Subtitle animation: 1.2s delay + 1.8s duration = 3s total
    setTimeout(() => {
        if (!animationStarted) {
            animationStarted = true;
            setTimeout(startRotation, 1500);
        }
    }, 3500);
}
