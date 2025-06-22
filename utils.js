async function fetchHTML(url) {
  const proxy = "https://financial-proxy.onrender.com/?url=" + encodeURIComponent(url);

  try {
    const response = await fetch(proxy);
    if (!response.ok) throw new Error("Proxy no respondió");
    return await response.text();
  } catch {
    return null;
  }
}

function extraerPrecioGoogle(html) {
  const match = html.match(/<span[^>]*>(\d{1,3}(?:[.,]\d{3})*(?:[.,]\d+)?)(?:\s?[A-Z]{3})?<\/span>/i);
  return match ? match[1] : "No disponible";
}

function crearGrafico(canvas, datos) {
  const ctx = canvas.getContext("2d");
  new Chart(ctx, {
    type: "line",
    data: {
      labels: datos.map((_, i) => `T${i + 1}`),
      datasets: [{
        label: "Historial",
        data: datos,
        borderColor: "#39FF14",
        backgroundColor: "rgba(57, 255, 20, 0.2)",
        borderWidth: 2,
        pointRadius: 4,
        fill: true,
        tension: 0.3
      }]
    },
    options: {
      responsive: true,
      plugins: { legend: { display: false } },
      scales: {
        x: { display: false },
        y: { ticks: { color: "#39FF14" } }
      }
    }
  });
}

function generarHistorialSimulado(valorBase) {
  const historial = [];
  for (let i = 0; i < 10; i++) {
    const variacion = (Math.random() - 0.5) * 0.1;
    valorBase *= 1 + variacion;
    historial.push(parseFloat(valorBase.toFixed(2)));
  }
  return historial;
}

window.fetchHTML = fetchHTML;
window.extraerPrecioGoogle = extraerPrecioGoogle;
window.crearGrafico = crearGrafico;
window.generarHistorialSimulado = generarHistorialSimulado;
