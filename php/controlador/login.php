<?php
header('Content-Type: text/html; charset=UTF-8');
date_default_timezone_set('America/Mexico_City');

$clientejson = json_decode($_POST['trama']);
$respuesta_servidor = new stdClass();

if ($clientejson->accion == 0) {
    $respuesta_servidor->resultado = insertar_usuario($clientejson);
}elseif ($clientejson->accion == 1) {
    $respuesta_servidor->resultado = validar_usuario($clientejson);
}

print(json_encode($respuesta_servidor));

function validar_usuario($valores) {
    include("../conexion.php");

    $sql = "SELECT * FROM usuario WHERE nombre = '$valores->nombre'";
    //var_dump($sql);
    $query = mysqli_query($con, $sql);

    if (mysqli_num_rows($query) > 0) {
        $usuario = mysqli_fetch_assoc($query);
        if (password_verify($valores->contrasenia, $usuario['contrasenia'])) {
            $result = [$usuario['id'],$usuario['nombre'], $usuario['correo'], $usuario['registro'], $usuario['rol']];
            return $result;
        } else {
            return false;
        }
    } else {
        return false;
    }
}

function insertar_usuario($valores) {
    include("../conexion.php");

    $registro = date('Y-m-d H:i:s');
    $hash = password_hash($valores->contrasenia, PASSWORD_BCRYPT);
    $sql = "INSERT INTO usuario(nombre, correo, contrasenia, registro, rol) 
    VALUES ('$valores->nombre', '$valores->correo', '$hash', '$registro', 'user')";

    $sql_mail = "SELECT * FROM usuario WHERE correo = '$valores->correo'";
    
    if (mysqli_query($con, $sql_mail)->num_rows > 0) {
        return false;
    } else {
        //var_dump($sql);
        return mysqli_query($con, $sql);
    }
}
?>