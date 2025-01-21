import { connectAPI } from "./connectAPI.js";
import createCard from "./productScript.js";

const searchBtn = document.querySelector('[data-search-btn]')

//this searchbar is bad and I should feel bad

async function filterProduct(event) {

    event.preventDefault();

    const searchData = document.querySelector('[data-search]').value;
    const searchQuery = await connectAPI.searchProduct(searchData);

    const list = document.querySelector('[data-list]');

    while(list.firstChild){
        list.removeChild(list.firstChild);
    }

    searchQuery.forEach(product => list.appendChild(createCard(product.id,product.title,product.category,product.image,product.price)))
}

searchBtn.addEventListener('click', event => filterProduct(event))