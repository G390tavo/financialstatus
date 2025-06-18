document.addEventListener("DOMContentLoaded", () => {
  const sel = document.getElementById("preguntas");
  const resp = document.getElementById("respuesta-ia");
  const canvas = document.getElementById("grafico-ia");

  sel.addEventListener("change", async () => {
    const q = sel.value;
    if (!q) return;
    resp.innerText = "🔍 Buscando...";
    const val = await fetchValor(q);
    if (!val) {
      mostrarError("❌ No se pudo obtener datos. Revisa tu conexión.", resp);
      Chart.getChart(canvas)?.destroy();
      return;
    }
    resp.innerHTML = `💡 ${q}: <strong>${val}</strong>`;
    renderGrafico(canvas, val);
  });
});

function renderGrafico(canvas, valActual) {
  Chart.getChart(canvas)?.destroy();

  const values = Array.from({ length: 7 }, (_, i) => {
    const base = parseFloat(valActual.replace(',', '.'));
    return (base + (Math.random() - 0.5) * base * 0.1).toFixed(2);
  });

  new Chart(canvas.getContext("2d"), {
    type: "line",
    data: {
      labels: ["6d", "5d", "4d", "3d", "2d", "1d", "Hoy"],
      datasets: [{
        label: "Tendencia",
        data: values,
        borderColor: "#00ff44",
        backgroundColor: "#007d32",
        fill: false,
        tension: 0.3
      }]
    }
  });
}
