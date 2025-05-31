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


$(document).ready(function () {
    // Inicializaciones
    solo_user();
    consultar_producto();

    // Manejo del botón Comprar con PayPal
    $('#btn-paypal').on('click', async function () {
        //console.log("Botón de PayPal clickeado");

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

let user = JSON.parse(sessionStorage.getItem("result"));
let user_name = user.resultado[1];

$("#title").text("Bienvenido "+user_name)