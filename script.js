// script.js

import { obtenerValorDesdeGoogle, generarHistorial, graficar, mostrarError } from './utils.js';

document.addEventListener("DOMContentLoaded", () => {
  const secciones = ["inicio", "monedas", "criptomonedas", "empresas", "ia"];
  const botones = {
    inicio: document.getElementById("btn-inicio"),
    monedas: document.getElementById("btn-monedas"),
    criptomonedas: document.getElementById("btn-criptomonedas"),
    empresas: document.getElementById("btn-empresas"),
    ia: document.getElementById("btn-ia")
  };

  const aside = document.querySelector("aside");
  const cerrarMenu = document.getElementById("cerrar-menu");
  const modoOscuro = document.getElementById("modo-oscuro");

  cerrarMenu.addEventListener("click", () => {
    aside.classList.toggle("cerrado");
  });

  modoOscuro.addEventListener("click", () => {
    document.body.classList.toggle("oscuro");
  });

  function mostrarSeccion(id) {
    secciones.forEach(seccion => {
      const el = document.getElementById(seccion);
      el.style.display = seccion === id ? "block" : "none";
    });
  }

  Object.entries(botones).forEach(([id, btn]) => {
    btn.addEventListener("click", () => {
      mostrarSeccion(id);
    });
  });

  mostrarSeccion("inicio"); // Muestra Inicio por defecto

  // Listas de elementos básicos
  const monedas = [
    { nombre: "Dólar estadounidense", query: "dólar en soles" },
    { nombre: "Euro", query: "euro en soles" },
    { nombre: "Yen japonés", query: "yen en soles" },
    { nombre: "Libra esterlina", query: "libra en soles" },
    { nombre: "Franco suizo", query: "franco en soles" }
  ];

  const criptos = [
    { nombre: "Bitcoin", query: "precio del bitcoin" },
    { nombre: "Ethereum", query: "precio de ethereum" },
    { nombre: "USDT", query: "precio del tether" }
  ];

  const empresas = [
    { nombre: "Apple", query: "acciones apple" },
    { nombre: "Tesla", query: "acciones tesla" },
    { nombre: "Amazon", query: "acciones amazon" },
    { nombre: "Google", query: "acciones google" },
    { nombre: "Microsoft", query: "acciones microsoft" }
  ];

  function generarLista(seccion, datos) {
    const contenedor = document.getElementById(seccion + "-lista");
    if (!contenedor) return;

    datos.forEach(async item => {
      const div = document.createElement("div");
      div.className = "item-lista";
      div.textContent = item.nombre;

      div.addEventListener("click", async () => {
        const valor = await obtenerValorDesdeGoogle(item.query);
        if (valor) {
          const historial = generarHistorial(valor);
          graficar(item.nombre, historial);
        } else {
          mostrarError("No se pudo obtener el valor de " + item.nombre);
        }
      });

      contenedor.appendChild(div);
    });
  }

  generarLista("monedas", monedas);
  generarLista("criptomonedas", criptos);
  generarLista("empresas", empresas);
});
