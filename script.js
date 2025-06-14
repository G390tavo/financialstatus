let empresas = [
  {
    nombre: "Apple Inc.",
    descripcion: "Fabricante de productos tecnológicos como iPhone, iPad, etc.",
    riesgo: "Bajo"
  },
  {
    nombre: "Tesla Inc.",
    descripcion: "Pionero en autos eléctricos y energías renovables.",
    riesgo: "Alto"
  },
  {
    nombre: "Microsoft Corp.",
    descripcion: "Desarrolla software como Windows y servicios en la nube.",
    riesgo: "Medio"
  }
  // Puedes agregar más empresas aquí
];

function mostrarSeccion(id) {
  document.querySelectorAll(".seccion").forEach(sec => sec.style.display = "none");
  document.getElementById(id).style.display = "block";
}

function cargarEmpresas() {
  const container = document.getElementById("empresas-container");
  empresas.forEach(emp => {
    let div = document.createElement("div");
    div.className = "company-card";
    div.innerHTML = `<h3>${emp.nombre}</h3><p>${emp.descripcion}</p><p class="risk risk-${emp.riesgo.toLowerCase()}">Riesgo: ${emp.riesgo}</p>`;
    container.appendChild(div);
  });
}

// GRÁFICOS
let graficoMonedas;
function actualizarGrafico() {
  const ctx = document.getElementById('grafico-monedas').getContext('2d');
  const dias = document.getElementById("periodo-select").value;

  if (graficoMonedas) graficoMonedas.destroy();

  let etiquetas = dias === "real" ? ["Ahora"] : Array.from({ length: parseInt(dias) }, (_, i) => `Día ${i + 1}`);
  let valores = etiquetas.map(() => Math.random() * 10 + 1); // Simulación

  graficoMonedas = new Chart(ctx, {
    type: 'line',
    data: {
      labels: etiquetas,
      datasets: [{
        label: 'Precio de moneda',
        data: valores,
        fill: false,
        borderColor: '#2E7D32',
        tension: 0.1
      }]
    }
  });
}

let graficoCripto;
function cargarGraficoCripto() {
  const ctx = document.getElementById('grafico-cripto').getContext('2d');
  if (graficoCripto) graficoCripto.destroy();

  graficoCripto = new Chart(ctx, {
    type: 'line',
    data: {
      labels: ["Ahora"],
      datasets: [{
        label: 'Bitcoin',
        data: [Math.random() * 20000 + 20000],
        borderColor: '#FF9800',
        fill: false
      }]
    }
  });
}

// GEMINI IA
async function obtenerRecomendacion() {
  const API_KEY = "AIzaSyAju9sc_vfVAdVdRqVmKqPBfMEz8yOq0BI";
  const url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" + API_KEY;

  const respuesta = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{
        parts: [{ text: "¿Cuál es la mejor empresa para invertir hoy y por qué?" }]
      }]
    })
  });

  const data = await respuesta.json();
  const texto = data?.candidates?.[0]?.content?.parts?.[0]?.text || "No se pudo obtener recomendación.";
  document.getElementById("respuesta-gemini").innerText = texto;
}

// INICIALIZAR
cargarEmpresas();
actualizarGrafico();
cargarGraficoCripto();
