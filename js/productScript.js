import { connectAPI } from "./connectAPI.js";

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

    let delBtn = product.querySelector('.product__delete');
    
    delBtn.addEventListener('click', async () => {
            if (id) {
                try {
                    await connectAPI.deleteProduct(id);
                    // product.remove();
                }
                catch (error) {
                    console.error(`Error al eliminar el producto con id ${id}:`, error);
                }
            };
        })

    return product;
}

async function listProduct() {
    const listAPI = await connectAPI.listProduct();

    listAPI.forEach(product => list.appendChild(createCard(product.id,product.title,product.category,product.image,product.price, product.ramoQuantity)))
}

listProduct();

//SEND NEW PRODUCT

const form = document.querySelector('[data-form]');

async function createProduct(event) {

    event.preventDefault();

    const id = Date.now();
    const title = document.querySelector('[data-title]').value;
    const category = document.querySelector('[data-category]').value;
    const image = imageDataUrl || imageInput.value;
    let prePrice = document.querySelector('[data-price]').value;

    const formatter = new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP'});
    const price = formatter.format(prePrice);

    const ramoQuantity = document.querySelector('[data-ramo-quantity]').value;

    console.log(id, title, category, image, price)

    try {
        const newProduct = await connectAPI.sendNewProduct(id, title, category, image, price, ramoQuantity);
        const newCard = createCard(id, title, category, image, price, ramoQuantity);
        list.appendChild(newCard)
    }
    catch (error) {
        console.log(error)
    }

}

form.addEventListener('submit', event => createProduct(event));
