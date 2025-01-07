document.addEventListener('DOMContentLoaded', function() {
    const searchResultsBox = document.querySelector('.search-results-main-menu');
    searchResultsBox.style.display = 'none';

    const searchResultsUl = document.querySelector('#search-results');
    const input = document.querySelector('#search-bar');

    const searchInput = document.querySelector('input[type="search"]');
    searchInput.addEventListener('input', function() {
        if (this.value === '') {
            searchResultsBox.style.display = 'none';
        }
    });

    fetch(jsonDataUrlOne)
        .then(response => response.json())
        .then(data => {
            input.addEventListener('keyup', function(event){
                const KeyWords = input.value.toLowerCase();
                let html = '';

                if (!KeyWords) {
                    searchResultsBox.style.display = 'none';
                } else {
                    searchResultsBox.style.display = 'block';

                    let found = false;

                    for (let item of data) {
                        if (item.name.toLowerCase().startsWith(KeyWords)) {
                            let url = "/sample-countries/" + item.name.replace(/ /g, '-').toLowerCase();
                            html += `<li class="search-item" data-url="${url}">${item.name}</li>`;
                            found = true;
                        }
                    }

                    if(!found){
                        html = '<li>No data found</li>';
                    }
                }
                searchResultsUl.innerHTML = html;

                document.querySelectorAll('.search-item').forEach(function(item) {
                    item.addEventListener('click', function() {
                        window.location.href = item.getAttribute('data-url');
                    });
                });
            });
        })

    document.addEventListener('click', function(event) {
        if(!searchResultsBox.contains(event.target) && event.target != input) {
            searchResultsBox.style.display = 'none';
        }
    });
});

