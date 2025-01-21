async function listProduct() {
    const connection = await fetch("https://my-json-server.typicode.com/Amapola-Nexus/AluraGeek-Challenge-API/productos", {
        headers:{"Content-type":"application/json"},
    });
    const connectionParsed = await connection.json();

    return connectionParsed;
}

async function sendNewProduct(id, title, category, image, price, ramoQuantity) {
    let fetchBody = {
        id: id,
        title: title,
        category: category,
        image: image,
        price: price,
        ...(ramoQuantity > 1 ? {ramoQuantity : ramoQuantity} : {})
    }

    const connection = await fetch("https://my-json-server.typicode.com/Amapola-Nexus/AluraGeek-Challenge-API/productos", {
        method:"POST",
        headers:{"Content-type":"application/json"},
        body:JSON.stringify(fetchBody)
    });

    const connectionParsed = await connection.json();

    return connectionParsed;
}

async function deleteProduct(id) {
    const connection = await fetch(`https://my-json-server.typicode.com/Amapola-Nexus/AluraGeek-Challenge-API/productos/${id}`,{
        method:"DELETE",
        headers:{"Content-type":"application/json"},
    })
    if (!connection.ok) {
        console.error("Error al eliminar producto. Estado:", response.status);
        return false;
    }

    const connectionParsed = await connection.json();

    return connectionParsed;
}

export const connectAPI = { listProduct, sendNewProduct, deleteProduct }
