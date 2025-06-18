// script.js

import { mostrarError } from './utils.js';
import { inicializarIA } from './ai.js';

document.addEventListener("DOMContentLoaded", () => {
  const botones = {
    inicio: document.getElementById("btn-inicio"),
    monedas: document.getElementById("btn-monedas"),
    criptomonedas: document.getElementById("btn-criptomonedas"),
    empresas: document.getElementById("btn-empresas"),
    ia: document.getElementById("btn-ia"),
  };

  const secciones = {
    inicio: document.getElementById("inicio"),
    monedas: document.getElementById("monedas"),
    criptomonedas: document.getElementById("criptomonedas"),
    empresas: document.getElementById("empresas"),
    ia: document.getElementById("ia"),
  };

  const cerrarMenuBtn = document.getElementById("cerrar-menu");
  const modoOscuroBtn = document.getElementById("modo-oscuro");

  function ocultarSecciones() {
    Object.values(secciones).forEach(sec => sec.classList.remove("active"));
  }

  function mostrarSeccion(nombre) {
    ocultarSecciones();
    secciones[nombre].classList.add("active");
  }

  // Mostrar Inicio al iniciar
  mostrarSeccion("inicio");

  botones.inicio.addEventListener("click", () => mostrarSeccion("inicio"));
  botones.monedas.addEventListener("click", () => mostrarSeccion("monedas"));
  botones.criptomonedas.addEventListener("click", () => mostrarSeccion("criptomonedas"));
  botones.empresas.addEventListener("click", () => mostrarSeccion("empresas"));
  botones.ia.addEventListener("click", () => mostrarSeccion("ia"));

  cerrarMenuBtn.addEventListener("click", () => {
    document.querySelector("aside").style.display = "none";
    document.querySelector("main").style.marginLeft = "0";
  });

  modoOscuroBtn.addEventListener("click", () => {
    document.body.classList.toggle("oscuro");
  });

  try {
    inicializarIA();
  } catch (e) {
    mostrarError("AI no inicializada. Faltan elementos.");
    console.error("Error inicializando IA:", e);
  }
});
