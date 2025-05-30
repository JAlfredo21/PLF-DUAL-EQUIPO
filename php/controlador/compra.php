<?php
header('Content-Type: text/html; charset=UTF-8');    /* Especificamos que se utulizara html con utf8 */
date_default_timezone_set('America/Mexico_City');    /* Especificamos la zona horaria */

$clientejson = json_decode($_POST['trama']);           //* Variable importante, trae los datos en formato JSON para hacer las consultas sql y lo vuelve un objeto de php
$respuesta_servidor = new stdClass();
if ($clientejson->accion == 0) {
    $respuesta_servidor->resultado = crear_compra($clientejson);
}

print(json_encode($respuesta_servidor)); //!si lo quitas truena la app!!! (Básicamente returna un json del resultado de la consulta y si lo quitas truena)

function crear_compra($valores)
{
    include("../conexion.php");

    $fecha = date('Y-m-d H:i:s'); // Fecha actual
    $productos = $valores->productos; // Array de productos
    $usuario_id = $valores->usuario_id;

    $sql = "INSERT INTO venta (fecha, usuario_id, producto_id) VALUES (?, ?, ?)";
    $stmt = $con->prepare($sql);

    $todo_ok = true;
    foreach ($productos as $producto_id) {
        $stmt->bind_param("sii", $fecha, $usuario_id, $producto_id);
        if (!$stmt->execute()) {
            $todo_ok = false;
            break;
        }
    }
    $stmt->close();

    if ($todo_ok) {
        return ['success' => true, 'message' => 'Compra registrada correctamente'];
    } else {
        return ['success' => false, 'message' => 'Error al registrar la compra'];
    }
}
?>