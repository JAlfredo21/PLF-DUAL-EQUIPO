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

// Suma los precios de los productos seleccionados en el frontend
/* let monto = 0;
$('input[name="producto_id[]"]:checked').each(function() {
    let precio = parseFloat($(this).closest('.producto-item').find('.precio').text().replace('$', ''));
    monto += precio;
}); */

// Luego llama a crear_orden con el monto
let respuesta = await crear_orden(monto);

async function crear_orden(monto) {
    let respuesta = await server_paypal({
        accion: 0,
        monto: 100
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

$('.btn_comprar').eq(1).click(async function() {
    // Obtén los IDs de los productos seleccionados
    let productosSeleccionados = [];
    $('input[name="producto_id[]"]:checked').each(function() {
        productosSeleccionados.push($(this).val());
    });

    if (productosSeleccionados.length === 0) {
        alert("Selecciona al menos un producto");
        return;
    }

    // Crea la orden en tu backend, enviando los IDs
    let respuesta = await crear_orden(productosSeleccionados);
    if (respuesta && respuesta.id) {
        // ...renderiza el botón de PayPal como ya tienes...
    } else {
        alert("No se pudo crear la orden de PayPal");
    }
});

// Modifica la función crear_orden para aceptar IDs
async function crear_orden(productos) {
    let respuesta = await server_paypal({
        accion: 0,
        productos: productos // Envía los IDs al backend
    });
    return respuesta.resultado;
}