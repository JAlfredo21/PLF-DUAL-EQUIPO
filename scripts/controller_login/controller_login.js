let respuesta = ""
function server_usuario(model){
    return new Promise ((resolve,reject)=>{
        $.ajax({
            type: "POST",
            url: "database/controller_login/controller_login.php",
            data: {
                trama:JSON.stringify(model)
            },
            success: function(response){
                respuesta = response
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

function server_email(model){
    return new Promise ((resolve,reject)=>{
        $.ajax({
            type: "POST",
            url: "database/controller_email/controller_email.php",
            data: {
                trama:JSON.stringify(model)
            },
            success: function(response){
                respuesta = response
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


let toast = $('#liveToast')

async function registrar_usuario(){
    try{
        if (!pass || !email || !nombre || !mat) {
            toast.removeClass('bg-success bg-danger bg-info bg-warning bg-primary');
            toast.addClass('bg-danger');
            toast.find('.toast-body').text('¡Rellena todos los campos correctamente para continuar!').css('color','white')
            toast.toast('show')
            console.log(pass, email, nombre, mat)
            return false;
    
        }else {
            let model = {
                accion : 1,
                nombre: $("#nombreReg").val().trim(),
                correo :$("#correoReg").val().trim(),
                contraseña :$("#contrasenaReg").val().trim(),
                matricula : $("#matriculaReg").val().trim()
            };
        
            let server = await server_usuario(model);
        
            let resp=JSON.parse(respuesta)
            if(resp.resultado === true){
                toast.removeClass('bg-success bg-danger bg-info bg-warning bg-primary');
                toast.addClass('bg-success');
                toast.find('.toast-body').text('¡Registro exitoso!').css('color','white')
                toast.toast('show')

                let inputs = document.getElementsByName("reg-form");
                for (let i = 0; i < inputs.length; i++) {
                    const element = inputs[i].value = "";
                } 
            }else if(resp.resultado === false){
                toast.removeClass('bg-success bg-danger bg-info bg-warning bg-primary');
                toast.addClass('bg-danger');
                toast.find('.toast-body').text('Usuario ya existente').css('color','white')
                toast.toast('show')
            }     
        }    
    }catch (error){
        toast.removeClass('bg-success bg-danger bg-info bg-warning bg-primary');
        toast.addClass('bg-danger');
        toast.find('.toast-body').text('No se puede conectar al servidor').css('color','white')
        toast.toast('show')
        console.log(error)
    }
    
}

//Función para el formulario de ingreso
async function validar_ingreso() {
    try{
        let model = {
            accion: 0,
            nombre : $("#nombre").val().trim(),
            contraseña : $("#contrasena").val().trim(),
    
        }
    
        let server = await server_usuario(model);
    
        let resp=JSON.parse(respuesta)
        if (resp.resultado === false){
            toast.removeClass('bg-success bg-danger bg-info bg-warning bg-primary');
            toast.addClass('bg-danger');
            toast.find('.toast-body').text("Usuario/contraseña no válidos").css('color','white')
            toast.toast('show')
            let inputs = document.getElementsByName("inputInit");
            for (let i = 0; i < inputs.length; i++) {
            const element = inputs[i].value = "";
            }
        }else{
            sessionStorage.setItem("user", respuesta)
            sessionStorage.setItem("log", 'true')
            sessionStorage.setItem("bienvenido", "Bienvenido " + resp.resultado[0])
            window.location.href = "ventana.html";
            }
    }catch (error){
        toast.removeClass('bg-success bg-danger bg-info bg-warning bg-primary');
        toast.addClass('bg-danger');
        toast.find('.toast-body').text('No se puede conectar al servidor').css('color','white')
        toast.toast('show')
        console.log(error)
    }
    
}


//Comprueba en tiempo real si el nombre está vacío
let nombre = false
$('#nombreReg').on('input',function(e){
    const regexName = /^[a-zA-ZáéíóúÁÉÍÓÚüÜ]{3,}$/
    if(!regexName.test(e.currentTarget.value)){
        nombre = false
    }else{
        nombre = true
    }
})

//Comprueba en tiempo real si la contraseña está vacía
let pass = false
$('#contrasenaReg').on('input',function(e){
    const regexPass = /^(?!\s*$).{2,}$/
    if(!regexPass.test(e.currentTarget.value)){
        pass = false
    }else{
        pass = true
    }
})

//Comprueba en tiempo real el correo
let email = false
$('#correoReg').on('input',function(e){
    const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if(!regexEmail.test(e.currentTarget.value)){
        email = false
    }else{
        email = true
    }
})

//Comprueba en tiempo real si la matrícula está vacía
let mat = false
$('#matriculaReg').on('input',function(e){
    this.value= this.value.replace(/[^0-9]/g, '')
    const regexMat = /^\S+$/
    if(!regexMat.test(e.currentTarget.value)){
        mat = false
    }else{
        mat = true
    }
})