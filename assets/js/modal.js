import GLightbox from 'glightbox';

document.addEventListener('DOMContentLoaded', () => {
    const contentImages = document.querySelectorAll('.content img');

    contentImages.forEach(img => {
        if (img.closest('a') || img.closest('.image-gallery-nav') || img.closest('.gallery-art-cards')) return;

        img.style.cursor = 'zoom-in';
        img.classList.add('glightbox');
        img.title = img.alt || '';
        img.dataset.gallery = 'content';
    });

    GLightbox({
        selector: '.content img.glightbox',
        touchNavigation: true,
        loop: false,
        zoomable: true,
        draggable: true,
    });
});
