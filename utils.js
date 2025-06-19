// Función para hacer fetch con proxy local (asegúrate de tener proxy.js corriendo)
async function fetchHTML(url) {
  const proxyBase = "http://localhost:3000/fetch?url=";
  const fullUrl = proxyBase + encodeURIComponent(url);
  const resp = await fetch(fullUrl);
  if (!resp.ok) throw new Error("Error al obtener datos");
  return await resp.text();
}

// Mostrar mensaje de error general (puedes adaptar o eliminar si no quieres alertas)
function mostrarError(mensaje) {
  alert(mensaje);
}

// Función para mostrar gráfico con Chart.js
function mostrarGrafico(item) {
  const ctx = document.getElementById("grafico").getContext("2d");

  // Simular historial 7 días con variación coherente al cambio
  const base = item.valorActual || 100;
  const dataHistorial = [];
  for (let i = 1; i <= 7; i++) {
    const variacion = base * (0.9 + Math.random() * 0.2);
    dataHistorial.push({ x: `Día ${i}`, y: Number(variacion.toFixed(2)) });
  }

  const labels = dataHistorial.map(d => d.x);
  const valores = dataHistorial.map(d => d.y);

  // Destruir gráfico previo
  if (window.myChart) window.myChart.destroy();

  window.myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [{
        label: `${item.nombre} (Últimos 7 días)`,
        data: valores,
        borderColor: "#39FF14",
        backgroundColor: "rgba(57, 255, 20, 0.2)",
        fill: true,
        tension: 0.3,
        pointRadius: 4,
        pointBackgroundColor: "#39FF14",
        pointHoverRadius: 6
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: true },
        tooltip: { enabled: true }
      },
      scales: {
        y: { beginAtZero: false, ticks: { color: "#39FF14" } },
        x: { ticks: { color: "#39FF14" } }
      }
    }
  });
}
