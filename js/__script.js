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
                keyboard: true,
                touch: true // Habilita swipe em dispositivos touch
            });
        }

        // Inicializa carrossel de clientes
        if (DOM.carousels.clients) {
            new bootstrap.Carousel(DOM.carousels.clients, {
                interval: CONFIG.animations.carouselInterval,
                keyboard: true,
                touch: true
            });
        }
    },

    setupEventListeners() {
        // Pausa carrossel ao hover (opcional)
        [DOM.carousels.main, DOM.carousels.clients].forEach(carousel => {
            if (!carousel) return;

            carousel.addEventListener('mouseenter', () => {
                const carouselInstance = bootstrap.Carousel.getInstance(carousel);
                if (carouselInstance) {
                    carouselInstance.pause();
                }
            });

            carousel.addEventListener('mouseleave', () => {
                const carouselInstance = bootstrap.Carousel.getInstance(carousel);
                if (carouselInstance) {
                    carouselInstance.cycle();
                }
            });
        });
    }
};

// Controlador de Navegação Suave
const SmoothScrollController = {
    init() {
        this.setupEventListeners();
    },

    setupEventListeners() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', this.handleClick);
        });
    },

    handleClick(event) {
        event.preventDefault();
        const targetId = this.getAttribute('href');
        
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
};

// Controlador de Responsividade
const ResponsiveController = {
    init() {
        this.setupResizeHandler();
        this.handleResize(); // Checa o estado inicial
    },

    setupResizeHandler() {
        // Debounce para evitar múltiplas chamadas durante o resize
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => this.handleResize(), 250);
        });
    },

    handleResize() {
        // Adicione aqui qualquer lógica específica de responsividade
        if (window.innerWidth > 992 && OverlayController.isOpen) {
            OverlayController.close();
        }
    }
};

// Controlador de Performance
const PerformanceController = {
    init() {
        this.setupLazyLoading();
        this.optimizeCarousels();
    },

    setupLazyLoading() {
        // Observa imagens com atributo loading="lazy"
        if ('loading' in HTMLImageElement.prototype) {
            document.querySelectorAll('img[loading="lazy"]').forEach(img => {
                img.loading = 'lazy';
            });
        }
    },

    optimizeCarousels() {
        // Otimiza o carregamento inicial dos carrosséis
        [DOM.carousels.main, DOM.carousels.clients].forEach(carousel => {
            if (!carousel) return;

            const items = carousel.querySelectorAll('.carousel-item img');
            items.forEach(img => {
                // Pré-carrega a próxima imagem
                if (!img.complete) {
                    img.addEventListener('load', () => {
                        img.style.opacity = 1;
                    });
                } else {
                    img.style.opacity = 1;
                }
            });
        });
    }
};

// Função de inicialização principal
function init() {
    // Inicializa cache DOM
    DOM.init();

    // Inicializa todos os controllers
    OverlayController.init();
    CarouselController.init();
    SmoothScrollController.init();
    ResponsiveController.init();
    PerformanceController.init();

    // Expõe funções necessárias globalmente
    window.openNav = () => OverlayController.open();
    window.closeNav = () => OverlayController.close();
}

// Inicia a aplicação quando o DOM estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
})();