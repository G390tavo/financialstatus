let monedas = {};
let criptos = [];
let chartMoneda;
let chartCripto;

async function cargarEmpresas() {
  const empresas = ["Apple", "Google", "Amazon", "Tesla", "Microsoft", "Meta", "Samsung", "Intel", "IBM", "Nvidia"];
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
  if (periodo === "real") {
    // Simulación de tiempo real (por ahora)
    const valor = monedas[moneda];
    if (!valor) return;
    if (chartMoneda) chartMoneda.destroy();
    const ctx = document.getElementById("graficoMoneda").getContext("2d");
    chartMoneda = new Chart(ctx, {
      type: "line",
      data: {
        labels: ["Ahora"],
        datasets: [{
          label: `1 ${CONFIG.monedaBase} en ${moneda}`,
          data: [valor],
          borderColor: "green",
          fill: false
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
          y: { beginAtZero: false }
        }
      }
    });
  } else {
    if (chartMoneda) chartMoneda.destroy();
    const ctx = document.getElementById("graficoMoneda").getContext("2d");
    chartMoneda = new Chart(ctx, {
      type: "line",
      data: {
        labels: ["Inicio", "Mitad", "Final"],
        datasets: [{
          label: `1 ${CONFIG.monedaBase} en ${moneda}`,
          data: [monedas[moneda] * 0.95, monedas[moneda], monedas[moneda] * 1.05],
          borderColor: "green",
          fill: false
        }]
      },
      options: {
        responsive: true
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
        labels: ["Ahora"],
        datasets: [{
          label: `${cripto.name} en USD`,
          data: [cripto.current_price],
          borderColor: "#ff9800",
          fill: false
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
        }
      }
    });
  } else {
    chartCripto = new Chart(ctx, {
      type: "line",
      data: {
        labels: ["Inicio", "Mitad", "Final"],
        datasets: [{
          label: `${cripto.name} en USD`,
          data: [cripto.current_price * 0.9, cripto.current_price, cripto.current_price * 1.1],
          borderColor: "#ff9800",
          fill: false
        }]
      },
      options: {
        responsive: true
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
  document.body.style.backgroundColor = oscuro ? "#111" : "#f1f1f1";
  document.body.style.color = oscuro ? "#eee" : "#222";
  document.querySelectorAll(".empresa, .configuracion, .moneda, .cripto").forEach(el => {
    el.style.backgroundColor = oscuro ? "#1c1c1c" : "#ffffff";
    el.style.color = oscuro ? "#eee" : "#222";
  });
});
