// script.js

import { fetchHTML, extraerValor, limpiarTexto } from "./utils.js";

document.addEventListener("DOMContentLoaded", async () => {
  const botones = document.querySelectorAll("#menu-lateral nav button");
  const secciones = document.querySelectorAll(".seccion");

  botones.forEach(boton => {
    boton.addEventListener("click", () => {
      secciones.forEach(sec => sec.classList.remove("activa"));
      const id = boton.dataset.section;
      document.getElementById(id).classList.add("activa");

      document.getElementById("menu-lateral").style.display = "none";
      document.getElementById("abrir-menu").style.display = "block";
    });
  });

  document.getElementById("modo-toggle").addEventListener("click", () => {
    document.body.classList.toggle("light");
  });

  document.getElementById("cerrar-menu").addEventListener("click", () => {
    document.getElementById("menu-lateral").style.display = "none";
    document.getElementById("abrir-menu").style.display = "block";
  });

  document.getElementById("abrir-menu").addEventListener("click", () => {
    document.getElementById("menu-lateral").style.display = "flex";
    document.getElementById("abrir-menu").style.display = "none";
  });

  await cargarDatos();
});

async function cargarDatos() {
  await cargarMonedas();
  await cargarCriptos();
  await cargarEmpresas();
}

async function cargarMonedas() {
  const div = document.getElementById("lista-monedas");
  const urls = [
    { nombre: "Dólar", url: "https://www.google.com/search?q=precio+del+dólar+en+perú" },
    { nombre: "Euro", url: "https://www.google.com/search?q=precio+del+euro+en+perú" }
  ];

  const tarjetas = await Promise.all(
    urls.map(async ({ nombre, url }) => {
      try {
        const html = await fetchHTML(url);
        const valor = extraerValor(html, /<span[^>]*>(\d+,\d+)\s*PEN<\/span>/i) || "No disponible";
        return crearTarjeta(nombre, valor, url);
      } catch {
        return crearTarjeta(nombre, "No disponible", url);
      }
    })
  );

  renderTarjetas(tarjetas, div);
}

async function cargarCriptos() {
  const div = document.getElementById("lista-criptos");
  const urls = [
    { nombre: "Bitcoin", url: "https://www.google.com/search?q=precio+del+bitcoin" },
    { nombre: "Ethereum", url: "https://www.google.com/search?q=precio+de+ethereum" }
  ];

  const tarjetas = await Promise.all(
    urls.map(async ({ nombre, url }) => {
      try {
        const html = await fetchHTML(url);
        const valor = extraerValor(html, /\$([\d,]+\.\d+)/) || "No disponible";
        return crearTarjeta(nombre, valor, url);
      } catch {
        return crearTarjeta(nombre, "No disponible", url);
      }
    })
  );

  renderTarjetas(tarjetas, div);
}

async function cargarEmpresas() {
  const div = document.getElementById("lista-empresas");
  const urls = [
    { nombre: "Apple", url: "https://www.google.com/finance/quote/AAPL:NASDAQ" },
    { nombre: "Google", url: "https://www.google.com/finance/quote/GOOGL:NASDAQ" }
  ];

  const tarjetas = await Promise.all(
    urls.map(async ({ nombre, url }) => {
      try {
        const html = await fetchHTML(url);
        const valor = extraerValor(html, /<div[^>]*data-last-price[^>]*>([\d,]+\.\d+)/i) || "No disponible";
        return crearTarjeta(nombre, valor, url);
      } catch {
        return crearTarjeta(nombre, "No disponible", url);
      }
    })
  );

  renderTarjetas(tarjetas, div);
}

function renderTarjetas(lista, contenedor) {
  contenedor.innerHTML = "";
  lista.forEach(tarjeta => contenedor.appendChild(tarjeta));
}

function crearTarjeta(nombre, valor, url) {
  const div = document.createElement("div");
  div.className = "tarjeta";
  div.innerHTML = `
    <h3><i class="fas fa-chart-line"></i> ${nombre}</h3>
    <div class="valor">${valor}</div>
    <div class="descripcion">${valor !== "No disponible" ? "Haz clic para ver más." : "No se pudo obtener el valor actual."}</div>
  `;

  if (valor !== "No disponible") {
    div.onclick = async () => {
      const panel = document.createElement("div");
      panel.className = "panel-grafico";
      panel.innerHTML = `<div class="cerrar-panel">✖</div>`;

      try {
        const html = await fetchHTML(url);
        const valores = html.match(/(?:\d{1,3},)*\d{1,3}\.\d{2}/g);
        if (valores && valores.length > 2) {
          const datos = valores.slice(0, 10).map(v => parseFloat(v.replace(/,/g, '')));
          const canvas = document.createElement("canvas");
          panel.appendChild(canvas);
          crearGrafico(canvas, nombre, datos);
        } else {
          panel.innerHTML += `<p>NO SE ENCONTRARON RESULTADOS</p>`;
        }
      } catch {
        panel.innerHTML += `<p>NO SE ENCONTRARON RESULTADOS</p>`;
      }

      panel.querySelector(".cerrar-panel").onclick = () => panel.remove();
      div.appendChild(panel);
    };
  }

  return div;
}

function crearGrafico(canvas, nombre, datos) {
  new Chart(canvas, {
    type: "line",
    data: {
      labels: datos.map((_, i) => `T${i + 1}`),
      datasets: [{
        label: nombre,
        data: datos,
        borderColor: "#39FF14",
        backgroundColor: "rgba(57, 255, 20, 0.2)",
        pointBackgroundColor: "#39FF14",
        fill: true,
        tension: 0.3
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { labels: { color: "#39FF14", font: { weight: "bold" } } }
      },
      scales: {
        x: { ticks: { color: "#39FF14" } },
        y: { ticks: { color: "#39FF14" } }
      }
    }
  });
}
