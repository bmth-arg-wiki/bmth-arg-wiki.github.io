document.addEventListener('DOMContentLoaded', () => {
    const modal = document.querySelector('.image-modal-nav');
    const modalImg = modal.querySelector('.modal-image-nav');
    const modalClose = modal.querySelector('.modal-close');
    const modalBg = modal.querySelector('.modal-background');
    const nextBtn = modal.querySelector('.next-button');
    const prevBtn = modal.querySelector('.prev-button');

    let currentIndex = 0;
    let activeGallery = null;

    // Store images per gallery
    const galleryImages = new Map();

    async function loadGallery(gallery, folder, repo) {
        const galleryUrl = `https://api.github.com/repos/bmth-arg-wiki/${repo}/contents/${folder}`;
        const images = [];

        try {
            const response = await fetch(galleryUrl);
            const files = await response.json();
            gallery.innerHTML = '';

            files.forEach((file) => {
                if (file.type === 'file' && /\.(jpg|jpeg|png|gif)$/i.test(file.name)) {
                    const index = images.length;

                    const column = document.createElement('div');
                    column.className = 'column is-one-quarter-desktop is-one-quarter-tablet is-half-mobile';

                    const card = document.createElement('div');
                    card.classList.add('card');

                    const figure = document.createElement('figure');
                    figure.classList.add('image', 'is-3by2');

                    const img = document.createElement('img');
                    img.src = file.download_url;
                    img.alt = file.name;
                    img.classList.add('img-contain');
                    img.loading = 'lazy';
                    img.dataset.index = index;

                    figure.appendChild(img);
                    card.appendChild(figure);
                    column.appendChild(card);
                    gallery.appendChild(column);

                    images.push(file.download_url);

                    img.addEventListener('click', () => {
                        activeGallery = gallery;
                        currentIndex = index;
                        openModal();
                    });
                }
            });

            galleryImages.set(gallery, images);
        } catch (error) {
            console.error('Error loading gallery:', error);
        }
    }

    function openModal() {
        const images = galleryImages.get(activeGallery);
        if (!images || !images.length) return;

        modal.classList.add('is-active');
        modalImg.src = images[currentIndex];
    }

    function closeModal() {
        modal.classList.remove('is-active');
    }

    function showNext() {
        const images = galleryImages.get(activeGallery);
        if (!images) return;

        currentIndex = (currentIndex + 1) % images.length;
        modalImg.src = images[currentIndex];
    }

    function showPrev() {
        const images = galleryImages.get(activeGallery);
        if (!images) return;

        currentIndex = (currentIndex - 1 + images.length) % images.length;
        modalImg.src = images[currentIndex];
    }

    nextBtn.addEventListener('click', showNext);
    prevBtn.addEventListener('click', showPrev);
    modalClose.addEventListener('click', closeModal);
    modalBg.addEventListener('click', closeModal);

    // Load all galleries independently
    const galleries = document.querySelectorAll('.image-gallery-nav');
    galleries.forEach(gallery => {
        loadGallery(
            gallery,
            gallery.dataset.folder,
            gallery.dataset.repo
        );
    });
});
