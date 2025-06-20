// utils.js
const proxyURL = "https://financial-proxy.onrender.com/?url=";

async function fetchHTML(url) {
  try {
    const response = await fetch(proxyURL + encodeURIComponent(url));
    if (!response.ok) throw new Error("Proxy falló");
    return await response.text();
  } catch (proxyError) {
    console.warn("Proxy falló. Intentando acceso directo...");
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Acceso directo falló");
      return await response.text();
    } catch (directError) {
      console.error("Ambos métodos fallaron", directError);
      return null;
    }
  }
}

function parseValue(text) {
  const match = text.match(/[\d,.]+/);
  return match ? parseFloat(match[0].replace(",", "")) : null;
}

function obtenerValorDesdeHTML(html, selector) {
  const temp = document.createElement("div");
  temp.innerHTML = html;
  const el = temp.querySelector(selector);
  return el ? el.textContent.trim() : null;
}

function crearGrafico(canvas, datos) {
  const maxIndex = datos.historial.findIndex(
    v => v === Math.max(...datos.historial)
  );
  new Chart(canvas, {
    type: "line",
    data: {
      labels: datos.fechas,
      datasets: [{
        label: "Historial",
        data: datos.historial,
        borderColor: "#39FF14",
        backgroundColor: "rgba(57, 255, 20, 0.1)",
        pointBackgroundColor: datos.historial.map((_, i) => i === maxIndex ? "#39FF14" : "#ffffff"),
        pointRadius: datos.historial.map((_, i) => i === maxIndex ? 6 : 3),
        tension: 0.3,
      }]
    },
    options: {
      responsive: true,
      plugins: {
        tooltip: {
          callbacks: {
            title: ctx => `Fecha: ${ctx[0].label}`,
            label: ctx => `Valor: ${ctx.formattedValue}`
          }
        },
        legend: { display: false }
      },
      scales: {
        x: { ticks: { color: "#39FF14" } },
        y: { ticks: { color: "#39FF14" } }
      }
    }
  });
}
