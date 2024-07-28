document.addEventListener('DOMContentLoaded', () => {
    const menuLabels = document.querySelectorAll('.menu-label');

    menuLabels.forEach(label => {
        // Toggle visibility for menu
        label.addEventListener('click', () => {
            const submenu = label.nextElementSibling;
            if (submenu) {
                submenu.classList.toggle('is-hidden');
                label.classList.toggle('collapsed'); // Toggle collapsed class on the label
            }
        });
    });
});