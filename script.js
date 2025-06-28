// Archivo: script.js

document.addEventListener("DOMContentLoaded", () => {
  const secciones = document.querySelectorAll(".seccion");
  const botonesMenu = document.querySelectorAll("#menu-lateral nav button");
  const botonModo = document.querySelector(".modo-boton");
  const botonCerrar = document.getElementById("cerrar-menu");
  const botonAbrir = document.getElementById("abrir-menu");

  function mostrarSeccion(id) {
    secciones.forEach(sec => sec.classList.remove("activa"));
    document.getElementById(id).classList.add("activa");
  }

  botonesMenu.forEach(btn => {
    btn.addEventListener("click", () => {
      mostrarSeccion(btn.dataset.seccion);
      if (window.innerWidth <= 768) document.getElementById("menu-lateral").style.display = "none";
    });
  });

  botonModo.addEventListener("click", () => {
    document.body.classList.toggle("light");
  });

  botonCerrar.addEventListener("click", () => {
    document.getElementById("menu-lateral").style.display = "none";
    botonAbrir.style.display = "block";
  });

  botonAbrir.addEventListener("click", () => {
    document.getElementById("menu-lateral").style.display = "flex";
    botonAbrir.style.display = "none";
  });

  // Sección por defecto
  mostrarSeccion("inicio");

  // Cargar datos
  document.querySelector("[data-seccion='monedas']").addEventListener("click", cargarMonedas);
  document.querySelector("[data-seccion='criptos']").addEventListener("click", cargarCriptos);
  document.querySelector("[data-seccion='empresas']").addEventListener("click", cargarEmpresas);
  document.querySelector("[data-seccion='ia']").addEventListener("click", iniciarIA);
});

// ========== Funciones de Carga ==========

async function cargarMonedas() {
  const contenedor = document.querySelector("#monedas .contenedor-tarjetas");
  contenedor.innerHTML = "Cargando...";

  const resultado = await intentarFuentes(FUENTES.monedas, html => {
    const match = html.match(/1\s*USD\s*=\s*([\d.,]+)\s*PEN/);
    return match ? { nombre: "Dólar a Sol", valor: match[1], variacion: "+0.00%" } : null;
  });

  contenedor.innerHTML = resultado
    ? generarTarjetaHTML("USD a PEN", resultado.valor, resultado.variacion, "Tipo de cambio actualizado.")
    : mensajeError("No se encontró historial para monedas.");
}

async function cargarCriptos() {
  const contenedor = document.querySelector("#criptos .contenedor-tarjetas");
  contenedor.innerHTML = "Cargando...";

  const resultado = await intentarFuentes(FUENTES.criptos, html => {
    const match = html.match(/Bitcoin.*?([\d,]+\.\d{2})\s*USD/i);
    return match ? { nombre: "Bitcoin", valor: match[1], variacion: "+0.00%" } : null;
  });

  contenedor.innerHTML = resultado
    ? generarTarjetaHTML("Bitcoin", resultado.valor, resultado.variacion, "Valor actualizado de BTC.")
    : mensajeError("No se encontró historial para criptomonedas.");
}

async function cargarEmpresas() {
  const contenedor = document.querySelector("#empresas .contenedor-tarjetas");
  contenedor.innerHTML = "Cargando...";

  const resultado = await intentarFuentes(FUENTES.empresas, html => {
    const match = html.match(/Apple.*?([\d,]+\.\d{2})/i);
    return match ? { nombre: "Apple", valor: match[1], variacion: "+0.00%" } : null;
  });

  contenedor.innerHTML = resultado
    ? generarTarjetaHTML("Apple", resultado.valor, resultado.variacion, "Acciones de Apple Inc.")
    : mensajeError("No se encontró historial para empresas.");
}

// ========== IA ==========
function iniciarIA() {
  const respuestaDiv = document.getElementById("respuesta-ia");
  const preguntaInput = document.getElementById("pregunta-ia");

  document.getElementById("ia-cargando").innerText = "";
  respuestaDiv.innerHTML = "";

  const preguntasAuto = [
    "¿qué es esta app?",
    "¿cómo funciona?",
    "¿qué pasa si no carga algo?",
    "¿puedo usar IA?",
    "¿por qué aparece solo un valor sin gráfico?",
    "¿qué fuentes usa?"
  ];

  respuestaDiv.innerHTML = "Haz una pregunta como:<br>" + preguntasAuto.map(p => `– ${p}`).join("<br>");

  preguntaInput.addEventListener("keypress", e => {
    if (e.key === "Enter") responderIA(preguntaInput.value.trim());
  });
}

function responderIA(pregunta) {
  const respuesta = obtenerRespuestaIA(pregunta);
  const respuestaDiv = document.getElementById("respuesta-ia");
  document.getElementById("ia-cargando").innerText = "Procesando...";
  setTimeout(() => {
    respuestaDiv.innerText = respuesta;
    document.getElementById("ia-cargando").innerText = "";
  }, 600);
}

// ========== Utilidad HTML ==========

function generarTarjetaHTML(titulo, valor, variacion, descripcion) {
  return `
    <div class="tarjeta">
      <h3><i class="fa-solid fa-chart-line"></i> ${titulo}</h3>
      <div class="valor">${valor}</div>
      <div class="variacion">${variacion}</div>
      <div class="descripcion">${descripcion}</div>
    </div>
  `;
}

function mensajeError(msg) {
  return `<div class="tarjeta"><h3>Error</h3><div class="descripcion">${msg}</div></div>`;
}
