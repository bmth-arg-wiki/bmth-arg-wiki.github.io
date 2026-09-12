import GLightbox from 'glightbox';

async function fetchFiles(url) {
    const response = await fetch(url);
    return response.json();
}

function buildCard(file, aspect, columns) {
    const column = document.createElement('div');
    column.className = `column ${columns}`;

    const card = document.createElement('div');
    card.classList.add('card');

    const figure = document.createElement('figure');
    figure.classList.add('image', aspect);

    const link = document.createElement('a');
    link.classList.add('glightbox');
    link.href = file.download_url;

    const img = document.createElement('img');
    img.src = file.download_url;
    img.alt = '';
    img.classList.add('img-contain');
    img.loading = 'lazy';

    link.appendChild(img);
    figure.appendChild(link);
    card.appendChild(figure);
    column.appendChild(card);

    return column;
}

function initLightbox(selector) {
    GLightbox({
        selector,
        touchNavigation: true,
        loop: true,
        zoomable: true,
        draggable: true,
    });
}

async function loadGallery(gallery) {
    const { folder, repo, api, aspect, columns } = gallery.dataset;
    const url = `${api}/${repo}/contents/${folder}`;

    try {
        const files = await fetchFiles(url);
        gallery.innerHTML = '';

        files.forEach((file) => {
            if (file.type === 'file' && /\.(jpg|jpeg|png|gif)$/i.test(file.name)) {
                gallery.appendChild(buildCard(file, aspect, columns));
            }
        });

        initLightbox(`.gallery[data-folder="${folder}"] .glightbox`);
    } catch (error) {
        // Gallery failed to load, page continues without it
    }
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.gallery').forEach(loadGallery);
});
