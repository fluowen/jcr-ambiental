// IIFE para evitar poluição do escopo global
(function () {
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
        },
        styles: {
            overlay: {
                openWidth: '100%',
                closedWidth: '0%'
            }
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
            DOM.overlay.style.width = CONFIG.styles.overlay.openWidth;
            document.body.style.overflow = 'hidden'; // Previne scroll quando menu está aberto

            // Adiciona listeners de eventos
            document.addEventListener('keydown', this.handleKeyPress);
            DOM.overlay.addEventListener('click', this.handleOverlayClick);
        },

        close() {
            if (!DOM.overlay || !this.isOpen) return;

            this.isOpen = false;
            DOM.overlay.style.width = CONFIG.styles.overlay.closedWidth;
            document.body.style.overflow = ''; // Restaura scroll

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

        setupEventListeners() {
            if (!DOM.overlayLinks) return;

            // Adiciona evento de clique para cada link do overlay
            DOM.overlayLinks.forEach(link => {
                link.addEventListener('click', () => {
                    setTimeout(() => this.close(), 150);
                });
            });

            // Adiciona listener para o botão de fechar
            if (DOM.navbar.closeBtn) {
                DOM.navbar.closeBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.close();
                });
            }
        },

        init() {
            this.setupEventListeners();
        }
    };