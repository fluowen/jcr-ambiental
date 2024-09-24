// O carrossel horizontal usa a rolagem natural do navegador, sem necessidade de JavaScript adicional,
// mas caso queira adicionar navegação automática, você pode implementar algo como:

let scrollInterval = setInterval(() => {
    const carousel = document.querySelector('.carousel');
    carousel.scrollBy({ left: window.innerWidth, behavior: 'smooth' });
}, 5000); // Mudar para o próximo slide a cada 5 segundos
