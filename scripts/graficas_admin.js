function server_graficas_admin(model) {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: "POST",
            url: "php/controlador/graficas_admin.php",
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
function expandGraph(graphId) {
    const graphContainer = document.getElementById(graphId);
    const allGraphs = document.querySelectorAll('.grafica');

    if (graphContainer.classList.contains('expanded')) {
        // Ya está expandida: reducirla
        graphContainer.classList.remove('expanded');
        graphContainer.querySelector('.canvas-container').style.width = '100%';
        graphContainer.querySelector('canvas').style.height = '400px';

        // Mostrar todas las gráficas nuevamente
        allGraphs.forEach(graph => {
            graph.style.display = 'block'; // Restauramos el display
        });

        // Ajustar tamaño
        if (graphId === 'grafica-productos' && chart1) chart1.resize();
        if (graphId === 'grafica-usuarios' && chart2) chart2.resize();
        if (graphId === 'grafica-fechas' && chart3) chart3.resize();
    } else {
        // Expandir la gráfica
        graphContainer.classList.add('expanded');
        graphContainer.querySelector('.canvas-container').style.width = '100%';
        graphContainer.querySelector('canvas').style.height = '600px';

        // Ocultar las otras gráficas
        allGraphs.forEach(graph => {
            if (graph.id !== graphId) {
                graph.style.display = 'none';
            }
        });

        // Ajustar tamaño
        if (graphId === 'grafica-productos' && chart1) chart1.resize();
        if (graphId === 'grafica-usuarios' && chart2) chart2.resize();
        if (graphId === 'grafica-fechas' && chart3) chart3.resize();
    }
}


document.querySelectorAll('.grafica').forEach((grafica) => {
    grafica.addEventListener('click', () => {
        const yaExpandida = grafica.classList.contains('expandida');

        // Resetear todas las gráficas
        document.querySelectorAll('.grafica').forEach((g) => {
            g.classList.remove('expandida', 'oculta');
            g.style.display = 'block'; // aseguramos visibilidad
        });

        if (!yaExpandida) {
            // Expandir la actual y ocultar las otras
            grafica.classList.add('expandida');

            document.querySelectorAll('.grafica').forEach((g) => {
                if (g !== grafica) {
                    g.classList.add('oculta');
                    g.style.display = 'none'; // ocultar correctamente
                }
            });
        }

        // Redibujar gráficas
        setTimeout(() => {
            Object.values(Chart.instances).forEach(chart => chart.resize());
        }, 450); // tiempo para que termine la animación
    });
});



let graficaBarras = null
let graficaPastel = null
let graficaLineal = null
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
            maintainAspectRatio: false,
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
        const nombreUsuario = item.producto;
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
                label: "Cantidad de productos vedido",
                data: valores2,
                backgroundColor: colores,
                borderColor: "#fff",
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'right',
                },
                title: {
                    display: true,
                    text: 'Distribución de productos vendido'
                }
            }
        }
    });


    //* Gráfica lineal
    // Paso 1: Contar ventas por día
    const ventasPorDia = {};

    datos.forEach(item => {
        const fecha = item.fecha; // ya es un string como '2024-06-01'
        ventasPorDia[fecha] = (ventasPorDia[fecha] || 0) + 1;
    });

    // Paso 2: Preparar etiquetas (fechas) y valores (ventas por día)
    const fechas = Object.keys(ventasPorDia).sort();
    const ventas = fechas.map(fecha => ventasPorDia[fecha]);

    const ctx3 = document.getElementById("grafica-lineal").getContext("2d");

    if (graficaLineal) {
        graficaLineal.destroy();
    }

    graficaLineal = new Chart(ctx3, {
        type: 'line',
        data: {
            labels: fechas,
            datasets: [{
                label: 'Ventas por día',
                data: ventas,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                tension: 0.3,
                fill: true,
                pointRadius: 4,
                pointHoverRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Fecha'
                    }
                },
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Cantidad de ventas'
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Ventas por día'
                },
                legend: {
                    display: false
                }
            }
        }
    });

}

