<?php 


$conexion = mysqli_connect("localhost", "root", "", "plf");

if ($conexion->connect_error) {
    die("Conexión fallida: " . $conexion->connect_error);
}

/* if($conexion ) {
    echo 'conectado exitosamnete';
}else {
    echo 'no se conecto';
} */


?>