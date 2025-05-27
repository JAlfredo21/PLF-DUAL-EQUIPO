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
let graficaPastel = null
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
        const nombreProducto = item.producto;
        conteoProductos[nombreProducto] = (conteoProductos[nombreProducto] || 0) + 1;
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
                        text: "Nombre de Producto"
                    }
                }
            }
        }
    });

    //*Grafica de barras
    // Paso 1: Contar frecuencia de cada producto_id
    const conteoUsuarios = {};

    datos.forEach(item => {
        const nombreUsuario = item.usuario;
        conteoUsuarios[nombreUsuario] = (conteoUsuarios[nombreUsuario] || 0) + 1;
    });
    // Paso 2: Preparar etiquetas (IDs de productos) y valores (cantidad vendida)
    const etiquetas2 = Object.keys(conteoUsuarios);
    const valores2 = Object.values(conteoUsuarios);

    // Colores para cada segmento del pastel
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
    ];

    const ctx1 = document.getElementById("grafica-pastel").getContext("2d");

    if (graficaPastel) {
        graficaPastel.destroy();
    }

    graficaPastel = new Chart(ctx1, {
        type: "pie",
        data: {
            labels: etiquetas2,
            datasets: [{
                label: "Compras por usuario",
                data: valores2,
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
                    text: 'Distribución de compras por usuario'
                }
            }
        }
    });
}

async function grafica_barras(params) {
    
}