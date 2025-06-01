function server_qr(model) {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: "POST",
            url: "php/controlador/qr.php",
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

async function generar_qr() {
    let model = {
        accion: 0,  // Acción para generar el QR
        dominio: window.location.hostname,  // Enviar el dominio al servidor
        puerto: location.port     // Enviar el puerto al servidor
    };

    let response = await server_qr(model);  // Llamar al servidor con los datos

    if (response.resultado) {  // Verificar si el servidor respondió con 'resultado'
        // Generar el QR con la URL recibida del servidor
        new QRCode(document.getElementById("qrcode"), {
            text: response.resultado,  // URL del servidor
            width: 400,
            height: 400,
        });
        console.log("QR generado para URL:", response.resultado);
    } else {
        console.error("No se recibió URL válida del servidor");
    }

}

// Ejecutamos la función cuando la página esté lista
window.onload = generar_qr;