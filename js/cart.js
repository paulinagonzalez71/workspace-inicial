const CART_USER_URL = "https://japceibal.github.io/emercado-api/user_cart/25801.json";
let articlesArray = [];
const precioDolar = 41;
let productCost = 0;
let productCount = 0;
let envioPercentage = 0.15;
let MONEY_SYMBOL = "$";
let DOLLAR_CURRENCY = "Dólares (USD)";
let PESO_CURRENCY = "Pesos Uruguayos (UYU)";
let DOLLAR_SYMBOL = "USD ";
let PESO_SYMBOL = "UYU ";
let PERCENTAGE_SYMBOL = '%';
let MSG = "Has comprado con éxito";
let radioCredito = document.getElementById("input-credito");
let radioTranfer = document.getElementById("input-transfer");
let inputNumTarjeta = document.getElementById("numero-tarjeta");
let inputCodSeg = document.getElementById("cod-seguridad");
let inputVenc = document.getElementById("vencimiento");
let inputNumCuenta = document.getElementById("numero-cuenta");


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
        let productCost = articleData.unitCost;
        let productCount = articleData.count;

        
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
              <p class="mb-4 pb-2">${articleData.currency} ${productCost}</p>
            </div>
        </div>
        <div class="col-md-2 col-sm-3 d-flex justify-content-center">
            <div>
            <input type="number" id="cantidad" value="${productCount}" min="1" class="cantidad cart-quantity-input  col-sm-5 rounded-4">
            </div>
        </div>
        <div class="col-md-2 col-sm-2 d-flex justify-content-center">
            <div>
              <b id="subtotal" class="subtotal mb-4 pb-2">${articleData.currency} ${articleData.unitCost}</b>
            </div>
        </div>
        `;

        infoCarrito.addEventListener("input", (e)=>{
          let subtotal = document.getElementById("subtotal");
          let cantidad = document.getElementById("cantidad");
          subtotal.innerHTML = productCost * cantidad.value;
          document.getElementById("productUnitCostText").innerHTML = ` USD ${productCost * cantidad.value}`;

          let envioText = document.getElementById("envio-text"); 
          let tipoEnvio = document.getElementsByClassName("form-check-input");
          if (tipoEnvio[0].checked){
            document.getElementById("costoTotalText").innerHTML = ` USD ${(cantidad.value * productCost * 0.15) + cantidad.value * productCost}`;
            envioText.innerHTML = `USD ${(cantidad.value * productCost) * 0.15}`
          } 
          if (tipoEnvio[1].checked){
            document.getElementById("costoTotalText").innerHTML = ` USD ${(cantidad.value * productCost * 0.07) + cantidad.value * productCost}`;
            envioText.innerHTML = `USD ${(cantidad.value * productCost) * 0.07}`
          } 
          if (tipoEnvio[2].checked){
            document.getElementById("costoTotalText").innerHTML = ` USD ${(cantidad.value * productCost * 0.05) + cantidad.value * productCost}`;
            envioText.innerHTML = `USD ${(cantidad.value * productCost) * 0.05}`
          } 
          });

          let tipoEnvio = document.getElementsByClassName("form-check-input");
          let envioText = document.getElementById("envio-text"); 

          for (let i = 0; i < tipoEnvio.length; i++) {
            tipoEnvio[i].addEventListener("click", ()=> {
              if (i == 0) {
                document.getElementById("costoTotalText").innerHTML = ` USD ${(cantidad.value * productCost * 0.15) + cantidad.value * productCost}`;
                envioText.innerHTML = `USD ${(cantidad.value * productCost) * 0.15}`
              }
              else if (i == 1) {
                document.getElementById("costoTotalText").innerHTML = ` USD ${(cantidad.value * productCost * 0.07) + cantidad.value * productCost}`;
                envioText.innerHTML = `USD ${(cantidad.value * productCost) * 0.07}`
              }
              else if (i == 2) {
                document.getElementById("costoTotalText").innerHTML = ` USD ${(cantidad.value * productCost * 0.05) + cantidad.value * productCost}`;
                envioText.innerHTML = `USD ${(cantidad.value * productCost) * 0.05}`
              }
            })
          }

        };

        infoCarrito.innerHTML += htmlContentToAppend; 

    });


    let formInfo = document.getElementById("form-info");

    formInfo.addEventListener("submit", (e)=>{

      let metodoPago = document.getElementById("feedback-seleccion");
      let feedbackPago = document.getElementById("feedback-pago");

      e.preventDefault();
      seleccionPagoValidate();

      document.getElementById("formulario-pago").addEventListener("input", (e)=>{


        if (!radioTranfer.checked && radioCredito.checked) {
        feedbackPago.classList.remove("is-invalid");
        feedbackPago.classList.add("is-valid"); 
        inputNumCuenta.setAttribute("disabled","disabled");
        inputNumTarjeta.removeAttribute("disabled");
        inputCodSeg.removeAttribute("disabled");
        inputVenc.removeAttribute("disabled");
        document.getElementById("feedback-pago").setAttribute("hidden","hidden");
        document.getElementById("feedback-pago").classList.remove("is-invalid"); 
        document.getElementById(`feedback-numero-cuenta`).setAttribute("hidden","hidden");

        metodoPago.innerHTML = "Tarjeta de crédito";
      } else if (!radioCredito.checked && radioTranfer.checked) {
        feedbackPago.classList.remove("is-invalid");
        feedbackPago.classList.add("is-valid");
        inputNumCuenta.removeAttribute("disabled");
        inputNumTarjeta.setAttribute("disabled", "disabled");
        inputCodSeg.setAttribute("disabled", "disabled");
        inputVenc.setAttribute("disabled", "disabled");
        document.getElementById("feedback-pago").setAttribute("hidden","hidden");
        document.getElementById("feedback-pago").classList.remove("is-invalid"); 
        document.getElementById("feedback-numero-tarjeta").setAttribute("hidden","hidden");
        document.getElementById("feedback-cod-seguridad").setAttribute("hidden","hidden");
        document.getElementById("feedback-vencimiento").setAttribute("hidden","hidden");

        metodoPago.innerHTML = "Transferencia bancaria";
      }

    });

    direccionValidate("calle");
    direccionValidate("num-puerta");
    direccionValidate("esquina");
  });
});

function direccionValidate(field) {
  let myField = document.getElementById(field);
  if (myField.value !== ""){
      myField.classList.remove("is-invalid");
      myField.classList.add("is-valid");
      myField.setAttribute("style", "border-color: green");
      infoMissing;
  } else {
      myField.classList.remove("is-valid");
      myField.classList.add("is-invalid");
      myField.setAttribute("style", "border-color: red");
      document.getElementById(`feedback-${field}`).removeAttribute("hidden")       
      infoMissing = true;
  }
};

/* function formaPagoValidate(field) {
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
}; */

function seleccionPagoValidate() {
  if (!radioTranfer.checked && !radioCredito.checked) {
    document.getElementById("feedback-pago").removeAttribute("hidden");
    document.getElementById("feedback-pago").classList.add("is-invalid"); 
    infoMissing = true;
  } 
};