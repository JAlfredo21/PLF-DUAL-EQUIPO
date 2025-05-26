<?php

use PHPMailer\PHPMailer\PHPMailer;

header('Content-Type: text/html; charset=utf-8');
date_default_timezone_set('America/Mexico_City');

$clientejson = json_decode($_POST['trama']);
$respuesta_servidor = new stdClass();

if ($clientejson->accion == 0) {
    $respuesta_servidor->resultado = verificacion_email($clientejson);
}
print(json_encode($respuesta_servidor));

function verificacion_email($valores) {
    include("../conexion.php");

    $sql = "SELECT * FROM usuario WHERE correo = '$valores->correo'";
    $query = mysqli_query($con, $sql);

    if (mysqli_num_rows($query) > 0) {
        $contraseña = bin2hex(random_bytes(4));
        //$token_expiracion = date('Y-m-d H:i:s', time() + 300); // 5 minutos de expiración
        //token_expirados($valores->correo);
        $hash = password_hash($contraseña, PASSWORD_DEFAULT);
        $sql_contraseña = "UPDATE usuario SET contrasenia = '$hash' WHERE correo = '$valores->correo'";
        if (mysqli_query($con, $sql_contraseña)) {
            return enviar_email($valores->correo, $contraseña, $valores->dominio, $valores->puerto);
        } else {
            return false;
        }
    } else {
        return false;
    }
}

function token_expirados($correo) {
    include("../conexion.php");

    $sql = "UPDATE usuario SET token = NULL, token_expiracion = NULL WHERE correo = '$correo'";
    mysqli_query($con, $sql);
}

function enviar_email($correo, $contraseña, $dominio, $puerto) {
    include("../email/Exception.php");
    include("../email/PHPMailer.php");
    include("../email/SMTP.php");

    $email = new PHPMailer();

    try {
        $email->isSMTP();
        $email->Host = 'smtp.gmail.com';
        $email->SMTPSecure = 'ssl';
        $email->SMTPAuth = true;
        $email->Username = 'janny.garcia703@gmail.com';
        $email->Password = 'wxrz bhez cmku cwnx';
        $email->Port = 465;

        $Year = date('Y');
        $email->CharSet = 'UTF-8';
        $email->setFrom('janny.garcia703@gmail.com', 'Proyecto DUAL');
        $email->addAddress($correo, 'Destinatario');
        
        $email->isHTML(true);
        $email->Subject = 'Recuperación de contraseña';
        $email->Body = '<html>
                            <body style="font-family: Arial, sans-serif; background-color: #f9fafc; color: #333; margin: 0; padding: 0;">
                                <div style="max-width: 400px; margin: 40px auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); overflow: hidden; border: 1px solid #e0e0e0; text-align: center;">
                                <div style="background-color: #0BAB1B; color: #ffffff; padding: 20px; font-size: 20px; font-weight: bold;">
                                    Notificación de Proyecto DUAL
                                </div>
                                <div style="padding: 20px; text-align: center;">
                                    <h2 style="color: #0BAB1B; margin-bottom: 15px; font-size: 22px;">Recuperación de contraseña</h2>
                                    <p style="font-size: 16px; line-height: 1.6; color: #555;">Hemos recibido una solicitud para recuperar tu contraseña.</p>
                                    <p style="font-size: 16px; line-height: 1.6; color: #555;">Tu nueva contraseña es:</p>
                                    <p style="font-size: 20px; color: #0BAB1B; font-weight: bold; margin: 20px 0;">'.$contraseña.'</p>
                                    <p style="font-size: 14px; color: #999; margin-top: 20px;">Si no solicitaste este cambio, puedes ignorar este correo.</p>
                                </div>
                                <div style="background-color: #f9fafc; color: #888; text-align: center; padding: 15px; font-size: 12px; border-top: 1px solid #e0e0e0;">
                                    &copy; '.$Year.' Proyecto DUAL. Todos los derechos reservados.
                                </div>
                                </div>
                            </body>
                        </html>';
        $email->AltBody = 'Recuperación de contraseña';
        $email->send();
        return true;
        
        } catch (Exception $e) {
        return false;
    }
}
?>