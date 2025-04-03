<?php

    session_start();
    include 'conexion.php';

    $nombre = $_POST['nombre'];
    $correo = $_POST['correo'];
    $matricula = $_POST['matricula'];
    $contrasena = $_POST['contrasena'];

    $query = "INSERT INTO usuarios(nombre, correo, matricula, contrasena) VALUES('$nombre', '$correo', '$matricula', '$contrasena')";

    $verificar_correo = mysqli_query($conexion, "SELECT * FROM usuarios WHERE correo = '$correo' ");

    if(mysqli_num_rows($verificar_correo) > 0){
        echo '
        <script>
        
            alert("Este correo ya esta registrado, intenta con otro diferente");
            window.location = "../index.php";
        </script>
        ';
        exit();
    }

    $verificar_matricula = mysqli_query($conexion, "SELECT * FROM usuarios WHERE matricula = '$matricula' ");

    if(mysqli_num_rows($verificar_matricula) > 0){
        echo '
        <script>
        
            alert("Esta matricula ya esta registrado, intenta con otra diferente");
            window.location = "../index.php";
        </script>
        ';
        exit();
    }

    $ejecutar = mysqli_query($conexion, $query);

    if($ejecutar) {
        echo '
        <script>
        
            alert("Usuario almacenado exitosamente");
            window.location = "../index.php";
        </script>
        ';
    }else{

        echo '
        <script>
        
            alert("Intentalo de Nuevo");
            window.location = "../index.php";
        </script>
        ';

    }

    mysqli_close($conexion);

?>