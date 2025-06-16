document.addEventListener("DOMContentLoaded", async () => {
  mostrarVista("empresas");
  document.getElementById("modoOscuro").addEventListener("change", toggleModoOscuro);

  await cargarEmpresas();
  await cargarYMostrarMonedas();
  await cargarYMostrarCriptos();

  setTimeout(() => document.getElementById("loader").style.display = "none", 1000);
});

function mostrarVista(vistaId) {
  document.querySelectorAll(".seccion").forEach(seccion => {
    seccion.style.display = "none";
  });
  document.getElementById(vistaId).style.display = "block";
}

function toggleModoOscuro() {
  document.body.classList.toggle("oscuro");
}

// EMPRESAS
async function cargarEmpresas() {
  const empresas = ["Apple", "Google", "Amazon", "Tesla", "Microsoft", "Meta", "Samsung", "Intel", "IBM", "Nvidia"];
  const contenedor = document.getElementById("listaEmpresas");
  contenedor.innerHTML = "";

  for (let nombre of empresas) {
    const info = await obtenerEmpresaInfo(nombre);
    const div = document.createElement("div");
    div.className = "empresa";
    div.innerHTML = `
      <h3>${info.nombre}</h3>
      <p>${info.descripcion}</p>
      <small>Sector: ${info.sector} | País: ${info.pais}</small><br/>
      <strong>Valor actual: ${info.valorActual}</strong>
    `;
    contenedor.appendChild(div);
  }
}

// MONEDAS
let chartMoneda;

async function cargarYMostrarMonedas() {
  const datos = await obtenerMonedas();
  const selector = document.getElementById("selectorMoneda");
  selector.innerHTML = "";
  Object.keys(datos).forEach(moneda => {
    const option = document.createElement("option");
    option.value = moneda;
    option.textContent = moneda;
    selector.appendChild(option);
  });

  selector.addEventListener("change", actualizarGraficoMoneda);
  document.getElementById("selectorTiempoMoneda").addEventListener("change", actualizarGraficoMoneda);

  actualizarGraficoMoneda();
}

async function actualizarGraficoMoneda() {
  const moneda = document.getElementById("selectorMoneda").value;
  const periodo = document.getElementById("selectorTiempoMoneda").value;
  const ctx = document.getElementById("graficoMoneda").getContext("2d");

  if (chartMoneda) chartMoneda.destroy();

  let etiquetas = [];
  let datos = [];

  if (periodo === "real") {
    const valor = (await obtenerMonedas())[moneda];
    etiquetas = [new Date().toLocaleTimeString()];
    datos = [valor];
  } else {
    const dias = { "1d": 1, "7d": 7, "30d": 30 }[periodo];
    for (let i = dias - 1; i >= 0; i--) {
      const fecha = new Date();
      fecha.setDate(fecha.getDate() - i);
      etiquetas.push(fecha.toLocaleDateString());
      datos.push((Math.random() * (5 - 3) + 3).toFixed(2));
    }
  }

  chartMoneda = new Chart(ctx, {
    type: "line",
    data: {
      labels: etiquetas,
      datasets: [{
        label: `Valor de ${moneda}`,
        data: datos,
        borderColor: "green",
        tension: 0.3,
        pointRadius: 4,
        pointHoverRadius: 7
      }]
    },
    options: {
      responsive: true,
      plugins: {
        tooltip: {
          callbacks: {
            label: (ctx) => `Precio: ${ctx.raw}`
          }
        }
      },
      scales: {
        y: { beginAtZero: false }
      }
    }
  });
}

// CRIPTOS
let chartCripto;

async function cargarYMostrarCriptos() {
  const criptos = await obtenerCriptos();
  const selector = document.getElementById("selectorCripto");
  selector.innerHTML = "";

  criptos.forEach(cripto => {
    const option = document.createElement("option");
    option.value = cripto.id;
    option.textContent = cripto.name;
    selector.appendChild(option);
  });

  selector.addEventListener("change", actualizarGraficoCripto);
  document.getElementById("selectorTiempoCripto").addEventListener("change", actualizarGraficoCripto);

  actualizarGraficoCripto();
}

async function actualizarGraficoCripto() {
  const id = document.getElementById("selectorCripto").value;
  const periodo = document.getElementById("selectorTiempoCripto").value;
  const ctx = document.getElementById("graficoCripto").getContext("2d");

  if (chartCripto) chartCripto.destroy();

  let etiquetas = [];
  let datos = [];

  if (periodo === "real") {
    etiquetas = [new Date().toLocaleTimeString()];
    datos = [Math.random() * 1000 + 500];
  } else {
    const dias = { "1d": 1, "7d": 7, "30d": 30 }[periodo];
    for (let i = dias - 1; i >= 0; i--) {
      const fecha = new Date();
      fecha.setDate(fecha.getDate() - i);
      etiquetas.push(fecha.toLocaleDateString());
      datos.push((Math.random() * 1000 + 500).toFixed(2));
    }
  }

  chartCripto = new Chart(ctx, {
    type: "line",
    data: {
      labels: etiquetas,
      datasets: [{
        label: `Valor de ${id}`,
        data: datos,
        borderColor: "green",
        tension: 0.3,
        pointRadius: 4,
        pointHoverRadius: 7
      }]
    },
    options: {
      responsive: true,
      plugins: {
        tooltip: {
          callbacks: {
            label: (ctx) => `Precio: $${ctx.raw}`
          }
        }
      },
      scales: {
        y: { beginAtZero: false }
      }
    }
  });
}
