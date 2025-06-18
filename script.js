// script.js

document.addEventListener("DOMContentLoaded", () => {
    const botones = document.querySelectorAll(".menu-btn");
    const secciones = document.querySelectorAll(".seccion");

    // Mostrar solo 'inicio' al principio
    secciones.forEach(seccion => {
        seccion.style.display = seccion.id === "inicio" ? "block" : "none";
    });

    // Navegación por secciones
    botones.forEach(boton => {
        boton.addEventListener("click", () => {
            const destino = boton.getAttribute("data-seccion");
            secciones.forEach(seccion => {
                seccion.style.display = seccion.id === destino ? "block" : "none";
            });
        });
    });

    // Modo oscuro activado por defecto
    document.body.classList.add("oscuro");

    // Cerrar menú lateral
    const cerrarBtn = document.getElementById("cerrarMenu");
    const abrirBtn = document.getElementById("abrirMenu");
    const menu = document.getElementById("menuLateral");

    if (cerrarBtn) {
        cerrarBtn.addEventListener("click", () => {
            if (menu) menu.style.display = "none";
            if (abrirBtn) abrirBtn.style.display = "block";
        });
    }

    if (abrirBtn) {
        abrirBtn.addEventListener("click", () => {
            if (menu) menu.style.display = "block";
            abrirBtn.style.display = "none";
        });
    }
});
