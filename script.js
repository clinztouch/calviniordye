//  MOBILE MENU 

const menuToggle = document.querySelector(".mobile-menu-toggle");
const mobileMenu = document.querySelector(".mobile-menu");
const overlay = document.querySelector(".menu-overlay");

function closeMenu() {
    menuToggle.classList.remove("active");
    mobileMenu.classList.remove("show");
    overlay.classList.remove("show");
}

function handleMenuToggle() {
    // Only toggle menu on mobile screens
    if (window.innerWidth <= 768) {
        menuToggle.classList.toggle("active");
        mobileMenu.classList.toggle("show");
        overlay.classList.toggle("show");
    }
}

if (menuToggle && mobileMenu && overlay) {
    menuToggle.addEventListener("click", handleMenuToggle);
    overlay.addEventListener("click", closeMenu);
}

// Automatically close menu when resizing to desktop
window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
        closeMenu();
    }
});


// INTERSECTION OBSERVER FUNCTION 
function fadeInOnScroll(elements, offset = 40, duration = 0.8, threshold = 0.2) {
    if (!elements.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
                observer.unobserve(entry.target);
            }
        });
    }, { threshold });

    elements.forEach(el => {
        el.style.opacity = "0";
        el.style.transform = `translateY(${offset}px)`;
        el.style.transition = `all ${duration}s ease`;
        observer.observe(el);
    });
}

// Apply animations
fadeInOnScroll(document.querySelectorAll("section"), 40, 0.8, 0.2);
fadeInOnScroll(document.querySelectorAll(".project-card"), 30, 0.6, 0.15);


//  SMOOTH SCROLL

document.querySelectorAll("a[href^='#']").forEach(link => {
    link.addEventListener("click", (e) => {
        const target = document.querySelector(link.getAttribute("href"));

        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: "smooth" });
        }

        // Close mobile menu after clicking
        closeMenu();
    }, { passive: false });
});
