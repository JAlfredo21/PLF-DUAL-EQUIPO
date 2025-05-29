sessionStorage.clear();
//sessionStorage.getItem("log")
//sessionStorage.getItem("rol")
let respuesta = ""
function server_login(model) {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: "POST",
            url: "php/controlador/login.php",
            data: {
                trama: JSON.stringify(model)
            },
            success: function (response) {
                respuesta = response
                try {
                    resolve(JSON.parse(response))
                    console.log(response);
                } catch (error) {
                    reject(error)
                    console.log(error);
                }
            }
        })
    })
}
function server_email(model) {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: "POST",
            url: "php/controlador/email.php",
            data: {
                trama: JSON.stringify(model)
            },
            success: function (response) {
                respuesta = response
                try {
                    resolve(JSON.parse(response))
                    //console.log(response);
                } catch (error) {
                    //console.log(error);
                    reject(error)
                }
            }
        })
    })
}

async function iniciar_sesion() {
    let model = {
        accion: 1,
        nombre: $("#lg-nombre").val().trim(),
        contrasenia: $("#lg-contraseña").val().trim(),
    }

    let response = await server_login(model);
    let res = JSON.parse(respuesta);
    //console.log(model);
    if (res.resultado === false) {
        // Redirigir a la página de inicio
        let errorMessage = document.getElementById('mensaje-error');
        errorMessage.style.display = 'block';
        errorMessage.textContent = 'Usuario o contraseña incorrectos. Por favor, inténtelo nuevamente.';
    } else {
        sessionStorage.setItem("result", respuesta);
        sessionStorage.setItem("log", 'true');
        sessionStorage.setItem("rol", res.resultado[4]);
        if (res.resultado[4] === 'admin') {
            window.location.href = "vista.html"; // Redirigir a la página de administrador
        } else {
            window.location.href = "vista_cliente.html"; // Redirigir a la página de usuario
        }

    }
}

async function recuperar_contraseña() {
    let model = {
        accion: 0,
        correo: $("#rpc-correo").val().trim(),
        // dominio : window.location.hostname,
        // puerto : location.port
    }
    alert("Enviando Correo, espere...")
    let response = await server_email(model);
    
    let emailmessages = document.getElementById('mensaje-correo-success');
    let emailmessaged = document.getElementById('mensaje-correo-danger');

    if (response.resultado === true) {

        // let token = response.token; // Suponiendo que el servidor devuelve un token
        // let enlace = await enlaceconParametros(token); // Obtener el enlace con el token
        emailmessages.style.display = 'block';
        emailmessages.textContent = 'Te hemos enviado un correo para recuperar tu contraseña.';
        emailmessaged.style.display = 'none';

    } else {
        emailmessaged.style.display = 'block';
        emailmessaged.textContent = 'El correo ingresado no está registrado. Por favor, inténtelo nuevamente.';
        emailmessages.style.display = 'none';
    }
}

