function server_vista(model) {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: "POST",
            url: "php/controlador/vista.php",
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

function server_compra(model) {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: "POST",
            url: "php/controlador/compra.php",
            data: {
                trama: JSON.stringify(model)
            },
            success: function (response) {
                console.log("Respuesta cruda:", response);  
                try {
                    resolve(JSON.parse(response))
                } catch (error) {
                    console.error("Error parseando JSON:", error);
                    reject(error)
                }
            }
        })
    })
}

function server_esp32(model) {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: "POST",
            url: "php/controlador/esp32.php",
            data: {
                trama: JSON.stringify(model)
            },
            success: function (response) {
                try {
                    resolve(JSON.parse(response))
                } catch (error) {
                    reject(error)
                }
            }
        })
    })
}

async function consultar_datos() {
    let server = await server_vista({ accion: 0 });
    let datos = server.resultado;
    // Rellenar los campos del formulario con los datos recibidos
    for (let i = 0; i < datos.length; i++) {
        const element = datos[i];
        // Asumiendo que los inputs tienen nombres como nombre_1, precio_1, etc.
        let idx = i + 1;
        let nombreInput = document.querySelector(`input[name="nombre_${idx}"]`);
        let precioInput = document.querySelector(`input[name="precio_${idx}"]`);
        let idInput = document.querySelector(`input[name="id_${idx}"]`);
        let checkbox = document.querySelectorAll('input[name="producto_id"]')[i];
        if (nombreInput) nombreInput.value = element.nombre;
        if (precioInput) precioInput.value = element.precio;
        if (idInput) idInput.value = element.id;
        if (checkbox) checkbox.value = element.id
    }
}

async function actualizar_datos() {
    let productos = [];
    for (let i = 1; i < 5; i++) {
        let id = document.querySelector(`input[name="id_${i}"]`).value;
        let nombre = document.querySelector(`input[name="nombre_${i}"]`).value;
        let precio = document.querySelector(`input[name="precio_${i}"]`).value;
        productos.push({
            id: id,
            nombre: nombre,
            precio: precio
        });
    }

    let server = await server_vista({
        accion: 1,
        productos: productos
    });

    if (server.resultado) {
        alert("Datos enviados correctamente");

        let respuesta = await server_esp32({ accion: 1})

        if (respuesta.resultado) {
            alert("ESP32 actualizado correctamente")
        } else {
            alert("Error al actualizar ESP32")
        }

    } else {
        alert("Error al enviar los datos");
    }
}

async function comprar_productos() {
   let productos = [];

    // Recorremos los checkbox marcados
    $('input[name="producto_id"]:checked').each(function () {
        let idx = $(this).closest('tr').index() + 1; // índice para obtener inputs relacionados

        let id = $(`input[name="id_${idx}"]`).val();
        let precio = parseFloat($(`input[name="precio_${idx}"]`).val());

        productos.push({ id: parseInt(id), precio: precio });
    });

    if (productos.length === 0) {
        alert("Por favor seleccione al menos un producto para comprar.");
        return;
    }

    let response = await server_compra({
        accion: 0,
        productos: productos
    });

    if (response.resultado.success) {
        alert(response.resultado.message);
    } else {
        alert(response.resultado.message || "Error al registrar la compra");
    }
}
let user = JSON.parse(sessionStorage.getItem("result"));
let user_name = user.resultado[1];

$("#title").text("Bienvenido " + user_name)