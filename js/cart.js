const CART_USER_URL = "https://japceibal.github.io/emercado-api/user_cart/25801.json";
let articlesArray = [];

console.log(CART_USER_URL);

function calcSubtotal(cantidad, costo) {
    return (cantidad * costo);
};

/* console.log(calcSubtotal(2,5)); */

document.addEventListener("DOMContentLoaded", function(e){

    fetch(CART_USER_URL)
    .then(respuesta => respuesta.json())
    .then(datos => {
        let product = datos;
        console.log(product);
        let infoCarrito = document.getElementById('info-carrito');
        let htmlContentToAppend = "";
        for (let i = 0; i < product.articles.length; i++) {
        let articleData = product.articles[i];
        console.log(articleData)
        
        htmlContentToAppend = `
        <div class="col-md-2 col-sm-2">
            <img src="${articleData.image}" class="img-fluid">
        </div>
        <div class="col-md-2 col-sm-2 d-flex justify-content-center">
            <div>
              <p class="mb-4 pb-2">${articleData.name}</p>
            </div>
        </div>
        <div class="col-md-2 col-sm-2 d-flex justify-content-center">
            <div>
              <p class="mb-4 pb-2">${articleData.currency} ${articleData.unitCost}</p>
            </div>
        </div>
        <div class="col-md-2 col-sm-3 d-flex justify-content-center">
            <div>
            <input type="number" value="${articleData.count}" min="0" class="cantidad cart-quantity-input  col-sm-5 rounded-4">
            </div>
        </div>
        <div class="col-md-2 col-sm-2 d-flex justify-content-center">
            <div>
              <b id="subtotal" class="subtotal mb-4 pb-2">${articleData.currency} ${articleData.unitCost}</b>
            </div>
        </div>

        `;
        infoCarrito.addEventListener("input", (e)=>{
            if(e.target.type == "number"){
              let unidades = Number(e.target.value);
              let subtotal = unidades * articleData.unitCost;
              
              htmlContentToAppend = `
              <div class="col-md-2 col-sm-2">
              <img src="${articleData.image}" class="img-fluid">
                </div>
                <div class="col-md-2 col-sm-2 d-flex justify-content-center">
                    <div>
                      <p class="mb-4 pb-2">${articleData.name}</p>
                    </div>
                </div>
                <div class="col-md-2 col-sm-2 d-flex justify-content-center">
                    <div>
                      <p class="mb-4 pb-2">${articleData.currency} ${articleData.unitCost}</p>
                    </div>
                </div>
                <div class="col-md-2 col-sm-3 d-flex justify-content-center">
                    <div>
                    <input type="number" value="${unidades}" min="0" class="cantidad cart-quantity-input  col-sm-5 rounded-4">
                    </div>
                </div>
                <div class="col-md-2 col-sm-2 d-flex justify-content-center">
                    <div>
                      <b id="subtotal" class="subtotal mb-4 pb-2">${articleData.currency} ${subtotal}</b>
                    </div>
                </div>

              `;
              infoCarrito.innerHTML = htmlContentToAppend; 
            };

          });
        };

        infoCarrito.innerHTML += htmlContentToAppend; 


    });
});
