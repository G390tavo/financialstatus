// script.js

document.addEventListener("DOMContentLoaded", () => {
  const botones = document.querySelectorAll("#menu-lateral nav button");
  const secciones = document.querySelectorAll(".seccion");
  const abrirBtn = document.getElementById("abrir-menu");
  const cerrarBtn = document.getElementById("cerrar-menu");
  const menu = document.getElementById("menu-lateral");

  // Mostrar solo la sección "inicio" al cargar
  document.getElementById("inicio").classList.add("activa");

  // Cambiar de sección
  botones.forEach(b => {
    b.addEventListener("click", () => {
      secciones.forEach(s => s.classList.remove("activa"));
      document.getElementById(b.dataset.seccion).classList.add("activa");

      cerrarPaneles(); // Cierra paneles al cambiar sección

      if (b.dataset.seccion === "criptos") cargarCriptos();
      if (b.dataset.seccion === "monedas") cargarMonedas();
      if (b.dataset.seccion === "empresas") cargarEmpresas();
    });
  });

  // Botones abrir/cerrar menú lateral
  abrirBtn.addEventListener("click", () => {
    menu.style.display = "flex";
    abrirBtn.style.display = "none";
  });

  cerrarBtn.addEventListener("click", () => {
    menu.style.display = "none";
    abrirBtn.style.display = "block";
  });

  // Modo claro/oscuro
  document.querySelector(".modo-boton").addEventListener("click", () => {
    document.body.classList.toggle("light");
  });
});

// Renderizar tarjetas de forma genérica
function renderizarTarjetas(lista, contenedorID) {
  const contenedor = document.getElementById(contenedorID);
  contenedor.innerHTML = "";

  lista.forEach(item => {
    const tarjeta = document.createElement("div");
    tarjeta.className = "tarjeta";
    tarjeta.innerHTML = `
      <h3><i>${item.icono}</i> ${item.nombre}</h3>
      <div class="valor">${item.valor}</div>
      <div class="variacion ${item.cambio < 0 ? 'down' : 'up'}">
        ${item.cambio < 0 ? "↓" : "↑"} ${item.cambio}%
      </div>
      <div class="descripcion">${item.descripcion}</div>
    `;

    tarjeta.addEventListener("click", () => togglePanel(tarjeta, item));
    contenedor.appendChild(tarjeta);
  });
}

// Alternar panel de gráfico
function togglePanel(tarjeta, item) {
  cerrarPaneles();

  if (tarjeta.querySelector(".panel-grafico")) return;

  const panel = document.createElement("div");
  panel.className = "panel-grafico";

  const cerrar = document.createElement("button");
  cerrar.className = "cerrar-panel";
  cerrar.textContent = "X";
  cerrar.onclick = () => panel.remove();

  panel.appendChild(cerrar);

  // Historial o mensaje
  if (item.historial && item.historial.length > 1) {
    const canvas = document.createElement("canvas");
    panel.appendChild(canvas);
    setTimeout(() => graficar(canvas, item), 200);
  } else {
    const aviso = document.createElement("p");
    aviso.textContent = "No se encontró historial disponible. Solo se muestra el valor actual.";
    aviso.style.color = "gray";
    panel.appendChild(aviso);
  }

  tarjeta.appendChild(panel);
  panel.scrollIntoView({ behavior: "smooth", block: "center" });
}

// Cierra todos los paneles abiertos
function cerrarPaneles() {
  document.querySelectorAll(".panel-grafico").forEach(p => p.remove());
}

// === Carga de criptomonedas ===
async function cargarCriptos() {
  const html = await obtenerHTML(FUENTES_DATOS.criptos);
  if (!html) return mostrarError("contenedor-criptos", "No se pudo obtener criptomonedas.");

  const lista = []; // Aquí deberías parsear desde el HTML real
  // Simulación mínima: si no hay datos, no mostrar nada
  renderizarTarjetas(lista, "contenedor-criptos");
}

// === Carga de monedas ===
async function cargarMonedas() {
  const html = await obtenerHTML(FUENTES_DATOS.monedas + "usd-to-pen-rate");
  if (!html) return mostrarError("contenedor-monedas", "No se pudo obtener tasas de cambio.");

  const lista = []; // Aquí también deberías parsear desde el HTML real
  renderizarTarjetas(lista, "contenedor-monedas");
}

// === Carga de empresas ===
async function cargarEmpresas() {
  const html = await obtenerHTML(FUENTES_DATOS.empresas);
  if (!html) return mostrarError("contenedor-empresas", "No se pudo obtener datos de empresas.");

  const lista = []; // También se debe parsear real
  renderizarTarjetas(lista, "contenedor-empresas");
}

// Gráfico simple tipo línea
function graficar(canvas, item) {
  new Chart(canvas, {
    type: "line",
    data: {
      labels: item.historial.map(h => h.fecha),
      datasets: [{
        label: item.nombre,
        data: item.historial.map(h => h.valor),
        fill: false,
        borderColor: "#39FF14",
        tension: 0.3,
        pointBackgroundColor: "#39FF14"
      }]
    },
    options: {
      responsive: true,
      plugins: {
        tooltip: {
          enabled: true
        }
      },
      scales: {
        y: {
          beginAtZero: false
        }
      }
    }
  });
}

// Mostrar error personalizado
function mostrarError(id, mensaje) {
  const contenedor = document.getElementById(id);
  contenedor.innerHTML = `<p style="color:red; font-weight:600;">${mensaje}</p>`;
}
