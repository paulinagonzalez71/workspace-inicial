const CART_USER_URL = "https://japceibal.github.io/emercado-api/user_cart/25801.json";
let articlesArray = [];
const precioDolar = 41;
let radioCredito = document.getElementById("input-credito");
let radioTranfer = document.getElementById("input-transfer");
let inputNumTarjeta = document.getElementById("numero-tarjeta");
let inputCodSeg = document.getElementById("cod-seguridad");
let inputVenc = document.getElementById("vencimiento");
let inputNumCuenta = document.getElementById("numero-cuenta");
let metodoPago = document.getElementById("feedback-seleccion");

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
        let costosTotales = document.getElementById('costos');
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
              let subtotal1 = unidades * articleData.unitCost;
              
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
                    <input type="number" value="${unidades}" min="1" class="cantidad cart-quantity-input  col-sm-5 rounded-4">
                    </div>
                </div>
                <div class="col-md-2 col-sm-2 d-flex justify-content-center">
                    <div>
                      <b id="subtotal" class="subtotal mb-4 pb-2">${articleData.currency} ${subtotal1}</b>
                    </div>
                </div>
              `;
              infoCarrito.innerHTML = htmlContentToAppend; 
            };
          });

        };

        infoCarrito.innerHTML += htmlContentToAppend; 


        for (let i = 0; i < product.articles.length; i++) {
          let subtotal2 = product.articles[i].subtotal; 

          subtotal2 = subtotal2 + i;


        htmlContentToAppend = `
        <div class="border rounded-5 cont p-1">
            <p>Subtotal <span class="float-end">USD ${subtotal2}</span></p>
            <p class="text-muted">Costo Unitario por cantidad</p>
        </div>
        <div class="border rounded-5 cont p-1">
            <p>Costo de envío <span class="float-end">USD ${subtotal2}</span></p>
            <p class="text-muted">Según el tipo de envío</p>
        </div>
            <div class="border rounded-5 cont p-1">
            <p>Total <b class="float-end">USD ${subtotal2}</b></p>
        </div>
        `;


        };

        costosTotales.innerHTML += htmlContentToAppend;

    });

    let formPago = document.getElementById("formulario-pago");
    formPago.addEventListener('input', (e)=>{
      seleccionPago();
    });

    let formInfo = document.getElementById("form-info");

    formInfo.addEventListener("submit", (e)=>{
      e.preventDefault();
      direccionValidate("calle");
      direccionValidate("num-puerta");
      direccionValidate("esquina");
      tipoEnvioValidate();

    });

});


function seleccionPago() {

  if (!radioTranfer.checked) {
    inputNumCuenta.setAttribute("disabled","disabled");
    inputNumTarjeta.removeAttribute("disabled");
    inputCodSeg.removeAttribute("disabled");
    inputVenc.removeAttribute("disabled");
    metodoPago.innerHTML = "Tarjeta de crédito";
  } else if(!radioCredito.checked) {
    inputNumCuenta.removeAttribute("disabled");
    inputNumTarjeta.setAttribute("disabled", "disabled");
    inputCodSeg.setAttribute("disabled", "disabled");
    inputVenc.setAttribute("disabled", "disabled");
    metodoPago.innerHTML = "Transferencia bancaria";
  }
};

function direccionValidate(field) {
  let myField = document.getElementById(field);
  if (myField.value !== ""){
      myField.classList.remove("is-invalid");
      myField.classList.add("is-valid");
      myField.setAttribute("style", "border-color: red");
  } else {
      myField.classList.remove("is-valid");
      myField.classList.add("is-invalid");
      myField.setAttribute("style", "border-color: red");
      document.getElementById(`feedback-${field}`).removeAttribute("hidden")
  }
};

function tipoEnvioValidate() {

  if(!document.querySelector('input[name="tipo-envio"]:checked')) {
    document.getElementById("feedback-envio").removeAttribute("hidden")
  }

};

/* function formaPagoValidate(){

  if (!radioCredito.checked) {

  }

}; */