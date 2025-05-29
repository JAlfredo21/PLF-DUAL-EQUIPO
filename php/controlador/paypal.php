<?php
ini_set('display_errors', 0);
ini_set('display_startup_errors', 0);
error_reporting(E_ALL & ~E_DEPRECATED);

header('Content-Type: text/html; charset=utf-8');
date_default_timezone_set('America/Mexico_City');

require_once __DIR__ . '/../../vendor/autoload.php';

$clientejson = json_decode($_POST['trama']);

$respuesta_servidor = new stdClass();

if ($clientejson->accion == 0) {
    $respuesta_servidor->resultado = crear_orden($clientejson);
} elseif ($clientejson->accion == 1) {
    $respuesta_servidor->resultado = capturar_orden($clientejson);
}

print(json_encode($respuesta_servidor));


function crear_orden($valores)
{

    include("../conexion.php");

    $productos = isset($valores->productos) ? $valores->productos : [];
    $monto = 0;

    // Suma los precios reales desde la base de datos
    foreach ($productos as $id) {
        $stmt = $con->prepare("SELECT precio FROM producto WHERE id = ?");
        $stmt->bind_param("i", $id);
        $stmt->execute();
        $stmt->bind_result($precio);
        if ($stmt->fetch()) {
            $monto += floatval($precio);
        }
        $stmt->close();
    }

    // Validación del monto
    if ($monto <= 0) {
        return ['error' => 'Monto inválido'];
    }

    // aplicación de las credenciales de PayPal = Default Application
    $clientId = 'AYlYNaZUo1E3XGzCN5yM0ZjOqWRC4d0cZdEiuTxv361V-Ks00ezEbCjNTkawjTyP9W6laPt0QMgDRMqB'; // Reemplaza con tu Client ID de PayPal
    $clientSecret = 'ENLfRusRSug6S-fPijC9WEHm0DkgkeyNeyBitAuSr_W5GMfMU1Jep9fitCujFtR_COLfJpd6YeDExRT0'; // Reemplaza con tu Client Secret de PayPal

    $environment = new \PayPalCheckoutSdk\Core\SandboxEnvironment($clientId, $clientSecret);
    $client = new \PayPalCheckoutSdk\Core\PayPalHttpClient($environment);
    // Configuración de la orden
    // Aquí puedes agregar más detalles a la orden si es necesario
    $request = new \PayPalCheckoutSdk\Orders\OrdersCreateRequest();
    $request->prefer('return=representation');
    $request->body = [
        'intent' => 'CAPTURE',
        'purchase_units' => [[
            "amount" => [
                "currency_code" => "MXN",
                "value" => $monto
            ]
        ]],
        'application_context' => [
            'return_url' => 'https://localhost/PLF-DUAL-EQUIPO/vista_cliente.html', // URL de retorno después del pago
            'cancel_url' => 'https://localhost/PLF-DUAL-EQUIPO/vista_cliente.htmls' // URL de cancelación del pago
        ]
    ];

    try {
        $response = $client->execute($request);
        return ['id' => $response->result->id];
    } catch (Exception $e) {
        return ['error' => $e->getMessage()];
    }
}

function capturar_orden($valores)
{

    $clientId = 'AYlYNaZUo1E3XGzCN5yM0ZjOqWRC4d0cZdEiuTxv361V-Ks00ezEbCjNTkawjTyP9W6laPt0QMgDRMqB'; // Usa tus credenciales reales
    $clientSecret = 'ENLfRusRSug6S-fPijC9WEHm0DkgkeyNeyBitAuSr_W5GMfMU1Jep9fitCujFtR_COLfJpd6YeDExRT0';

    $environment = new \PayPalCheckoutSdk\Core\SandboxEnvironment($clientId, $clientSecret);
    $client = new \PayPalCheckoutSdk\Core\PayPalHttpClient($environment);

    $request = new \PayPalCheckoutSdk\Orders\OrdersCaptureRequest($valores->ordenId);
    $request->prefer('return=representation');

    try {
        $response = $client->execute($request);
        return [
            'id' => $response->result,
            'links' => $response->result->links,];
    } catch (Exception $e) {
        return ['error' => $e->getMessage()];
    }
}
