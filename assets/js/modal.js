const modal = document.querySelector('#image-modal');

let modalImage;
if (modal) { modalImage = modal.querySelector('#modal-image') }

const modalClose = document.querySelector('.modal-close');
const modalBackground = document.querySelector('.modal-background');

function closeModal(){
    modal.classList.remove('is-active');
}

if (modal) {
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('click', (e) => {
            modal.classList.add('is-active');
            modalImage.src = e.target.src;
        })
    })

    modalBackground.addEventListener('click', () => {
        closeModal();
    })

    modalClose.addEventListener('click', () => {
        closeModal();
    })
}





