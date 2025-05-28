if (sessionStorage.getItem("log") === 'true') {
    window.location.login = "login.html";
}

function cerrar_sesion() {
    sessionStorage.removeItem("log", "false");
    window.location.reload();
}