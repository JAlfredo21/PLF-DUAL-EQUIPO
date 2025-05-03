<?php
include 'conexion.php';
session_start();

// Verificar si hay sesión iniciada
if (!isset($_SESSION['usuario'])) {
    header("Location: login.php");
    exit();
}

// Obtener info del usuario logueado
$id_usuario = $_SESSION['usuario'];
$sql = "SELECT * FROM usuario WHERE id = ?";
$stmt = $conexion->prepare($sql);
$stmt->bind_param("i", $id_usuario);
$stmt->execute();
$resultado = $stmt->get_result();
$usuario = $resultado->fetch_assoc();

// Verificar si es admin
if ($usuario['es_admin'] != 1) {
    echo "<h3>Acceso denegado. Solo el administrador puede registrar clientes.</h3>";
    exit();
}

// Si se envió el formulario
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nuevo_nombre = $_POST['nombre'];
    $nuevo_contrasenia = $_POST['contrasenia'];
    $nuevo_correo = $_POST['correo'];

    // Insertar nuevo cliente con es_admin = 0
    $sql = "INSERT INTO usuario (nombre, contrasenia, correo, es_admin) VALUES (?, ?, ?, 0)";
    $stmt = $conexion->prepare($sql);
    $stmt->bind_param("sss", $nuevo_nombre, $nuevo_contrasenia, $nuevo_correo);

    if ($stmt->execute()) {
        echo "<script>alert('Cliente registrado correctamente');
                window.location = 'vista.php'; </script>";
    } else {
        echo "<script>alert('Error al registrar cliente');</script>";
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registrar</title>
    <link rel="icon" type="image/png" href="../images/VMS.png" sizes="32x32">
    <link rel="stylesheet" href="../css/registro_cliente.css">
</head>
<body>
    <header>
        <div class="horizontal-menu">
            <button class="btn-volver" onclick="window.location.href='vista.php'">Volver</button>
            <h2 class="titulo-centro">Registrar Cliente</h2>
        </div>
    </header>

    <form method="post">
        <label>Nombre:</label>
        <input type="text" name="nombre" required><br>

        <label>Contraseña:</label>
        <input type="password" name="contrasenia" required><br>

        <label>Correo:</label>
        <input type="email" name="correo" required><br>

        <input type="submit" value="Registrar Cliente">
    </form>
</body>
</html>

