const proxy = "https://financial-proxy.onrender.com/?url=";

async function obtenerHTML(url) {
  try {
    const res = await fetch(proxy + encodeURIComponent(url));
    const texto = await res.text();
    const parser = new DOMParser();
    return parser.parseFromString(texto, "text/html");
  } catch (e) {
    console.error("Error al obtener HTML:", e);
    return null;
  }
}

function limpiarTexto(texto) {
  return texto?.replace(/\s+/g, " ").trim();
}

function mostrarGrafico(canvas, datos, etiquetas) {
  new Chart(canvas, {
    type: "line",
    data: {
      labels: etiquetas,
      datasets: [{
        label: "Valor",
        data: datos,
        borderColor: "#39FF14",
        backgroundColor: "rgba(57,255,20,0.2)",
        tension: 0.3,
        pointRadius: 3,
        pointHoverRadius: 6,
      }]
    },
    options: {
      responsive: true,
      plugins: {
        tooltip: {
          callbacks: {
            label: ctx => `Valor: ${ctx.formattedValue}`
          }
        },
        legend: { display: false }
      },
      scales: {
        x: { display: false },
        y: { ticks: { color: "#39FF14" } }
      }
    }
  });
}
