let chartMonedas = null;
let chartCriptos = null;

document.addEventListener("DOMContentLoaded", async () => {
  await cargarMonedas();
  await cargarCriptomonedas();
  await cargarEmpresas();
  activarBotonesIA();
  mostrarSeccion('inicio');
});

// ========== SECCIONES ==========
function mostrarSeccion(id) {
  document.querySelectorAll('.seccion').forEach(sec => {
    sec.classList.remove('activa');
  });
  document.getElementById(id).classList.add('activa');
}

// ========== MONEDAS ==========
async function cargarMonedas() {
  try {
    const res = await fetch("https://api.exchangerate.host/latest");
    const data = await res.json();

    const monedas = Object.keys(data.rates);
    const select = document.getElementById("monedaSelect");

    monedas.forEach(moneda => {
      const option = document.createElement("option");
      option.value = moneda;
      option.textContent = moneda;
      select.appendChild(option);
    });

    select.addEventListener("change", async () => {
      const moneda = select.value;
      const datos = await obtenerDatosMoneda(moneda);
      renderizarGrafico("graficoMonedas", datos.labels, datos.valores, 'moneda');
    });

  } catch (e) {
    console.error("Error cargando monedas:", e);
  }
}

async function obtenerDatosMoneda(moneda) {
  try {
    const res = await fetch(`https://api.exchangerate.host/timeseries?start_date=2024-06-01&end_date=2024-06-15&base=${moneda}&symbols=USD`);
    const data = await res.json();

    const labels = Object.keys(data.rates);
    const valores = labels.map(fecha => data.rates[fecha].USD);

    return { labels, valores };
  } catch (e) {
    console.error("Error obteniendo datos de moneda:", e);
    return { labels: [], valores: [] };
  }
}

// ========== CRIPTOMONEDAS ==========
async function cargarCriptomonedas() {
  try {
    const res = await fetch("https://api.coingecko.com/api/v3/coins/list");
    const monedas = await res.json();
    const select = document.getElementById("criptoSelect");

    monedas.slice(0, 50).forEach(moneda => {
      const option = document.createElement("option");
      option.value = moneda.id;
      option.textContent = moneda.name;
      select.appendChild(option);
    });

    select.addEventListener("change", async () => {
      const criptoId = select.value;
      const datos = await obtenerDatosCripto(criptoId);
      renderizarGrafico("graficoCriptos", datos.labels, datos.valores, 'cripto');
    });

  } catch (e) {
    console.error("Error cargando criptomonedas:", e);
  }
}

async function obtenerDatosCripto(id) {
  try {
    const res = await fetch(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=7`);
    const data = await res.json();

    const labels = data.prices.map(p => {
      const fecha = new Date(p[0]);
      return `${fecha.getDate()}/${fecha.getMonth() + 1}`;
    });
    const valores = data.prices.map(p => p[1]);

    return { labels, valores };
  } catch (e) {
    console.error("Error obteniendo datos de cripto:", e);
    return { labels: [], valores: [] };
  }
}

// ========== GRAFICOS ==========
function renderizarGrafico(canvasId, labels, datos, tipo) {
  const ctx = document.getElementById(canvasId).getContext("2d");

  if (tipo === 'moneda' && chartMonedas) {
    chartMonedas.destroy();
  }
  if (tipo === 'cripto' && chartCriptos) {
    chartCriptos.destroy();
  }

  const chart = new Chart(ctx, {
    type: "line",
    data: {
      labels,
      datasets: [{
        label: "Valor en USD",
        data: datos,
        borderColor: "green",
        backgroundColor: "rgba(0,255,0,0.1)",
        tension: 0.3
      }]
    },
    options: {
      responsive: true,
      scales: {
        x: {
          ticks: { autoSkip: true, maxTicksLimit: 10 }
        }
      }
    }
  });

  if (tipo === 'moneda') chartMonedas = chart;
  if (tipo === 'cripto') chartCriptos = chart;
}

// ========== EMPRESAS ==========
async function cargarEmpresas() {
  const empresas = [
    { nombre: "Apple", pais: "USA", sector: "Tecnología", valor: "$3T" },
    { nombre: "Microsoft", pais: "USA", sector: "Tecnología", valor: "$2.8T" },
    { nombre: "Alphabet", pais: "USA", sector: "Tecnología", valor: "$1.9T" }
  ];

  const contenedor = document.getElementById("listaEmpresas");
  contenedor.innerHTML = "";

  empresas.forEach(e => {
    const div = document.createElement("div");
    div.className = "empresa";
    div.innerHTML = `
      <strong>${e.nombre}</strong><br>
      País: ${e.pais}<br>
      Sector: ${e.sector}<br>
      Valor de mercado: ${e.valor}
    `;
    contenedor.appendChild(div);
  });
}

// ========== MODO OSCURO ==========
function alternarModoOscuro() {
  document.body.classList.toggle("dark-mode");
}

// ========== ASISTENTE IA ==========
function activarBotonesIA() {
  document.querySelectorAll(".botonesIA button").forEach(btn => {
    btn.addEventListener("click", () => {
      const respuesta = btn.dataset.respuesta;
      document.getElementById("respuestaIA").textContent = respuesta;
    });
  });
}
