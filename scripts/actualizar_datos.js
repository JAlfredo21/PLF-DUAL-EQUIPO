function server_datos(model) {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: "POST",
            url: "php/controlador/actualizar_datos.php",
            data: {
                trama: JSON.stringify(model)
            },
            success: function (response) {
                try {
                    resolve(JSON.parse(response))
                    //console.log(JSON.parse(response))
                } catch (error) {
                    reject(error)
                }
            }
        })
    })
}
async function cargar_datos() {
    let user = JSON.parse(sessionStorage.getItem("result"));
    let usuario_id = user.resultado[0];

    let server = await server_datos({accion : 1, id : usuario_id})
    let datos = server.resultado
    $("#up-nombre").val(datos[0].nombre) 
    $("#up-correo").val(datos[0].correo) 
    //$("#up-contraseña").val(datos[0].contrasenia)
}

function validar_formulario() {
    let nombre = $("#up-nombre").val().trim() !== "" ? $("#up-nombre").val().trim() : "No ingresado, se eliminará registro"
    let correo = $("#up-correo").val().trim() !== "" ? $("#up-correo").val().trim() : "No ingresado, se eliminará registro"
    let contraseña = $("#up-contraseña").val().trim() !== "" ? $("#up-contraseña").val().trim() : "1234"
    if (confirm("¿Estás seguro de que quieres actualizar a estos datos? \n\nnombre = " + nombre + "\ncorreo = " + correo + "\ncontraseña = " + contraseña)) {
        if (confirm("¿Seguro?")) {
            actualizar_datos()
            alert("Información enviada")
        } else {
            alert("Acción cancelada")
        }
    } else {
        alert("Acción cancelada");
    }
}

async function actualizar_datos() {
    let user = JSON.parse(sessionStorage.getItem("result"));
    let usuario_id = user.resultado[0];

    let model = {
        accion: 0,
        nombre: $("#up-nombre").val().trim(),
        correo: $("#up-correo").val().trim(),
        contraseña: $("#up-contraseña").val().trim() !== "" ? $("#up-contraseña").val().trim() : "1234",
        id: usuario_id
    }

    let server = await server_datos(model)

    if (server.resultado === true) {
        alert("Datos actualizados correctamente")
    } else {
        alert("Fallo al conectar, revise la red")
    }
}

function validar_salida(){
    let user = JSON.parse(sessionStorage.getItem("result"));
    let user_rol = user.resultado[4];
    if (user_rol === "admin"){
        window.location.href = "vista.html"
    }else if(user_rol === "user"){
        window.location.href = "vista_cliente.html"
    }else{
        window.location.href = "login.html"
    }
}