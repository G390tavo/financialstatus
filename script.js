// script.js

import { fetchHTML, limpiarTexto, generarSimulacionHistorial, obtenerValorActual } from "./utils.js";

document.addEventListener("DOMContentLoaded", async () => {
  const secciones = document.querySelectorAll(".seccion");
  const botones = document.querySelectorAll("#menu-lateral nav button");
  const modoBtn = document.getElementById("modo-toggle");
  const abrirMenu = document.getElementById("abrir-menu");
  const cerrarMenu = document.getElementById("cerrar-menu");

  botones.forEach(btn => {
    btn.addEventListener("click", () => {
      const seccionActiva = btn.dataset.section;
      secciones.forEach(sec => sec.classList.remove("activa"));
      document.getElementById(seccionActiva).classList.add("activa");
      document.querySelector(".panel-grafico")?.remove(); // cerrar panel activo
    });
  });

  abrirMenu.addEventListener("click", () => {
    document.getElementById("menu-lateral").style.display = "flex";
  });

  cerrarMenu.addEventListener("click", () => {
    document.getElementById("menu-lateral").style.display = "none";
  });

  modoBtn.addEventListener("click", () => {
    document.body.classList.toggle("light");
    modoBtn.textContent = document.body.classList.contains("light") ? "Modo oscuro" : "Modo claro";
  });

  // === Cargar Monedas / Criptos / Empresas ===
  await cargarSeccion("lista-monedas", ["dólar", "euro", "yen"]);
  await cargarSeccion("lista-criptos", ["Bitcoin", "Ethereum", "Litecoin"]);
  await cargarSeccion("lista-empresas", ["Google", "Apple", "Tesla"]);
});

async function cargarSeccion(idContenedor, lista) {
  const contenedor = document.getElementById(idContenedor);
  contenedor.innerHTML = "<p>Cargando...</p>";

  if (!Array.isArray(lista)) {
    contenedor.innerHTML = "<p>Error al cargar datos.</p>";
    return;
  }

  const tarjetas = await Promise.all(lista.map(async (item) => {
    const html = await fetchHTML(`¿Precio de ${item}?`);
    if (!html) return null;
    const limpio = limpiarTexto(html);
    const valor = obtenerValorActual(limpio);
    const historial = generarSimulacionHistorial(valor);

    return crearTarjeta(item, valor, historial);
  }));

  contenedor.innerHTML = "";
  tarjetas.filter(t => t).forEach(t => contenedor.appendChild(t));
}

function crearTarjeta(nombre, valor, historial) {
  const tarjeta = document.createElement("div");
  tarjeta.className = "tarjeta";
  tarjeta.tabIndex = 0;

  const h3 = document.createElement("h3");
  h3.innerHTML = `<i class="fas fa-chart-line"></i> ${nombre}`;

  const valorSpan = document.createElement("div");
  valorSpan.className = "valor";
  valorSpan.textContent = valor ? `${valor} USD` : "Valor no disponible";

  const variacion = document.createElement("div");
  variacion.className = "variacion";
  const cambio = historial && historial.length > 1 ? historial[historial.length - 1].y - historial[0].y : 0;
  variacion.innerHTML = cambio >= 0 ? `<span class="up">▲ ${cambio.toFixed(2)}</span>` : `<span class="down">▼ ${cambio.toFixed(2)}</span>`;

  const descripcion = document.createElement("div");
  descripcion.className = "descripcion";
  descripcion.textContent = "Últimos movimientos de mercado";

  tarjeta.append(h3, valorSpan, variacion, descripcion);

  tarjeta.addEventListener("click", () => {
    document.querySelectorAll(".panel-grafico").forEach(p => p.remove());

    const panel = document.createElement("div");
    panel.className = "panel-grafico";

    const cerrar = document.createElement("button");
    cerrar.textContent = "X";
    cerrar.className = "cerrar-panel";
    cerrar.addEventListener("click", () => panel.remove());

    if (!historial) {
      panel.innerHTML = "<p>No se encontraron resultados.</p>";
    } else {
      const canvas = document.createElement("canvas");
      canvas.width = 400;
      canvas.height = 200;
      panel.append(cerrar, canvas);
      dibujarGrafico(canvas, historial);
    }

    tarjeta.append(panel);
  });

  return tarjeta;
}

function dibujarGrafico(canvas, datos) {
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const maxY = Math.max(...datos.map(p => p.y));
  const minY = Math.min(...datos.map(p => p.y));
  const stepX = canvas.width / (datos.length - 1);

  ctx.beginPath();
  ctx.strokeStyle = "#39FF14";
  ctx.lineWidth = 2;

  datos.forEach((p, i) => {
    const x = i * stepX;
    const y = canvas.height - ((p.y - minY) / (maxY - minY)) * canvas.height;
    i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
  });

  ctx.stroke();
}
