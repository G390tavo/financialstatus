const companies = [
  {
    nombre: "Apple Inc.",
    descripcion: "Diseña y fabrica productos electrónicos como el iPhone, iPad, Mac y servicios como iCloud.",
    riesgo: "bajo"
  },
  {
    nombre: "Tesla Inc.",
    descripcion: "Líder en autos eléctricos, energías renovables y conducción autónoma.",
    riesgo: "alto"
  },
  {
    nombre: "Microsoft Corp.",
    descripcion: "Gigante del software y servicios en la nube con productos como Windows, Azure y Office.",
    riesgo: "medio"
  },
  {
    nombre: "Amazon.com",
    descripcion: "E‑commerce global con gran inversión en nube (AWS), IA y logística.",
    riesgo: "medio"
  },
  {
    nombre: "Nvidia Corp.",
    descripcion: "Diseña GPUs y chips especializados para juegos, IA y centros de datos.",
    riesgo: "medio"
  }
];

function mostrarEmpresas() {
  const cont = document.getElementById("listaEmpresas");
  cont.innerHTML = "";
  companies.forEach(emp => {
    const div = document.createElement("div");
    div.className = "company-card";
    div.onclick = () =>
      alert(`${emp.nombre}\n\nDescripción: ${emp.descripcion}\nRiesgo de inversión: ${emp.riesgo.toUpperCase()}`);
    div.innerHTML = `
      <h3>${emp.nombre}</h3>
      <p>${emp.descripcion}</p>
      <p class="risk risk-${emp.riesgo}">Riesgo: ${emp.riesgo}</p>
    `;
    cont.appendChild(div);
  });
}

let cryptoChart;

async function actualizarGrafico() {
  const moneda = document.getElementById("monedaSeleccionada").value.toLowerCase();
  const dias = document.getElementById("diasSeleccionados").value;
  const daysParam = dias === "real" ? 1 : dias;

  try {
    const resp = await fetch(
      `https://api.coingecko.com/api/v3/coins/${moneda}/market_chart?vs_currency=usd&days=${daysParam}`
    );
    const data = await resp.json();

    const labels = data.prices.map(p => new Date(p[0]).toLocaleTimeString());
    const precios = data.prices.map(p => p[1]);

    const ctx = document.getElementById("graficoMoneda").getContext("2d");
    if (cryptoChart) cryptoChart.destroy();
    cryptoChart = new Chart(ctx, {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            label: `${moneda.toUpperCase()} (USD)`,
            data: precios,
            borderColor: "#388E3C",
            fill: false
          }
        ]
      },
      options: {
        responsive: true,
        animation: false,
        scales: {
          x: { ticks: { maxTicksLimit: 10 } }
        }
      }
    });
  } catch (err) {
    console.error("Error cargando gráfico:", err);
    alert("No se pudo cargar el gráfico de moneda.");
  }
}

async function cargarIA() {
  const apiKey = "AIzaSyAju9sc_vfVAdVdRqVmKqPBfMEz8yOq0BI";
  const prompt = `Analiza el mercado actual y sugiere 3 empresas para invertir clasificadas por riesgo (bajo, medio, alto). Da una explicación breve de cada una y por qué es buena inversión ahora.`;

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }]
            }
          ]
        })
      }
    );

    if (res.ok) {
      const json = await res.json();
      const texto = json.candidates[0].content.parts[0].text;
      document.getElementById("recomendacionTexto").innerText = texto;
    } else {
      document.getElementById("recomendacionTexto").innerText = "Error: " + res.statusText;
    }
  } catch (e) {
    document.getElementById("recomendacionTexto").innerText = "Error al conectar con Gemini.";
  }
}

function mostrarSeccion(id) {
  document.querySelectorAll(".seccion").forEach(s => (s.style.display = "none"));
  document.getElementById(id).style.display = "block";
}

document.addEventListener("DOMContentLoaded", () => {
  mostrarEmpresas();
  actualizarGrafico();
  cargarIA();
  document.getElementById("monedaSeleccionada").onchange = actualizarGrafico;
  document.getElementById("diasSeleccionados").onchange = actualizarGrafico;

  // Actualización automática cada minuto para vista "real"
  setInterval(() => {
    if (document.getElementById("diasSeleccionados").value === "real") {
      actualizarGrafico();
    }
  }, 60000);
});
