document.addEventListener("DOMContentLoaded", () => {
  const select = document.getElementById("pregunta-ia");
  const respuestaDiv = document.getElementById("respuesta-ia");
  const cargando = document.getElementById("ia-cargando");

  // Llenar preguntas desde config.js
  preguntasIA.forEach(p => {
    const option = document.createElement("option");
    option.value = p;
    option.textContent = p;
    select.appendChild(option);
  });

  select.addEventListener("change", async () => {
    const pregunta = select.value;
    if (!pregunta) return;

    respuestaDiv.innerHTML = "";
    cargando.style.display = "block";

    const html = await fetchHTML(pregunta);

    cargando.style.display = "none";

    if (!html) {
      respuestaDiv.textContent = "No se pudo obtener datos en tiempo real.";
      return;
    }

    const texto = limpiarTexto(html);
    respuestaDiv.textContent = texto;

    if (pregunta.toLowerCase().includes("gráfico") || pregunta.toLowerCase().includes("precio")) {
      const datos = generarDatosSimuladosSemana();

      const canvas = document.createElement("canvas");
      canvas.style.marginTop = "20px";
      canvas.style.maxHeight = "300px";
      respuestaDiv.appendChild(canvas);

      new Chart(canvas, {
        type: "line",
        data: {
          labels: datos.map(d => d.x),
          datasets: [{
            label: pregunta,
            data: datos.map(d => d.y),
            borderColor: "#39FF14",
            backgroundColor: "#39FF14",
            fill: false,
            tension: 0.4,
            pointRadius: 5
          }]
        },
        options: {
          plugins: {
            tooltip: {
              enabled: true
            },
            legend: {
              display: false
            }
          },
          responsive: true,
          scales: {
            y: {
              beginAtZero: false
            }
          }
        }
      });
    }
  });
});
