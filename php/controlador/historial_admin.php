<?php

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
function consultar_datos($valores)
{
    include("../conexion.php");

    $sql = "SELECT 
            date(venta.fecha) AS fecha,
            time(venta.fecha) AS hora,
            producto.nombre AS producto,
            producto.id,
            producto.precio
            FROM `venta`
            INNER JOIN producto ON producto.id = venta.producto_id
            order by venta.id DESC LIMIT 50;";
    
    $query = mysqli_query($con, $sql);

    $array = array();
    while ($fila = mysqli_fetch_object($query)) {
        array_push($array, $fila);  //* Se guardan los registros en un array
    }
    return $array;
}
