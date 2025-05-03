<?php

include 'conexion.php';

session_start();
if (!isset($_SESSION['usuario'])) {
    header("Location: login.php");
    exit();
}

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vista Cliente</title>
    <link rel="stylesheet" href="../css/vista_cliente.css">
    <link rel="icon" type="image/png" href="../images/VMS.png" sizes="32x32">
</head>
<body>
    <header>
        <div class="horizontal-menu">
             <h2>Bienvenido | <?php echo $_SESSION['nombre_usuario']; ?></h2>
          <ul class="horizontal-list">
             <li><img src="../images/perfilicon.png" alt="Editar" class="list-icon">
                <a href="actualizar_datos.php">Actualizar Datos</a></li>
             <li><img src="../images/note.png" alt="Historial" class="list-icon">
                <a href="historial.php">Historial</a></li>
             <li><img src="../images/grafica.png" alt="Grafica" class="list-icon">
                <a href="graficas.php">Graficas</a></li>
             <li><img src="../images/cerrar.png" alt="CerrarS" class="list-icon">
                <a href="cerrar_sesion.php">Cerrar Sesión</a></li>
          </ul>
        </div>
    </header>

   <main>
      <h3>Productos Disponibles</h3>
      <form method="POST" action="procesar_compra.php">
         <div class="producto-lista">
            <?php
            $resultado = $conexion->query("SELECT * FROM producto");
            while ($producto = $resultado->fetch_assoc()) {
                  echo "<label class='producto-item'>";
                  echo "<span class='nombre'>" . htmlspecialchars($producto['nombre']) . "</span>";
                  echo "<span class='precio'>$" . number_format($producto['precio'], 2) . "</span>";
                  echo "<input type='checkbox' name='producto_id[]' value='" . $producto['id'] . "'>";
                  echo "</label>";
            }
            ?>
         </div>
         <button type="submit" class="btn_comprar">Comprar</button>
      </form>

   </main>


</body>
</html>
