<?php
include 'conexion.php';
session_start();

if (!isset($_SESSION['usuario'])) {
    header("Location: login.php");
    exit();
}

$usuario = $_SESSION['usuario'];

// Obtener si es admin o no
$sql = "SELECT es_admin FROM usuario WHERE id = ?";
$stmt = $conexion->prepare($sql);
$stmt->bind_param("i", $usuario);
$stmt->execute();
$result = $stmt->get_result();
$info = $result->fetch_assoc();
$es_admin = $info['es_admin'];

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Recibimos los datos desde el formulario
    $nuevoNombre = $_POST['nombre'];
    $nuevaContrasenia = $_POST['contrasenia'];
    $nuevoCorreo = $_POST['correo'];

    // Se prepara la consulta UPDATE para actualizar los datos del usuario
    $sql = "UPDATE usuario SET nombre = '$nuevoNombre', contrasenia = '$nuevaContrasenia', correo = '$nuevoCorreo' WHERE nombre = '$usuario'";

    if ($conexion->query($sql)) {
        // Actualizamos la sesión con el nuevo nombre si la actualización es exitosa
        $_SESSION['usuario'] = $nuevoNombre;

        // Verificamos si es admin o cliente
        $sqlAdmin = "SELECT es_admin FROM usuario WHERE nombre = '$nuevoNombre'";
        $resultado = $conexion->query($sqlAdmin);

        if ($resultado->num_rows == 1) {
            $row = $resultado->fetch_assoc();
            if ($row['es_admin'] == 1) {
                echo '
                    <script>
                        alert("Perfil actualizado exitosamente.");
                        window.location = "vista.php";
                    </script>
                ';
            } else {
                echo '
                    <script>
                        alert("Perfil actualizado exitosamente.");
                        window.location = "vista_cliente.php";
                    </script>
                ';
            }
        }
    } else {
        echo '
            <script>
                alert("Error al actualizar el perfil.");
                window.location = "vista.php";
            </script>
        ';
    }

    mysqli_close($conexion);
}

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../css/actualizar_datos.css">
    <link rel="icon" type="image/png" href="../images/VMS.png" sizes="32x32">
    <title>Actualizar Datos</title>
</head>
<body>
    <header>
        <div class="horizontal-menu">
            <button class="btn-volver" onclick="window.location.href='<?php echo ($es_admin == 1) ? "vista.php" : "vista_cliente.php"; ?>'">Volver</button>
            <h2 class="titulo-centro">Actualizar tus Datos</h2>
        </div>
    </header>


    <form method="post">
        <label>Nuevo nombre:</label>
        <input type="text" name="nombre" required><br>
        <label>Nueva contraseña:</label>
        <input type="password" name="contrasenia" required><br>
        <label>Nuevo correo:</label>
        <input type="email" name="correo" required><br>
        <input type="submit" value="Actualizar">
    </form>
    
</body>
</html>

