<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);
header('Content-Type: text/html; charset=UTF-8');  // Asegúrate de que el Content-Type sea application/json

date_default_timezone_set('America/Mexico_City');  // Especificamos la zona horaria

$clientejson = json_decode($_POST['trama']);  // Decodificar los datos enviados desde el cliente (JS)
$respuesta_servidor = new stdClass();

// Verifica si la acción está correctamente configurada
if (isset($clientejson->accion) && $clientejson->accion == 0) {
    $respuesta_servidor->resultado = generar_qr($clientejson);  // Generar la URL del QR
} else {
    $respuesta_servidor->error = "Acción no válida o datos incompletos";  // Respuesta de error si no se encuentra la acción
}

// Asegúrate de que la respuesta es en formato JSON
echo json_encode($respuesta_servidor);  // Imprimir la respuesta en formato JSON

// Función para generar la URL del QR
function generar_qr($clientejson)
{
    // Obtener la IP local del servidor
    $protocolo = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? 'https' : 'http';
    $dominio = $_SERVER['SERVER_ADDR'];  // Usar la IP local del servidor en lugar de 'localhost'
    $puerto = isset($clientejson->puerto) ? $clientejson->puerto : '';  // Usar el puerto enviado desde el cliente
    $ruta = '/PLF-DUAL-EQUIPO/vista_cliente.html';  // Ruta de la página que debe ser generada en el QR

    // Construir la URL completa con el protocolo, dominio, puerto y ruta
    $url = "$protocolo://$dominio:$puerto$ruta";  // Ejemplo: http://192.168.1.100:8080/PLF-DUAL-EQUIPO/vista_cliente.html

    return $url;
}
?>