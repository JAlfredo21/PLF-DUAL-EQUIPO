function server_grafica(model) {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: "POST",
            url: "php/controlador/graficas.php",
            data: {
                trama: JSON.stringify(model)
            },
            success: function (response) {
                try {
                    resolve(JSON.parse(response));
                } catch (error) {
                    reject(error);
                }
            },
        });
    });

}

let gbarra = null;
let gpastel = null;
let glineal = null;

async function consultar_datos() {

    let user = JSON.parse(sessionStorage.getItem("result"));
    let usuario_id = user.resultado[0]; // Ajusta si tu estructura es diferente

    let model = {
        accion: 0,
        f_inicio: $("#fecha-inicio").val(),
        f_fin: $("#fecha-fin").val(),
        usuario_id: usuario_id
    }

    let server = await server_grafica(model);
    let datos = server.resultado;

    // Filtrar solo compras del usuario logueado
    //sconst datosUsuario = datos.filter(item => item.usuario_id == usuario_id);

    const conteoProductos = {};

    datos.forEach(item => {
        const nombreProducto = item.producto;
        conteoProductos[nombreProducto] = (conteoProductos[nombreProducto] || 0) + 1;
    });
    // Paso 2: Preparar etiquetas (IDs de productos) y valores (cantidad vendida)
    const etiquetas = Object.keys(conteoProductos);
    const valores = Object.values(conteoProductos);

    const ctx = document.getElementById("grafica-barras").getContext("2d");

    if (gbarra) {
        gbarra.destroy();
    }

    gbarra = new Chart(ctx, {
        type: "bar",
        data: {
            labels: etiquetas,
            datasets: [{
                label: "Compras por producto",
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
                        text: "Cantidad de compras"
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: "Nombre de producto"
                    }
                }
            }
        }
    });

    /* // Grafica de barras
    // Paso 1: Contar frecuencia de cada producto_id
    const usuario = {};

    datos.forEach(item => {
        const nombreUsuario = item.usuario;
        usuario[nombreUsuario] = (usuario[nombreUsuario] || 0) + 1;
    });

    // Paso 2: Preparar etiquetas (IDs de productos) y valores (cantidad vendida)
    const etiquetasUsuarios = Object.keys(usuario);
    const valoresUsuarios = Object.values(usuario); 
 */
    const colores = [
        "rgba(255, 99, 132, 0.6)",
        "rgba(54, 162, 235, 0.6)",
        "rgba(255, 206, 86, 0.6)",
        "rgba(75, 192, 192, 0.6)",
        "rgba(153, 102, 255, 0.6)",
        "rgba(255, 159, 64, 0.6)",
        "rgba(100, 200, 100, 0.6)",
        "rgba(200, 100, 150, 0.6)",
        "rgba(100, 100, 200, 0.6)"
    ]

    const ctxPastel = document.getElementById("grafica-pastel").getContext("2d");
    if (gpastel) {
        gpastel.destroy();
    }

    gpastel = new Chart(ctxPastel, {
        type: "pie",
        data: {
            labels: etiquetas,
            datasets: [{
                label: "Productos más consumidos",
                data: valores,
                backgroundColor: colores,
                borderColor: "#fff",
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'right',
                },
                title: {
                    display: true,
                    text: 'Productos más consumidos'
                }
            }
        }
    });

    // Grafica de lineal
    // Paso 1: Contar ventas por día
    const ventasPorDia = {};

    datos.forEach(item => {
        const fecha = item.fecha.split(" ")[0]; // Obtener solo la fecha sin la hora
        ventasPorDia[fecha] = (ventasPorDia[fecha] || 0) + 1;
    });

    // Paso 2: Preparar etiquetas (fechas) y valores (vendida por día)

    const fechas = Object.keys(ventasPorDia).sort();
    const ventas = fechas.map(fecha => ventasPorDia[fecha]);
    const ctxLineal = document.getElementById("grafica-lineal").getContext("2d");

    if (glineal) {
        glineal.destroy();
    }

    glineal = new Chart(ctxLineal, {
        type: "line",
        data: {
            labels: fechas,
            datasets: [{
                label: "Compras por día",
                data: ventas,
                backgroundColor: "rgba(153, 102, 255, 0.6)",
                borderColor: "rgba(153, 102, 255, 1)",
                tension: 0.3,
                fill: true,
                pointRadius: 4,
                pointHoverRadius: 6
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: "Cantidad de compras"
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: "Fecha"
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: "Compras por día"
                },
                legend: {
                    display: false
                }
            }
        }
    });


}