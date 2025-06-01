function server_vista_cliente(model) {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: "POST",
            url: "php/controlador/vista_cliente.php",
            data: {
                trama: JSON.stringify(model)
            },
            success: function (response) {
                try {
                    resolve(JSON.parse(response));
                    //console.log(JSON.parse(response));
                } catch (error) {
                    reject(error);
                }
            }
        });
    });

}

function server_paypal(model) {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: "POST",
            url: "php/controlador/paypal.php",
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


async function consultar_producto() {
    let respuesta = await server_vista_cliente({ accion: 0 });
    //console.log(respuesta);
    let productos = respuesta.resultado;
    let html = '';
    if (Array.isArray(productos)) {
        productos.forEach(producto => {
            html += `
                <label class="producto-item">
                    <span class="nombre">${producto.nombre}</span>
                    <span class="precio">$${parseFloat(producto.precio).toFixed(2)}</span>
                    <input type="checkbox" name="producto_id[]" value="${producto.id}">
                </label>
            `;
        });
    }
    $(".producto-lista").html(html);
}

async function crear_orden(productos) {
    let respuesta = await server_paypal({
        accion: 0,
        productos: productos // Envía los IDs al backend
    });
    return respuesta.resultado;
}

async function capturar_orden(ordenId, productos = null) {
    let user = JSON.parse(sessionStorage.getItem("result"));
    let usuario_id = user.resultado[0]; 
    if (!productos) {
        productos = JSON.parse(sessionStorage.getItem("productos_seleccionados")) || [];
    }
    let respuesta = await server_paypal({
        accion: 1,
        ordenId: ordenId,
        usuario_id: usuario_id, // Envía el ID del usuario al backend
        productos: productos
    });
    
    return respuesta.resultado;
    //console.log(respuesta);
}

function checkInternetConnection() {
    return navigator.onLine;
}

// Función para verificar la conexión con el ESP32
function checkEsp32Connection() {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: "http://IP_DEL_ESP32/tu_endpoint",  // URL del endpoint del ESP32
            type: "POST",
            data: JSON.stringify({ping: "test"}),  // Lo que el ESP32 espera recibir
            contentType: "application/json",
            timeout: 3000,  // Timeout de 3 segundos
            success: function(response) {
                resolve(true);  // ESP32 respondió correctamente
            },
            error: function(xhr, status, error) {
                resolve(false);  // No respondió o hubo error
            }
        });
    });
}

// Función para verificar la conexión completa (Internet y ESP32)
async function verificarConexionCompleta() {
    // Verificamos la conexión a Internet
    if (!checkInternetConnection()) {
        $('#mjs-conexion').text("No tienes conexión a Internet.").show().css("color", "brown");
        $('#btn-paypal').prop('disabled', true);  // Deshabilitar el botón de compra
        return false;  // Si no hay Internet, no procedemos
    }

    // Verificamos la conexión con el ESP32
    let esp32Ok = await checkEsp32Connection();
    if (!esp32Ok) {
        $('#mjs-conexion').text("No se pudo conectar con el dispositivo ESP32. Intenta más tarde.").show().css("color", "brown");
        $('#btn-paypal').prop('disabled', true);  // Deshabilitar el botón de compra
        return false;  // Si el ESP32 no responde, no dejamos proceder
    }

    // Si todo está bien, habilitamos el botón y ocultamos el mensaje
    $('#mjs-conexion').hide();  // Ocultamos el mensaje si está todo bien
    $('#btn-paypal').prop('disabled', false);  // Habilitar el botón de compra
    return true;
}


$(document).ready(function () {
    // Inicializaciones
    // solo_user();
    verificarConexionCompleta();
    consultar_producto();

    window.addEventListener('online', async function() {
        $('#mjs-conexion').text("Conexión restaurada.").show().css("color", "green");
        await verificarConexionCompleta();  // Verificar de nuevo la conexión
    });

    window.addEventListener('offline', function() {
        $('#mjs-conexion').text("Has perdido la conexión a Internet.").show().css("color", "brown");
        $('#btn-paypal').prop('disabled', true);  // Deshabilitar el botón
    });

    // También chequeamos cada 30 segundos la conexión al ESP32 sin recargar la página
    setInterval(async function() {
        await verificarConexionCompleta();  // Verificar cada 30 segundos
    }, 30000);  // 30 segundos

    // Manejo del botón Comprar con PayPal
    $('#btn-paypal').on('click', async function () {
        //console.log("Botón de PayPal clickeado");
        let conexionOk = await verificarConexionCompleta();  // Verificar conexión antes de proceder
        if (!conexionOk) {
            return;  // Si no hay conexión, no procedemos
        }

        // Obtener productos seleccionados
        let productosSeleccionados = [];
        $('input[name="producto_id[]"]:checked').each(function () {
            productosSeleccionados.push($(this).val());
        });

        //console.log("Productos seleccionados:", productosSeleccionados);
        sessionStorage.setItem("productos_seleccionados", JSON.stringify(productosSeleccionados));
        const respuesta = await crear_orden(productosSeleccionados);
        //console.log("Respuesta crear_orden:", respuesta);

        if (respuesta && respuesta.links) {
            const approveLink = respuesta.links.find(link => link.rel === "approve");
            if (approveLink) {
                window.location.href = approveLink.href;
                return; // Detén la función aquí
            }
        }

    });

});

$(document).ready(async function () {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token') || urlParams.get('paymentId');
    if (token) {
        const resultado = await capturar_orden(token);
        // console.log("Resultado de capturar_orden:", resultado);
        if (resultado && resultado.status === "COMPLETED") {
            alert("¡Pago realizado y orden capturada con éxito!");
        } else {
            alert("No se pudo capturar la orden de PayPal");
        }
    }
});

$(document).ready(function () {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('cancel')) {
        alert("El pago fue cancelado.");
    }
});

/* let user = JSON.parse(sessionStorage.getItem("result"));
let user_name = user.resultado[1];

$("#title").text("Bienvenido "+user_name) */