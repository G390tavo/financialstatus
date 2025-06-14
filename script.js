let isDark = false;

function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
  isDark = !isDark;
}

function toggleMenu() {
  const menu = document.getElementById("sideMenu");
  menu.style.display = (menu.style.display === "none" ? "block" : "none");
}

function showSection(id) {
  ['empresas', 'monedas', 'criptos', 'config'].forEach(sec => {
    document.getElementById(sec).style.display = (sec === id ? "block" : "none");
  });
}

// Empresas
const empresas = [
  { nombre: "Apple", descripcion: "Tecnología, iPhones y más", riesgo: "Bajo" },
  { nombre: "Tesla", descripcion: "Autos eléctricos, energía", riesgo: "Alto" },
  { nombre: "Amazon", descripcion: "Comercio electrónico global", riesgo: "Medio" }
];

function renderEmpresas() {
  const container = document.getElementById("company-container");
  container.innerHTML = "";
  empresas.forEach(e => {
    const div = document.createElement("div");
    div.innerHTML = `<h3>${e.nombre}</h3><p>${e.descripcion}</p><p>Riesgo: ${e.riesgo}</p>`;
    container.appendChild(div);
  });
}

renderEmpresas();

// API de monedas
async function updateCurrencyChart() {
  const selected = document.getElementById("currencySelect").value;
  const res = await fetch(`https://api.exchangerate.host/timeseries?start_date=2025-06-01&end_date=2025-06-13&base=${selected}&symbols=PEN`);
  const data = await res.json();
  const dates = Object.keys(data.rates);
  const values = dates.map(d => data.rates[d].PEN);
  renderChart("currencyChart", dates, values, `${selected} a PEN`);
}

// API de cripto
async function updateCryptoChart() {
  const selected = document.getElementById("cryptoSelect").value;
  const res = await fetch(`https://api.coingecko.com/api/v3/coins/${selected}/market_chart?vs_currency=usd&days=7`);
  const data = await res.json();
  const dates = data.prices.map(p => new Date(p[0]).toLocaleDateString());
  const values = data.prices.map(p => p[1]);
  renderChart("cryptoChart", dates, values, selected);
}

function renderChart(id, labels, values, label) {
  const ctx = document.getElementById(id).getContext('2d');
  new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [{
        label,
        data: values,
        borderColor: 'green',
        backgroundColor: 'rgba(0,255,0,0.2)',
      }]
    },
    options: {
      responsive: true
    }
  });
}