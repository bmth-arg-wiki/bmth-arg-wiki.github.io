document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('image-modal-nav');
    const modalImg = document.getElementById('modal-image-nav');
    const modalClose = modal.querySelector('.modal-close');
    const modalBg = modal.querySelector('.modal-background');
    const nextBtn = modal.querySelector('.next-button');
    const prevBtn = modal.querySelector('.prev-button');

    let currentIndex = 0;
    let images = [];

    async function loadGallery(gallery, folder, repo) {
        // Build the correct URL
        const galleryUrl = `https://api.github.com/repos/bmth-arg-wiki/${repo}/contents/${folder}`;
        try {
            const response = await fetch(galleryUrl);
            const files = await response.json();
            gallery.innerHTML = '';

            files.forEach((file, index) => {
                if (file.type === 'file' && /\.(jpg|jpeg|png|gif)$/i.test(file.name)) {
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
                        currentIndex = index;
                        openModal();
                    });
                }
            });
        } catch (error) {
            console.error('Error loading gallery:', error);
        }
    }

    function openModal() {
        modal.classList.add('is-active');
        modalImg.src = images[currentIndex];
    }

    function closeModal() {
        modal.classList.remove('is-active');
    }

    function showNext() {
        currentIndex = (currentIndex + 1) % images.length;
        modalImg.src = images[currentIndex];
    }

    function showPrev() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        modalImg.src = images[currentIndex];
    }

    nextBtn.addEventListener('click', showNext);
    prevBtn.addEventListener('click', showPrev);
    modalClose.addEventListener('click', closeModal);
    modalBg.addEventListener('click', closeModal);

    const galleries = document.querySelectorAll('.image-gallery-nav');
    galleries.forEach(gallery => {
        images = []; // reset for each gallery
        loadGallery(gallery, gallery.dataset.folder, gallery.dataset.repo);
    });
});
