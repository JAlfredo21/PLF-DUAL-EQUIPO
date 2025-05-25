function server_email(model) {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: 'POST',
            url: "php/controller_email/controller_email.php",
            data: {
                trama:JSON.stringify(model)
            },
            sucess: function (response){
                try {
                    resolve(JSON.parse(response))
                } catch (error) {
                    reject(error);
                }
            }
        })
    })
}

async function recuperar_contraseña() {
    let model = {
        accion: 0,
        correo: $('#correo').val().trim(),
        dominio: window.location.hostname,
        puerto: location.port,
    }

    let response = await server_email(model);

    if (response.resultado == true) {
         
    }
}