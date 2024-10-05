// Carrossel irá mudar os slides automaticamente a cada 5 segundos
var myCarousel = document.querySelector('#carouselExampleIndicators')
var carousel = new bootstrap.Carousel(myCarousel, {
  interval: 5000,
  wrap: true
})
