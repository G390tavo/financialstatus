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
  document.body.classList.toggle("dark", oscuro);
});

document.getElementById("preguntarIA").addEventListener("click", async () => {
  const pregunta = document.getElementById("inputIA").value;
  if (!pregunta) return;
  const respuesta = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": "Bearer TU_CLAVE_OPENAI", // Reemplaza si tienes clave
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: pregunta }]
    })
  }).then(r => r.json());
  document.getElementById("respuestaIA").textContent = respuesta.choices?.[0]?.message?.content || "Sin respuesta.";
});

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
  if (!moneda || !monedas[moneda]) return;

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
          fill: false
        }]
      },
      options: {
        responsive: true,
        animation: false,
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
    const dias = Array.from({ length: periodo === "7d" ? 7 : 30 }, (_, i) => `Día ${i + 1}`);
    const base = monedas[moneda];
    const datos = dias.map((_, i) => +(base * (0.98 + Math.random() * 0.04)).toFixed(3));
    chartMoneda = new Chart(ctx, {
      type: "line",
      data: {
        labels: dias,
        datasets: [{
          label: `1 ${CONFIG.monedaBase} en ${moneda}`,
          data: datos,
          borderColor: "green",
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
          fill: false
        }]
      },
      options: {
        responsive: true,
        animation: false,
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
    const dias = Array.from({ length: periodo === "7d" ? 7 : 30 }, (_, i) => `Día ${i + 1}`);
    const datos = dias.map(() => +(cripto.current_price * (0.9 + Math.random() * 0.2)).toFixed(2));
    chartCripto = new Chart(ctx, {
      type: "line",
      data: {
        labels: dias,
        datasets: [{
          label: `${cripto.name} en USD`,
          data: datos,
          borderColor: "#ff9800",
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
}
