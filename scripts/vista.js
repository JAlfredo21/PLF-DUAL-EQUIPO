function server_vista(model) {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: "POST",
            url: "php/controlador/vista.php",
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

async function consultar_datos() {
    let server = await server_vista({ accion: 0 });
    let datos = server.resultado;
    // Rellenar los campos del formulario con los datos recibidos
    for (let i = 0; i < datos.length; i++) {
        const element = datos[i];
        // Asumiendo que los inputs tienen nombres como nombre_1, precio_1, etc.
        let idx = i + 1;
        let nombreInput = document.querySelector(`input[name="nombre_${idx}"]`);
        let precioInput = document.querySelector(`input[name="precio_${idx}"]`);
        let idInput = document.querySelector(`input[name="id_${idx}"]`);
        if (nombreInput) nombreInput.value = element.nombre;
        if (precioInput) precioInput.value = element.precio;
        if (idInput) idInput.value = element.id;
    }
}

async function actualizar_datos() {
    let productos = [];
    for (let i = 1; i < 9; i++) {
        let id = document.querySelector(`input[name="id_${i}"]`).value;
        let nombre = document.querySelector(`input[name="nombre_${i}"]`).value;
        let precio = document.querySelector(`input[name="precio_${i}"]`).value;
        productos.push({
            id: id,
            nombre: nombre,
            precio: precio
        });
    }

    let server = await server_vista({
        accion: 1,
        productos: productos
    });

    if (server.resultado) {
        alert("Datos enviados correctamente");
    } else {
        alert("Error al enviar los datos");
    }
}