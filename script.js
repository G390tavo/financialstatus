let monedas = {};
let criptos = [];
let chartMoneda;
let chartCripto;

async function cargarEmpresas() {
  const empresas = ["AAPL", "GOOG", "AMZN", "TSLA", "MSFT", "META", "NVDA", "INTC", "IBM", "SAMSUNG"];
  const contenedor = document.getElementById("listaEmpresas");
  contenedor.innerHTML = "";

  for (let nombre of empresas.slice(0, CONFIG.maxEmpresas)) {
    const info = await obtenerEmpresaInfo(nombre);
    const div = document.createElement("div");
    div.className = "empresa";
    div.innerHTML = `
      <h3>${info.nombre}</h3>
      <p>${info.descripcion}</p>
      <small>Sector: ${info.sector} | País: ${info.pais}</small><br>
      <strong>Valor actual: ${info.valorActual}</strong>
    `;
    contenedor.appendChild(div);
  }
}

async function cargarMonedas() {
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

async function actualizarGraficoMoneda() {
  const moneda = document.getElementById("selectorMoneda").value;
  const periodo = document.getElementById("selectorTiempoMoneda").value;
  if (!monedas[moneda]) return;

  if (chartMoneda) chartMoneda.destroy();
  const ctx = document.getElementById("graficoMoneda").getContext("2d");

  if (periodo === "real") {
    chartMoneda = new Chart(ctx, {
      type: "line",
      data: {
        labels: [new Date().toLocaleTimeString()],
        datasets: [{
          label: `1 ${CONFIG.monedaBase} en ${moneda}`,
          data: [monedas[moneda]],
          borderColor: "green",
          fill: false,
          tension: 0.3
        }]
      },
      options: {
        responsive: true,
        animation: true,
        plugins: {
          tooltip: {
            callbacks: {
              label: ctx => `${ctx.dataset.label}: ${ctx.raw}`
            }
          }
        },
        scales: {
          x: { display: true, title: { display: true, text: "Tiempo actual" } },
          y: { beginAtZero: false }
        }
      }
    });
  } else {
    const dias = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];
    const base = monedas[moneda];
    chartMoneda = new Chart(ctx, {
      type: "line",
      data: {
        labels: dias,
        datasets: [{
          label: `1 ${CONFIG.monedaBase} en ${moneda}`,
          data: dias.map((_, i) => base * (0.97 + 0.01 * i)),
          borderColor: "green",
          fill: false,
          tension: 0.3
        }]
      },
      options: {
        responsive: true,
        plugins: {
          tooltip: {
            callbacks: {
              label: ctx => `${ctx.dataset.label}: ${ctx.raw.toFixed(2)}`
            }
          }
        }
      }
    });
  }
}

async function actualizarGraficoCripto() {
  const criptoId = document.getElementById("selectorCripto").value;
  const periodo = document.getElementById("selectorTiempoCripto").value;
  const cripto = criptos.find(c => c.id === criptoId);
  if (!cripto) return;

  if (chartCripto) chartCripto.destroy();
  const ctx = document.getElementById("graficoCripto").getContext("2d");

  if (periodo === "real") {
    chartCripto = new Chart(ctx, {
      type: "line",
      data: {
        labels: [new Date().toLocaleTimeString()],
        datasets: [{
          label: `${cripto.name} en USD`,
          data: [cripto.current_price],
          borderColor: "#ff9800",
          fill: false,
          tension: 0.3
        }]
      },
      options: {
        responsive: true,
        animation: true,
        plugins: {
          tooltip: {
            callbacks: {
              label: ctx => `${ctx.dataset.label}: $${ctx.raw}`
            }
          }
        },
        scales: {
          y: { beginAtZero: false }
        }
      }
    });
  } else {
    const dias = ["Lun", "Mar", "Mié", "Jue", "Vie"];
    const base = cripto.current_price;
    chartCripto = new Chart(ctx, {
      type: "line",
      data: {
        labels: dias,
        datasets: [{
          label: `${cripto.name} en USD`,
          data: dias.map((_, i) => base * (0.95 + 0.01 * i)),
          borderColor: "#ff9800",
          fill: false,
          tension: 0.3
        }]
      },
      options: {
        responsive: true,
        plugins: {
          tooltip: {
            callbacks: {
              label: ctx => `${ctx.dataset.label}: $${ctx.raw.toFixed(2)}`
            }
          }
        }
      }
    });
  }
}

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
  document.body.classList.toggle("dark-mode", oscuro);
});
