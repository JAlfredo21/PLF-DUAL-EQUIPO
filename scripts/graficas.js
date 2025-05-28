function server_grafica(model) {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: "POST",
            url: "php/controlador/graficas.php",
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

let gbarra = null;
let gpastel = null;
let glineal = null;

async function consultar_datos() {
    let model = {
        accion: 0,
        f_inicio: $("#fecha-inicio").val(),
        f_fin: $("#fecha-fin").val(),
    }

    let server = await server_grafica(model);
    let datos = server.resultado;

    const conteoProductos = {};

    datos.forEach(item => {
        const nombreProducto = item.producto;
        conteoProductos[nombreProducto] = (conteoProductos[nombreProducto] || 0) + 1;
    });

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
                    beginAtZero: true
                }
            }
        }
    });

    const ctxPastel = document.getElementById("grafica-pastel").getContext("2d");
    if (gpastel) {
        gpastel.destroy();
    }

    gpastel = new Chart(ctxPastel, {
        type: "pie",
        data: {
            labels: etiquetas,
            datasets: [{
                label: "Cantidad de ventas por producto",
                data: valores,
                backgroundColor: [
                    "rgba(255, 99, 132, 0.6)",
                    "rgba(54, 162, 235, 0.6)",
                    "rgba(255, 206, 86, 0.6)",
                    "rgba(75, 192, 192, 0.6)",
                    "rgba(153, 102, 255, 0.6)"
                ],
                borderColor: [
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(75, 192, 192, 1)",
                    "rgba(153, 102, 255, 1)"
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true
        }
    });


}