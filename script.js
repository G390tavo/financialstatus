document.addEventListener("DOMContentLoaded", () => {
  const secciones = document.querySelectorAll(".seccion");
  const botonesSeccion = document.querySelectorAll("aside button[data-section]");
  const botonModo = document.getElementById("modo-toggle");
  const abrirMenu = document.getElementById("abrir-menu");
  const cerrarMenu = document.getElementById("cerrar-menu");
  const menuLateral = document.getElementById("menu-lateral");

  // Mostrar solo la sección activa
  function mostrarSeccion(id) {
    secciones.forEach(s => s.classList.remove("activa"));
    const activa = document.getElementById(id);
    if (activa) activa.classList.add("activa");
  }

  // Evento: Navegación entre secciones
  botonesSeccion.forEach(boton => {
    boton.addEventListener("click", () => {
      const seccion = boton.dataset.section;
      mostrarSeccion(seccion);
      if (window.innerWidth < 768) menuLateral.style.display = "none";
    });
  });

  // Mostrar sección Inicio al iniciar
  mostrarSeccion("inicio");

  // Evento: Cerrar menú lateral
  cerrarMenu.addEventListener("click", () => {
    menuLateral.style.display = "none";
    abrirMenu.style.display = "block";
  });

  // Evento: Abrir menú lateral
  abrirMenu.addEventListener("click", () => {
    menuLateral.style.display = "block";
    abrirMenu.style.display = "none";
  });

  // Evento: Modo claro/oscuro
  botonModo.addEventListener("click", () => {
    const body = document.body;
    const oscuro = body.classList.contains("dark");

    if (oscuro) {
      body.classList.remove("dark");
      botonModo.textContent = "Modo oscuro";
    } else {
      body.classList.add("dark");
      botonModo.textContent = "Modo claro";
    }
  });

  // Renderizar tarjetas (criptos, monedas, empresas)
  function renderTarjetas(lista, contenedorId, tipo) {
    const contenedor = document.getElementById(contenedorId);
    contenedor.innerHTML = "";
    lista.forEach(item => {
      const tarjeta = crearTarjeta(item, tipo);
      contenedor.appendChild(tarjeta);
    });
  }

  // Obtener datos desde config.js
  if (window.config) {
    renderTarjetas(config.criptomonedas, "lista-criptos", "cripto");
    renderTarjetas(config.monedas, "lista-monedas", "moneda");
    renderTarjetas(config.empresas, "lista-empresas", "empresa");
  } else {
    console.error("⚠ No se encontró la configuración global (config.js).");
  }

});
