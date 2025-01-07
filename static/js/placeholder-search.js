document.addEventListener('DOMContentLoaded', function() {
    const SearchBox = this.getElementById('search-bar');

    function ViewportWidth(){
        if (window.innerWidth <= 1256) {
            SearchBox.removeAttribute('placeholder');
        }
        else {
            SearchBox.setAttribute('placeholder', 'Search for a country');
        }
    }

    ViewportWidth();
    
    function checkViewportWidth(){
        ViewportWidth();
    }

    window.addEventListener('resize', checkViewportWidth);
});