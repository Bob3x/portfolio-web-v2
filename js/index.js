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

    // ===== UI INTERACTIONS =====
    initExpandableColumns();

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

    let isBackToTopRendered = false;
    let isBackToTopProjectRendered = false;

    const alterStyles = (element, isVisible) => {
        if (!element) return;

        element.style.visibility = isVisible ? "visible" : "hidden";
        element.style.opacity = isVisible ? 1 : 0;
        element.style.transform = isVisible ? "scale(1)" : "scale(0)";
    };

    window.addEventListener("scroll", () => {
        const shouldShow = window.scrollY > 700;

        if (backToTopButton) {
            alterStyles(backToTopButton, shouldShow);
        }

        if (backToTopButtonProject) {
            alterStyles(backToTopButtonProject, shouldShow);
        }
    });
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
            threshold: 0.1
        }
    );

    images.forEach((image) => observer.observe(image));
}

/**
 * Initializes expandable columns in the conclusion section
 */
function initExpandableColumns() {
    const columns = document.querySelectorAll(".conclusion__column");

    columns.forEach((column) => {
        const h3 = column.querySelector("h3");
        if (h3) {
            h3.addEventListener("click", () => {
                column.classList.toggle("active");
            });
        }
    });
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
    translatePage(currentLang);

    // Handle language toggle changes
    languageToggle.addEventListener("change", () => {
        const newLang = languageToggle.checked ? "de" : "en";
        localStorage.setItem("preferedLanguage", newLang);
        document.documentElement.setAttribute("lang", newLang);
        translatePage(newLang);
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

/**
 * Translates page content based on selected language
 */
function translatePage(language) {
    const elements = document.querySelectorAll("[data-en], [data-de]");

    elements.forEach((element) => {
        const translation = element.getAttribute(`data-${language}`);
        if (translation) {
            // Store original content if first time tranlating
            if (!element.hasAttribute("data-original")) {
                element.setAttribute("data-original", element.innerHTML);
            }
            element.innerHTML = translation;
        } else if (language === "en" && element.hasAttribute("data-original")) {
            // Restore original English content
            element.innerHTML = element.getAttribute("data-original");
        }
    });
}
