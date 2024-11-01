function openNav() {
  document.getElementById("myNav").style.width = "100%";
}

function closeNav() {
  document.getElementById("myNav").style.width = "0%";
}

// Close overlay when any link is clicked
const overlayLinks = document.querySelectorAll('.overlay-content a');
overlayLinks.forEach(link => {
  link.addEventListener('click', function() {
      closeNav();
  });
});