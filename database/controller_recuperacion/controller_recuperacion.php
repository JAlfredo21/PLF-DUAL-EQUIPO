<?php
// Establece el encabezado de tipo de contenido y la zona horaria predeterminada
header('Content-Type: text/html; charset=UTF-8');
date_default_timezone_set('America/Mexico_City');

// Decodifica el JSON recibido desde la solicitud POST
$clientejson = json_decode($_POST['trama']);
$respuesta_servidor = new stdClass();

// Verifica la acción solicitada por el cliente
if ($clientejson->accion == 0) {
    // Valida el token recibido
    $respuesta_servidor->$resultado = validar_token($clientejson->token);
} else if ($clientejson->accion == 1) {
    // Restablece la contraseña del usuario
    $respuesta_servidor->$resultado = restablecer_contraseña($clientejson);
}

// Devuelve la respuesta al cliente en formato JSON
print(json_encode($respuesta_servidor));

// Función para validar un token
function validar_token($token){
    // Incluye el archivo de conexión a la base de datos
    include('../conexion.php');

    // Consulta para verificar si el token es válido y no ha expirado
    $sql = "SELECT * FROM usuarios WHERE token = '$token' AND token_expiracion > NOW()";
    $query = mysqli_query($conexion, $sql);

    // Retorna el resultado de la consulta si es válido, de lo contrario retorna false
    if($query->num_rows > 0) { 
        return $query; 
    } else {
        return false;
    }
}

// Función para restablecer la contraseña de un usuario
function restablecer_contraseña($valores) {
    // Incluye el archivo de conexión a la base de datos
    include('../conexion.php');

    // Verifica que los valores necesarios estén presentes
    if (!isset($valores->token) || !isset($valores->contraseña)) { // Si no se reciben los valores necesarios, retorna false
        return false;
    }

    // Obtiene el token y la nueva contraseña
    $token = $valores->token;
    $nueva_contraseña = password_hash($valores->contraseña, PASSWORD_BCRYPT); // Hashea la nueva contraseña, para mayor seguridad

    // Consulta para verificar si el token es válido y no ha expirado
    $sql = "SELECT * FROM usuarios WHERE token = '$token' AND token_expiracion > NOW()";
    $query = mysqli_query($con, $sql);

    // Si el token es válido, actualiza la contraseña y elimina el token
    if ($query->num_rows > 0) {
        $update_sql = "UPDATE usuarios SET contraseña = '$nueva_contraseña', token = NULL, token_expiracion = NULL WHERE token = '$token'";
        if (mysqli_query($con, $update_sql)) {
            return true; // Retorna true si la actualización fue exitosa
        } else {
            return false; // Retorna false si hubo un error al actualizar la contraseña
        }
    } else {
        return false; // Retorna false si el token no es válido o ha expirado
    }
}
?>

header('Content-Type: text/html; charset=UTF-8');
date_default_timezone_set('America/Mexico_City');

$clientejson = json_decode($_POST['trama']);
$respuesta_servidor = new stdClass();

if ($clientejson->accion == 0) {
    $respuesta_servidor->$resultado = validar_token($clientejson->token);
} else if ($clientejson->accion == 1) {
    $respuesta_servidor->$resultado = restablecer_contraseña($clientejson);
}

print(json_encode($respuesta_servidor));

function validar_token($token){
    include('../conexion.php');

    $sql = "SELECT * FROM usuarios WHERE token = '$token' AND token_expiracion > NOW()";
    $query = mysqli_query($conexion, $sql);

    if($query->num_rows > 0) {
        return $query;
    } else {
        return false;
    }

}

function restablecer_contraseña($valores) {
    include('../conexion.php');

    if (!isset($valores->token) || !isset($valores->contraseña)) {
        return false;
    }
    $token = $valores->token;
    $nueva_contraseña = password_hash($valores->contraseña, PASSWORD_BCRYPT);
    $sql = "SELECT * FROM usuarios WHERE token = '$token' AND token_expiracion > NOW()";
    $query = mysqli_query($con, $sql);

    if ($query->num_rows > 0) {
        $update_sql = "UPDATE usuarios SET contraseña = '$nueva_contraseña', token = NULL, token_expiracion = NULL WHERE token = '$token'";
        if (mysqli_query($con, $update_sql)) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }

}

?>