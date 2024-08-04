// Set the maximum number of results from the search function
const MAX_RESULTS = 10;

$(function () {
    let posts = [];

    // On permalink /api/posts.json we have the data from all of our wiki articles
    $.get('/api/posts.json', function (data) {
        // Ensure data is properly parsed
        if (typeof data === "string") {
            try {
                data = JSON.parse(data);
                console.log(data);
            } catch (e) {
                console.error("Failed to parse JSON data:", e);
                return;
            }
        }
        posts = data;

        // Bind search functionality ONLY AFTER the posts are loaded
        $('#search').on('keyup', performSearch);
        $('#search-form').on('submit', function () {
            performSearch();
        });

        // Add a button to clear the result
        $('#clear-button').on('click', function () {
            $('#search').val('');
            performSearch();
        });

        // Run search if there's already input in the search field
        if ($('#search').val().length > 0) {
            performSearch();
        }
    }).fail(function () {
        console.error("Failed to load posts JSON");
    });

    // Emoji mapping for categories
    var categoryEmojis = {
        "music": "🎵",
        "files": "🗂️",
        "lore": "📚",
        "characters": "🙋",
        "default": "📰"
    };

    // Map emoji to category
    function getEmojiForCategory(category) {
        return categoryEmojis[category] || categoryEmojis["default"];
    }

    // Perform the search
    function performSearch() {
        let keyword = $('#search').val().toLowerCase();
        let searchResult = [];
        let additionalResults = [];

        if (keyword.length > 0) {
            $('#search-result').show();
        } else {
            $('#search-result').hide();
        }
        $('.result-item').remove();

        // First pass: prioritize results matching title or description
        for (let i = 0; i < posts.length && searchResult.length < MAX_RESULTS; i++) {
            let post = posts[i];

            // Skip if post is undefined or null
            if (!post) {
                continue;
            }

            let title = post.title ? post.title.toLowerCase() : '';
            let description = post.description ? post.description.toLowerCase() : '';
            let content = post.content ? post.content.toLowerCase() : '';

            // We always add results based on title and short description
            if (title.indexOf(keyword) >= 0 || description.indexOf(keyword) >= 0) {
                searchResult.push(post);

            // Add it to the backup list if we don't match
            } else if (content.indexOf(keyword) >= 0 && searchResult.length < MAX_RESULTS) {
                additionalResults.push(post);
            }
        }

        // If we need more results, the content-based results are added at the bottom.
        if (searchResult.length < MAX_RESULTS) {
            for (let i = 0; i < posts.length && searchResult.length < MAX_RESULTS; i++) {
                let post = posts[i];

                // Skip if post is undefined or null
                if (!post || searchResult.includes(post)) { continue; }

                // Check the content for matches
                let content = post.content ? post.content.toLowerCase() : '';
                if (content.indexOf(keyword) >= 0 && !additionalResults.includes(post)) {
                    additionalResults.push(post);
                }
            }
        }

        // Combine results, ensuring searchResult comes first
        searchResult = searchResult.concat(additionalResults);

        if (searchResult.length === 0) {
            $('#search-result').append(
                '<div class="result-item"><div class="description">There are no results.</div></div>'
            );
        } else {
            for (let i = 0; i < MAX_RESULTS; i++) {
                // Check the item for a category or make it undefined
                let category = searchResult[i] ? searchResult[i].category : "";

                // Determine the emoji for the category
                let emoji = getEmojiForCategory(category); // Wrap category in an array

                // Append HTML to display each search result
                $('#search-result').append(
                    '<a class="result-item" href="' +
                    searchResult[i].url +
                    '"><div class="h1">' + emoji + ' ' +
                    searchResult[i].title +
                    '</div><div class="description">' +
                    (searchResult[i].description || 'No description available.') +
                    '</div></a>'
                );
            }
        }
    }
});
