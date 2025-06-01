<?php
header('Content-Type: text/html; charset=UTF-8');    /* Especificamos que se utulizara html con utf8 */
date_default_timezone_set('America/Mexico_City');    /* Especificamos la zona horaria */

require_once __DIR__ . '../php/controlador/phpqrcode/qrlib.php'; // Asegúrate de que la ruta sea correcta

$clientejson = json_decode($_POST['trama']);           //* Variable importante, trae los datos en formato JSON para hacer las consultas sql y lo vuelve un objeto de php
$respuesta_servidor = new stdClass();
if ($clientejson->accion == 0) {
    $respuesta_servidor->resultado = generar_qr($clientejson);
} elseif ($clientejson->accion == 1) {
    $respuesta_servidor->resultado = genera_qr_chart();
}

function generar_qr(){
    $url = 'https://localhost/PLF-DUAL-EQUIPO/vista_cliente.html';
    QRcode::png($url); // Genera el código QR y lo envía directamente al navegador
}

function genera_qr_chart() {
    $url = 'https://localhost/PLF-DUAL-EQUIPO/vista_cliente.html';
    $chartUrl = "https://quickchart.io/qr?text=" . urlencode($url) . "&size=200";
    echo "<img src='$chartUrl' alt='Código QR'>";
    //return $chartUrl; // Retorna la URL del código QR generado
}
?>