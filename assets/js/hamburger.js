document.addEventListener('DOMContentLoaded', () => {
    const burgers = document.querySelectorAll('.navbar-burger');

    burgers.forEach((burger) => {
        burger.addEventListener('click', () => {
            const target = burger.dataset.target;
            const menuitem = document.getElementById(target);

            if (menuitem) {
                burger.classList.toggle('is-active');
                menuitem.classList.toggle('is-active');
            }
        });
    });
});
