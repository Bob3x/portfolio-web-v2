/* -----------------------------------------
  Have focus outline only for keyboard users 
 ---------------------------------------- */
document.addEventListener("DOMContentLoaded", () => {
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

    const backToTopButton = document.querySelector(".back-to-top");
    const backToTopButtonProject = document.querySelector(".back-to-top-project");

    let isBackToTopRendered = false;
    let isBackToTopProjectRendered = false;

    const alterStyles = (isBackToTopRendered) => {
        if (backToTopButton) {
            backToTopButton.style.visibility = isBackToTopRendered ? "visible" : "hidden";
            backToTopButton.style.opacity = isBackToTopRendered ? 1 : 0;
            backToTopButton.style.transform = isBackToTopRendered ? "scale(1)" : "scale(0)";
        }
    };

    const alterStylesProject = (isBackToTopProjectRendered) => {
        if (backToTopButtonProject) {
            backToTopButtonProject.style.visibility = isBackToTopProjectRendered
                ? "visible"
                : "hidden";
            backToTopButtonProject.style.opacity = isBackToTopProjectRendered ? 1 : 0;
            backToTopButtonProject.style.transform = isBackToTopProjectRendered
                ? "scale(1)"
                : "scale(0)";
        }
    };

    if (backToTopButton || backToTopButtonProject) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 700) {
                isBackToTopRendered = true;
                alterStyles(isBackToTopRendered);
                isBackToTopProjectRendered = true;
                alterStylesProject(isBackToTopProjectRendered);
            } else {
                isBackToTopRendered = false;
                alterStyles(isBackToTopRendered);
                isBackToTopProjectRendered = false;
                alterStylesProject(isBackToTopProjectRendered);
            }
        });
    }
    window.addEventListener("keydown", handleFirstTab);

    document.querySelectorAll("h4").forEach((h4) => {
        h4.addEventListener("animationend", (e) => {
            if (e.animationName === "typing") {
                h4.classList.add("typing-complete");
            }
        });
    });

    const images = document.querySelectorAll(".about__photo, .work__image, .interface__image");

    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("in-view");
            } else {
                entry.target.classList.remove("in-view");
            }
        });
    }, observerOptions);

    images.forEach((image) => {
        observer.observe(image);
    });

    const columns = document.querySelectorAll(".conclusion__column");

    columns.forEach((column) => {
        const h3 = column.querySelector("h3");

        h3.addEventListener("click", function () {
            column.classList.toggle("active");
        });
    });
});
