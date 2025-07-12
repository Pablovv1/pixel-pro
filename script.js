// Navegación suave para los enlaces de anclaje
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Animación de la barra de navegación al hacer scroll
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
        // Scroll hacia abajo
        navbar.classList.remove('scroll-up');
        navbar.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
        // Scroll hacia arriba
        navbar.classList.remove('scroll-down');
        navbar.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
});

// Animación de aparición de elementos al hacer scroll
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observar elementos para animación
document.querySelectorAll('.service-card, .portfolio-item, .hero-content > *, .contact-form').forEach(el => {
    observer.observe(el);
});

// Efecto de parallax en el hero
const hero = document.querySelector('.hero');
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    hero.style.backgroundPositionY = `${scrolled * 0.5}px`;
});

// Animación de números para estadísticas (si se agregan)
const animateValue = (element, start, end, duration) => {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        element.textContent = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
};

// Funcionalidad del formulario de contacto
const contactForm = document.querySelector('.contact-form');
const formGroups = document.querySelectorAll('.form-group');

// Función para validar el email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Función para mostrar mensaje de error
function showError(input, message) {
    const formGroup = input.closest('.form-group');
    const errorDiv = formGroup.querySelector('.error-message') || document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    if (!formGroup.querySelector('.error-message')) {
        formGroup.appendChild(errorDiv);
    }
    input.classList.add('error');
    errorDiv.style.display = 'block';
}

// Función para limpiar error
function clearError(input) {
    const formGroup = input.closest('.form-group');
    const errorDiv = formGroup.querySelector('.error-message');
    if (errorDiv) {
        errorDiv.style.display = 'none';
    }
    input.classList.remove('error');
}

// Validación en tiempo real
formGroups.forEach(group => {
    const input = group.querySelector('input, textarea');
    const label = group.querySelector('label');

    // Efecto de focus
    input.addEventListener('focus', () => {
        label.classList.add('active');
        clearError(input);
    });

    input.addEventListener('blur', () => {
        if (!input.value) {
            label.classList.remove('active');
        }
        validateInput(input);
    });

    // Validación mientras se escribe
    input.addEventListener('input', () => {
        validateInput(input);
    });
});

// Función de validación
function validateInput(input) {
    const value = input.value.trim();
    
    if (!value) {
        showError(input, 'Este campo es requerido');
        return false;
    }

    if (input.type === 'email' && !isValidEmail(value)) {
        showError(input, 'Por favor, ingrese un email válido');
        return false;
    }

    if (input.id === 'message' && value.length < 10) {
        showError(input, 'El mensaje debe tener al menos 10 caracteres');
        return false;
    }

    clearError(input);
    return true;
}

// Manejo del envío del formulario
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitButton = contactForm.querySelector('.submit-button');
        const originalText = submitButton.innerHTML;
        
        // Validar todos los campos
        let isValid = true;
        formGroups.forEach(group => {
            const input = group.querySelector('input, textarea');
            if (!validateInput(input)) {
                isValid = false;
            }
        });

        if (!isValid) {
            return;
        }

        // Deshabilitar el botón y mostrar loading
        submitButton.disabled = true;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';

        try {
            // Simular envío (reemplazar con tu lógica de envío real)
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Mostrar mensaje de éxito
            submitButton.innerHTML = '<i class="fas fa-check"></i> ¡Mensaje enviado!';
            submitButton.classList.add('success');

            // Limpiar formulario
            contactForm.reset();
            formGroups.forEach(group => {
                const label = group.querySelector('label');
                label.classList.remove('active');
            });

            // Restaurar botón después de 3 segundos
            setTimeout(() => {
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
                submitButton.classList.remove('success');
            }, 3000);

        } catch (error) {
            // Mostrar mensaje de error
            submitButton.innerHTML = '<i class="fas fa-times"></i> Error al enviar';
            submitButton.classList.add('error');

            // Restaurar botón después de 3 segundos
            setTimeout(() => {
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
                submitButton.classList.remove('error');
            }, 3000);
        }
    });
}

// Animación de los elementos de contacto
const contactItems = document.querySelectorAll('.contact-item');
contactItems.forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateX(-20px)';
    
    setTimeout(() => {
        item.style.transition = 'all 0.5s ease';
        item.style.opacity = '1';
        item.style.transform = 'translateX(0)';
    }, 100 * index);
});

// Animación de carga de la página
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Animación de entrada para el hero
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            heroContent.style.transition = 'all 0.8s ease';
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 100);
    }
});

// Menú móvil mejorado
const createMobileMenu = () => {
    const nav = document.querySelector('.navbar');
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.classList.add('mobile-menu-btn');
    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    
    nav.appendChild(mobileMenuBtn);
    
    mobileMenuBtn.addEventListener('click', () => {
        const navLinks = document.querySelector('.nav-links');
        navLinks.classList.toggle('active');
        
        // Animación del ícono
        const icon = mobileMenuBtn.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
    
    // Cerrar menú al hacer click en un enlace
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });
};

// Inicializar menú móvil en pantallas pequeñas
if (window.innerWidth <= 768) {
    createMobileMenu();
}

