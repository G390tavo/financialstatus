window.addEventListener("load", () => {
  document.getElementById("loader").style.display = "none";
  mostrarTab("empresas");
  renderEmpresas();
  fetchMonedaChart();
  fetchCriptoChart();
});

function mostrarTab(tabId) {
  document.querySelectorAll(".tab").forEach(tab => tab.classList.add("hidden"));
  document.getElementById(tabId).classList.remove("hidden");
}

// Empresa info básica
function renderEmpresas() {
  const contenedor = document.getElementById("empresa-list");
  contenedor.innerHTML = "";

  const empresas = [
    { nombre: "Apple", simbolo: "AAPL", descripcion: "Tecnología y consumo." },
    { nombre: "Tesla", simbolo: "TSLA", descripcion: "Vehículos eléctricos e innovación." },
    { nombre: "Amazon", simbolo: "AMZN", descripcion: "Comercio electrónico y servicios web." }
  ];

  empresas.forEach(e => {
    const card = document.createElement("div");
    card.className = "empresa-card";
    card.innerHTML = `
      <h3>${e.nombre}</h3>
      <p><b>Símbolo:</b> ${e.simbolo}</p>
      <p>${e.descripcion}</p>
    `;
    contenedor.appendChild(card);
  });
}

// Gráfico de monedas nacionales
async function fetchMonedaChart() {
  try {
    const res = await fetch("https://api.exchangerate.host/timeseries?start_date=2024-06-07&end_date=2024-06-14&base=USD&symbols=PEN");
    const data = await res.json();
    const fechas = Object.keys(data.rates);
    const valores = fechas.map(f => data.rates[f].PEN);

    new Chart(document.getElementById("monedaChart"), {
      type: "line",
      data: {
        labels: fechas,
        datasets: [{
          label: "USD a PEN",
          data: valores,
          fill: false,
          borderColor: "#4caf50",
          tension: 0.3
        }]
      }
    });
  } catch (e) {
    console.error("Error cargando monedas:", e);
  }
}

// Gráfico de criptomonedas
async function fetchCriptoChart() {
  try {
    const res = await fetch("https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=7");
    const data = await res.json();
    const labels = data.prices.map(p => new Date(p[0]).toLocaleDateString());
    const precios = data.prices.map(p => p[1]);

    new Chart(document.getElementById("criptoChart"), {
      type: "line",
      data: {
        labels: labels,
        datasets: [{
          label: "Precio de Bitcoin (USD)",
          data: precios,
          fill: true,
          backgroundColor: "rgba(76, 175, 80, 0.2)",
          borderColor: "#4caf50",
          tension: 0.3
        }]
      }
    });
  } catch (e) {
    console.error("Error cargando cripto:", e);
  }
}
