// Scroll to top on page refresh
if (history.scrollRestoration) {
    history.scrollRestoration = "manual";
}
window.scrollTo(0, 0);

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

// Hero Intro Animation Sequence & Rotating Subtitle
// Titles to rotate through
const subtitlePhrases = [
    "Full-Stack Developer",
    "AI Developer",
    "Software Engineer",
    "Python Developer",
    "JavaScript Developer"
];

const rotatingText = document.querySelector(".rotating-text");
const heroContainer = document.querySelector(".hero-container");
const headshotWrapper = document.querySelector(".hero-headshot-wrapper");
const titleLine = document.querySelector(".hero-title-line");
const introName = document.querySelector(".hero-intro-name");
const heroTextGroup = document.querySelector(".hero-text-group");

// Timeline:
// - animate-sequence-1 (HELLO): starts at 0ms, duration 1.4s
// - animate-sequence-2 (I'M A FULL STACK DEVELOPER): starts at 0.8s, duration 1.4s
// - animate-sequence-3 (Trevor Matthias Bercich): starts at 1.6s, duration 1.6s
// - CTA group: starts at 2.4s, duration 0.8s
// Intro completes around 3.2s

// After intro completes:
// 1. Show headshot (pop in)
// 2. After headshot appears, shift layout (settled state)
// 3. Show title line
// 4. After layout settles, start rotating titles

const INTRO_COMPLETE_TIME = 3200; // When all 3 intro texts + CTA have animated in
const HEADSHOT_DELAY = 400;       // Delay after intro before showing headshot
const LAYOUT_SHIFT_DELAY = 800;   // Delay after headshot appears before shifting layout
const TITLE_REVEAL_DELAY = 4500;  // Delay after layout shift before showing title line (wait for smooth slide)
const ROTATION_START_DELAY = 1200; // Delay after title revealed before starting rotation

function startHeroSequence() {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Step 1: After intro completes, show headshot
    setTimeout(() => {
        // Hide text behind headshot
        if (heroTextGroup) {
            heroTextGroup.classList.add("hero-text-hidden");
        }

        if (headshotWrapper) {
            headshotWrapper.classList.add("hero-headshot-visible");
        }

        // Step 2: After headshot pops in, shift layout to two-column
        setTimeout(() => {
            // Reveal text as separation begins
            if (heroTextGroup) {
                heroTextGroup.classList.remove("hero-text-hidden");
            }

            if (heroContainer) {
                heroContainer.classList.add("hero-settled");
            }

            // Step 3: After layout shifts, reveal the title line
            setTimeout(() => {
                if (titleLine) {
                    titleLine.classList.add("hero-title-visible");
                }

                // Step 4: After title line appears, start rotating titles
                setTimeout(() => {
                    startTitleRotation();
                }, ROTATION_START_DELAY);

            }, TITLE_REVEAL_DELAY);

        }, LAYOUT_SHIFT_DELAY);

    }, INTRO_COMPLETE_TIME + HEADSHOT_DELAY);
}

// Rotating title animation
function startTitleRotation() {
    if (!rotatingText) return;

    let currentIndex = 0;
    const rotationInterval = 3000; // Time each phrase is visible (3s)
    const transitionDuration = 400; // Match CSS transition (0.4s)

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

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Set interval for rotation
    setInterval(rotateSubtitle, prefersReducedMotion ? rotationInterval + 500 : rotationInterval);
}

// Start the hero sequence on page load
if (heroContainer) {
    startHeroSequence();
}

// Contact Section Animation (scroll-triggered)
const contactWrapper = document.querySelector(".contact-wrapper");
const contactIntro = document.querySelector(".contact-intro");
const contactLinksGroup = document.querySelector(".contact-links-group");
const contactHeadingText = document.querySelector(".contact-heading-text");
const contactCursor = document.querySelector(".contact-cursor");

const CONTACT_HEADING_TEXT = "Let's Connect";
const TYPING_SPEED = 100;           // ms per character
const CONTACT_LINKS_DELAY = 800;    // Delay after intro before showing links
const CONTACT_SETTLE_DELAY = 1200;  // Delay after links appear before settling apart

// Typewriter effect for contact heading
function typeContactHeading(callback) {
    if (!contactHeadingText) {
        if (callback) callback();
        return;
    }

    let charIndex = 0;
    contactHeadingText.textContent = "";

    function typeNextChar() {
        if (charIndex < CONTACT_HEADING_TEXT.length) {
            contactHeadingText.textContent += CONTACT_HEADING_TEXT[charIndex];
            charIndex++;
            setTimeout(typeNextChar, TYPING_SPEED);
        } else {
            // Typing complete - cursor blinks a few times then fades
            if (contactCursor) {
                contactCursor.classList.add("typing-done");
                // Hide cursor after a delay
                setTimeout(() => {
                    contactCursor.classList.add("cursor-hidden");
                }, 3000);
            }
            if (callback) callback();
        }
    }

    typeNextChar();
}

function startContactAnimation() {
    // Step 1: Type the heading first
    typeContactHeading(() => {
        // Step 2: After heading typed, animate in the intro paragraph
        setTimeout(() => {
            if (contactIntro) {
                contactIntro.classList.add("contact-visible");
            }

            // Step 3: After intro animates, show the links
            setTimeout(() => {
                if (contactLinksGroup) {
                    contactLinksGroup.classList.add("contact-visible");
                }

                // Step 4: After links animate in, settle apart
                setTimeout(() => {
                    if (contactWrapper) {
                        contactWrapper.classList.add("contact-settled");
                    }
                }, CONTACT_SETTLE_DELAY);

            }, CONTACT_LINKS_DELAY);
        }, 400); // Small delay after typing completes
    });
}

// Use Intersection Observer to trigger contact animation on scroll
if (contactWrapper) {
    const contactObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startContactAnimation();
                contactObserver.unobserve(entry.target); // Only animate once
            }
        });
    }, {
        threshold: 0.3, // Trigger when 30% of section is visible
        rootMargin: "0px 0px -50px 0px"
    });

    contactObserver.observe(contactWrapper);
}