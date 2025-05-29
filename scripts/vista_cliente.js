function server_vista_cliente(model) {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: "POST",
            url: "php/controlador/vista_cliente.php",
            data: {
                trama: JSON.stringify(model)
            },
            success: function(response) {
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
    console.log(respuesta);
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

async function crear_orden(monto) {
    let respuesta = await server_paypal({
        accion: 0,
        monto: monto
    });

    return respuesta.resultado;

    /* if (server.resultado) {
        // Redirigir al usuario a la URL de aprobación de PayPal
        window.location.href = server.resultado.approval_url;
    } else {
        alert("Error al crear la orden de PayPal");
    } */
    
}

async function capturar_orden(ordenId) {
    let respuesta = await server_paypal({
        accion: 1,
        ordenId: ordenId
    });

    return respuesta.resultado;

    /* if (server.resultado) {
        // Aquí puedes manejar la respuesta de la captura de la orden
        console.log("Orden capturada:", server.resultado);
        return server.resultado;
    } else {
        alert("Error al capturar la orden de PayPal");
    } */
}

$(document).ready(function() {
    // Botón "Comprar con Paypal"
    $('.btn_comprar').eq(1).click(async function() {
        // Calcula el monto total según tus productos seleccionados
        let monto = 100; // <-- reemplaza por el cálculo real

        // Crea la orden en tu backend
        let respuesta = await crearOrdenPaypal(monto);
        if (respuesta && respuesta.id) {
            // Si no existe el contenedor, lo agregamos
            if ($('#paypal-button-container').length === 0) {
                $('<div id="paypal-button-container"></div>').insertAfter($(this));
            }
            // Renderiza el botón de PayPal
            paypal.Buttons({
                createOrder: function(data, actions) {
                    return respuesta.id;
                },
                onApprove: async function(data, actions) {
                    let captura = await capturarOrdenPaypal(data.orderID);
                    if (captura && captura.status === "COMPLETED") {
                        alert("Pago realizado con éxito");
                    } else {
                        alert("Error al capturar el pago");
                    }
                }
            }).render('#paypal-button-container');
        } else {
            alert("No se pudo crear la orden de PayPal");
        }
    });
});