<?php

header('Content-Type: text/html; charset=utf-8');
date_default_timezone_set('America/Mexico_City');

$clientejson = json_decode($_POST['trama']);

$respuesta_servidor = new stdClass();

if ($clientejson->accion == 0) {
    $respuesta_servidor->resultado = crear_orden($clientejson);
} elseif ($clcientejson->accion == 1) {
    $respuesta_servidor->resultado = capturar_orden($clientejson);
}

print(json_encode($respuesta_servidor));

function crear_orden($valores)
{
    require_once("../php/paypal/PayPalHttpClient.php");
    require_once("../php/paypal/SandboxEnvironment.php");
    require_once("../php/paypal/OrdersCreateRequest.php");

    // aplicación de las credenciales de PayPal = Default Application

    $clientId = 'AYlYNaZUo1E3XGzCN5yM0ZjOqWRC4d0cZdEiuTxv361V-Ks00ezEbCjNTkawjTyP9W6laPt0QMgDRMqB'; // Reemplaza con tu Client ID de PayPal
    $clientSecret = 'ENLfRusRSug6S-fPijC9WEHm0DkgkeyNeyBitAuSr_W5GMfMU1Jep9fitCujFtR_COLfJpd6YeDExRT0'; // Reemplaza con tu Client Secret de PayPal

    $environment = new \PayPalCheckoutSdk\Core\SandboxEnvironment($clientId, $clientSecret);
    $client = new \PayPalCheckoutSdk\Core\PayPalHttpClient($environment);

    $monto = floatval($valores->monto);
    if ($monto <= 0) {
        return ['error' => 'Monto inválido'];
    }

    // Configuración de la orden
    // Aquí puedes agregar más detalles a la orden si es necesario
    $request = new \PayPalCheckoutSdk\Orders\OrdersCreateRequest();
    $request->prefer('return=representation');
    $request->body[[
        'intent' => 'CAPTURE',
        'purchase_units' => [[
            "amount" => [
                "currency_code" => "MXN",
                "value" => $valores->monto
            ]
        ]]
    ]];

    try {
        $response = $client->execute($request);
        return ['id' => $response->result->id];
    } catch (Exception $e) {
        return ['error' => $e->getMessage()];
    }
}

function capturar_orden($valores)
{
    require_once("../php/paypal/PayPalHttpClient.php");
    require_once("../php/paypal/SandboxEnvironment.php");
    require_once("../php/paypal/ordersCaptureRequest.php");

    $clientId = 'TU_CLIENT_ID'; // Usa tus credenciales reales
    $clientSecret = 'TU_CLIENT_SECRET';

    $environment = new \PayPalCheckoutSdk\Core\SandboxEnvironment($clientId, $clientSecret);
    $client = new \PayPalCheckoutSdk\Core\PayPalHttpClient($environment);

    $request = new \PayPalCheckoutSdk\Orders\OrdersCaptureRequest($valores->orderID);
    $request->prefer('return=representation');

    try {
        $response = $client->execute($request);
        return $response->result;
    } catch (Exception $e) {
        return ['error' => $e->getMessage()];
    }
}
