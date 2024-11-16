const modal = document.querySelector('#image-modal');

let modalImage;
let modalCaption;

if (modal) {
    modalImage = document.getElementById('modal-image')
    modalCaption = document.getElementById("modal-caption");
}

const modalClose = document.querySelector('.modal-close');
const modalBackground = document.querySelector('.modal-background');

function closeModal(){
    modal.classList.remove('is-active');
}

if (modal) {
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('click', (e) => {
            modalImage.src = e.target.src;
            modalImage.alt = e.target.alt;

            modalCaption.textContent = e.target.alt;

            // Activate the modal
            modal.classList.add('is-active');
        })
    })

    modalBackground.addEventListener('click', () => {
        closeModal();
    })

    modalClose.addEventListener('click', () => {
        closeModal();
    })
}





