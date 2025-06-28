import { obtenerHTML, intentarFuentes } from "./utils.js";
import { iniciarIA } from "./ai.js";
import { config } from "./config.js";

document.addEventListener("DOMContentLoaded", () => {
  // BOTONES SECCIONES
  const btnInicio = document.getElementById("btn-inicio");
  const btnMoneda = document.getElementById("btn-moneda");
  const btnCripto = document.getElementById("btn-cripto");
  const btnEmpresa = document.getElementById("btn-empresa");
  const btnIA = document.getElementById("btn-ia");

  // SECCIONES
  const secciones = {
    inicio: document.getElementById("inicio"),
    monedas: document.getElementById("monedas"),
    criptos: document.getElementById("criptos"),
    empresas: document.getElementById("empresas"),
    ia: document.getElementById("ia")
  };

  const mostrarSeccion = (seccionId) => {
    Object.values(secciones).forEach(sec => sec?.classList.remove("activa"));
    secciones[seccionId]?.classList.add("activa");
  };

  btnInicio?.addEventListener("click", () => mostrarSeccion("inicio"));
  btnMoneda?.addEventListener("click", () => {
    mostrarSeccion("monedas");
    cargarMonedas();
  });

  btnCripto?.addEventListener("click", () => {
    mostrarSeccion("criptos");
    cargarCriptos();
  });

  btnEmpresa?.addEventListener("click", () => {
    mostrarSeccion("empresas");
    cargarEmpresas();
  });

  btnIA?.addEventListener("click", () => {
    mostrarSeccion("ia");
    iniciarIA();
  });

  mostrarSeccion("inicio"); // Mostrar sección de inicio al cargar
  iniciarIA(); // Iniciar IA automáticamente
  cargarMonedas(); // Cargar datos iniciales
});

// CARGAR DATOS DESDE FUENTES
async function cargarMonedas() {
  const contenedor = document.getElementById("contenedor-monedas");
  contenedor.innerHTML = "Cargando monedas...";

  const fuentes = config.monedas;
  const datos = await intentarFuentes(fuentes, procesarMonedas);

  if (datos.length === 0) {
    contenedor.innerHTML = `<div class="tarjeta">No se pudo obtener datos reales de monedas.</div>`;
    return;
  }

  contenedor.innerHTML = "";
  datos.forEach(moneda => contenedor.appendChild(crearTarjeta(moneda)));
}

async function cargarCriptos() {
  const contenedor = document.getElementById("contenedor-criptos");
  contenedor.innerHTML = "Cargando criptomonedas...";

  const fuentes = config.criptos;
  const datos = await intentarFuentes(fuentes, procesarCriptos);

  if (datos.length === 0) {
    contenedor.innerHTML = `<div class="tarjeta">No se pudo obtener datos reales de criptomonedas.</div>`;
    return;
  }

  contenedor.innerHTML = "";
  datos.forEach(cripto => contenedor.appendChild(crearTarjeta(cripto)));
}

async function cargarEmpresas() {
  const contenedor = document.getElementById("contenedor-empresas");
  contenedor.innerHTML = "Cargando empresas...";

  const fuentes = config.empresas;
  const datos = await intentarFuentes(fuentes, procesarEmpresas);

  if (datos.length === 0) {
    contenedor.innerHTML = `<div class="tarjeta">No se pudo obtener datos reales de empresas.</div>`;
    return;
  }

  contenedor.innerHTML = "";
  datos.forEach(empresa => contenedor.appendChild(crearTarjeta(empresa)));
}

// FUNCIONES PARA PROCESAR HTML
function procesarMonedas(html) {
  // Implementación específica para extraer datos de monedas del HTML
  return [];
}

function procesarCriptos(html) {
  // Implementación específica para extraer datos de criptos del HTML
  return [];
}

function procesarEmpresas(html) {
  // Implementación específica para extraer datos de empresas del HTML
  return [];
}

// CREAR TARJETA
function crearTarjeta(info) {
  const tarjeta = document.createElement("div");
  tarjeta.className = "tarjeta";
  tarjeta.innerHTML = `
    <h3><i class="fas fa-chart-line"></i> ${info.nombre}</h3>
    <div class="valor">${info.valor}</div>
    <div class="variacion">${info.variacion ?? ""}</div>
    <div class="descripcion">${info.descripcion ?? "Sin descripción disponible"}</div>
  `;
  tarjeta.addEventListener("click", () => mostrarGrafico(info));
  return tarjeta;
}

// MOSTRAR GRÁFICO
function mostrarGrafico(info) {
  const panel = document.createElement("div");
  panel.className = "panel-grafico";
  panel.innerHTML = `
    <button class="cerrar-panel">Cerrar</button>
    <h3>Historial de ${info.nombre}</h3>
    <div>${info.historial?.length ? "<canvas></canvas>" : "No se encontró historial disponible."}</div>
  `;
  panel.querySelector(".cerrar-panel").onclick = () => panel.remove();
  document.body.appendChild(panel);
}
