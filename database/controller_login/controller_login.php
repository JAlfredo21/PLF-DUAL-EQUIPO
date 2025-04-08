<?php

    header('Content-Type: text/html; charset=UTF-8');    /* Especificamos que se utulizara html con utf8 */
    date_default_timezone_set('America/Mexico_City');    /* Especificamos la zona horaria */

    $clientejson = json_decode($_POST['trama']);           //* Variable importante, trae los datos en formato JSON para hacer las consultas sql y lo vuelve un objeto de php 

    $respuesta_servidor = new stdClass();

    //* Condicionales para gestionar cuando se hará cada función
    if ($clientejson->accion == 0) {
        $respuesta_servidor->resultado = iniciar_sesion($clientejson);
    } else if ($clientejson->accion == 1) {
        $respuesta_servidor->resultado = registrar_usuario($clientejson);
    } 
    print(json_encode($respuesta_servidor)); //!si lo quitas truena la app!!! (Básicamente returna un json del resultado de la consulta y si lo quitas truena)


    //* Consulta SQL para validar el correo y la contraseña en la BD
    function iniciar_sesion($valores) {
        include("../conexion.php");

        $sql="SELECT * FROM usuarios WHERE correo= '$valores->correo'";
        $query = mysqli_query($con,$sql);
        
        if ($query->num_rows > 0) {
            $user = mysqli_fetch_assoc($query);
            if (password_verify($valores->contraseña, $user['contraseña'])) {
                $result =[$user['matricula'] , $user['nombre'], $user['correo']];
                return $result;
            }else{
                return false;
            }
        }else{
            return false;
        }
    }

    //*Consulta SQL para registrar el usuario con encriptación de la contraseña y valida si el correo ya fue registrado
    function registrar_usuario($valores){
        include("../conexion.php");
        $hashed_contraseña =password_hash($valores->contraseña, PASSWORD_BCRYPT);
        $sql="INSERT INTO usuario(matricula,nombre,correo,contraseña) VALUES ('$valores->matricula',
        '$valores->nombre','$valores->correo','$hashed_contraseña')";
        //var_dump($sql);
        $sql_val_mail="SELECT * FROM usuario WHERE correo= '$valores->correo'";
        //$query_mail=mysqli_query($con,$sql_val_mail);

        if(mysqli_query($con,$sql_val_mail)-> num_rows > 0){
            return false;
        }else{
            return mysqli_query($con,$sql);
        }
    }

 