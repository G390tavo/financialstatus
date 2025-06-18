// ai.js

document.addEventListener("DOMContentLoaded", () => {
  const select = document.getElementById("pregunta-ia");
  const respuestaIA = document.getElementById("respuesta-ia");
  const cargando = document.getElementById("ia-cargando");

  // Cargar preguntas
  preguntasIA.forEach(pregunta => {
    const option = document.createElement("option");
    option.value = pregunta;
    option.textContent = pregunta;
    select.appendChild(option);
  });

  // Mostrar introducción
  respuestaIA.innerHTML = "<p>Selecciona una pregunta para comenzar.</p>";

  // Escuchar cambios
  select.addEventListener("change", async () => {
    const pregunta = select.value;
    if (!pregunta) return;

    cargando.style.display = "block";
    respuestaIA.innerHTML = "";

    try {
      const html = await fetchHTML(pregunta);
      const resultado = extraerRespuesta(html);
      if (resultado) {
        respuestaIA.innerHTML = `<p>${resultado}</p>`;
        if (pregunta.toLowerCase().includes("bitcoin")) {
          // también graficar automáticamente si es una pregunta de valor
          obtenerDatosYGraficar("Bitcoin", "cripto");
        }
      } else {
        respuestaIA.innerHTML = "<p>No se pudo interpretar respuesta.</p>";
      }
    } catch (err) {
      mostrarError(err.message);
    } finally {
      cargando.style.display = "none";
    }
  });
});

// Extraer contenido simplificado desde HTML crudo
function extraerRespuesta(html) {
  const match = html.match(/(\d+[.,]?\d*)\s?(USD|EUR|\$|dólares?|euros?)/i);
  return match ? `Valor aproximado: ${match[0]}` : null;
}
