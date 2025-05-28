// Redirige a login si NO hay sesión activa
if (sessionStorage.getItem("log") !== 'true') {
    window.location.href = "login.html";
}

// Función para cerrar sesión
function cerrar_sesion() {
    sessionStorage.clear();
    window.location.href = "login.html";
}

// Función para permitir solo admin
function solo_admin() {
    if (sessionStorage.getItem("rol") !== "admin") {
        window.location.href = "login.html";
    }
}

// Función para permitir solo user
function solo_user() {
    if (sessionStorage.getItem("rol") !== "user") {
        window.location.href = "login.html";
    }
}

// Función para permitir user o admin
function solo_user_o_admin() {
    const rol = sessionStorage.getItem("rol");
    if (rol !== "user" && rol !== "admin") {
        window.location.href = "login.html";
    }
}