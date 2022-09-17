const INFO_PRODUCTOS = `https://japceibal.github.io/emercado-api/products/${localStorage.getItem("productID")}.json`;
const COMMENTS_URL = `https://japceibal.github.io/emercado-api/products_comments/${localStorage.getItem("productID")}.json`;

document.addEventListener("DOMContentLoaded", function(e){
    fetch(INFO_PRODUCTOS)
    .then(respuesta => respuesta.json())
    .then(datos => {
        let product = datos;
        console.log(product);
        let htmlContentToAppend = "";

        htmlContentToAppend = `
        <div class ="row info">
            <div class="d-flex w-100 justify-content-between" titulo>
                <h2>${product.name}</h2>
            </div>
            <hr>
            <div class="d-flex w-100 justify-content-between info-producto">
                <ul>
                   <li>
                       <b>Precio</b>
                       <p class="mb-1">${product.currency} + ${product.cost}</p>
                   </li>
                   <li>
                       <b>Descripción</b>
                       <p class="mb-1">${product.description}</p>
                   </li>
                   <li>
                       <b>Categoría</b>
                       <p>${product.category}</p>
                   </li>
                   <li>
                       <b>Cantidad de productos vendidos</b>
                       <p>${product.soldCount}<b>
                   </li>
                <li><h3>Imágenes ilustrativas</h3></li>
                </ul>
            <div>
        </div>
    `;
    
    document.getElementById('info-producto').innerHTML += htmlContentToAppend; 

    let htmlContentToAppendImage = "";
    for (let i = 0; i < product.images.length; i++){

        let image = product.images[i];
                htmlContentToAppendImage += `

                        <div class="col-2 d-flex img-producto"">
                                <img src="${image}" class="img-thumbnail" id="img${i}">
                        </div>`
    };

        document.getElementById("info-imagenes").innerHTML = htmlContentToAppendImage;

    }); 


    fetch(COMMENTS_URL)
    .then(respuesta => respuesta.json())
    .then(datos => {
        let comments = datos;
        console.log(comments);
        let htmlContentToAppend = " ";

        htmlContentToAppend += `       
        <div class ="d-flex w-100 justify-content-between">
            <h3>Comentarios</h3>
        </div>
            `;

        for (let comment of comments) {
            
        htmlContentToAppend +=  `
            <div class="border rounded-5 cont">
                <p><b>${comment.user}</b>-<span class="text-muted">${comment.dateTime}-</span><span class="fa fa-star checked">${comment.score}</span></p>
                <p>${comment.description}</p>
            </div>
            `;
        };

        document.getElementById("lista-comentarios").innerHTML = htmlContentToAppend;  
    
    }); 
});
