const modal = document.querySelector('#image-modal');

// Image elements
let modalImage = document.getElementById('modal-image')
let modalCaption = document.getElementById("modal-caption");

// Buttons/interactable background
const modalClose = document.querySelector('.modal-close');
const modalBackground = document.querySelector('.modal-background');

function closeModal() {
    modal.classList.remove('is-active');
}

if (modal) {
    document.querySelectorAll('img').forEach(img => {
        // skip images that are links, as opening a modal is only annoying in this case
        if (img.closest('a')) return;

        img.addEventListener('click', (e) => {
            modalImage.src = e.target.src;

            // Use a fallback for images without alt text
            modalImage.alt = e.target.alt || '';
            modalCaption.textContent = e.target.alt || '';

            // Activate the modal
            modal.classList.add('is-active');
        });
    });

    // Add event listeners
    modalBackground.addEventListener('click', closeModal);
    modalClose.addEventListener('click', closeModal);
}


