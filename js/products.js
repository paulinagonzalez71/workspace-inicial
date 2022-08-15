const CARS_URL = 'https://japceibal.github.io/emercado-api/cats_products/101.json';

let autosArray = [];
console.log('antes de fetch y then')

fetch(CARS_URL)
.then(function(respuesta) {
     return respuesta.json()
})
.then(function(datos) {
    autosArray = datos.results;
    console.log(autosArray)

});
