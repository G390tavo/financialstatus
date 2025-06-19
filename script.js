// script.js

document.addEventListener("DOMContentLoaded", () => {
  const secciones = document.querySelectorAll(".seccion");
  const botones = document.querySelectorAll("aside nav button");
  const menu = document.getElementById("menu-lateral");
  const cerrarMenu = document.getElementById("cerrar-menu");
  const abrirMenu = document.getElementById("abrir-menu");
  const modoToggle = document.getElementById("modo-toggle");

  // Mostrar solo una sección
  function mostrarSeccion(id) {
    secciones.forEach(sec => sec.classList.remove("activa"));
    const actual = document.getElementById(id);
    if (actual) actual.classList.add("activa");
  }

  // Manejar cambio de sección
  botones.forEach(btn => {
    btn.addEventListener("click", () => {
      const destino = btn.getAttribute("data-section");
      mostrarSeccion(destino);
    });
  });

  // Botón de cerrar menú
  cerrarMenu.addEventListener("click", () => {
    menu.style.display = "none";
    abrirMenu.style.display = "block";
  });

  // Botón de abrir menú
  abrirMenu.addEventListener("click", () => {
    menu.style.display = "block";
    abrirMenu.style.display = "none";
  });

  // Modo claro/oscuro
  modoToggle.addEventListener("click", () => {
    const body = document.body;
    if (body.classList.contains("dark")) {
      body.classList.remove("dark");
      body.classList.add("light");
      modoToggle.textContent = "Modo oscuro";
    } else {
      body.classList.remove("light");
      body.classList.add("dark");
      modoToggle.textContent = "Modo claro";
    }
  });

  // Renderizar tarjetas de datos
  function renderTarjetas(lista, contenedorId, tipo) {
    const contenedor = document.getElementById(contenedorId);
    contenedor.innerHTML = "";
    lista.forEach(item => {
      const tarjeta = crearTarjeta(item, tipo);
      contenedor.appendChild(tarjeta);
    });
  }

  // Datos desde config.js
  renderTarjetas(MONEDAS, "lista-monedas", "moneda");
  renderTarjetas(CRIPTOS, "lista-criptos", "cripto");
  renderTarjetas(EMPRESAS, "lista-empresas", "empresa");

  // Mostrar sección inicio por defecto
  mostrarSeccion("inicio");
});
