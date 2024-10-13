// Helper function to extract category from URL path
function getCategoryFromPath(path) {
    const parts = path.split('/');
    return parts.length > 2 ? parts[2] : ''; // Adjust index based on zero-based array
}

document.addEventListener('DOMContentLoaded', function() {
    // Get current URL path
    const currentPath = window.location.pathname;

    // Get all the nav links
    const navLinks = document.querySelectorAll('.tabs a');

    // Determine the category of the current page from the URL
    const category = getCategoryFromPath(currentPath);

    // Loop through each tab link
    navLinks.forEach(link => {
        // Determine the tab category
        const tabCategory = getCategoryFromPath(link.getAttribute('href'));

        // Compare the category of this tab to the page category
        if (category === tabCategory) {
            // Remove 'is-active' from all links
            document.querySelectorAll('.tabs li').forEach(tab => {
                tab.classList.remove('is-active');
            });

            // Add 'is-active' to the parent <li> of the matching link
            link.parentElement.classList.add('is-active');
        }
    });
});
