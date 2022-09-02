let formularioLogin = document.getElementById('formulario-login');
formularioLogin.addEventListener('submit', function(evento) {

    let email = document.getElementById('usuario').value;
    let contrasenia = document.getElementById('password').value;

    if (email.length === 0) {
        evento.preventDefault();
        alert('El campo de email está vacío');
    }  else if (contrasenia.length < 6) {
            evento.preventDefault();
            alert('La contraseña debe tener al menos 6 caracteres');
    } else {
        evento.preventDefault();
        localStorage.setItem('mailUsuario', email);
        console.log(localStorage.getItem('mailUsuario'));
        window.location.href = 'index.html';
    }
    
});

