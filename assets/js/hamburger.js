document.addEventListener('DOMContentLoaded', () => {
    // Get all the burger elements
    const burgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

    // Check if there are any burgers
    if (burgers.length > 0) {
        burgers.forEach((burger) => {
            burger.addEventListener('click', () => {
                // Get the target menu
                const target = burger.dataset.target;
                const menu = document.getElementById(target);

                // Toggle the menu visibility
                burger.classList.toggle('is-active');
                menu.classList.toggle('is-active');
            });
        });
    }
});