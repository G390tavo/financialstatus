// Cargar empresas
async function cargarEmpresas() {
  const response = await fetch('https://financialmodelingprep.com/api/v3/stock/list?apikey=demo');
  const data = await response.json();
  const contenedor = document.getElementById("empresa-lista");
  contenedor.innerHTML = "";
  data.slice(0, 10).forEach(empresa => {
    const card = document.createElement("div");
    card.className = "empresa-card";
    card.innerHTML = `<h3>${empresa.name}</h3>
      <p>Símbolo: ${empresa.symbol}</p>
      <p>Precio: $${empresa.price}</p>
      <p>Sector: ${empresa.exchangeShortName}</p>`;
    contenedor.appendChild(card);
  });
}

function buscarEmpresa(valor) {
  const cards = document.querySelectorAll(".empresa-card");
  cards.forEach(card => {
    card.style.display = card.innerText.toLowerCase().includes(valor.toLowerCase()) ? "block" : "none";
  });
}

function mostrarSeccion(id) {
  document.querySelectorAll(".seccion").forEach(sec => sec.style.display = "none");
  document.getElementById(id).style.display = "block";
}

// Cargar monedas nacionales (simulado por ahora)
const monedas = ["USD", "EUR", "PEN"];
monedas.forEach(moneda => {
  const option = document.createElement("option");
  option.value = moneda;
  option.textContent = moneda;
  document.getElementById("moneda-select").appendChild(option);
});

// Cargar criptomonedas desde CoinGecko
async function cargarCriptos() {
  const response = await fetch('https://api.coingecko.com/api/v3/coins/list');
  const data = await response.json();
  const criptoSelect = document.getElementById("cripto-select");
  data.slice(0, 20).forEach(cripto => {
    const option = document.createElement("option");
    option.value = cripto.id;
    option.textContent = cripto.name;
    criptoSelect.appendChild(option);
  });
}

// Cargar gráfico de criptomoneda
async function cargarGraficoCripto() {
  const id = document.getElementById("cripto-select").value;
  const periodo = document.getElementById("cripto-periodo").value;
  const dias = periodo === "real" ? 1 : periodo;

  const res = await fetch(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${dias}`);
  const data = await res.json();
  const precios = data.prices.map(p => ({ x: new Date(p[0]), y: p[1] }));

  const ctx = document.getElementById("criptoChart").getContext("2d");
  if (window.criptoChart) window.criptoChart.destroy();
  window.criptoChart = new Chart(ctx, {
    type: "line",
    data: {
      datasets: [{
        label: "Precio USD",
        data: periodo === "real" ? [precios.at(-1)] : precios,
        borderColor: "#1b5e20"
      }]
    },
    options: {
      scales: {
        x: { type: "time", time: { unit: "day" } },
        y: { beginAtZero: false }
      }
    }
  });
}

// Cargar gráfico de moneda nacional (por ahora simulado)
function cargarGraficoMoneda() {
  const periodo = document.getElementById("moneda-periodo").value;
  const valores = Array.from({ length: periodo === "real" ? 1 : parseInt(periodo) }, (_, i) => ({
    x: new Date(Date.now() - i * 86400000),
    y: (Math.random() * 5 + 3).toFixed(2)
  }));

  const ctx = document.getElementById("monedaChart").getContext("2d");
  if (window.monedaChart) window.monedaChart.destroy();
  window.monedaChart = new Chart(ctx, {
    type: "line",
    data: {
      datasets: [{
        label: "Valor estimado (simulado)",
        data: valores.reverse(),
        borderColor: "#2e7d32"
      }]
    },
    options: {
      scales: {
        x: { type: "time", time: { unit: "day" } },
        y: { beginAtZero: false }
      }
    }
  });
}

// Cargar recomendaciones desde IA Gemini
async function cargarRecomendacionIA() {
  const key = "AIzaSyAju9sc_vfVAdVdRqVmKqPBfMEz8yOq0BI";
  const prompt = "Dame 3 recomendaciones de inversión: una de bajo, medio y alto riesgo según el mercado actual.";

  const res = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" + key, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
  });

  const data = await res.json();
  const texto = data.candidates?.[0]?.content?.parts?.[0]?.text || "No se pudo cargar la recomendación.";
  document.getElementById("recomendacion-texto").innerText = texto;
}

window.onload = () => {
  cargarEmpresas();
  cargarCriptos();
  cargarRecomendacionIA();
};
