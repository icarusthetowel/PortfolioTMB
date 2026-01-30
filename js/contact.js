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
