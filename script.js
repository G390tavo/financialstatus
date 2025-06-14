function showSection(id) {
  document.querySelectorAll("section").forEach(s => s.style.display = "none");
  document.getElementById(id).style.display = "block";
}

function toggleDetails(card) {
  const details = card.querySelector(".details");
  if (details) {
    details.style.display = details.style.display === "block" ? "none" : "block";
  }
}

// Monedas y Cripto con gráficos de ejemplo

let monedaChart, criptoChart;

function updateMonedaChart() {
  const ctx = document.getElementById("monedaChart").getContext("2d");
  if (monedaChart) monedaChart.destroy();
  monedaChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: ["Inicio", "Medio", "Ahora"],
      datasets: [{
        label: "Valor en moneda seleccionada",
        data: [1, 1.2, 1.1],
        borderColor: "green",
        tension: 0.3
      }]
    }
  });
}

function updateCriptoChart() {
  const ctx = document.getElementById("criptoChart").getContext("2d");
  if (criptoChart) criptoChart.destroy();
  criptoChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: ["Inicio", "Medio", "Ahora"],
      datasets: [{
        label: "Valor en cripto seleccionada",
        data: [40000, 42000, 41000],
        borderColor: "darkgreen",
        tension: 0.3
      }]
    }
  });
}

// IA Gemini – Simulada por ahora
async function fetchIA() {
  const respuesta = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyAju9sc_vfVAdVdRqVmKqPBfMEz8yOq0BI", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: "¿Cuáles son las mejores 3 empresas para invertir hoy según el mercado actual?" }] }]
    })
  });
  const data = await respuesta.json();
  const texto = data?.candidates?.[0]?.content?.parts?.[0]?.text || "No se pudo cargar la recomendación.";
  document.getElementById("recomendacionIA").innerText = texto;
}

fetchIA();
