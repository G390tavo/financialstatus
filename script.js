// script.js

document.addEventListener("DOMContentLoaded", () => {
    const botones = document.querySelectorAll(".menu-btn");
    const secciones = document.querySelectorAll(".seccion");

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
    const menu = document.getElementById("menuLateral");
    cerrarBtn.addEventListener("click", () => {
        menu.style.display = "none";
        document.getElementById("abrirMenu").style.display = "block";
    });

    // Botón abrir menú (debe estar oculto al inicio)
    const abrirBtn = document.getElementById("abrirMenu");
    abrirBtn.addEventListener("click", () => {
        menu.style.display = "block";
        abrirBtn.style.display = "none";
    });
});
