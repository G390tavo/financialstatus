// script.js

document.addEventListener("DOMContentLoaded", () => {
    const botones = document.querySelectorAll(".menu-btn");
    const secciones = document.querySelectorAll(".seccion");

    // Muestra solo la sección de Inicio al cargar
    secciones.forEach(seccion => {
        seccion.style.display = seccion.id === "inicio" ? "block" : "none";
    });

    // Cambiar entre secciones
    botones.forEach(boton => {
        boton.addEventListener("click", () => {
            const destino = boton.getAttribute("data-seccion");
            secciones.forEach(seccion => {
                seccion.style.display = seccion.id === destino ? "block" : "none";
            });
        });
    });

    // Activar modo oscuro por defecto
    document.body.classList.add("oscuro");

    // Botón cerrar menú (verificar existencia)
    const cerrarBtn = document.getElementById("cerrarMenu");
    const menu = document.getElementById("menuLateral");
    const abrirBtn = document.getElementById("abrirMenu");

    if (cerrarBtn && menu) {
        cerrarBtn.addEventListener("click", () => {
            menu.style.display = "none";
            if (abrirBtn) abrirBtn.style.display = "block";
        });
    }

    if (abrirBtn && menu) {
        abrirBtn.addEventListener("click", () => {
            menu.style.display = "block";
            abrirBtn.style.display = "none";
        });
    }
});
