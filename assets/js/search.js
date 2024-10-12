// Set the maximum number of results
const MAX_RESULTS = 10;

document.addEventListener('DOMContentLoaded', () => {
    let posts = [];

    // Fetch posts data from the JSON file
    fetch('/api/posts.json')
        .then(response => response.json())
        .then(data => {
            posts = data;

            // Bind search functionality after posts are loaded
            const searchInput = document.getElementById('search');
            const searchForm = document.getElementById('search-form');
            const clearButton = document.getElementById('clear-button');

            // Attach event listeners
            searchInput.addEventListener('keyup', performSearch);
            searchForm.addEventListener('submit', function (event) {
                event.preventDefault(); // Prevent form submission
                performSearch();
            });

            clearButton.addEventListener('click', () => {
                searchInput.value = ''; // Clear the search input
                performSearch(); // Re-run the search with an empty value
            });

            // Initial search if input already has value
            if (searchInput.value.length > 0) {
                performSearch();
            }
        })
        .catch(error => {
            console.error('Failed to load posts JSON:', error);
        });

    // Font Awesome icon mapping for categories (placeholders)
    const categoryIcons = {
        'music': '<i class="fa-solid fa-record-vinyl"></i>',
        'for-sof': '<i class="fa-solid fa-file"></i>',
        'lore': '<i class="fa-solid fa-book-open"></i>',
        'characters': '<i class="fa-solid fa-address-card"></i>',
        default: '<i class="fas fa-newspaper"></i>'
    };

    // Get Font Awesome icon for category
    function getIconForCategory(category) {
        return categoryIcons[category] || categoryIcons['default'];
    }

    // Perform the search
    function performSearch() {
        const keyword = document.getElementById('search').value.toLowerCase();
        const searchResult = document.getElementById('search-result');
        let results = [];
        let additionalResults = [];

        searchResult.innerHTML = ''; // Clear previous results

        if (keyword.length > 0) {
            searchResult.style.display = 'block'; // Show result box
        } else {
            searchResult.style.display = 'none'; // Hide result box
        }

        // First pass: prioritize results matching title or description
        posts.forEach(post => {
            if (!post) return;

            const title = post.title ? post.title.toLowerCase() : '';
            const description = post.description ? post.description.toLowerCase() : '';
            const content = post.content ? post.content.toLowerCase() : '';

            if ((title.includes(keyword) || description.includes(keyword)) && results.length < MAX_RESULTS) {
                results.push(post);
            } else if (content.includes(keyword) && additionalResults.length < MAX_RESULTS) {
                additionalResults.push(post);
            }
        });

        // Fill in more results from content-based matches if needed
        if (results.length < MAX_RESULTS) {
            additionalResults.forEach(post => {
                if (!results.includes(post) && results.length < MAX_RESULTS) {
                    results.push(post);
                }
            });
        }

        // Display search results or "no results" message
        if (results.length === 0) {
            searchResult.innerHTML = '<div class="result-item p-1"><div class="description">There are no results.</div></div>';
        } else {
            results.forEach((post, i) => {
                if (i >= MAX_RESULTS) return;
                const icon = getIconForCategory(post.category); // Get Font Awesome icon
                searchResult.innerHTML += `
                    <a class="result-item" href="${post.url}">
                        <div class="h2">${icon} ${post.title}</div>
                        <div class="description">${post.description || 'No description available.'}</div>
                    </a>
                `;
            });
        }
    }
});
