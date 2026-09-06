import GLightbox from 'glightbox';

document.addEventListener('DOMContentLoaded', () => {
    async function loadGallery(gallery, folder, repo) {
        const galleryUrl = `https://api.github.com/repos/bmth-arg-wiki/${repo}/contents/${folder}`;

        try {
            const response = await fetch(galleryUrl);
            const files = await response.json();
            gallery.innerHTML = '';

            files.forEach((file) => {
                if (file.type === 'file' && /\.(jpg|jpeg|png|gif)$/i.test(file.name)) {
                    const column = document.createElement('div');
                    column.className = 'column is-one-quarter-desktop is-one-quarter-tablet is-half-mobile';

                    const card = document.createElement('div');
                    card.classList.add('card');

                    const figure = document.createElement('figure');
                    figure.classList.add('image', 'is-3by2');

                    const img = document.createElement('img');
                    img.src = file.download_url;
                    img.alt = '';
                    img.title = '';
                    img.classList.add('img-contain');
                    img.loading = 'lazy';

                    figure.appendChild(img);
                    card.appendChild(figure);
                    column.appendChild(card);
                    gallery.appendChild(column);
                }
            });

            GLightbox({
                selector: `.image-gallery-nav[data-folder="${folder}"] .card img`,
                touchNavigation: true,
                loop: true,
                zoomable: true,
                draggable: true,
            });
        } catch (error) {
            console.error('Error loading gallery:', error);
        }
    }

    const galleries = document.querySelectorAll('.image-gallery-nav');
    galleries.forEach(gallery => {
        loadGallery(
            gallery,
            gallery.dataset.folder,
            gallery.dataset.repo
        );
    });
});
