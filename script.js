// script.js

document.addEventListener("DOMContentLoaded", () => {
  const secciones = document.querySelectorAll(".seccion");
  const botones = document.querySelectorAll("nav button[data-section]");
  const modoToggle = document.getElementById("modo-toggle");
  const body = document.body;

  // Mostrar solo una sección
  botones.forEach(boton => {
    boton.addEventListener("click", () => {
      const id = boton.dataset.section;
      secciones.forEach(sec => sec.classList.remove("activa"));
      document.getElementById(id).classList.add("activa");
    });
  });

  // Modo claro/oscuro
  modoToggle.addEventListener("click", () => {
    if (body.classList.contains("dark")) {
      body.classList.remove("dark");
      modoToggle.textContent = "Modo oscuro";
    } else {
      body.classList.add("dark");
      modoToggle.textContent = "Modo claro";
    }
  });

  // Menú lateral
  const cerrar = document.getElementById("cerrar-menu");
  const abrir = document.getElementById("abrir-menu");
  const menu = document.getElementById("menu-lateral");

  cerrar.addEventListener("click", () => {
    menu.style.display = "none";
    abrir.style.display = "block";
  });

  abrir.addEventListener("click", () => {
    menu.style.display = "block";
    abrir.style.display = "none";
  });

  // Renderizar tarjetas
  renderTarjetas(monedas, "moneda", "lista-monedas");
  renderTarjetas(criptos, "cripto", "lista-criptos");
  renderTarjetas(empresas, "empresa", "lista-empresas");
});

// Función principal para crear tarjetas
function renderTarjetas(lista, tipo, contenedorId) {
  const contenedor = document.getElementById(contenedorId);
  contenedor.innerHTML = "";
  lista.forEach(dato => {
    const tarjeta = crearTarjeta(dato, tipo);
    contenedor.appendChild(tarjeta);
  });
}
