function server_historial_admin(model){
    return new Promise ((resolve,reject)=>{
        $.ajax({
            type: "POST",
            url: "php/controlador/historial_admin.php",
            data: {
                trama:JSON.stringify(model)
            },
            success: function(response){
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
    let server = await server_historial_admin({accion : 0});
    datos =server.resultado;
    document.getElementById("tbl-hist-info").innerHTML =``;
    for (let i = 0; i < datos.length; i++) {
        const element = datos [i];
        console.log(element);
        document.getElementById("tbl-hist-info").innerHTML += `
        <tr>
            <td class="text-center">${element.nombre}</td>
            <td class="text-center">${element.fecha}</td>
            <td class="text-center">${element.hora}</td>
            <td class="text-center">${element.producto}</td>
            <td class="text-center">${element.id}</td>
            <td class="text-center">$${element.precio}.00</td>
        </tr>
        `
        
    }
}