// Efecto de hover en las tarjetas de servicios
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Efecto de parallax en las imágenes del portafolio
document.querySelectorAll('.portfolio-item').forEach(item => {
    item.addEventListener('mousemove', (e) => {
        const { left, top, width, height } = item.getBoundingClientRect();
        const x = (e.clientX - left) / width;
        const y = (e.clientY - top) / height;
        
        const img = item.querySelector('img');
        img.style.transform = `scale(1.1) translate(${x * 10}px, ${y * 10}px)`;
    });
    
    item.addEventListener('mouseleave', () => {
        const img = item.querySelector('img');
        img.style.transform = 'scale(1) translate(0, 0)';
    });
});

// Funcionalidad del portafolio
const portfolioFilters = document.querySelector('.portfolio-filters');
const portfolioItems = document.querySelectorAll('.portfolio-item');

// Función para filtrar los proyectos
function filterPortfolio(category) {
    portfolioItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        
        if (category === 'all' || itemCategory === category) {
            item.style.display = 'block';
            setTimeout(() => {
                item.classList.add('show');
            }, 100);
        } else {
            item.classList.remove('show');
            setTimeout(() => {
                item.style.display = 'none';
            }, 300);
        }
    });
}

// Event listeners para los botones de filtro
if (portfolioFilters) {
    portfolioFilters.addEventListener('click', (e) => {
        if (e.target.classList.contains('filter-btn')) {
            // Remover clase active de todos los botones
            document.querySelectorAll('.filter-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Agregar clase active al botón clickeado
            e.target.classList.add('active');
            
            // Filtrar proyectos
            const category = e.target.getAttribute('data-filter');
            filterPortfolio(category);
        }
    });
}

// Animación de entrada para los proyectos
const portfolioObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
}, {
    threshold: 0.1
});

portfolioItems.forEach(item => {
    portfolioObserver.observe(item);
});

// Efecto parallax para las imágenes del portafolio
portfolioItems.forEach(item => {
    const image = item.querySelector('img');
    
    item.addEventListener('mousemove', (e) => {
        const { left, top, width, height } = item.getBoundingClientRect();
        const x = (e.clientX - left) / width - 0.5;
        const y = (e.clientY - top) / height - 0.5;
        
        image.style.transform = `scale(1.1) translate(${x * 20}px, ${y * 20}px)`;
    });
    
    item.addEventListener('mouseleave', () => {
        image.style.transform = 'scale(1.1) translate(0, 0)';
    });
});

// Manejo del estado activo del menú
const navLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('section');

function setActiveLink() {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', setActiveLink);
window.addEventListener('load', setActiveLink);

// Funcionalidad del carrusel de testimonios
const testimonialCards = document.querySelectorAll('.testimonial-card');
const dots = document.querySelectorAll('.dot');
const prevButton = document.querySelector('.prev-testimonial');
const nextButton = document.querySelector('.next-testimonial');
let currentIndex = 0;

// Función para mostrar un testimonio específico
function showTestimonial(index) {
    // Ocultar todos los testimonios
    testimonialCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateX(50px)';
        card.style.display = 'none';
    });
    
    // Remover clase active de todos los dots
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Mostrar el testimonio actual
    testimonialCards[index].style.display = 'block';
    setTimeout(() => {
        testimonialCards[index].style.opacity = '1';
        testimonialCards[index].style.transform = 'translateX(0)';
    }, 50);
    
    // Activar el dot correspondiente
    dots[index].classList.add('active');
    
    // Actualizar el índice actual
    currentIndex = index;
}

// Función para mostrar el siguiente testimonio
function nextTestimonial() {
    let nextIndex = currentIndex + 1;
    if (nextIndex >= testimonialCards.length) {
        nextIndex = 0;
    }
    showTestimonial(nextIndex);
}

// Función para mostrar el testimonio anterior
function prevTestimonial() {
    let prevIndex = currentIndex - 1;
    if (prevIndex < 0) {
        prevIndex = testimonialCards.length - 1;
    }
    showTestimonial(prevIndex);
}

// Event listeners para los controles
if (prevButton && nextButton) {
    prevButton.addEventListener('click', (e) => {
        e.preventDefault();
        prevTestimonial();
    });
    
    nextButton.addEventListener('click', (e) => {
        e.preventDefault();
        nextTestimonial();
    });
}

// Event listeners para los dots
dots.forEach((dot, index) => {
    dot.addEventListener('click', (e) => {
        e.preventDefault();
        showTestimonial(index);
    });
});

// Auto-rotación de testimonios
let testimonialInterval = setInterval(nextTestimonial, 5000);

// Pausar la auto-rotación cuando el usuario interactúa
const testimonialsSection = document.querySelector('.testimonials');
if (testimonialsSection) {
    testimonialsSection.addEventListener('mouseenter', () => {
        clearInterval(testimonialInterval);
    });
    
    testimonialsSection.addEventListener('mouseleave', () => {
        testimonialInterval = setInterval(nextTestimonial, 5000);
    });
}

// Mostrar el primer testimonio al cargar la página
if (testimonialCards.length > 0) {
    showTestimonial(0);
}

// Animación de entrada para los testimonios
const testimonialObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
}, {
    threshold: 0.1
});

testimonialCards.forEach(card => {
    testimonialObserver.observe(card);
}); 