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

async function capturar_orden(ordenId) {
    let respuesta = await server_paypal({
        accion: 1,
        ordenId: ordenId
    });

    //console.log(respuesta);
    // let resultado = respuesta.resultado ? respuesta.resultado : respuesta;
    return respuesta.resultado;
    /* if (resultado && resultado.status === "COMPLETED") {
        alert("¡Pago realizado y orden capturada con éxito!");
        // Aquí puedes registrar la compra en tu sistema o actualizar la interfaz
    } else {
        alert("No se pudo capturar la orden de PayPal");
    } */
    /* if (server.resultado) {
        // Aquí puedes manejar la respuesta de la captura de la orden
        console.log("Orden capturada:", server.resultado);
        return server.resultado;
    } else {
        alert("Error al capturar la orden de PayPal");
    } */
}

/* $(document).ready(function () {
    solo_user();
    consultar_producto();
    $('.btn_comprar').eq(1).click(async function () {
    // Obtén los IDs de los productos seleccionados
    console.log("Click en btn_comprar");
    let productosSeleccionados = [];
    $('input[name="producto_id[]"]:checked').each(function () {
        productosSeleccionados.push($(this).val());
    });
    console.log("Productos seleccionados:", productosSeleccionados);
    if (productosSeleccionados.length === 0) {
        alert("Selecciona al menos un producto");
        return;
    }

    // Crea la orden en tu backend, enviando los IDs
    let respuesta = await crear_orden(productosSeleccionados);
    console.log("Respuesta crear_orden:", respuesta);

    if (respuesta && respuesta.id) {
        let resultado = await capturar_orden(respuesta.id);
        console.log("Resultado capturar_orden:", resultado);

        if (resultado && resultado.status === "COMPLETED") {
            alert("¡Pago realizado y orden capturada con éxito!");
        } else {
            alert("No se pudo capturar la orden de PayPal");
        }
    } else {
        alert("No se pudo crear la orden de PayPal");
    }
});
}) */

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

        const respuesta = await crear_orden(productosSeleccionados);
        //console.log("Respuesta crear_orden:", respuesta);

        if (respuesta && respuesta.links) {
            const approveLink = respuesta.links.find(link => link.rel === "approve");
            if (approveLink) {
                window.location.href = approveLink.href;
                return; // Detén la función aquí
            }
        }

        /* if (respuesta && respuesta.id) {
            // Si por alguna razón no hay links, puedes intentar capturar (no recomendado)
            const resultado = await capturar_orden(respuesta.id);

            if (resultado && resultado.status === "COMPLETED") {
                alert("¡Compra completada con éxito!");
            } else {
                alert("No se pudo capturar la orden.");
            }
        } else {
            alert("No se pudo crear la orden.");
        } */

    });

});

$(document).ready(async function () {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    if (token) {
        const resultado = await capturar_orden(token);
        if (resultado && resultado.status === "COMPLETED") {
            alert("¡Pago realizado y orden capturada con éxito!");
        } else {
            alert("No se pudo capturar la orden de PayPal");
        }
    }
});