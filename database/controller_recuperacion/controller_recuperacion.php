<?php

header('Content-Type: text/html; charset=UTF-8');
date_default_timezone_set('America/Mexico_City');

$clientejson = json_decode($_POST['trama']);
$respuesta_servidor = new stdClass();

function validar_token($token){
    include('../conexion.php');
}

?>