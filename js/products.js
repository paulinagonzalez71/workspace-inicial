const CARS_URL = 'https://japceibal.github.io/emercado-api/cats_products/101.json';

let autosArray = [];
console.log('antes de fetch y then')

fetch(CARS_URL)
.then(function(respuesta) {
     return respuesta.json()
})
.then(function(datos) {
    console.log('dentro del then')
    autosArray = datos.products;
    console.log(autosArray)

    let divListaAutos = document.getElementById('lista-autos');

    let htmlContentToAppend = '';
    for (let auto of autosArray) {
        htmlContentToAppend += `
        <div class="col-3">
           <img src="${auto.image}" alt="product image" class="img-thumbnail">
        </div>
        <div class="col">
          <div class="d-flex w-100 justify-content-between">
              <div class="textos">
                  <h4>${auto.name} - ${auto.currency} ${auto.cost}</h4> 
                  <p>${auto.description}</p> 
              </div>
            <small class="text-muted">${auto.soldCount} vendidos</small> 
        </div>
        `;
    }
    divListaAutos.innerHTML += htmlContentToAppend;



});

console.log('después de fetch y then')