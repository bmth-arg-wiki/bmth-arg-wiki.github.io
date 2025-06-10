document.addEventListener('DOMContentLoaded', () => {
    const modal1 = document.querySelector('#image-modal');
    const modalImage1 = document.querySelector('#modal-image');
    const baseUrl = 'https://api.github.com/repos/bmth-arg-wiki/wiki-assets/contents/';

    async function loadGallery(gallery, folder) {

        const galleryUrl = `${baseUrl}${folder}`;

        try {
            const response = await fetch(galleryUrl);
            const files = await response.json();
            gallery.innerHTML = ''; // Clear previous gallery content

            files.forEach(file => {
                if (file.type === 'file' && file.name.match(/\.(jpg|jpeg|png|gif)$/i)) {
                    const column = document.createElement('div');
                    column.className = 'column is-one-quarter-desktop is-one-quarter-tablet is-one-third-mobile';

                    let card = document.createElement('div');
                    card.classList.add('card')

                    let imageCard = document.createElement('div');
                    imageCard.classList.add("card-image");
                    card.appendChild(imageCard);

                    let figure = document.createElement('figure');
                    figure.classList.add('image');
                    figure.classList.add('is-3by2');
                    imageCard.appendChild(figure);

                    let imgTag = document.createElement("img");
                    imgTag.src = file.download_url;
                    imgTag.width = 1200;
                    imgTag.height = 200;
                    imgTag.classList.add('img-contain');
                    imgTag.alt = file.name;
                    imgTag.loading = "lazy";
                    figure.appendChild(imgTag);

                    column.appendChild(card);

                    imgTag.addEventListener('click', (e) => {
                        modal1.classList.add('is-active');
                        modalImage1.src = e.target.src;
                    })

                    gallery.appendChild(column)
                }
            });
        } catch (error) {
            console.error('Error loading gallery:', error);
        }
    }

    const galleries = document.querySelectorAll('.image-gallery');
    galleries.forEach(gallery => {
        loadGallery(gallery, gallery.dataset.folder);
    });
});
