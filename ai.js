document.addEventListener("DOMContentLoaded", () => {
  const preguntaSelect = document.getElementById("pregunta-ia");
  const respuestaIA = document.getElementById("respuesta-ia");
  const cargandoIA = document.getElementById("ia-cargando");

  // Introducción automática
  const intro = document.createElement("p");
  intro.textContent = "Bienvenido. Selecciona una pregunta para comenzar.";
  respuestaIA.appendChild(intro);

  // Cargar preguntas desde config.js
  if (window.config && config.preguntasIA) {
    config.preguntasIA.forEach(preg => {
      const option = document.createElement("option");
      option.value = preg.valor;
      option.textContent = preg.texto;
      preguntaSelect.appendChild(option);
    });
  }

  // Evento: Seleccionar pregunta
  preguntaSelect.addEventListener("change", async () => {
    const pregunta = preguntaSelect.value;
    if (!pregunta) return;

    respuestaIA.innerHTML = "";
    cargandoIA.style.display = "block";

    try {
      const url = `https://www.google.com/search?q=${encodeURIComponent(pregunta)}`;
      const html = await fetchHTML(url);
      const match = html.match(/[\$€S/]*\s?(\d{1,3}(?:[.,]\d{3})*(?:[.,]\d{1,2}))/);

      cargandoIA.style.display = "none";

      if (match && match[1]) {
        const valor = match[1];
        const respuesta = document.createElement("p");
        respuesta.textContent = `El valor actual aproximado es: ${valor}`;
        respuestaIA.appendChild(respuesta);

        // Mostrar gráfico simulado
        const grafico = document.createElement("div");
        grafico.textContent = `📈 (Aquí iría un gráfico del valor ${valor})`;
        grafico.className = "grafico-ia";
        respuestaIA.appendChild(grafico);
      } else {
        throw new Error("No se pudo interpretar respuesta.");
      }

    } catch (err) {
      cargandoIA.style.display = "none";
      const error = document.createElement("p");
      error.textContent = "⚠ No se pudo obtener datos en tiempo real. Verifica tu conexión o intenta más tarde.";
      respuestaIA.appendChild(error);
      console.error("Error IA:", err);
    }
  });
});
