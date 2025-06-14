// Cambia esto con tu propia clave
const GEMINI_API_KEY = "AIzaSyAju9sc_vfVAdVdRqVmKqPBfMEz8yOq0BI";

document.addEventListener("DOMContentLoaded", () => {
  mostrarEmpresas();
  obtenerRecomendacionIA();
  actualizarMoneda("moneda");
  actualizarMoneda("cripto");
});

function mostrarSeccion(id) {
  document.querySelectorAll(".section").forEach(s => s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

function mostrarEmpresas() {
  const empresas = [
    { nombre: "Apple Inc.", descripcion: "Diseña iPhones, Macs, servicios en la nube.", riesgo: "bajo" },
    { nombre: "Tesla Inc.", descripcion: "Autos eléctricos, energía solar.", riesgo: "alto" },
    { nombre: "Microsoft Corp.", descripcion: "Desarrolla Windows, Azure, IA.", riesgo: "medio" },
    { nombre: "Amazon", descripcion: "E-commerce global y servicios web (AWS).", riesgo: "medio" },
    { nombre: "NVIDIA", descripcion: "Líder en chips para IA y videojuegos.", riesgo: "bajo" },
  ];

  const contenedor = document.getElementById("empresas-container");
  contenedor.innerHTML = "";

  empresas.forEach(emp => {
    const div = document.createElement("div");
    div.className = "company-card";
    div.innerHTML = `<h3>${emp.nombre}</h3>
      <p>${emp.descripcion}</p>
      <p class="risk risk-${emp.riesgo}">Riesgo: ${emp.riesgo.charAt(0).toUpperCase() + emp.riesgo.slice(1)}</p>`;
    contenedor.appendChild(div);
  });
}

async function obtenerRecomendacionIA() {
  const endpoint = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" + GEMINI_API_KEY;

  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: "Dime la mejor inversión de bajo, medio y alto riesgo actualmente. Muestra explicación breve para cada una." }] }]
    })
  });

  const data = await response.json();
  const recomendacion = data?.candidates?.[0]?.content?.parts?.[0]?.text || "No se pudo cargar la recomendación.";
  document.getElementById("recomendacionIA").textContent = recomendacion;
}

async function actualizarMoneda(tipo) {
  const id = tipo === "cripto" ? document.getElementById("criptoSelect").value : document.getElementById("monedaSelect").value.toLowerCase();
  const url = tipo === "cripto"
    ? `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=30`
    : `https://api.exchangerate.host/timeseries?start_date=${obtenerFecha(30)}&end_date=${obtenerFecha(0)}&base=${id.toUpperCase()}&symbols=USD`;

  const res = await fetch(url);
  const data = await res.json();
  const precios = tipo === "cripto"
    ? data.prices.map(p => p[1])
    : Object.values(data.rates).map(v => Object.values(v)[0]);

  const labels = tipo === "cripto"
    ? data.prices.map(p => new Date(p[0]).toLocaleDateString())
    : Object.keys(data.rates);

  const ctx = document.getElementById(tipo === "cripto" ? "criptoChart" : "monedaChart").getContext("2d");
  new Chart(ctx, {
    type: "line",
    data: {
      labels,
      datasets: [{
        label: `Precio de ${id.toUpperCase()}`,
        data: precios,
        borderColor: "#1B5E20",
        backgroundColor: "#A8E6A1",
        tension: 0.3
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  });
}

function obtenerFecha(diasAtras) {
  const fecha = new Date();
  fecha.setDate(fecha.getDate() - diasAtras);
  return fecha.toISOString().split("T")[0];
}
