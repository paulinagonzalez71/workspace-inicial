const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = `https://japceibal.github.io/emercado-api/cats_products/`;
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";




let showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function(url){
    let result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}


document.addEventListener('DOMContentLoaded', (e) =>  {

let htmlContentToAppend = '';
htmlContentToAppend += `
<a class="nav-link" 
<p>${localStorage.getItem('mailUsuario')}</p>
</a>
`;
document.getElementById('nav-mail').innerHTML += htmlContentToAppend;

});

function setProductID(id) {
  localStorage.setItem("productID", id);
  window.location.href = "product-info.html"
};

function cerrarSesion() {
  localStorage.removeItem('mailUsuario')
  let htmlContentToAppend = "";
  document.getElementById("nav-mail").innerHTML += htmlContentToAppend;
  localStorage.removeItem('fName');
  localStorage.removeItem('lName');
  localStorage.removeItem('mName');
  localStorage.removeItem('sLName');
  localStorage.removeItem('numTel');
}
