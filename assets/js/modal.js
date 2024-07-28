const modal = document.querySelector('.modal');

const modalClose = document.querySelector('.modal-close');
const modalBackground = document.querySelector('.modal-background');
const modalImage = modal.querySelector('img');

document.querySelectorAll('img').forEach(img => {
    img.addEventListener('click', (e) => {
        modal.classList.add('is-active');
        console.log(modalImage.src + " | " + e.target.src)
        modalImage.src = e.target.src;
        console.log('open')
    })
})

modalBackground.addEventListener('click', () => {
    closeModal();
})

modalClose.addEventListener('click', () => {
    closeModal();
})

function closeModal(){
    console.log("close")
    modal.classList.remove('is-active');
}