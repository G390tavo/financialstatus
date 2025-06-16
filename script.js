let chartMonedas = null, chartCriptos = null;

document.addEventListener("DOMContentLoaded", () => {
  mostrarSeccion('monedas');
  initSeccionMonedas();
  initSeccionCriptos();
  initSeccionEmpresas();
  initSeccionAsistente();
});

function mostrarSeccion(id) {
  const sec = document.getElementById(id);
  if (!sec) return console.error("Sección no existe:", id);
  document.querySelectorAll('.seccion').forEach(s => s.classList.remove('activa'));
  sec.classList.add('activa');
}

function alternarModoOscuro() {
  document.body.classList.toggle("dark-mode");
}

// --- Monedas ---
async function initSeccionMonedas() {
  const sel = document.getElementById("monedaSelect");
  sel.addEventListener("change", () => cargarMoneda(sel.value));
  try {
    const res = await fetch("https://api.exchangerate.host/latest");
    const data = await res.json();
    if (!data || !data.rates) throw new Error("API sin rates");
    Object.keys(data.rates).slice(0, 20).forEach(m => {
      const o = document.createElement("option");
      o.value = m; o.textContent = m;
      sel.appendChild(o);
    });
    if (sel.value) cargarMoneda(sel.value);
  } catch (e) { console.error("Error en initMonedas:", e); }
}

async function cargarMoneda(codigo) {
  try {
    const hoy = new Date(), inicio = new Date(hoy); inicio.setDate(hoy.getDate()-7);
    const s = inicio.toISOString().split("T")[0], e = hoy.toISOString().split("T")[0];
    const res = await fetch(`https://api.exchangerate.host/timeseries?start_date=${s}&end_date=${e}&base=USD&symbols=${codigo}`);
    const d = await res.json();
    if (!d.rates) throw new Error("No rates");
    const labels = Object.keys(d.rates), values = labels.map(f => d.rates[f][codigo]);
    renderGrafico("graficoMonedas", labels, values, chartMonedas);
  } catch (e) { console.error("Error cargarMoneda:", e); }
}

// --- Criptos ---
async function initSeccionCriptos() {
  const sel = document.getElementById("criptoSelect");
  sel.addEventListener("change", () => cargarCripto(sel.value));
  try {
    const res = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=20");
    const arr = await res.json();
    arr.forEach(c => {
      const o = document.createElement("option");
      o.value = c.id; o.textContent = c.name;
      sel.appendChild(o);
    });
    if (sel.value) cargarCripto(sel.value);
  } catch (e) { console.error("Error initCriptos:", e); }
}

async function cargarCripto(id) {
  try {
    const res = await fetch(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=7`);
    const d = await res.json();
    if (!d.prices) throw new Error("No prices");
    const labels = d.prices.map(p => new Date(p[0]).toLocaleDateString());
    const values = d.prices.map(p => p[1]);
    renderGrafico("graficoCriptos", labels, values, chartCriptos);
  } catch (e) { console.error("Error cargarCripto:", e); }
}

// --- Empresas ---
function initSeccionEmpresas() {
  const div = document.getElementById("listaEmpresas");
  ["Apple","Microsoft","Google","Amazon","Tesla","Meta"].forEach(n => {
    const d = document.createElement("div");
    d.className = "empresa"; d.textContent = n;
    div.appendChild(d);
  });
}

// --- IA ---
function initSeccionAsistente() {
  const sel = document.getElementById("preguntaIA");
  ["¿Cómo uso la app?","¿Qué se consulta?","¿De dónde vienen los datos?","¿Navegación?"].forEach(q => {
    const o = document.createElement("option");
    o.value = q; o.textContent = q;
    sel.appendChild(o);
  });
}
function responderIA() {
  const q = document.getElementById("preguntaIA").value;
  const mapa = {
    "¿Cómo uso la app?": "Selecciona sección y luego un valor para ver gráficos.",
    "¿Qué se consulta?": "Monedas, criptomonedas y empresas en tiempo real.",
    "¿De dónde vienen los datos?": "Usamos CoinGecko y ExchangeRate.host.",
    "¿Navegación?": "Haz clic en los botones del menú para cambiar secciones."
  };
  document.getElementById("respuestaIA").textContent = mapa[q] || "";
}

// --- Render Gráfico ---
function renderGrafico(canvasId, labels, data, refChart) {
  const ctx = document.getElementById(canvasId).getContext("2d");
  if (refChart) refChart.destroy();
  const chart = new Chart(ctx, {
    type: "line",
    data: { labels, datasets: [{label:"Valor",data, borderColor:"green", fill:false}] },
    options:{ responsive:true, scales:{x:{ ticks:{autoSkip:true,maxTicksLimit:6}}} }
  });
  if (canvasId=="graficoMonedas") chartMonedas = chart;
  else chartCriptos = chart;
}
