class TermsModal {
    constructor() {
        this.modal = document.querySelector('.terms-modal');
        this.overlay = document.querySelector('.terms-overlay');
        this.acceptButton = document.querySelector('.terms-accept');
        this.declineButton = document.querySelector('.terms-decline');
        this.closeButton = document.querySelector('.terms-close');
        this.termsAccepted = localStorage.getItem('termsAccepted');
        this.sections = document.querySelectorAll('.terms-section');
        
        this.init();
    }
    
    init() {
        // Mostrar el modal si no se han aceptado los términos
        if (!this.termsAccepted) {
            setTimeout(() => {
                this.showModal();
                this.animateSections();
            }, 1000);
        }
        
        // Event listeners
        this.acceptButton.addEventListener('click', () => this.acceptTerms());
        this.declineButton.addEventListener('click', () => this.declineTerms());
        this.closeButton.addEventListener('click', () => this.hideModal());
        
        // Cerrar al hacer clic en el overlay
        this.overlay.addEventListener('click', () => this.hideModal());
        
        // Cerrar con la tecla Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.hideModal();
            }
        });

        // Prevenir scroll del body cuando el modal está abierto
        this.modal.addEventListener('wheel', (e) => {
            if (e.target === this.modal) {
                e.preventDefault();
            }
        });

        // Animación al hacer hover sobre las secciones
        this.sections.forEach(section => {
            section.addEventListener('mouseenter', () => {
                section.style.transform = 'translateY(-5px)';
            });
            
            section.addEventListener('mouseleave', () => {
                section.style.transform = 'translateY(0)';
            });
        });
    }
    
    showModal() {
        this.modal.classList.add('show');
        this.overlay.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
    
    hideModal() {
        this.modal.classList.remove('show');
        this.overlay.classList.remove('show');
        document.body.style.overflow = '';
    }
    
    animateSections() {
        this.sections.forEach((section, index) => {
            setTimeout(() => {
                section.style.opacity = '0';
                section.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    section.style.transition = 'all 0.5s ease';
                    section.style.opacity = '1';
                    section.style.transform = 'translateY(0)';
                }, 50);
            }, index * 150);
        });
    }
    
    acceptTerms() {
        localStorage.setItem('termsAccepted', 'true');
        
        // Animación de aceptación
        this.acceptButton.innerHTML = '<i class="fas fa-check"></i> ¡Aceptado!';
        this.acceptButton.style.background = 'linear-gradient(135deg, #10B981, #34D399)';
        this.acceptButton.style.transform = 'scale(1.05)';
        
        // Animación de desvanecimiento para las secciones
        this.sections.forEach((section, index) => {
            setTimeout(() => {
                section.style.opacity = '0';
                section.style.transform = 'translateY(-20px)';
            }, index * 100);
        });
        
        setTimeout(() => {
            this.hideModal();
            this.acceptButton.innerHTML = 'Aceptar';
            this.acceptButton.style.background = 'linear-gradient(135deg, #4f46e5, #818cf8)';
            this.acceptButton.style.transform = 'scale(1)';
            
            // Restaurar las secciones
            this.sections.forEach(section => {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            });
        }, 1000);
    }
    
    declineTerms() {
        // Animación de rechazo
        this.declineButton.innerHTML = '<i class="fas fa-times"></i> Rechazado';
        this.declineButton.style.color = '#EF4444';
        this.declineButton.style.borderColor = '#EF4444';
        this.declineButton.style.transform = 'scale(1.05)';
        
        // Animación de desvanecimiento para las secciones
        this.sections.forEach((section, index) => {
            setTimeout(() => {
                section.style.opacity = '0';
                section.style.transform = 'translateY(20px)';
            }, index * 100);
        });
        
        setTimeout(() => {
            this.hideModal();
            this.declineButton.innerHTML = 'Rechazar';
            this.declineButton.style.color = '#4f46e5';
            this.declineButton.style.borderColor = '#4f46e5';
            this.declineButton.style.transform = 'scale(1)';
            
            // Restaurar las secciones
            this.sections.forEach(section => {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            });
        }, 1000);
    }
}

// Inicializar el modal cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    new TermsModal();
}); 