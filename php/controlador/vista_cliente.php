<?php
/* ini_set('display_errors', 0);
ini_set('display_startup_errors', 0);
error_reporting(E_ALL & ~E_DEPRECATED); */

header('Content-Type: text/html; charset=UTF-8');    /* Especificamos que se utulizara html con utf8 */
date_default_timezone_set('America/Mexico_City');    /* Especificamos la zona horaria */

$clientejson = json_decode($_POST['trama']);           //* Variable importante, trae los datos en formato JSON para hacer las consultas sql y lo vuelve un objeto de php
$respuesta_servidor = new stdClass();

//* Condicionales para gestionar cuando se hará cada función
if ($clientejson->accion == 0) {
    $respuesta_servidor->resultado = consultar_datos($clientejson);
}

print(json_encode($respuesta_servidor)); //!si lo quitas truena la app!!! (Básicamente returna un json del resultado de la consulta y si lo quitas truena)

//* Consulta SQL para validar el usuario y la contraseña en la BD
function consultar_datos($valores){
    include("../conexion.php");
    $sql = "SELECT * FROM producto;";
    $query = mysqli_query($con, $sql);

    $array = array();
    while ($fila = mysqli_fetch_object($query)) {
        array_push($array, $fila);
    }
    return $array;
}
?>