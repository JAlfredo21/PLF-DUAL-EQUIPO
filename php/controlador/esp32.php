<?php
header('Content-Type: text/html; charset=UTF-8');    /* Especificamos que se utulizara html con utf8 */
date_default_timezone_set('America/Mexico_City');    /* Especificamos la zona horaria */
$clientejson = json_decode($_POST['trama']);           //* Variable importante, trae los datos en formato JSON para hacer las consultas sql y lo vuelve un objeto de php
$respuesta_servidor = new stdClass();

if ($clientejson->accion == 0) {
    $respuesta_servidor->resultadpo = name($clientejson);
}

print(json_encode($respuesta_servidor)); //!si lo quitas truena la app!!! (Básicamente returna un json del resultado de la consulta y si lo quitas truena)


function name () {

}

?>