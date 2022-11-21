let formPerfil = document.getElementById("form-perfil");
let fname = document.getElementById("fname");
let lname = document.getElementById("lname");
let emailprofile = document.getElementById('emailprofile');
let mname = document.getElementById("mname");
let slname = document.getElementById("slname");
let numTelefono = document.getElementById("num-telefono");


/*Función para validar los campos*/
function registroValidate(field) {

    let myField = document.getElementById(field);

    if (myField.value !== ""){
        myField.classList.remove("is-invalid");
        myField.classList.add("is-valid");
        myField.setAttribute("style", "border-color: green");
    } else {
        myField.classList.add("is-invalid");
        myField.setAttribute("style", "border-color: red");
        document.getElementById(`feedback-${field}`).removeAttribute("hidden")
    }
};

/*Función para guardar datos en localStorage*/
function guardarDatosLS() {
        localStorage.setItem("fName", fname.value);
        localStorage.setItem("lName", lname.value);
        localStorage.setItem("mName", mname.value);
        localStorage.setItem("sLName", slname.value);
        localStorage.setItem("numTel", numTelefono.value);
};

/*Función para redirigir al login en caso de que no esté registrado*/
function redirigir() {
    if (emailprofile.value == "") {
        window.location.href = 'login.html';
/*         localStorage.removeItem('fName');
        localStorage.removeItem('lName');
        localStorage.removeItem('mName');
        localStorage.removeItem('sLName');
        localStorage.removeItem('numTel');
        fname.value = "";
        lname.value = "";
        mname.value = "";
        slname.value = "";
        numTelefono.value = ""; */
    }
};

document.addEventListener('DOMContentLoaded', (e) =>  {

    /*Mostrar el mail logueado*/ 
    emailprofile.value = localStorage.getItem("mailUsuario");

    redirigir();

    formPerfil.addEventListener("submit", (e)=> {

        e.preventDefault();
        registroValidate("fname");
        registroValidate("lname");
        registroValidate("emailprofile");
        guardarDatosLS();

    });
    fname.value = localStorage.getItem("fName");
    lname.value = localStorage.getItem("lName");
    mname.value = localStorage.getItem("mName");
    slname.value = localStorage.getItem("sLName");
    numTelefono.value = localStorage.getItem("numTel");

});