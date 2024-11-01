// IIFE para evitar poluição do escopo global
(function() {
    'use strict';

    // Constantes para configuração
    const CONFIG = {
        animations: {
            carouselInterval: 5000,
            overlayTransition: 300
        },
        selectors: {
            overlay: '#myNav',
            overlayContent: '.overlay-content',
            overlayLinks: '.overlay-content a',
            carousels: {
                main: '#about',
                clients: '#carouselClients'
            },
            navbar: {
                toggler: '.overlay-menu-toggler',
                closeBtn: '.closebtn'
            }
        },
        classes: {
            hidden: 'hidden',
            active: 'active'
        }
    };

    // Cache de elementos DOM
    const DOM = {
        overlay: null,
        overlayLinks: null,
        carousels: {
            main: null,
            clients: null
        },
        navbar: {
            toggler: null,
            closeBtn: null
        },
        init() {
            // Inicializa cache dos elementos
            this.overlay = document.querySelector(CONFIG.selectors.overlay);
            this.overlayLinks = document.querySelectorAll(CONFIG.selectors.overlayLinks);
            this.carousels.main = document.querySelector(CONFIG.selectors.carousels.main);
            this.carousels.clients = document.querySelector(CONFIG.selectors.carousels.clients);
            this.navbar.toggler = document.querySelector(CONFIG.selectors.navbar.toggler);
            this.navbar.closeBtn = document.querySelector(CONFIG.selectors.navbar.closeBtn);
        }
    };

    // Controlador do Menu Overlay
    const OverlayController = {
        isOpen: false,

        open() {
            if (!DOM.overlay || this.isOpen) return;
            
            this.isOpen = true;
            DOM.overlay.style.width = '100%';
            document.body.style.overflow = 'hidden';
            
            // Adiciona listeners de eventos
            document.addEventListener('keydown', this.handleKeyPress);
            DOM.overlay.addEventListener('click', this.handleOverlayClick);
        },

        close() {
            if (!DOM.overlay || !this.isOpen) return;
            
            this.isOpen = false;
            DOM.overlay.style.width = '0%';
            document.body.style.overflow = '';
            
            // Remove listeners de eventos
            document.removeEventListener('keydown', this.handleKeyPress);
            DOM.overlay.removeEventListener('click', this.handleOverlayClick);
        },

        handleKeyPress(event) {
            if (event.key === 'Escape') {
                OverlayController.close();
            }
        },

        handleOverlayClick(event) {
            // Fecha o overlay apenas se clicar fora do conteúdo
            if (event.target === DOM.overlay) {
                OverlayController.close();
            }
        },

        init() {
            if (!DOM.overlayLinks) return;

            // Adiciona evento de clique para cada link do overlay
            DOM.overlayLinks.forEach(link => {
                link.addEventListener('click', () => {
                    // Pequeno delay para melhor UX
                    setTimeout(() => this.close(), 150);
                });
            });
        }
    };

    // Controlador dos Carrosséis
    const CarouselController = {
        init() {
            this.initializeCarousels();
            this.setupEventListeners();
        },

        initializeCarousels() {
            // Inicializa carrossel principal
            if (DOM.carousels.main) {
                new bootstrap.Carousel(DOM.carousels.main, {
                    interval: CONFIG.animations.carouselInterval,
                    touch: true // Habilita swipe em dispositivos touch
                });
            }

            // Inicializa carrossel de clientes
            if (DOM.carousels.clients) {
                new bootstrap.Carousel(DOM.carousels.clients, {
                    interval: CONFIG.animations.carouselInterval,
                    touch: true
                });
            }
        },

        setupEventListeners() {
            // Pausa carrossel ao hover (opcional)
            [DOM.carousels.main, DOM.carousels.clients].forEach(carousel => {
                if (!carousel) return;

                carousel.addEventListener('mouseenter', () => {
                    bootstrap.Carousel.getInstance(carousel).pause();
                });

                carousel.addEventListener('mouseleave', () => {
                    bootstrap.Carousel.getInstance(carousel).cycle();
                });
            });
        }
    };

    // Controlador de Navegação Suave
    const SmoothScrollController = {
        init() {
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', this.handleClick);
            });
        },

        handleClick(event) {
            event.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    };

    // Inicialização
    function init() {
        // Inicializa cache DOM
        DOM.init();

        // Inicializa componentes
        OverlayController.init();
        CarouselController.init();
        SmoothScrollController.init();

        // Expõe funções necessárias globalmente
        window.openNav = () => OverlayController.open();
        window.closeNav = () => OverlayController.close();
    }

    // Carrega quando o DOM estiver pronto
    document.addEventListener('DOMContentLoaded', init);
})();