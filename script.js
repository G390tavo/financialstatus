let chartMonedas = null, chartCriptos = null;

document.addEventListener("DOMContentLoaded", () => {
  mostrarSeccion('monedas');
  initMonedas();
  initCriptos();
  initEmpresas();
  initIA();
});

function alternarModoOscuro() {
  document.body.classList.toggle("dark-mode");
}

function mostrarSeccion(id) {
  document.querySelectorAll('.seccion').forEach(s => s.classList.remove('activa'));
  document.getElementById(id).classList.add('activa');
}

// === Monedas ===
async function initMonedas() {
  const sel = document.getElementById("monedaSelect");
  sel.addEventListener("change", async () => {
    const id = sel.value;
    const datos = await fetchMonedaTimeserie(id);
    renderGrafico("graficoMonedas", datos.labels, datos.values, chartMonedas);
  });
  const data = await fetch("https://api.exchangerate.host/latest");
  Object.keys(data.rates).slice(0, 30).forEach(m => {
    const o = document.createElement("option");
    o.value = m;
    o.textContent = m;
    sel.appendChild(o);
  });
  if (sel.value) {
    const d = await fetchMonedaTimeserie(sel.value);
    renderGrafico("graficoMonedas", d.labels, d.values, chartMonedas);
  }
}

async function fetchMonedaTimeserie(code) {
  try {
    const e = new Date();
    const s = e.getDate() - 7;
    const start = new Date(e.setDate(s)).toISOString().split("T")[0];
    const end = new Date().toISOString().split("T")[0];
    const res = await fetch(`https://api.exchangerate.host/timeseries?start_date=${start}&end_date=${end}&base=USD&symbols=${code}`);
    const j = await res.json();
    const labels = Object.keys(j.rates);
    const values = labels.map(d => j.rates[d][code]);
    return { labels, values };
  } catch {
    return { labels: [], values: [] };
  }
}

// === Criptos ===
async function initCriptos() {
  const sel = document.getElementById("criptoSelect");
  sel.addEventListener("change", async () => {
    const id = sel.value;
    const datos = await fetchCriptoTimeserie(id);
    renderGrafico("graficoCriptos", datos.labels, datos.values, chartCriptos);
  });
  const res = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=30");
  const arr = await res.json();
  arr.forEach(c => {
    const o = document.createElement("option");
    o.value = c.id;
    o.textContent = c.name;
    sel.appendChild(o);
  });
  if (sel.value) {
    const d = await fetchCriptoTimeserie(sel.value);
    renderGrafico("graficoCriptos", d.labels, d.values, chartCriptos);
  }
}

async function fetchCriptoTimeserie(id) {
  try {
    const res = await fetch(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=7`);
    const j = await res.json();
    const labels = j.prices.map(p => {
      const dt = new Date(p[0]);
      return `${dt.getDate()}/${dt.getMonth()+1}`;
    });
    const values = j.prices.map(p => p[1]);
    return { labels, values };
  } catch {
    return { labels: [], values: [] };
  }
}

// === Empresas ===
function initEmpresas() {
  const cont = document.getElementById("listaEmpresas");
  ["Apple","Microsoft","Google","Tesla","Meta","Amazon"].forEach(n => {
    const d = document.createElement("div");
    d.className = "empresa";
    d.textContent = n;
    cont.appendChild(d);
  });
}

// === Asistente IA ===
function initIA() {
  const sel = document.getElementById("preguntaIA");
  ["¿Cómo uso la app?","¿Qué puedo consultar?","¿De dónde vienen los datos?","¿Cómo navegar?"].forEach(t => {
    const o = document.createElement("option");
    o.textContent = t;
    o.value = t;
    sel.appendChild(o);
  });
}

function responderIA() {
  const q = document.getElementById("preguntaIA").value;
  const out = document.getElementById("respuestaIA");
  const map = {
    "¿Cómo uso la app?": "Selecciona una sección y un elemento para ver su gráfico.",
    "¿Qué puedo consultar?": "Monedas, criptomonedas y empresas en tiempo real.",
    "¿De dónde vienen los datos?": "Usamos CoinGecko y ExchangeRate.host.",
    "¿Cómo navegar?": "Usa el menú superior para cambiar de sección."
  };
  out.textContent = map[q] || "";
}

// === Renderización de Gráficos ===
function renderGrafico(canvasId, labels, data, chartRef) {
  const ctx = document.getElementById(canvasId).getContext("2d");
  if (chartRef) chartRef.destroy();
  const chart = new Chart(ctx, {
    type: "line",
    data: { labels, datasets:[{ label: "Valor", data, borderColor:"green", fill:false }] },
    options:{ responsive:true, scales:{ x:{ticks:{autoSkip:true,maxTicksLimit:7}} } }
  });
  if (canvasId.includes("Monedas")) chartMonedas = chart;
  else if (canvasId.includes("Criptos")) chartCriptos = chart;
}
