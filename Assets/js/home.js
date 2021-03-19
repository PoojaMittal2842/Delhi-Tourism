let btns = document.querySelector('.btn');
let inputs = document.querySelector('.input');
let search = document.querySelector('.search');

btns.addEventListener('click', () => {
    search.classList.toggle('active');
    inputs.focus();
})