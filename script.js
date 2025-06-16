document.addEventListener("DOMContentLoaded", async () => {
  const loader = document.getElementById("loader");
  loader.style.display = "none";

  document.getElementById("modoOscuro").addEventListener("change", toggleModoOscuro);
  document.getElementById("preguntasIA").addEventListener("change", () => {
    document.getElementById("respuestaIA").textContent = "";
  });

  await cargarEmpresas();
  await cargarMonedas();
  await cargarCriptos();
  cargarNoticias();
});

function mostrarVista(id) {
  document.querySelectorAll(".seccion").forEach(seccion => {
    seccion.style.display = "none";
  });
  document.getElementById(id).style.display = "block";
}

function toggleModoOscuro() {
  document.body.classList.toggle("oscuro");
}

async function cargarEmpresas() {
  const empresas = [
    { nombre: "Apple", descripcion: "Empresa tecnológica estadounidense conocida por el iPhone, Mac, iPad y servicios digitales.", sector: "Tecnología", pais: "EE.UU.", valor: "$607.15" },
    { nombre: "Microsoft", descripcion: "Corporación multinacional de software, responsable del sistema operativo Windows.", sector: "Tecnología", pais: "EE.UU.", valor: "$422.31" },
    { nombre: "Tesla", descripcion: "Empresa automotriz y energética especializada en vehículos eléctricos y energía renovable.", sector: "Automotriz", pais: "EE.UU.", valor: "$183.17" },
  ];
  const contenedor = document.getElementById("listaEmpresas");
  contenedor.innerHTML = "";
  empresas.forEach(e => {
    contenedor.innerHTML += `
      <div class="empresa">
        <h3>${e.nombre}</h3>
        <p>${e.descripcion}</p>
        <p><strong>Sector:</strong> ${e.sector} | <strong>País:</strong> ${e.pais}</p>
        <p><strong>Valor actual:</strong> ${e.valor}</p>
      </div>`;
  });
}

async function cargarMonedas() {
  try {
    const res = await fetch("https://api.exchangerate.host/latest?base=USD");
    const data = await res.json();
    if (!data.rates) throw new Error("Sin datos");
    const selector = document.getElementById("selectorMoneda");
    selector.innerHTML = "";
    Object.keys(data.rates).slice(0, 10).forEach(moneda => {
      const option = document.createElement("option");
      option.value = moneda;
      option.textContent = moneda;
      selector.appendChild(option);
    });
    selector.addEventListener("change", actualizarGraficoMoneda);
    document.getElementById("selectorTiempoMoneda").addEventListener("change", actualizarGraficoMoneda);
    actualizarGraficoMoneda();
  } catch (error) {
    usarFuenteAlternaMonedas();
  }
}

function usarFuenteAlternaMonedas() {
  const selector = document.getElementById("selectorMoneda");
  const monedasFicticias = ["USD", "EUR", "PEN", "JPY", "GBP"];
  selector.innerHTML = "";
  monedasFicticias.forEach(m => {
    const option = document.createElement("option");
    option.value = m;
    option.textContent = m + " (estimado)";
    selector.appendChild(option);
  });
}

async function actualizarGraficoMoneda() {
  const moneda = document.getElementById("selectorMoneda").value;
  const tiempo = document.getElementById("selectorTiempoMoneda").value;
  if (!moneda) return;
  const dias = tiempo === "1d" ? 1 : tiempo === "7d" ? 7 : tiempo === "30d" ? 30 : 5;

  const res = await fetch(`https://api.exchangerate.host/timeseries?base=USD&symbols=${moneda}&start_date=${obtenerFechaInicio(dias)}&end_date=${obtenerFechaHoy()}`);
  const data = await res.json();
  const labels = Object.keys(data.rates);
  const valores = labels.map(fecha => data.rates[fecha][moneda]);

  renderizarGrafico("graficoMoneda", labels, valores, `Historial de ${moneda}`);
}

