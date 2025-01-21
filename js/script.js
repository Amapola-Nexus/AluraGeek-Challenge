const titleInput = document.querySelector('[data-title]');
const priceInput= document.querySelector('[data-price]');
const imageInput = document.querySelector('[data-image]');

const categorySelect = document.querySelector('[data-category]');
const ramoInput = document.getElementById('if-Ramo');
const ramoInputLabel = document.querySelector("label[for='if-Ramo']");

categorySelect.addEventListener('change', () => {
    if (categorySelect.value === 'Ramo') {
        ramoInput.style.display = 'block';
        ramoInputLabel.style.display = 'block';
    } else {
        ramoInput.style.display = 'none';
        ramoInputLabel.style.display = 'none';
    }
});

// let regex = /\.(jpe?g|png)$/i;

// imageInput.addEventListener('change', ()=> {
//     let result = regex.test(imageInput.value)
//     if (result == false) {
//         imageInput.style.outlineColor = 'var(--highlight-error)';
//     } else {
//         imageInput.style.outlineColor = 'var(--highlight-success)';
//     }
// })