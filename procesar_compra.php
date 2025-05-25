<?php
include 'conexion.php';
session_start();

/* if (!isset($_SESSION['usuario'])) {
    header("Location: login.php");
    exit();
} */

if (!empty($_POST['producto_id'])) {
    // Obtener ID del usuario
    $usuario_nombre = $_SESSION['usuario'];
    $stmt = $conexion->prepare("SELECT id FROM usuario WHERE nombre = ?");
    $stmt->bind_param("s", $usuario_nombre);
    $stmt->execute();
    $stmt->bind_result($usuario_id);
    $stmt->fetch();
    $stmt->close();

    // Insertar cada producto como una venta separada
    $stmt = $conexion->prepare("INSERT INTO venta (producto_id, usuario_id) VALUES (?, ?)");
    foreach ($_POST['producto_id'] as $producto_id) {
        $producto_id = intval($producto_id);
        $stmt->bind_param("ii", $producto_id, $usuario_id);
        $stmt->execute();
    }
    $stmt->close();

            echo '
            <script>
                alert("¡Compra exitosa!");
                window.location = "vista_cliente.php";
            </script>
        ';
        exit();
} else {
    echo "No seleccionaste ningún producto.";
}
?>

