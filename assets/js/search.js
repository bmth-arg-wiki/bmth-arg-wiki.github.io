$(function () {
    var posts = [];

    $.get('/api/posts.json', function (data) {
        console.log("Data loaded:", data); // Debugging: Check if data is loaded correctly

        // Check the type of the data to ensure it's correctly parsed
        console.log("Data type:", typeof data);

        if (typeof data === "string") {
            try {
                data = JSON.parse(data); // Parse the data if it's a string
            } catch (e) {
                console.error("Failed to parse JSON data:", e);
            }
        }

        posts = data;
        console.log("Posts assigned:", posts); // Debugging: Check if posts are assigned

        // Bind the search functionality once the data is loaded
        $('#search').on('keyup', function () {
            performSearch();
        });

        $('#search-form').on('submit', function () {
            performSearch();
            return false; // Prevent default form submission
        });

        // Run search if there's already input in the search field
        if ($('#search').val().length > 0) {
            performSearch();
        }
    }).fail(function () {
        console.error("Failed to load posts JSON");
    });

    function performSearch() {
        var keyword = $('#search').val().toLowerCase();
        var searchResult = [];

        console.log("Performing search for keyword:", keyword); // Debugging: Check the keyword

        if (keyword.length > 0) {
            $('#search-result').show();
        } else {
            $('#search-result').hide();
        }
        $('.result-item').remove();

        for (var i = 0; i < posts.length; i++) {
            var post = posts[i];
            var title = post.title ? post.title.toLowerCase() : '';
            var description = post.description ? post.description.toLowerCase() : '';
            var content = post.content ? post.content.toLowerCase() : '';

            if (
                title.indexOf(keyword) >= 0 ||
                description.indexOf(keyword) >= 0 ||
                content.indexOf(keyword) >= 0
            ) {
                searchResult.push(post);
            }
        }

        console.log("Search results:", searchResult); // Debugging: Check search results

        if (searchResult.length === 0) {
            $('#search-result').append(
                '<div class="result-item"><div class="description">There is no search result.</div></div>'
            );
        } else {
            for (var i = 0; i < searchResult.length; i++) {
                $('#search-result').append(
                    '<a class="result-item" href="' +
                    searchResult[i].url +
                    '"><div class="title">【' + (searchResult[i].category || 'Uncategorized') + '】' +
                    searchResult[i].title +
                    '</div><div class="description">' +
                    (searchResult[i].description || 'No description available.') +
                    '</div></a>'
                );
            }
        }
    }
});
