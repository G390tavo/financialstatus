const empresas = [
  { nombre: "Apple Inc.", descripcion: "Fabricante de productos como el iPhone.", riesgo: "bajo" },
  { nombre: "Tesla Inc.", descripcion: "Autos eléctricos y energías limpias.", riesgo: "alto" },
  { nombre: "Microsoft Corp.", descripcion: "Desarrollador de software y servicios cloud.", riesgo: "medio" },
  { nombre: "Amazon.com", descripcion: "Gigante del comercio electrónico y AWS.", riesgo: "medio" },
  { nombre: "Google (Alphabet)", descripcion: "Buscador, YouTube, Android y más.", riesgo: "bajo" },
  { nombre: "Nvidia", descripcion: "Fabricante líder de chips gráficos (GPU).", riesgo: "medio" }
];

function mostrarEmpresas(lista = empresas) {
  const contenedor = document.getElementById("empresas-container");
  contenedor.innerHTML = "";
  lista.forEach(emp => {
    const card = document.createElement("div");
    card.className = "company-card";
    card.innerHTML = `
      <h3>${emp.nombre}</h3>
      <p>${emp.descripcion}</p>
      <p class="risk risk-${emp.riesgo}">Riesgo: ${emp.riesgo.charAt(0).toUpperCase() + emp.riesgo.slice(1)}</p>
    `;
    contenedor.appendChild(card);
  });
}

function buscarEmpresa() {
  const valor = document.getElementById("searchInput").value.toLowerCase();
  const filtradas = empresas.filter(emp => emp.nombre.toLowerCase().includes(valor));
  mostrarEmpresas(filtradas);
}

function showSection(id) {
  document.querySelectorAll(".content-section").forEach(sec => sec.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

// Simulación de datos de monedas
function mostrarGrafico() {
  const dias = parseInt(document.getElementById("dias").value);
  const datos = Array.from({ length: dias }, () => Math.random() * 100 + 1);
  const canvas = document.getElementById("graficoMoneda").getContext("2d");

  if (window.myChart) window.myChart.destroy();

  window.myChart = new Chart(canvas, {
    type: "line",
    data: {
      labels: Array.from({ length: dias }, (_, i) => `Día ${i + 1}`),
      datasets: [{
        label: "Precio estimado",
        data: datos,
        borderColor: "#1B5E20",
        fill: false,
        tension: 0.3
      }]
    }
  });
}

async function cargarIA() {
  const apiKey = "AIzaSyAju9sc_vfVAdVdRqVmKqPBfMEz8yOq0BI";
  const prompt = `
Eres un asesor de inversiones. Revisa estas empresas:
Apple, Tesla, Microsoft, Amazon, Google, Nvidia.
Clasifica una recomendación de inversión para:

1. Bajo riesgo
2. Medio riesgo
3. Alto riesgo

Explica por qué elegiste cada una y cuál es su potencial.
`;

  try {
    const respuesta = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" + apiKey, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
    });
    const datos = await respuesta.json();
    const output = datos.candidates?.[0]?.content?.parts?.[0]?.text || "No se pudo obtener respuesta.";
    document.getElementById("iaOutput").innerText = output;
  } catch (error) {
    document.getElementById("iaOutput").innerText = "No se pudo cargar la recomendación.";
    console.error(error);
  }
}

mostrarEmpresas();
mostrarGrafico();
cargarIA();
