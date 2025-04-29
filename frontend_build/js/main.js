// Smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', function() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    for (let anchor of anchorLinks) {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
    
    // Highlight active section in docs sidebar
    if (document.querySelector('.docs-sidebar')) {
        const sections = document.querySelectorAll('.doc-section');
        const navLinks = document.querySelectorAll('.docs-sidebar a');
        
        window.addEventListener('scroll', function() {
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                
                if (pageYOffset >= sectionTop - 200) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + current) {
                    link.classList.add('active');
                }
            });
        });
    }
});

// Mobile navigation toggle
const createMobileNav = () => {
    const nav = document.querySelector('nav');
    const navLinks = document.querySelector('.nav-links');
    
    if (nav && navLinks && window.innerWidth <= 768) {
        const menuToggle = document.createElement('button');
        menuToggle.classList.add('menu-toggle');
        menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            this.innerHTML = navLinks.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });
        
        nav.insertBefore(menuToggle, navLinks);
        
        // Add mobile nav styles
        const style = document.createElement('style');
        style.textContent = `
            .menu-toggle {
                display: block;
                background: none;
                border: none;
                font-size: 1.5rem;
                cursor: pointer;
                color: var(--secondary-color);
            }
            
            .nav-links {
                display: none;
                width: 100%;
                flex-direction: column;
                align-items: center;
                padding: 1rem 0;
            }
            
            .nav-links.active {
                display: flex;
            }
            
            .nav-links li {
                margin: 0.5rem 0;
            }
        `;
        document.head.appendChild(style);
    }
};

// Check if we need to create mobile nav on load and resize
window.addEventListener('load', createMobileNav);
window.addEventListener('resize', createMobileNav);