async function cargarCriptos() {
  try {
    const res = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd");
    const criptos = await res.json();
    const selector = document.getElementById("selectorCripto");
    selector.innerHTML = "";
    criptos.slice(0, 10).forEach(cripto => {
      const option = document.createElement("option");
      option.value = cripto.id;
      option.textContent = cripto.name;
      selector.appendChild(option);
    });
    selector.addEventListener("change", actualizarGraficoCripto);
    document.getElementById("selectorTiempoCripto").addEventListener("change", actualizarGraficoCripto);
    actualizarGraficoCripto();
  } catch (error) {
    usarFuenteAlternaCripto();
  }
}

function usarFuenteAlternaCripto() {
  const selector = document.getElementById("selectorCripto");
  selector.innerHTML = `<option value="bitcoin">Bitcoin (estimado)</option>`;
}

async function actualizarGraficoCripto() {
  const cripto = document.getElementById("selectorCripto").value;
  const tiempo = document.getElementById("selectorTiempoCripto").value;
  if (!cripto) return;

  const dias = tiempo === "1d" ? 1 : tiempo === "7d" ? 7 : tiempo === "30d" ? 30 : 5;

  const res = await fetch(`https://api.coingecko.com/api/v3/coins/${cripto}/market_chart?vs_currency=usd&days=${dias}`);
  const data = await res.json();
  const labels = data.prices.map(p => new Date(p[0]).toLocaleDateString());
  const valores = data.prices.map(p => p[1]);

  renderizarGrafico("graficoCripto", labels, valores, `Precio de ${cripto}`);
}

function renderizarGrafico(canvasId, etiquetas, valores, titulo) {
  const ctx = document.getElementById(canvasId).getContext("2d");
  if (window[canvasId]) window[canvasId].destroy();
  window[canvasId] = new Chart(ctx, {
    type: 'line',
    data: {
      labels: etiquetas,
      datasets: [{
        label: titulo,
        data: valores,
        borderColor: 'green',
        fill: false,
        tension: 0.1
      }]
    },
    options: {
      responsive: true,
      plugins: {
        tooltip: {
          callbacks: {
            label: (context) => `Precio: $${context.parsed.y.toFixed(2)}`
          }
        }
      },
      scales: {
        x: {
          display: true,
          title: { display: true, text: "Fecha" }
        },
        y: {
          display: true,
          title: { display: true, text: "Valor" }
        }
      }
    }
  });
}

function obtenerFechaHoy() {
  return new Date().toISOString().split("T")[0];
}

function obtenerFechaInicio(dias) {
  const fecha = new Date();
  fecha.setDate(fecha.getDate() - dias);
  return fecha.toISOString().split("T")[0];
}

function responderIA() {
  const pregunta = document.getElementById("preguntasIA").value;
  const respuestaDiv = document.getElementById("respuestaIA");
  const respuestas = {
    tutorial: "Para usar la aplicación, selecciona una sección en el menú (Empresas, Monedas, Criptomonedas). Luego elige una opción y espera a que se cargue el gráfico.",
    problemas: "Si los gráficos no cargan, revisa tu conexión o espera unos segundos. Si el problema persiste, reinicia la aplicación.",
    datos: "Los datos se obtienen de fuentes como CoinGecko y ExchangeRate.host. Si fallan, usamos estimaciones internas."
  };
  respuestaDiv.textContent = respuestas[pregunta] || "Selecciona una pregunta válida.";
}

function cargarNoticias() {
  const noticias = [
    { titulo: "Mercado bursátil sube por segundo día consecutivo", fuente: "Bloomberg" },
    { titulo: "Bitcoin alcanza nuevo máximo semanal", fuente: "CoinDesk" },
    { titulo: "La inflación en EE.UU. se modera", fuente: "Reuters" }
  ];
  const contenedor = document.getElementById("noticiasEconomicas");
  noticias.forEach(n => {
    contenedor.innerHTML += `
      <div class="noticia">
        <h4>${n.titulo}</h4>
        <p><strong>Fuente:</strong> ${n.fuente}</p>
      </div>`;
  });
}
