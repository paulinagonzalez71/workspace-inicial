const INFO_PRODUCTOS = `https://japceibal.github.io/emercado-api/products/${localStorage.getItem("productID")}.json`;
const COMMENTS_URL = `https://japceibal.github.io/emercado-api/products_comments/${localStorage.getItem("productID")}.json`;
let arrayOfComments = [];
let botonEnviar = document.getElementById('agregar'); 
let esVacio = (JSON.parse(localStorage.getItem('lista')) == undefined); 
if (!esVacio) {
    arrayOfComments = JSON.parse(localStorage.getItem('lista'));
}
 

document.addEventListener("DOMContentLoaded", function(e){
    fetch(INFO_PRODUCTOS)
    .then(respuesta => respuesta.json())
    .then(datos => {
        let product = datos;
        console.log(product);
        let htmlContentToAppend = "";

        htmlContentToAppend = `
        <div class ="row">
            <div class="m-1 mt-4 d-flex w-100 justify-content-between">
                <h2 class="mb-2">${product.name}</h2>
                <button class="btn btn-primary shop-item-button float-end" type="button">Comprar</button>
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

                        <div class="col-2 mb-3 d-flex img-producto btn">
                                <img src="${image}" class="img-thumbnail m-2" id="img${i}">
                        </div>
                        `;
    };

        document.getElementById("info-imagenes").innerHTML = htmlContentToAppendImage;

    }); 


    fetch(COMMENTS_URL)
    .then(respuesta => respuesta.json())
    .then(datos => {
        let comments = datos;
        console.log(comments);
        let htmlContentToAppend = " ";

        for (let comment of comments) {
            
        htmlContentToAppend +=  `

            <div class="border rounded-5 cont">
                <p><b>${comment.user}</b>-<span class="text-muted">${comment.dateTime}-</span><span class="fa fa-star checked">${comment.score}</span></p>
                <p>${comment.description}</p>
            </div>
            `;
        };

        document.getElementById("lista-comentarios").innerHTML += htmlContentToAppend;  
    
    }); 

    fetch(INFO_PRODUCTOS)
    .then(respuesta => respuesta.json())
    .then(datos => {

        let product = datos;
        let htmlContentToAppend = "";

        for (let i = 0; i < product.relatedProducts.length; i++){

            let image = product.relatedProducts[i].image;
            let nombre = product.relatedProducts[i].name;
            htmlContentToAppend += `
            <div onclick="setProductID(${product.relatedProducts[i].id})" class="col-2 img-producto btn cursor-active">
                <img src="${image}" class="img-thumbnail" id="img${i}">
                <p>${nombre}</p>
            </div>
            `;
                        
        };
        document.getElementById("image-products").innerHTML += htmlContentToAppend;
  });

 botonEnviar.addEventListener('click', function(e){
    let newComment = document.getElementById('nuevo-comentario').value;

    if (newComment !== ""){
        arrayOfComments.push(newComment);
        document.getElementById('nuevo-comentario').value;
    }
  }); 
  agregarComentarios(arrayOfComments);

});


function agregarComentarios(arrayOfComments){
    let htmlContentToAppend = "";
   
    for (comentario of arrayOfComments){
        htmlContentToAppend +=  `
        <div class="border rounded-5 cont">
            <p><b>${comentario.user}</b>-<span class="text-muted">${comentario.dateTime}-</span><span class="fa fa-star checked">${comentario.score}</span></p>
            <p>${comentario}</p>
        </div>
        `;
    }
    document.getElementById("lista-comentarios").innerHTML += htmlContentToAppend;
}

//Escucho cuando se hace click en un boton de comprar

/* let addBtns = document.querySelectorAll('.shop-item-button');
addBtns = [...addBtns];

let listaArticulos = document.getElementById('lista-articulos');

addBtns.forEach(btn=>{
    btn.addEventListener('click', ()=>{
        // Agrego productos al carrito
        listaArticulos.innerHTML += `
        <table class="table mb-4">
        <tbody>
            <tr>
            <th><img src="${articleData.image}" class="col-sm-3"></th>
            <td>${articleData.name}</td>
            <td>${articleData.currency} ${articleData.unitCost}</td>
            <td><input type="${articleData.count}" placeholder="${articleData.count}" class="col-sm-4 rounded-4 cont"></td>
            <td>${articleData.currency} ${subtotal}</td>
            </tr>
        </tbody>
    </table>
    <hr>

        `;

    });
});
 */
