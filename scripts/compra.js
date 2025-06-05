function server_compra(model){
    return new Promise((resolve, reject) => {
        $.ajax({
            url: "php/controlador/compra.php",
            type: "POST",
            data: {
                trama: JSON.stringify(model)
            },
            success: function(response) {
                try {
                    resolve(JSON.parse(response));
                } catch (error) {
                    reject(error);
                }
            },
        });
    });
}

function server_esp32(model){
    return new Promise((resolve, reject) => {
        $.ajax({
            url: "php/controlador/esp32.php",
            type: "POST",
            data: {
                trama: JSON.stringify(model)
            },
            success: function(response) {
                try {
                    resolve(JSON.parse(response));
                } catch (error) {
                    reject(error);
                }
            },
        });
    });
}

async function crear_compra() {
    // Obtener productos seleccionados
    let productosSeleccionados = [];
    $('input[name="producto_id[]"]:checked').each(function () {
        productosSeleccionados.push($(this).val());
    });

    if (productosSeleccionados.length === 0) {
        alert("Selecciona al menos un producto para comprar.");
        return;
    }

    // Obtener usuario
    let user = JSON.parse(sessionStorage.getItem("result"));
    let usuario_id = user.resultado[0];

    // Modelo para enviar al backend
    let model = {
        accion: 0,
        productos: productosSeleccionados,
        usuario_id: usuario_id
    };

    let respuesta = await server_compra(model);

    if (respuesta.resultado && respuesta.resultado.success) {
        alert("¡Compra realizada con éxito!");
        $('input[name="producto_id[]"]').prop('checked', false);

        // Aquí enviamos la compra al ESP32
        let respuestaESP32 = await server_esp32({
            accion: 2,
            productos: productosSeleccionados
        });

        if(respuestaESP32.resultado) {
            alert("ESP32 respondió");
        } else {
            alert("No se pudo enviar la compra al ESP32");
        }

    } else {
        alert("Ocurrió un error al realizar la compra.");
    }
}

// Asociar la función al botón
$(document).ready(function () {
    $('#btn-compra').on('click', crear_compra);
});
