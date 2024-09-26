document.addEventListener('DOMContentLoaded', function() {
    // Get current URL path
    const currentPath = window.location.pathname;

    // Get all the nav links
    const navLinks = document.querySelectorAll('.tabs a');

    // Loop through each link
    navLinks.forEach(link => {
        // Compare the href of each link with the current path
        if (link.getAttribute('href') === currentPath) {
            // Remove 'is-active' from all links
            document.querySelectorAll('.tabs li').forEach(tab => {
                tab.classList.remove('is-active');
            });

            // Add 'is-active' to the parent <li> of the matching link
            link.parentElement.classList.add('is-active');
        }
    });
});
