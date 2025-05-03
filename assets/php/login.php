<?php
include 'conexion.php';
session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nombre = $_POST['nombre'];
    $contrasenia = $_POST['contrasenia'];

    // Prepara la consulta segura
    $sql = "SELECT * FROM usuario WHERE nombre=? AND contrasenia=?";
    $stmt = $conexion->prepare($sql);
    $stmt->bind_param("ss", $nombre, $contrasenia);
    $stmt->execute();
    $resultado = $stmt->get_result();

 

    if ($usuario = $resultado->fetch_assoc()) {
        $_SESSION['usuario'] = $usuario['id']; 
        $_SESSION['nombre_usuario'] = $usuario['nombre'];

        if ($usuario['es_admin'] == 1) {
            header("Location: vista.php"); // vista del admin
        } else {
            header("Location: vista_cliente.php"); // vista del cliente
        }
        exit();
    } else {
        echo '
            <script>
                alert("Usuario o Contraseña Incorrecta.");
                window.location = "login.php";
            </script>
        ';
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Iniciar Sesión</title>
    <link rel="stylesheet" href="../css/login.css">
    <link rel="icon" type="image/png" href="../images/VMS.png" sizes="32x32">
</head>
<body>
    <form method="post">
        <h2>Iniciar Sesión</h2>
        <label>Usuario:</label>
        <input type="text" name="nombre" required><br>
        <label>Contraseña:</label>
        <input type="password" name="contrasenia" required><br>
        <input type="submit" value="Iniciar sesión">
    </form>

    <a href="recuperar.php">¿Se te olvidó tu contraseña?</a>
</body>
</html>
