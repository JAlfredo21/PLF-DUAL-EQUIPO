<?php
header('Content-Type: text/html; charset=UTF-8');
date_default_timezone_set('America/Mexico_City');

$clientejson = json_decode($_POST['trama']);

$respuesta_servidor = new stdClass();

if ($clientejson->accion == 0) {
    $respuesta_servidor->resultado = editar_datos($clientejson);
} elseif ($clientejson->accion == 1) {
    $respuesta_servidor->resultado = consultar_datos($clientejson);
}

print(json_encode($respuesta_servidor)); //? envía la respuesta de la base de datos a javascript



//* Edita un marca ya existente
function editar_datos($valores)
{
    include("../conexion.php");
    $hash = password_hash($valores->contraseña, PASSWORD_BCRYPT);
    $sql = "UPDATE usuario SET nombre='$valores->nombre', correo='$valores->correo',contrasenia='$hash' 
            WHERE id='$valores->id';";
    //var_dump($sql);

    return mysqli_query($con, $sql);;
}

function consultar_datos($valores)
{
    include("../conexion.php");
    $sql = "SELECT nombre,correo,contrasenia FROM usuario WHERE id = '$valores->id'";
    $query = mysqli_query($con, $sql);
    $array = array();
    while ($fila = mysqli_fetch_object($query)) {
        array_push($array, $fila);  //* Se guardan los registros en un array
    }
    return $array;
}
