document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for anchor links
    const navLinks = document.querySelectorAll('nav ul li a[href^="#"]');
    const mobileMenu = document.getElementById('nav-links');
    const menuToggle = document.getElementById('mobile-menu-toggle');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const headerOffset = document.querySelector('header').offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                if (mobileMenu.classList.contains('active')) {
                    mobileMenu.classList.remove('active');
                    menuToggle.classList.remove('open');
                    menuToggle.setAttribute('aria-expanded', 'false');
                }
                
                // Update active link state (optional, but good for UX)
                navLinks.forEach(nav => nav.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });

    // Mobile menu toggle
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            menuToggle.classList.toggle('open');
            const isExpanded = mobileMenu.classList.contains('active');
            menuToggle.setAttribute('aria-expanded', isExpanded.toString());
        });
    }

    // Highlight active nav link on scroll (simplified version)
    const sections = document.querySelectorAll('main section');
    window.addEventListener('scroll', () => {
        let current = '';
        const headerHeight = document.querySelector('header').offsetHeight;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - 50; // Adjust offset as needed
            if (pageYOffset >= sectionTop) {
                current = section.getAttribute('id');
            }
        });
        
        if (current === 'hero') { // Special case for hero to be considered at very top
             if (pageYOffset < (document.getElementById('about').offsetTop - headerHeight - 50)) {
                 current = 'hero';
             }
        }


        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
        // Default to 'Início' if no section is prominently in view (e.g., scrolled to top before hero)
        if (!current && pageYOffset < sections[0].offsetTop) {
            const homeLink = document.querySelector('nav ul li a[href="#hero"]');
            if (homeLink) homeLink.classList.add('active');
        }
    });
    
    // Set initial active link (usually Home/Início)
    const initialLink = document.querySelector('nav ul li a[href="#hero"]');
    if(initialLink) {
        initialLink.classList.add('active');
    }

});

