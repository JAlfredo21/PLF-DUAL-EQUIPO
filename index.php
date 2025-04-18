<?php
session_start();
if(isset($_SESSION['usuario'])){
    header("location: ventana.php");
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TM - Entrar o registrarse</title>
    <link rel="icon" type="image/png" href="assets/images/sklogo.jpeg" sizes="32x32">
    <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="assets/css/estilo.css">
</head>
<body>
    <h1>DTM</h1>
    <main>
        <div class="contenedor__todo">
            <div class="caja__trasera">
                <div class="caja__trasera-login">
                    <h3>¿Tienes Cuenta?</h3>
                    <p>Iniciar sesión para entrar</p>
                    <button id="btn__iniciar-sesion"> Iniciar Sesión</button>
                </div>
                <div class="caja__trasera-register">
                    <h3>¿Aún no tienes cuenta?</h3>
                    <p>Regístrate para iniciar sesión</p>
                    <button id="btn__registrarse"> Registrarse</button>
                </div>
            </div>
            <div class="contenedor__login-register">
                <!-- Formulario de Login -->
                <form action="php/login_usuario.php" method="POST" class="formulario__login">
                    <h2>Iniciar Sesión</h2>
                    <input type="text" placeholder="Correo Electrónico" name="correo" required>
                    <input type="password" placeholder="Contraseña" name="contrasena" required>
                    <button>Entrar</button>
                </form>

                <!-- Formulario de Registro -->
                <form action="php/registro_usuario.php" method="POST" class="formulario__register">
                    <h2>Regístrate</h2>
                    <input type="text" placeholder="Nombre" name="nombre" required>
                    <input type="email" placeholder="Correo" name="correo" required>
                    <input type="text" placeholder="Matrícula" name="matricula" required>
                    <input type="password" placeholder="Contraseña" name="contrasena" required>
                    <button >Regístrarse</button>
                </form>
            </div>
        </div>
    </main>
    <script src="assets/js/script.js"></script>
    <a href="#" class="btn-nosotros">A cerca de Nosotros</a>
</body>
</html>
