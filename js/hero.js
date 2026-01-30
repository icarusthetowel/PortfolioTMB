// Hero Section Animation Sequence & Rotating Subtitle
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
