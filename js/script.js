document.addEventListener("DOMContentLoaded", function() {
    // Navbar scroll effect
    const navbar = document.querySelector(".navbar");
    const navLinks = document.querySelectorAll(".navbar-nav .nav-link");
    const navbarBrand = document.querySelector(".navbar-brand");

    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });

    // Typed.js for hero section
    if (document.getElementById("typed-text")) {
        new Typed("#typed-text", {
            strings: ["Mahmoud Enany", "Developer", "Enginner"], // Strings from video observation
            typeSpeed: 100, // Adjust speed to match video
            backSpeed: 50,  // Adjust speed to match video
            backDelay: 2000, // Delay before backspacing
            loop: true,
            smartBackspace: true, // Only backspace what doesn't match the new string
            cursorChar: "|", // Blinking cursor
        });
    }

    // Portfolio filtering with Isotope (if present and needed)
    const portfolioContainer = document.querySelector(".portfolio-container");
    if (portfolioContainer && typeof Isotope !== 'undefined') {
        const iso = new Isotope(portfolioContainer, {
            itemSelector: ".portfolio-item",
            layoutMode: "fitRows"
        });

        const portfolioFilters = document.querySelectorAll("#portfolio-filter li a");
        portfolioFilters.forEach(function(filter) {
            filter.addEventListener("click", function(e) {
                e.preventDefault();
                portfolioFilters.forEach(el => el.classList.remove("active"));
                this.classList.add("active");
                
                const filterValue = this.getAttribute("data-filter");
                iso.arrange({
                    filter: filterValue
                });
            });
        });
    }
    
    // Activate Bootstrap Carousel for Testimonials (if present)
    const testimonialCarousel = document.querySelector("#testimonialCarousel");
    if (testimonialCarousel && typeof bootstrap !== 'undefined') {
        new bootstrap.Carousel(testimonialCarousel, {
            interval: 6000, // Slightly longer interval
            ride: "carousel"
        });
    }

    // Counters animation with Waypoints (if present and needed)
    const counters = document.querySelectorAll(".counter");
    if (counters.length > 0 && typeof Waypoint !== 'undefined') {
        counters.forEach(counter => {
            const target = +counter.textContent; // Use existing text as target
            if (isNaN(target)) {
                console.error("Invalid target for counter:", counter);
                return;
            }
            counter.textContent = "0"; // Start from 0 for animation

            new Waypoint({
                element: counter,
                handler: function() {
                    let current = 0;
                    const increment = target / 100; 

                    const updateCounter = () => {
                        if (current < target) {
                            current += increment;
                            counter.textContent = Math.ceil(current);
                            requestAnimationFrame(updateCounter);
                        } else {
                            counter.textContent = target;
                        }
                    };
                    updateCounter();
                    this.destroy(); // Trigger only once
                },
                offset: "bottom-in-view" 
            });
        });
    }

    // Scroll to top button
    const scrollToTopBtn = document.querySelector(".scroll-to-top");
    if (scrollToTopBtn) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 300) {
                scrollToTopBtn.style.display = "block";
            } else {
                scrollToTopBtn.style.display = "none";
            }
        });
        scrollToTopBtn.addEventListener("click", (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }

    // Smooth scrolling for nav links & active state update
    document.querySelectorAll("nav a[href^=\"#\"]").forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const targetId = this.getAttribute("href");
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Temporarily remove active class from all, then add to clicked
                document.querySelectorAll("nav .nav-link").forEach(link => link.classList.remove("active"));
                this.classList.add("active");

                window.scrollTo({
                    top: targetElement.offsetTop - (navbar.classList.contains("scrolled") ? 70 : 90), // Adjusted offset based on nav state
                    behavior: "smooth"
                });
            }
        });
    });

    // Active nav link highlighting on scroll
    const sections = document.querySelectorAll("header[id], section[id]");
    window.addEventListener("scroll", navHighlighter);

    function navHighlighter() {
        let scrollY = window.pageYOffset;
        let currentSectionId = "home"; // Default to home

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - (navbar.classList.contains("scrolled") ? 80 : 100); // Adjusted offset
            
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight){
                currentSectionId = current.getAttribute("id");
            } 
        });
        
        navLinks.forEach(link => {
            link.classList.remove("active");
            if(link.getAttribute("href") === "#" + currentSectionId){
                link.classList.add("active");
            }
        });
    }
    navHighlighter(); // Call on load to set initial active link

});

