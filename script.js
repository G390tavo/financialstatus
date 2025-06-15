let monedas = {};
let criptos = [];
let chartMoneda;
let chartCripto;

document.addEventListener("DOMContentLoaded", async () => {
  setTimeout(() => document.getElementById("loader").style.display = "none", 1000);
  mostrarVista("empresas");
  await cargarEmpresas();
  await cargarMonedas();
  await cargarCriptos();
});

function mostrarVista(id) {
  document.querySelectorAll(".seccion").forEach(s => s.style.display = "none");
  const seccion = document.getElementById(id);
  if (seccion) seccion.style.display = "block";
}

document.getElementById("modoOscuro").addEventListener("change", (e) => {
  const oscuro = e.target.checked;
  document.body.style.backgroundColor = oscuro ? "#111" : "#f1f1f1";
  document.body.style.color = oscuro ? "#eee" : "#222";
  document.querySelectorAll(".card, .configuracion, .empresa, .cripto, .moneda").forEach(el => {
    el.style.backgroundColor = oscuro ? "#1c1c1c" : "#fff";
    el.style.color = oscuro ? "#eee" : "#222";
  });
});

async function cargarEmpresas() {
  const empresas = ["Apple", "Google", "Amazon", "Tesla", "Microsoft", "Meta", "Samsung", "Intel", "IBM", "Nvidia"];
  const contenedor = document.getElementById("listaEmpresas");
  contenedor.innerHTML = "";
  for (let nombre of empresas) {
    const info = await obtenerEmpresaInfo(nombre);
    const div = document.createElement("div");
    div.className = "empresa card";
    div.innerHTML = `
      <h3>${info.nombre}</h3>
      <p>${info.descripcion}</p>
      <small>Sector: ${info.sector} | País: ${info.pais}</small><br>
      <strong>Valor actual: $${info.valorActual}</strong>
    `;
    contenedor.appendChild(div);
  }
}

async function cargarMonedas() {
  try {
    monedas = await obtenerMonedas();
    const selector = document.getElementById("selectorMoneda");
    selector.innerHTML = "";
    Object.keys(monedas).forEach(moneda => {
      const option = document.createElement("option");
      option.value = moneda;
      option.textContent = moneda;
      selector.appendChild(option);
    });
    actualizarGraficoMoneda();
  } catch (err) {
    console.error("Error cargando monedas:", err);
  }
}

async function cargarCriptos() {
  criptos = await obtenerCriptos();
  const selector = document.getElementById("selectorCripto");
  selector.innerHTML = "";
  criptos.forEach(c => {
    const option = document.createElement("option");
    option.value = c.id;
    option.textContent = c.name;
    selector.appendChild(option);
  });
  actualizarGraficoCripto();
}

document.getElementById("selectorMoneda").addEventListener("change", actualizarGraficoMoneda);
document.getElementById("selectorTiempoMoneda").addEventListener("change", actualizarGraficoMoneda);
document.getElementById("selectorCripto").addEventListener("change", actualizarGraficoCripto);
document.getElementById("selectorTiempoCripto").addEventListener("change", actualizarGraficoCripto);

async function actualizarGraficoMoneda() {
  const moneda = document.getElementById("selectorMoneda").value;
  const periodo = document.getElementById("selectorTiempoMoneda").value;
  if (!monedas[moneda]) return;

  if (chartMoneda) chartMoneda.destroy();
  const ctx = document.getElementById("graficoMoneda").getContext("2d");

  const valores = periodo === "real"
    ? [monedas[moneda]]
    : [monedas[moneda] * 0.95, monedas[moneda], monedas[moneda] * 1.05];

  const labels = periodo === "real" ? ["Ahora"] : ["Inicio", "Mitad", "Final"];

  chartMoneda = new Chart(ctx, {
    type: "line",
    data: {
      labels,
      datasets: [{
        label: `1 ${CONFIG.monedaBase} en ${moneda}`,
        data: valores,
        borderColor: "green",
        tension: 0.4,
        fill: false
      }]
    },
    options: {
      responsive: true,
      plugins: {
        tooltip: {
          callbacks: {
            label: ctx => `${ctx.dataset.label}: ${ctx.raw}`
          }
        }
      },
      scales: { y: { beginAtZero: false } }
    }
  });
}

async function actualizarGraficoCripto() {
  const criptoId = document.getElementById("selectorCripto").value;
  const periodo = document.getElementById("selectorTiempoCripto").value;
  const cripto = criptos.find(c => c.id === criptoId);
  if (!cripto) return;

  if (chartCripto) chartCripto.destroy();
  const ctx = document.getElementById("graficoCripto").getContext("2d");

  const valores = periodo === "real"
    ? [cripto.current_price]
    : [cripto.current_price * 0.9, cripto.current_price, cripto.current_price * 1.1];

  const labels = periodo === "real" ? ["Ahora"] : ["Inicio", "Mitad", "Final"];

  chartCripto = new Chart(ctx, {
    type: "line",
    data: {
      labels,
      datasets: [{
        label: `${cripto.name} en USD`,
        data: valores,
        borderColor: "#ff9800",
        tension: 0.4,
        fill: false
      }]
    },
    options: {
      responsive: true,
      plugins: {
        tooltip: {
          callbacks: {
            label: ctx => `${ctx.dataset.label}: $${ctx.raw}`
          }
        }
      }
    }
  });
}
