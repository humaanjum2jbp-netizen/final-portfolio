document.addEventListener('DOMContentLoaded', () => {
            
            // IMAGE ERROR HANDLER
            window.handleImageError = function(imgElement) {
                imgElement.style.display = 'none';
                const placeholder = document.createElement('div');
                placeholder.className = 'placeholder-img';
                placeholder.textContent = 'HA';
                imgElement.parentNode.appendChild(placeholder);
            };

            // 1. MOBILE HAMBURGER MENU
            const navToggle = document.getElementById('navToggle');
            const navMenu = document.getElementById('navMenu');
            const navLinks = document.querySelectorAll('.nav-link');

            navToggle.addEventListener('click', () => {
                navToggle.classList.toggle('active');
                navMenu.classList.toggle('active');
            });

            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    navToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                });
            });

            // 2. NAVBAR BACKGROUND ON SCROLL
            const navbar = document.getElementById('navbar');
            window.addEventListener('scroll', () => {
                if (window.scrollY > 50) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
            });

            // 3. ACTIVE NAVIGATION LINK
            const sections = document.querySelectorAll('section[id]');
            window.addEventListener('scroll', () => {
                let current = '';
                sections.forEach(section => {
                    const sectionTop = section.offsetTop;
                    if (scrollY >= (sectionTop - 150)) {
                        current = section.getAttribute('id');
                    }
                });
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href').includes(current)) {
                        link.classList.add('active');
                    }
                });
            });

            // 4. TYPING ANIMATION
            const typingText = document.getElementById('typing-text');
            const phrases = ["KYC Associate", "Video KYC Specialist", "Customer Verification Expert", "Fintech Operations Professional"];
            let phraseIndex = 0;
            let charIndex = 0;
            let isDeleting = false;
            let typingSpeed = 100;

            function typeEffect() {
                const currentPhrase = phrases[phraseIndex];
                if (isDeleting) {
                    typingText.textContent = currentPhrase.substring(0, charIndex - 1);
                    charIndex--;
                    typingSpeed = 50;
                } else {
                    typingText.textContent = currentPhrase.substring(0, charIndex + 1);
                    charIndex++;
                    typingSpeed = 100;
                }
                if (!isDeleting && charIndex === currentPhrase.length) {
                    isDeleting = true;
                    typingSpeed = 2000;
                } else if (isDeleting && charIndex === 0) {
                    isDeleting = false;
                    phraseIndex = (phraseIndex + 1) % phrases.length;
                    typingSpeed = 500;
                }
                setTimeout(typeEffect, typingSpeed);
            }
            typeEffect();

            // 5. SCROLL REVEAL ANIMATIONS
            const revealElements = document.querySelectorAll('.reveal');
            const revealObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('active');
                    }
                });
            }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
            revealElements.forEach(el => revealObserver.observe(el));

            // 6. BACK TO TOP BUTTON
            const backToTopBtn = document.getElementById('backToTop');
            window.addEventListener('scroll', () => {
                if (window.scrollY > 500) {
                    backToTopBtn.classList.add('visible');
                } else {
                    backToTopBtn.classList.remove('visible');
                }
            });
            backToTopBtn.addEventListener('click', () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });

            // 7. CONTACT FORM VALIDATION
            const contactForm = document.getElementById('contactForm');
            const formStatus = document.getElementById('formStatus');
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const name = document.getElementById('name').value.trim();
                const email = document.getElementById('email').value.trim();
                const subject = document.getElementById('subject').value.trim();
                const message = document.getElementById('message').value.trim();
                if (!name || !email || !subject || !message) {
                    formStatus.textContent = 'Please fill in all fields.';
                    formStatus.className = 'form-status error';
                    return;
                }
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(email)) {
                    formStatus.textContent = 'Please enter a valid email address.';
                    formStatus.className = 'form-status error';
                    return;
                }
                formStatus.textContent = 'Message sent successfully! (Connect to Formspree/EmailJS for real delivery)';
                formStatus.className = 'form-status success';
                contactForm.reset();
                setTimeout(() => {
                    formStatus.textContent = '';
                    formStatus.className = 'form-status';
                }, 5000);
            });

            // 8. CURRENT YEAR IN FOOTER
            const currentYearSpan = document.getElementById('currentYear');
            if (currentYearSpan) {
                currentYearSpan.textContent = new Date().getFullYear();
            }
        });
