let respuesta_cliente = ""
function server_cliente(model) {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: "POST",
            url: "php/controlador/login.php",
            data: {
                trama: JSON.stringify(model)
            },
            success: function (response) {
                respuesta_cliente = response
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

async function registrar_usuario() {
    let model = {
        accion: 0,
        nombre: $("#rg-nombre").val().trim(),
        correo: $("#rg-correo").val().trim().toLowerCase(),
        contrasenia: $("#rg-contraseña").val(),
    }

    let response = await server_cliente(model);

    let successMessage = document.getElementById('mensaje-success');
    let errorMessage = document.getElementById('mensaje-danger');

    if (response.resultado === true) {
        // Iniciar sesión automáticamente después de registrar
        let loginModel = {
            accion: 1,
            nombre: $("#rg-nombre").val().trim(),
            contrasenia: $("#rg-contraseña").val(),
        };
        let loginResponse = await server_login(loginModel);
        let res = JSON.stringify(loginResponse);

        sessionStorage.setItem("result", res);
        sessionStorage.setItem("log", 'true');
        sessionStorage.setItem("rol", res.resultado[4]);

        // Redirigir según el rol
        if (res.resultado[4] === "admin") {
            window.location.href = "vista.html";
        } else {
            window.location.href = "vista_cliente.html";
        }
    } else {
        // Mostrar mensaje de error
        errorMessage.style.display = 'block';
        errorMessage.textContent = 'El correo ya existe. Por favor, inténtelo nuevamente.';
        successMessage.style.display = 'none';
    }
}

async function actualizar_usuario() {
    let usuario = JSON.parse(sessionStorage.getItem("result"));
    let usuario_id = usuario.resultado[0];
    let model = {
        accion: 2,
        id: usuario_id,
        nombre: $("#up-nombre").val().trim(),
        correo: $("#up-correo").val().trim().toLowerCase(),
        contrasenia: $("#up-contraseña").val().trim(),

    }

    let response = await server_cliente(model);

    let successMessage = document.getElementById('mensaje-success');
    let errorMessage = document.getElementById('mensaje-danger');

    if (response.resultado === true) {
        // Mostrar mensaje de éxito
        successMessage.style = 'display: block; color: green; font-weight: bold;';
        successMessage.textContent = 'Usuario actualizado exitosamente.';
        errorMessage.style.display = 'none';

    } else {
        // Mostrar mensaje de error
        errorMessage.style = 'display: block; color: red; font-weight: bold;';
        errorMessage.textContent = 'Error al actualizar el usuario. Por favor, inténtelo nuevamente.';
        successMessage.style.display = 'none';
    }
}