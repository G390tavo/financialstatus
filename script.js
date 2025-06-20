// script.js
import { fetchHTML, extraerValorDesdeHTML } from './utils.js';

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("btn-monedas").addEventListener("click", () => mostrarSeccion("monedas"));
  document.getElementById("btn-criptos").addEventListener("click", () => mostrarSeccion("criptos"));
  document.getElementById("btn-empresas").addEventListener("click", () => mostrarSeccion("empresas"));
  document.getElementById("btn-inicio").addEventListener("click", () => mostrarSeccion("inicio"));
  document.getElementById("btn-ia").addEventListener("click", () => mostrarSeccion("ia"));

  cargarMonedas();
  cargarCriptos();
  cargarEmpresas();
});

function mostrarSeccion(id) {
  document.querySelectorAll(".seccion").forEach(seccion => {
    seccion.classList.remove("activa");
  });
  document.getElementById(id).classList.add("activa");
}

function renderTarjetas(div, lista) {
  if (!Array.isArray(lista) || lista.length === 0) {
    div.innerHTML = "<p style='color:red;'>No se encontraron resultados.</p>";
    return;
  }

  div.innerHTML = lista.map(el => `
    <div class="tarjeta">
      <h3>${el.nombre}</h3>
      <div class="valor">$${el.valor}</div>
      <div class="variacion">${el.variacion}</div>
    </div>
  `).join("");
}

async function cargarMonedas() {
  const div = document.getElementById("lista-monedas");
  div.innerHTML = "Cargando monedas...";

  const monedas = ["dólar", "euro", "yen", "libra esterlina"];
  const lista = [];

  for (const moneda of monedas) {
    const html = await fetchHTML(`¿Valor actual del ${moneda} en Perú?`);
    const valor = extraerValorDesdeHTML(html);
    if (valor) {
      lista.push({ nombre: moneda, valor, variacion: "+0.00%" });
    }
  }

  renderTarjetas(div, lista);
}

async function cargarCriptos() {
  const div = document.getElementById("lista-criptos");
  div.innerHTML = "Cargando criptomonedas...";

  const criptos = ["bitcoin", "ethereum", "dogecoin"];
  const lista = [];

  for (const cripto of criptos) {
    const html = await fetchHTML(`Precio actual del ${cripto} en USD`);
    const valor = extraerValorDesdeHTML(html);
    if (valor) {
      lista.push({ nombre: cripto, valor, variacion: "+0.00%" });
    }
  }

  renderTarjetas(div, lista);
}

async function cargarEmpresas() {
  const div = document.getElementById("lista-empresas");
  div.innerHTML = "Cargando empresas...";

  const empresas = ["Apple", "Google", "Tesla"];
  const lista = [];

  for (const empresa of empresas) {
    const html = await fetchHTML(`Valor actual de la acción de ${empresa}`);
    const valor = extraerValorDesdeHTML(html);
    if (valor) {
      lista.push({ nombre: empresa, valor, variacion: "+0.00%" });
    }
  }

  renderTarjetas(div, lista);
}
