function generarGrafico(canvasId, datos) {
  const ctx = document.getElementById(canvasId).getContext('2d');
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: ["Hace 6 días", "5 días", "4 días", "3 días", "2 días", "Ayer", "Hoy"],
      datasets: [{
        label: 'Valor',
        data: datos,
        borderColor: '#39FF14',
        backgroundColor: 'rgba(57, 255, 20, 0.1)',
        tension: 0.3
      }]
    },
    options: {
      plugins: { legend: { display: false } },
      scales: {
        x: { ticks: { color: '#ccc' } },
        y: { ticks: { color: '#ccc' } }
      }
    }
  });
}
