<?php
header('Content-Type: text/html; charset=UTF-8');    /* Especificamos que se utulizara html con utf8 */
date_default_timezone_set('America/Mexico_City');    /* Especificamos la zona horaria */
$clientejson = json_decode($_POST['trama']);           //* Variable importante, trae los datos en formato JSON para hacer las consultas sql y lo vuelve un objeto de php
$respuesta_servidor = new stdClass();

if ($clientejson->accion == 0) {
    $respuesta_servidor->resultado = insertar_compra($clientejson);
} elseif ($clientejson->accion == 1) {
    $respuesta_servidor->resultado = actualizar_datos($clientejson);
} elseif ($clientejson->accion == 2) {
    $respuesta_servidor->resultado = enviar_compra($clientejson);
} elseif ($clientejson->accion == 3) {
    $respuesta_servidor->resultado = insertar_csv($clientejson);
}

print(json_encode($respuesta_servidor)); //!si lo quitas truena la app!!! (Básicamente returna un json del resultado de la consulta y si lo quitas truena)


function insertar_compra($valores)
{
    include("../conexion.php");
    $registro = date("Y-m-d H:i:s");

    $sql = "INSERT INTO venta(fecha,producto_id,precio) VALUES ('$registro','$valores->id','$valores->precio');";
    mysqli_query($con, $sql);

    return "Registro completado";
}

function actualizar_datos()
{
    include("../conexion.php");

    $sql = "SELECT id,nombre,precio from producto";
    $query = mysqli_query($con, $sql);
    $array = array();
    while ($fila = mysqli_fetch_object($query)) {
        array_push($array, $fila);
    }


    $jsonData = json_encode($array, JSON_UNESCAPED_UNICODE);
    // IP y ruta del ESP32
    $url = 'http://192.168.1.71/datos'; // Cambia a la IP real del ESP32
    // Enviamos los datos con cURL
    $ch = curl_init($url);

    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, array(
        'Content-Type: application/json',
        'Content-Length: ' . strlen($jsonData)
    ));
    curl_setopt($ch, CURLOPT_POSTFIELDS, $jsonData);

    // Ejecutar y obtener respuesta
    $response = curl_exec($ch);

    if (curl_errno($ch)) {
        error_log("❌ Error al enviar JSON al ESP32: " . curl_error($ch));
        $resultado = "Error al contactar al ESP32";
    } else {
        error_log("✅ Respuesta del ESP32: " . $response);
        $resultado = "Datos enviados correctamente";
    }

    curl_close($ch);
    return $resultado;
}

function enviar_compra() {
    include("../conexion.php");

    $productos = $valores->productos ?? [];

    $jsonData = json_encode($productos, JSON_UNESCAPED_UNICODE);

    // IP y endpoint real del ESP32
    $url = 'http://192.168.1.71/compra'; // Cambiar según configuración del ESP32

    $ch = curl_init($url);

    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, array(
        'Content-Type: application/json',
        'Content-Length: ' . strlen($jsonData)
    ));
    curl_setopt($ch, CURLOPT_POSTFIELDS, $jsonData);

    $response = curl_exec($ch);

    if (curl_errno($ch)) {
        error_log("❌ Error al enviar compra al ESP32: " . curl_error($ch));
        $resultado = "Error al contactar al ESP32";
    } else {
        error_log("✅ Respuesta del ESP32: " . $response);
        $resultado = "Compra enviada correctamente al ESP32";
    }

    curl_close($ch);
    return $resultado;    
}

function insertar_csv($valores){
    include("../conexion.php");

    for ($i=0; $i < count($valores->datos); $i++){
        $registro = date("Y-m-d H:i:s");
        $datos = $valores->datos[$i];
        $sql = "INSERT INTO venta(fecha,producto_id,precio)
        VALUES('$registro',
               '$datos->id',
               '$datos->precio');";
        mysqli_query($con,$sql);
    }

    return "Registro completado";
}
