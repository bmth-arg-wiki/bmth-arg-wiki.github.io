import GLightbox from 'glightbox';

async function fetchFiles(url) {
    const response = await fetch(url);
    return response.json();
}

function findPoster(file, siblings) {
    const base = file.name.replace(/\.mp4$/i, '');
    const match = ['.jpg', '.jpeg', '.png']
        .map((ext) => base + ext)
        .find((name) => siblings.has(name));
    return match ? siblings.get(match) : null;
}

function buildCard(file, aspect, columns, siblings) {
    const column = document.createElement('div');
    column.className = `column ${columns}`;

    const card = document.createElement('div');
    card.classList.add('card');

    const figure = document.createElement('figure');
    figure.classList.add('image', aspect);

    const link = document.createElement('a');
    link.classList.add('glightbox');
    link.href = file.download_url;

    const isVideo = /\.mp4$/i.test(file.name);
    let media;
    if (isVideo) {
        media = document.createElement('video');
        media.muted = true;
        media.loop = true;
        media.playsInline = true;
        media.preload = 'metadata';
        media.classList.add('has-ratio', 'img-contain');
        const poster = findPoster(file, siblings);
        if (poster) {
            media.poster = poster;
        }
    } else {
        media = document.createElement('img');
        media.alt = '';
        media.loading = 'lazy';
        media.classList.add('img-contain');
    }
    media.src = file.download_url;

    link.appendChild(media);
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

        const siblings = new Map(files.map((file) => [file.name, file.download_url]));
        const videoBases = new Set(
            files
                .filter((file) => /\.mp4$/i.test(file.name))
                .map((file) => file.name.replace(/\.mp4$/i, '')),
        );

        files.forEach((file) => {
            if (file.type !== 'file' || !/\.(jpg|jpeg|png|gif|mp4)$/i.test(file.name)) {
                return;
            }
            const isVideo = /\.mp4$/i.test(file.name);
            const base = file.name.replace(/\.[^.]+$/, '');
            if (!isVideo && videoBases.has(base)) {
                return;
            }
            gallery.appendChild(buildCard(file, aspect, columns, siblings));
        });

        initLightbox(`.gallery[data-folder="${folder}"] .glightbox`);
    } catch (error) {
        // Gallery failed to load, page continues without it
    }
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.gallery').forEach(loadGallery);
});
