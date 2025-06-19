// ai.js

document.addEventListener("DOMContentLoaded", () => {
  const select = document.getElementById("pregunta-ia");
  const respuestaIA = document.getElementById("respuesta-ia");
  const cargando = document.getElementById("ia-cargando");

  // Preguntas predefinidas desde config.js
  if (window.preguntasIA && Array.isArray(window.preguntasIA)) {
    window.preguntasIA.forEach(p => {
      const option = document.createElement("option");
      option.value = p.query;
      option.textContent = p.texto;
      select.appendChild(option);
    });
  }

  // Manejar selección de pregunta
  select.addEventListener("change", async () => {
    const query = select.value;
    if (!query) return;

    cargando.style.display = "block";
    respuestaIA.textContent = "";

    try {
      const html = await fetchHTML(query);
      const valor = extraerValorDesdeHTML(html); // función simple o personalizada
      respuestaIA.innerHTML = `<strong>Resultado:</strong> ${valor}`;
      
      // (Opcional) Llama a generarGráfico si ya lo tienes implementado
      if (typeof generarGraficoIA === "function") {
        generarGraficoIA(valor); // o con más datos si extraes más info
      }

    } catch (error) {
      respuestaIA.textContent = "No se pudo interpretar respuesta.";
      console.error(error);
    } finally {
      cargando.style.display = "none";
    }
  });
});

// Simple extracción de número desde el HTML
function extraerValorDesdeHTML(html) {
  const regex = /\$?\s?(\d{1,3}(?:[.,]\d{3})*(?:[.,]\d{2}))/;
  const match = html.match(regex);
  return match ? match[1] : "No encontrado";
}
