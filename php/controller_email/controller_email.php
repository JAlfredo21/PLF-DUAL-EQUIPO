<?php

use PHPMailer\PHPMailer\PHPMailer;

header('Content-Type: text/html; charset=utf-8');
date_default_timezone_set('America/Mexico_City');

$clientejson = json_decode($_POST['trama']);
$respuesta_servidor = new stdClass();

if ($clientejson->accion == 0) {
    $respuesta_servidor->resultado == verificacion_email($clientejson);
}
print(json_encode($respuesta_servidor));

function verificacion_email($$valores) {
    include('../conexion.php');

    $sql = "SELECT * FROM usuario WHERE correo = '$valores->correo'";
    $query = mysqli_query($con, $sql);

    if (mysqli_num_rows($query) > 0) {
        $token = bin2hex(random_bytes(16));
        $token_expiracion = date('Y-m-d H:i:s', time() + 300); // 5 minutos de expiración
        token_expirados($valores->correo);
        $sql_token = "UPDATE usuario SET token = '$token', token_expiracion = '$token_expiracion' WHERE correo = '$valores->correo'";
        if (mysqli_query($con, $sql_token)) {
            return enviar_email($valores->correo, $token);
        } else {
            return false;
        }
    } else {
        return false;
    }
}

function token_expirados($correo) {
    include('../conexion.php');

    $sql = "UPDATE usuario SET token = NULL, token_expiracion = NULL WHERE correo = '$correo'";
    mysqli_query($con, $sql);
}

function enviar_email($correo, $token) {
    include('../email/Exception.php');
    include('../email/PHPMailer.php');
    include('../email/SMTP.php');

    $emial = new PHPMailer();

    try {
        $email->isSMTP();
        $email->Host = 'smtp.gmail.com';
        $email->SMTPSecurec = 'ssl';
        $email->SMTPAuth = true;
        $email->Username = 'janny.garcia703@gmail.com';
        $email->Password = 'wxrz bhez cmku cwnx';
        $email->Port = 465;

        $Year = date('Y');
        $email->CharSet = 'UTF-8';
        $email->setFrom('janny.garcia703@gmail.com', 'Proyecto DUAL');
        $email->addAddress($destino->correo, 'Destinatario');
        
        $reset_link = "http://$destino->dominio:$destino->puerto/PLF-DUAL-EQUIPO/recuperar.html?uguojlhnli=$token";

    } catch (Exception $email) {
        //throw $th;
    }
}
?>