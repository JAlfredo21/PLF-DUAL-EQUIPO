function server_historial(model) {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: "POST",
            url: "php/controlador/historial.php",
            data: {
                trama: JSON.stringify(model)
            },
            success: function(response) {
                try {
                    resolve(JSON.parse(response));
                } catch (error) {
                    reject(error);
                }
            }
        });
    });
}

async function consultar_historial() {
    let user = JSON.parse(sessionStorage.getItem("result"))
    let usuario_id = user.resultado[0];

    let server = await server_historial({accion: 0, usuario_id: usuario_id});
    let datos = server.resultado;

    document.getElementById("tbl-hist").innerHTML = ``;

    for (let i = 0; i < datos.length; i++) {
        const element = datos[i];
        document.getElementById("tbl-hist").innerHTML += `
        <tr>
            <td class="text-center">${element.fecha}</td>
            <td class="text-center">${element.hora}</td>
            <td class="text-center">${element.producto}</td>
            <td class="text-center">${element.id}</td>
            <td class="text-center">$${element.precio}.00</td>
        </tr>
        `;
    }
}