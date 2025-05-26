let respuesta = ""
function server_login(model) {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: "POST",
            url: "php/controlador/login.php",
            data: {
                trama: JSON.stringify(model)
            },
            success: function(response) {
                respuesta = response
                try {
                    resolve(JSON.parse(response))
                    //console.log(response);
                } catch (error) {
                    //console.log(error);
                    reject(error)
                }
            }
        })
    })
}
function server_email(model){
    return new Promise ((resolve,reject)=>{
        $.ajax({
            type: "POST",
            url: "php/controlador/email.php",
            data: {
                trama:JSON.stringify(model)
            },
            success: function(response){
                respuesta = response
                try {
                    resolve(JSON.parse(response))  
                    //console.log(response);
                } catch (error) {
                     //console.log(error);
                    reject(error)
                }
            }
        })
    })
}



async function recuperar_contraseña() {
    let model ={
        accion : 0,
        correo : $("#rpc-correo").val().trim(),
        dominio : window.location.hostname,
        puerto : location.port
    }
    
    let response = await server_email(model);

    let emailmessages = document.getElementById('mensaje-correo-success');
    let emailmessaged = document.getElementById('mensaje-correo-danger');

    if(response.resultado === true) {

        // let token = response.token; // Suponiendo que el servidor devuelve un token
        // let enlace = await enlaceconParametros(token); // Obtener el enlace con el token
        emailmessages.style.display = 'block';
        emailmessages.textContent = 'Te hemos enviado un correo para recuperar tu contraseña.';
        emailmessaged.style.display = 'none';
        
    } else {
        emailmessaged.style.display = 'block';
        emailmessaged.textContent = 'El correo ingresado no está registrado. Por favor, inténtelo nuevamente.';
        emailmessages.style.display = 'none';
    }
}

