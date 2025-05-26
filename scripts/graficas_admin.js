function server_graficas_admin(model) {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: "POST",
            url: "php/graficas_admin.php",
            data: {
                trama: JSON.stringify(model)
            },
            success: function (response) {
                try {
                    resolve(JSON.parse(response))
                    console.log(JSON.parse(response))
                } catch (error) {
                    reject(error)
                }
            }
        })
    })
}

let graficaBarras = null
async function consultar_datos() {
    let model = {
        accion: 0,
        f_inicio: $("#fecha-inicio").val(),
        f_fin: $("#fecha-fin").val()
    }

    let server = await server_graficas_admin(model);
    datos = server.resultado;

    // Paso 1: Contar frecuencia de cada producto_id
    const conteoProductos = {};

    datos.forEach(item => {
        const id = item.producto_id;
        conteoProductos[id] = (conteoProductos[id] || 0) + 1;
    });
    // Paso 2: Preparar etiquetas (IDs de productos) y valores (cantidad vendida)
    const etiquetas = Object.keys(conteoProductos);
    const valores = Object.values(conteoProductos);

    const ctx = document.getElementById("grafica-barras").getContext("2d");

    if (graficaBarras) {
        graficaBarras.destroy();
    }

    graficaBarras = new Chart(ctx, {
        type: "bar",
        data: {
            labels: etiquetas,
            datasets: [{
                label: "Cantidad de ventas por producto",
                data: valores,
                backgroundColor: "rgba(75, 192, 192, 0.6)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: "Cantidad de ventas"
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: "ID de Producto"
                    }
                }
            }
        }
    });
}