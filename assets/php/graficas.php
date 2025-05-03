<?php
include 'conexion.php';
session_start();

if (!isset($_SESSION['usuario'])) {
    header("Location: login.php");
    exit();
}

$id_usuario = $_SESSION['usuario'];
$datos = [];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Recibir las fechas del formulario
    $fecha_inicio = $_POST['fecha_inicio'];
    $fecha_fin = $_POST['fecha_fin'];

    // Realizar la consulta SQL para obtener los datos
    $sql = "SELECT DATE(fecha) AS dia, COUNT(*) AS total
            FROM venta
            WHERE usuario_id = ? AND fecha BETWEEN ? AND ?
            GROUP BY dia";
    
    $stmt = $conexion->prepare($sql);
    $stmt->bind_param("iss", $id_usuario, $fecha_inicio, $fecha_fin);
    $stmt->execute();
    $resultado = $stmt->get_result();

    // Almacenar los resultados de la consulta en la sesión
    while ($row = $resultado->fetch_assoc()) {
        $datos[] = $row;
    }

    // Almacenar los filtros en la sesión para que puedan ser usados después
    $_SESSION['datos_grafica'] = $datos;
    $_SESSION['filtros_grafica'] = ['fecha_inicio' => $fecha_inicio, 'fecha_fin' => $fecha_fin];

    // Redirigir a la misma página para evitar la repetición del POST al hacer refresh
    header("Location: graficas.php");
    exit();
}

// Verificar si existen datos de la sesión para mostrarlos
if (isset($_SESSION['datos_grafica'])) {
    $datos = $_SESSION['datos_grafica'];
    unset($_SESSION['datos_grafica']); // Limpiar los datos después de usarlos
}

if (isset($_SESSION['filtros_grafica'])) {
    $filtros = $_SESSION['filtros_grafica'];
    unset($_SESSION['filtros_grafica']); // Limpiar los filtros después de usarlos
}
?>


<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Gráfica de Compras</title>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <link rel="stylesheet" href="../css/graficas.css"> <!-- Agrega la ruta correcta al archivo CSS -->
    <link rel="icon" type="image/png" href="../images/VMS.png" sizes="32x32">
</head>
<body>

    <header>
        <div class="horizontal-menu">
            <button class="btn-volver" onclick="window.location.href='vista_cliente.php'">Volver</button>
            <h2 class="titulo-centro">Buscar Ventas por Rango de Fechas</h2>
        </div>
    </header>

    <form method="post" class="form_buscador">
        <label for="fecha_inicio">Fecha Inicio:</label>
        <input type="date" name="fecha_inicio" required>
        <label for="fecha_fin">Fecha Fin:</label>
        <input type="date" name="fecha_fin" required>
        <input type="submit" value="Buscar" class="btn_buscar">
    </form>

    <?php if (!empty($datos)) { ?>
        <div class="graficos">
            <!-- Gráfico de barras -->
            <canvas id="graficaBarras"></canvas>

            <!-- Gráfico de pastel -->
            <canvas id="graficaPastel"></canvas>

            <!-- Gráfico lineal -->
            <canvas id="graficaLineal"></canvas>
        </div>

        <script>
            const datosLabels = <?php echo json_encode(array_column($datos, 'dia')); ?>;
            const datosTotales = <?php echo json_encode(array_column($datos, 'total')); ?>;

            // Gráfico de barras
            const ctxBarras = document.getElementById('graficaBarras').getContext('2d');
            const graficaBarras = new Chart(ctxBarras, {
                type: 'bar',
                data: {
                    labels: datosLabels,
                    datasets: [{
                        label: 'Número de compras por día',
                        data: datosTotales,
                        backgroundColor: '#3498db'
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true,
                            stepSize: 1
                        }
                    }
                }
            });

            // Gráfico de pastel
            const ctxPastel = document.getElementById('graficaPastel').getContext('2d');
            const graficaPastel = new Chart(ctxPastel, {
                type: 'pie',
                data: {
                    labels: datosLabels,
                    datasets: [{
                        data: datosTotales,
                        backgroundColor: ['#3498db', '#2ecc71', '#e74c3c', '#f39c12', '#9b59b6', '#34495e'],
                    }]
                }
            });

            // Gráfico lineal
            const ctxLineal = document.getElementById('graficaLineal').getContext('2d');
            const graficaLineal = new Chart(ctxLineal, {
                type: 'line',
                data: {
                    labels: datosLabels,
                    datasets: [{
                        label: 'Número de compras por día',
                        data: datosTotales,
                        borderColor: '#3498db',
                        fill: false
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true,
                            stepSize: 1
                        }
                    }
                }
            });
        </script>
    <?php } elseif ($_SERVER['REQUEST_METHOD'] === 'POST') { ?>
        <p>No hay ventas en ese rango de fechas.</p>
    <?php } ?>

</body>
</html>