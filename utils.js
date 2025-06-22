async function fetchHTML(url) {
  const proxy = "https://financial-proxy.onrender.com/?url=" + encodeURIComponent(url);

  try {
    const response = await fetch(proxy);
    if (!response.ok) throw new Error("Respuesta no válida del proxy");
    return await response.text();
  } catch (e) {
    console.warn("Proxy falló. Intentando acceso directo...");
    try {
      const direct = await fetch(url);
      if (!direct.ok) throw new Error("Respuesta no válida directa");
      return await direct.text();
    } catch (err) {
      console.error("Error al obtener HTML:", err);
      return null;
    }
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
      plugins: {
        legend: { display: false }
      },
      scales: {
        x: { display: false },
        y: { ticks: { color: "#39FF14" } }
      }
    }
  });
}

window.fetchHTML = fetchHTML;
window.extraerPrecioGoogle = extraerPrecioGoogle;
window.crearGrafico = crearGrafico;
