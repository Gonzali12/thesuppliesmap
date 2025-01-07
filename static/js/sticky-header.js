document.addEventListener('DOMContentLoaded', function() {
    var header = document.querySelector('.main-menu-container');
    var sticky = header.offsetTop;

    window.onscroll = function() {
        if (window.scrollY > sticky) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    };
});