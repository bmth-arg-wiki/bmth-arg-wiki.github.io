import GLightbox from 'glightbox';

document.addEventListener('DOMContentLoaded', () => {
    const contentImages = document.querySelectorAll('.content img');

    contentImages.forEach(img => {
        if (img.closest('a') || img.closest('.image-gallery-nav') || img.closest('.gallery-art-cards')) return;

        const link = document.createElement('a');
        link.classList.add('glightbox');
        link.href = img.src;
        link.dataset.gallery = 'content';
        link.dataset.title = img.alt || '';

        img.parentNode.insertBefore(link, img);
        link.appendChild(img);
    });

    GLightbox({
        selector: '.content .glightbox',
        touchNavigation: true,
        loop: false,
        zoomable: true,
        draggable: true,
    });
});
