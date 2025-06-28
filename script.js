// script.js

document.addEventListener("DOMContentLoaded", () => {
  mostrarSeccion("inicio");
  cargarMonedas();
  cargarCriptos();
  cargarEmpresas();
});

function mostrarSeccion(id) {
  document.querySelectorAll(".seccion").forEach(sec => sec.classList.remove("activa"));
  const activa = document.getElementById(id);
  if (activa) {
    activa.classList.add("activa");
    document.querySelectorAll(".panel-grafico").forEach(p => p.remove());
  }
}

// ------------------ MONEDAS ------------------

async function cargarMonedas() {
  const contenedor = document.getElementById("monedas-lista");
  contenedor.innerHTML = "";
  const url = "https://wise.com/gb/currency-converter/usd-to-pen-rate";
  const html = await obtenerHTML(url);

  if (!html) {
    mostrarError(contenedor, "No se pudieron obtener datos de monedas.");
    return;
  }

  try {
    const valor = html.match(/data-rate="([\d.]+)"/)?.[1];
    if (!valor) throw new Error("Patrón no encontrado");
    const tarjeta = crearTarjeta("USD → PEN", "💵", valor, "+0.00%", "Estable esta semana");
    contenedor.appendChild(tarjeta);
  } catch (e) {
    mostrarError(contenedor, "No se encontró el valor del USD.");
  }
}

// ------------------ CRIPTOS ------------------

async function cargarCriptos() {
  const contenedor = document.getElementById("criptos-lista");
  contenedor.innerHTML = "";
  const url = "https://coinmarketcap.com/";
  const html = await obtenerHTML(url);

  if (!html) {
    mostrarError(contenedor, "No se pudieron obtener datos de criptomonedas.");
    return;
  }

  try {
    const match = html.match(/Bitcoin.*?price.*?\$([\d.,]+)/i);
    if (!match) throw new Error("Bitcoin no encontrado");
    const valor = match[1];
    const tarjeta = crearTarjeta("Bitcoin", "₿", valor, "+1.20%", "En alza esta semana");
    contenedor.appendChild(tarjeta);
  } catch (e) {
    mostrarError(contenedor, "No se extrajo el valor de Bitcoin.");
  }
}

// ------------------ EMPRESAS ------------------

async function cargarEmpresas() {
  const contenedor = document.getElementById("empresas-lista");
  contenedor.innerHTML = "";
  const url = "https://www.investing.com/equities/";
  const html = await obtenerHTML(url);

  if (!html) {
    mostrarError(contenedor, "No se pudieron obtener datos de empresas.");
    return;
  }

  try {
    const match = html.match(/Apple.*?\$([\d.,]+)/i);
    if (!match) throw new Error("Apple no encontrado");
    const valor = match[1];
    const tarjeta = crearTarjeta("Apple", "🍏", valor, "-0.35%", "Leve caída esta semana");
    contenedor.appendChild(tarjeta);
  } catch (e) {
    mostrarError(contenedor, "No se encontró el valor de Apple.");
  }
}

// ------------------ COMPONENTES REUTILIZABLES ------------------

function crearTarjeta(nombre, icono, valor, variacion, descripcion) {
  const tarjeta = document.createElement("div");
  tarjeta.className = "tarjeta";

  tarjeta.innerHTML = `
    <h3><i>${icono}</i> ${nombre}</h3>
    <div class="valor">$${valor}</div>
    <div class="variacion ${variacion.includes('-') ? 'down' : 'up'}">${variacion}</div>
    <div class="descripcion">${descripcion}</div>
  `;

  tarjeta.addEventListener("click", () => toggleGrafico(tarjeta, nombre));
  return tarjeta;
}

function mostrarError(contenedor, mensaje) {
  contenedor.innerHTML = `<div class="mensaje-error">⚠️ ${mensaje}</div>`;
}

// ------------------ PANEL DE GRÁFICO ------------------

function toggleGrafico(tarjeta, titulo) {
  const existente = tarjeta.querySelector(".panel-grafico");
  if (existente) {
    existente.remove();
    return;
  }

  document.querySelectorAll(".panel-grafico").forEach(p => p.remove());

  const panel = document.createElement("div");
  panel.className = "panel-grafico";
  panel.innerHTML = `
    <button class="cerrar-panel">X</button>
    <h4>Historial de ${titulo}</h4>
    <div class="mensaje-error">⚠️ Historial no disponible para este activo.</div>
  `;

  panel.querySelector(".cerrar-panel").addEventListener("click", () => panel.remove());
  tarjeta.appendChild(panel);
  panel.scrollIntoView({ behavior: "smooth" });
}
