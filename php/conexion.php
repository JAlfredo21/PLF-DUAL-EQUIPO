<?php 
    $user="root"; /* usuario con el cual se accederá a la bd, en este caso se accedera con el usuario root */
    $pass="78910"; /*contraseña del usuario */
    $server="localhost";  /*localización del servidor, ahi puede ir también la ip del dispositivo que aloja la bd */
    $db="plf";   /* bd a la cual se quiere acceder*/
    $con= mysqli_connect($server,$user,$pass) or die("Error al conectar");      /* variable para hacer la conección contiene el servidor, el usuario y su contraseña*/
    mysqli_select_db($con,$db);     /* función que accede a la bd, como parametros recibe la conexión y la variable*/
    mysqli_set_charset($con,"utf8");     /* se especifica que la bd utiliza utf8*/
?>