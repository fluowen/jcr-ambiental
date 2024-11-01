// script.js

document.addEventListener('DOMContentLoaded', function() {
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

    // Attach openNav to the button
    document.querySelector('.overlay-menu-toggler').addEventListener('click', openNav);
    // Attach closeNav to the close button
    document.querySelector('.closebtn').addEventListener('click', closeNav);
});