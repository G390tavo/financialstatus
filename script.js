// script.js
document.addEventListener("DOMContentLoaded", () => {
  const secciones = document.querySelectorAll(".seccion");
  const botones = document.querySelectorAll("aside nav button");
  const abrirMenu = document.getElementById("abrir-menu");
  const cerrarMenu = document.getElementById("cerrar-menu");

  botones.forEach(boton => {
    boton.addEventListener("click", () => {
      secciones.forEach(s => s.classList.remove("activa"));
      document.getElementById(boton.dataset.section).classList.add("activa");
      cerrarPanelesAbiertos();
      document.getElementById("menu-lateral").style.display = "none";
    });
  });

  abrirMenu.onclick = () => document.getElementById("menu-lateral").style.display = "flex";
  cerrarMenu.onclick = () => document.getElementById("menu-lateral").style.display = "none";

  document.getElementById("modo-toggle").onclick = () => {
    document.body.classList.toggle("light");
  };

  cargarDatos();
});

async function cargarDatos() {
  await Promise.all([
    cargarMonedas(),
    cargarCriptos(),
    cargarEmpresas()
  ]);
}

function renderTarjetas(lista, contenedorID, tipo) {
  const contenedor = document.getElementById(contenedorID);
  contenedor.innerHTML = "";

  if (!Array.isArray(lista)) {
    contenedor.innerHTML = "<p>No se pudieron cargar los datos.</p>";
    return;
  }

  lista.forEach(item => {
    const tarjeta = document.createElement("div");
    tarjeta.className = "tarjeta";
    tarjeta.innerHTML = `
      <h3><i class="fas fa-chart-line"></i> ${item.nombre}</h3>
      <div class="valor">$${item.valor.toFixed(2)}</div>
      <div class="variacion ${item.variacion >= 0 ? "up" : "down"}">
        ${item.variacion >= 0 ? "▲" : "▼"} ${item.variacion.toFixed(2)}%
      </div>
      <div class="descripcion">${item.descripcion}</div>
    `;
    tarjeta.onclick = () => mostrarGrafico(item, tarjeta);
    contenedor.appendChild(tarjeta);
  });
}

function cerrarPanelesAbiertos() {
  document.querySelectorAll(".panel-grafico").forEach(p => p.remove());
}

function mostrarGrafico(item, tarjeta) {
  const abierto = tarjeta.querySelector(".panel-grafico");
  if (abierto) return abierto.remove();

  cerrarPanelesAbiertos();

  const panel = document.createElement("div");
  panel.className = "panel-grafico";
  panel.innerHTML = `
    <button class="cerrar-panel">X</button>
    <canvas></canvas>
  `;

  tarjeta.appendChild(panel);
  panel.querySelector(".cerrar-panel").onclick = () => panel.remove();

  if (!item.historial || !item.fechas || item.historial.length === 0) {
    panel.innerHTML += "<p style='color:white'>NO SE ENCONTRARON RESULTADOS</p>";
    return;
  }

  const canvas = panel.querySelector("canvas");
  crearGrafico(canvas, item);
}

// Simulación con datos reales desde utils
async function cargarMonedas() {
  const lista = [
    {
      nombre: "Dólar (USD)",
      valor: 3.72,
      variacion: 0.4,
      descripcion: "Dólar estadounidense frente al sol.",
      historial: [3.70, 3.71, 3.72, 3.71, 3.73],
      fechas: ["Lun", "Mar", "Mié", "Jue", "Vie"]
    },
    {
      nombre: "Euro (EUR)",
      valor: 4.05,
      variacion: -0.3,
      descripcion: "Euro frente al sol peruano.",
      historial: [4.08, 4.07, 4.06, 4.05, 4.04],
      fechas: ["Lun", "Mar", "Mié", "Jue", "Vie"]
    }
  ];
  renderTarjetas(lista, "lista-monedas", "moneda");
}

async function cargarCriptos() {
  const lista = [
    {
      nombre: "Bitcoin",
      valor: 68750,
      variacion: 1.3,
      descripcion: "Criptomoneda líder en el mercado.",
      historial: [68000, 68300, 68500, 68800, 68750],
      fechas: ["Lun", "Mar", "Mié", "Jue", "Vie"]
    },
    {
      nombre: "Ethereum",
      valor: 3812,
      variacion: -0.6,
      descripcion: "Plataforma para contratos inteligentes.",
      historial: [3900, 3880, 3860, 3840, 3812],
      fechas: ["Lun", "Mar", "Mié", "Jue", "Vie"]
    }
  ];
  renderTarjetas(lista, "lista-criptos", "cripto");
}

async function cargarEmpresas() {
  const lista = [
    {
      nombre: "Apple Inc.",
      valor: 195.22,
      variacion: 0.85,
      descripcion: "Empresa de tecnología y productos electrónicos.",
      historial: [192, 193, 194, 195, 195.22],
      fechas: ["Lun", "Mar", "Mié", "Jue", "Vie"]
    },
    {
      nombre: "Tesla Inc.",
      valor: 226.05,
      variacion: -1.2,
      descripcion: "Fabricante de autos eléctricos.",
      historial: [230, 228, 227, 226, 226.05],
      fechas: ["Lun", "Mar", "Mié", "Jue", "Vie"]
    }
  ];
  renderTarjetas(lista, "lista-empresas", "empresa");
}
