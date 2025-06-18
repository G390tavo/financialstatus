// script.js
import { mostrarError } from "./utils.js";

document.addEventListener("DOMContentLoaded", () => {
  const secciones = document.querySelectorAll(".seccion");
  const botones = document.querySelectorAll(".nav-btn");
  const btnCerrar = document.getElementById("cerrarMenu");
  const menu = document.getElementById("menu");
  const modoClaro = document.getElementById("modoClaro");

  function mostrarSeccion(id) {
    secciones.forEach(seccion => seccion.style.display = "none");
    const activa = document.getElementById(id);
    if (activa) activa.style.display = "block";
  }

  botones.forEach(btn => {
    btn.addEventListener("click", () => {
      mostrarSeccion(btn.dataset.seccion);
    });
  });

  if (btnCerrar && menu) {
    btnCerrar.addEventListener("click", () => {
      menu.style.display = menu.style.display === "none" ? "block" : "none";
    });
  }

  if (modoClaro) {
    modoClaro.addEventListener("click", () => {
      document.body.classList.toggle("claro");
    });
  }

  // Mostrar sección inicio por defecto
  mostrarSeccion("inicio");
});
