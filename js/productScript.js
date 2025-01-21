import { connectAPI } from "./connectAPI.js";

function deleteProductConfirm(id) {
    confirm = confirm('Este producto se eliminará')
    if (confirm == true) {
        const result = connectAPI.deleteProduct(id);

        if (result) {
            alert('El producto se ha eliminado exitosamente')
        } else{
            alert('Hubo un error al eliminar el producto')
        }
    }
}

//LIST NEW PRODUCT

const list = document.querySelector('[data-list]');

export default function createCard(id, title, category, image, price, ramoQuantity) {
    const product = document.createElement('li');
    product.className = 'product-card';
    product.innerHTML = 
    `<span class="category__display">${category}</span>
    <div class="product-image__container"><img src='${image}'></div>
    <div class="product-card__content" data-id=${id}>
        <p class="product-title">${title}</p>
        <h2 class="product-price">${price} <span class="span__if-category"></span></h2>
            <button class="product__delete"><i class="fa-solid fa-trash"></i> Eliminar</button>
    </div>`;

    let spanIfCategory = product.querySelector('.span__if-category');

    if (category == 'Semillas') {
        spanIfCategory.innerText = '/cada bolsa'
        spanIfCategory.style.display = 'inline-block';
    } else if (category == 'Flor natural') {
        spanIfCategory.innerText = '/cada unidad'
        spanIfCategory.style.display = 'inline-block';
    } else if (category == 'Ramo') {
        spanIfCategory.innerText = `/${ramoQuantity} unidades`
        spanIfCategory.style.display = 'inline-block';
    }

    let delBtns = document.querySelectorAll('.product__delete');

    delBtns.forEach((buttons) => {
        buttons.addEventListener('click', (ev) => {
            let id = ev.target.closest('[data-id]').dataset.id;

            if (id) deleteProductConfirm(id);
        })
    })

    return product;
}

async function listProduct() {
    const listAPI = await connectAPI.listProduct();

    listAPI.forEach(product => list.appendChild(createCard(product.id,product.title,product.category,product.image,product.price, product.ramoQuantity)))
}

listProduct();

//SEND NEW PRODUCT

const imageInput = document.querySelector('[data-image]');
const imageFilePicker = document.getElementById('image-file');

let imageDataUrl = '';

imageFilePicker.addEventListener('change', (ev) => {
    const imageFile = ev.target.files[0];
    if (imageFile) {
        const reader = new FileReader();
        reader.onload = (e) => {
            imageDataUrl = e.target.result;
            imageInput.value = imageFile.name;
          };
        reader.readAsDataURL(imageFile)
    }
});

const form = document.querySelector('[data-form]');

function createProduct(event) {

    event.preventDefault();

    const title = document.querySelector('[data-title]').value;
    const category = document.querySelector('[data-category]').value;
    const image = imageDataUrl || imageInput.value;
    let prePrice = document.querySelector('[data-price]').value;

    const formatter = new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP'});
    const price = formatter.format(prePrice);

    const ramoQuantity = document.querySelector('[data-ramo-quantity]').value;

    connectAPI.sendNewProduct(title, category, image, price, ramoQuantity)
}

form.addEventListener('submit', event => createProduct(event));
