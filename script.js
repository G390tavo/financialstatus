import { FUENTES } from './config.js';
import { intentarFuentes } from './utils.js';

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("inicio-btn").click();
  document.getElementById("modo-boton").addEventListener("click", toggleModo);
  document.getElementById("cerrar-menu").addEventListener("click", () => document.getElementById("menu-lateral").style.display = "none");
  document.getElementById("abrir-menu").addEventListener("click", () => document.getElementById("menu-lateral").style.display = "flex");

  document.getElementById("monedas-btn").addEventListener("click", cargarMonedas);
  document.getElementById("criptos-btn").addEventListener("click", cargarCriptos);
  document.getElementById("empresas-btn").addEventListener("click", cargarEmpresas);
});

function toggleModo() {
  document.body.classList.toggle("light");
}

function mostrarMensajeError(idContenedor, mensaje) {
  document.getElementById(idContenedor).innerHTML = `<div class="tarjeta"><h3>Error</h3><p>${mensaje}</p></div>`;
}

async function cargarMonedas() {
  document.querySelectorAll(".seccion").forEach(s => s.classList.remove("activa"));
  document.getElementById("monedas").classList.add("activa");
  const contenedor = document.getElementById("lista-monedas");
  contenedor.innerHTML = "Cargando...";

  const datos = await intentarFuentes(FUENTES.monedas, parsearMonedas);
  if (datos.length === 0) {
    mostrarMensajeError("lista-monedas", "No se pudo obtener el valor de las monedas.");
    return;
  }

  contenedor.innerHTML = datos.map(d => `
    <div class="tarjeta">
      <h3>${d.nombre}</h3>
      <div class="valor">${d.valor}</div>
      <div class="descripcion">${d.descripcion || "Sin historial disponible."}</div>
    </div>
  `).join("");
}

async function cargarCriptos() {
  document.querySelectorAll(".seccion").forEach(s => s.classList.remove("activa"));
  document.getElementById("criptos").classList.add("activa");
  const contenedor = document.getElementById("lista-criptos");
  contenedor.innerHTML = "Cargando...";

  const datos = await intentarFuentes(FUENTES.criptos, parsearCriptos);
  if (datos.length === 0) {
    mostrarMensajeError("lista-criptos", "No se pudo obtener el valor de las criptomonedas.");
    return;
  }

  contenedor.innerHTML = datos.map(d => `
    <div class="tarjeta">
      <h3>${d.nombre}</h3>
      <div class="valor">${d.valor}</div>
      <div class="descripcion">${d.descripcion || "Sin historial disponible."}</div>
    </div>
  `).join("");
}

async function cargarEmpresas() {
  document.querySelectorAll(".seccion").forEach(s => s.classList.remove("activa"));
  document.getElementById("empresas").classList.add("activa");
  const contenedor = document.getElementById("lista-empresas");
  contenedor.innerHTML = "Cargando...";

  const datos = await intentarFuentes(FUENTES.empresas, parsearEmpresas);
  if (datos.length === 0) {
    mostrarMensajeError("lista-empresas", "No se pudo obtener el valor de las empresas.");
    return;
  }

  contenedor.innerHTML = datos.map(d => `
    <div class="tarjeta">
      <h3>${d.nombre}</h3>
      <div class="valor">${d.valor}</div>
      <div class="descripcion">${d.descripcion || "Sin historial disponible."}</div>
    </div>
  `).join("");
}

// PARSEADORES SIMPLIFICADOS (coloca los reales luego)
function parsearMonedas(html) {
  return [{ nombre: "USD a PEN", valor: "3.68", descripcion: "Solo valor actual disponible." }];
}
function parsearCriptos(html) {
  return [{ nombre: "Bitcoin", valor: "$105,562.10", descripcion: "Actualizado hoy." }];
}
function parsearEmpresas(html) {
  return [{ nombre: "Apple Inc", valor: "$185.23", descripcion: "Valor actual disponible." }];
}
