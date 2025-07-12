class CookiesModal {
    constructor() {
        this.modal = document.querySelector('.cookies-modal');
        this.acceptButton = document.querySelector('.cookies-accept');
        this.settingsButton = document.querySelector('.cookies-settings');
        this.closeButton = document.querySelector('.cookies-close');
        this.cookiesAccepted = localStorage.getItem('cookiesAccepted');
        
        this.init();
    }
    
    init() {
        // Mostrar el modal si no se han aceptado las cookies
        if (!this.cookiesAccepted) {
            setTimeout(() => {
                this.showModal();
            }, 2000);
        }
        
        // Event listeners
        this.acceptButton.addEventListener('click', () => this.acceptCookies());
        this.settingsButton.addEventListener('click', () => this.openSettings());
        this.closeButton.addEventListener('click', () => this.hideModal());
        
        // Cerrar al hacer clic fuera del modal
        document.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.hideModal();
            }
        });
        
        // Cerrar con la tecla Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.hideModal();
            }
        });
    }
    
    showModal() {
        this.modal.classList.remove('hide');
        this.modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
    
    hideModal() {
        this.modal.classList.remove('show');
        this.modal.classList.add('hide');
        document.body.style.overflow = '';
    }
    
    acceptCookies() {
        localStorage.setItem('cookiesAccepted', 'true');
        this.hideModal();
        
        // Animación de aceptación
        this.acceptButton.innerHTML = '<i class="fas fa-check"></i> ¡Aceptado!';
        this.acceptButton.style.background = 'linear-gradient(135deg, #10B981, #34D399)';
        
        setTimeout(() => {
            this.acceptButton.innerHTML = 'Aceptar';
            this.acceptButton.style.background = 'linear-gradient(135deg, #4f46e5, #818cf8)';
        }, 2000);
    }
    
    openSettings() {
        // Aquí puedes implementar la lógica para abrir la configuración de cookies
        console.log('Abrir configuración de cookies');
        this.hideModal();
    }
}

// Inicializar el modal cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    new CookiesModal();
}); 