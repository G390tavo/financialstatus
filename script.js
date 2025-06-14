const companies = [
  { nombre: "Apple Inc.", descripcion: "Productos electrónicos", riesgo: "bajo" },
  { nombre: "Tesla Inc.", descripcion: "Autos eléctricos", riesgo: "alto" },
  { nombre: "Microsoft Corp.", descripcion: "Software y nube", riesgo: "medio" },
  { nombre: "Amazon.com", descripcion: "E‑commerce y AWS", riesgo: "medio" }
];

function mostrarEmpresas() {
  const cont = document.getElementById("listaEmpresas");
  cont.innerHTML = "";
  companies.forEach(emp => {
    const div = document.createElement("div");
    div.className = "company-card";
    div.onclick = () => alert(`${emp.nombre}\n${emp.descripcion}\nRiesgo: ${emp.riesgo}`);
    div.innerHTML = `<h3>${emp.nombre}</h3><p>${emp.descripcion}</p><p class="risk risk-${emp.riesgo}">Riesgo: ${emp.riesgo}</p>`;
    cont.appendChild(div);
  });
}

let cryptoChart;
async function actualizarGrafico() {
  const moneda = document.getElementById("monedaSeleccionada").value.toLowerCase();
  const dias = document.getElementById("diasSeleccionados").value;
  const daysParam = dias === "real" ? 1 : dias;
  const resp = await fetch(
    `https://api.coingecko.com/api/v3/coins/${moneda}/market_chart?vs_currency=usd&days=${daysParam}`
  );
  const data = await resp.json();
  const labels = data.prices.map(p => new Date(p[0]).toLocaleLocaleTimeString());
  const precios = data.prices.map(p => p[1]);
  const ctx = document.getElementById("graficoMoneda").getContext("2d");
  if (cryptoChart) cryptoChart.destroy();
  cryptoChart = new Chart(ctx, {
    type: "line",
    data: { labels, datasets: [{ label: `${moneda.toUpperCase()} (USD)`, data: precios, borderColor: "green", fill: false }] },
    options: { responsive: true }
  });
}

function mostrarSeccion(id) {
  document.querySelectorAll(".seccion").forEach(s => s.style.display = "none");
  document.getElementById(id).style.display = "block";
}

async function cargarIA() {
  const apiKey = "AIzaSyAju9sc_vfVAdVdRqVmKqPBfMEz8yOq0BI";
  const prompt = "Dame 3 inversiones: bajo, medio y alto riesgo con explicación.";
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
    }
  );
  if (res.ok) {
    const json = await res.json();
    document.getElementById("recomendacionTexto").innerText = json.candidates[0].content.parts[0].text;
  } else {
    document.getElementById("recomendacionTexto").innerText = "Error IA: " + res.statusText;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  mostrarEmpresas();
  actualizarGrafico();
  cargarIA();
  document.getElementById("monedaSeleccionada").onchange = actualizarGrafico;
  document.getElementById("diasSeleccionados").onchange = actualizarGrafico;
});
