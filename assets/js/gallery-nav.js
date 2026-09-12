import GLightbox from 'glightbox';

document.addEventListener('DOMContentLoaded', () => {
    async function loadGallery(gallery, folder, repo, apiBase) {
        const galleryUrl = `${apiBase}/${repo}/contents/${folder}`;

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

                    const link = document.createElement('a');
                    link.classList.add('glightbox');
                    link.href = file.download_url;
                    link.dataset.gallery = `gallery-${folder}`;

                    const img = document.createElement('img');
                    img.src = file.download_url;
                    img.alt = '';
                    img.classList.add('img-contain');
                    img.loading = 'lazy';

                    link.appendChild(img);
                    figure.appendChild(link);
                    card.appendChild(figure);
                    column.appendChild(card);
                    gallery.appendChild(column);
                }
            });

            GLightbox({
                selector: `.image-gallery-nav[data-folder="${folder}"] .glightbox`,
                touchNavigation: true,
                loop: true,
                zoomable: true,
                draggable: true,
            });
        } catch (error) {
            // Gallery failed to load, page continues without it
        }
    }

    const galleries = document.querySelectorAll('.image-gallery-nav');
    galleries.forEach(gallery => {
        loadGallery(
            gallery,
            gallery.dataset.folder,
            gallery.dataset.repo,
            gallery.dataset.api
        );
    });
});
