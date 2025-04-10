/** 
--- Main JavaScript ---
--- Contains accessibility features, animations and UI interactions ---
*/

document.addEventListener("DOMContentLoaded", () => {
    // ===== ACCESSIBILITY: Keyboard focus handling =====
    initKeyboardAccessibility();

    // ===== BACK TO TOP BUTTONS =====
    initBackToTopButtons();

    // ===== ANIMATIONS =====
    initTypingAnimations();
    initImageAnimations();

    // ===== LANGUAGE TOGGLE =====
    initLanguageToggle();
});

/**
 * Handles keyboard accessibility by showing focus outlines only for keyboard users
 */
function initKeyboardAccessibility() {
    const handleFirstTab = (e) => {
        if (e.key === "Tab") {
            document.body.classList.add("user-is-tabbing");
            window.removeEventListener("keydown", handleFirstTab);
            window.addEventListener("mousedown", handleMouseDownOnce);
        }
    };

    const handleMouseDownOnce = () => {
        document.body.classList.remove("user-is-tabbing");
        window.removeEventListener("mousedown", handleMouseDownOnce);
        window.addEventListener("keydown", handleFirstTab);
    };

    window.addEventListener("keydown", handleFirstTab);
}
/**
 * Initializes back to top buttons for main page and project pages
 */
function initBackToTopButtons() {
    const backToTopButton = document.querySelector(".back-to-top");
    const backToTopButtonProject = document.querySelector(".back-to-top-project");

    if (!backToTopButton && !backToTopButtonProject) return;

    // Use regular scroll event (more straightforward)
    window.addEventListener("scroll", () => {
        const hasScrolledDown = window.scrollY > 700;

        if (backToTopButton) {
            alterStyles(backToTopButton, hasScrolledDown);
        }

        if (backToTopButtonProject) {
            alterStyles(backToTopButtonProject, hasScrolledDown);
        }
    });

    const alterStyles = (element, isVisible) => {
        if (!element) return;

        element.style.visibility = isVisible ? "visible" : "hidden";
        element.style.opacity = isVisible ? 1 : 0;
        element.style.transform = isVisible ? "scale(1)" : "scale(0)";
    };
}

/**
 * Initializes typing animation completion handlers
 */
function initTypingAnimations() {
    document.querySelectorAll("h4").forEach((h4) => {
        h4.addEventListener("animationend", (e) => {
            if (e.animationName === "typing") {
                h4.classList.add("typing-complete");
            }
        });
    });
}

/**
 * Sets up intersection observer for image animations
 */
function initImageAnimations() {
    const images = document.querySelectorAll(".about__photo, .work__image, .interface__image");
    if (!images.length) return;

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                entry.target.classList.toggle("in-view", entry.isIntersecting);
            });
        },
        {
            threshold: 0.1,
            rootMargin: "0px 0px -100px 0px"
        }
    );

    images.forEach((image) => observer.observe(image));
}

/**
 * Sets up language toggle functionality
 */
function initLanguageToggle() {
    const languageToggle = document.getElementById("language-toggle");
    if (!languageToggle) return;

    // Initialize with save preference or default English
    const currentLang = localStorage.getItem("preferredLanguage") || "en";
    document.documentElement.setAttribute("lang", currentLang);
    updateToggleState(currentLang === "de");

    // Handle language toggle changes
    languageToggle.addEventListener("change", () => {
        const newLang = languageToggle.checked ? "de" : "en";
        localStorage.setItem("preferedLanguage", newLang);

        if (newLang === "de") {
            window.location.href = "/de";
        } else {
            window.location.href = "/";
        }
    });
}

/**
 * Updates the language toggle switch visual state
 */
function updateToggleState(isGerman) {
    const toggle = document.getElementById("language-toggle");
    if (toggle) {
        toggle.checked = isGerman;
    }
}
