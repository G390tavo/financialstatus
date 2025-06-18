document.addEventListener("DOMContentLoaded", () => {
  const select = document.getElementById("pregunta-ia");
  const respuestaDiv = document.getElementById("respuesta-ia");
  const cargando = document.getElementById("ia-cargando");

  // Cargar preguntas desde config.js
  preguntasIA.forEach(p => {
    const opcion = document.createElement("option");
    opcion.textContent = p;
    opcion.value = p;
    select.appendChild(opcion);
  });

  // Evento al cambiar de pregunta
  select.addEventListener("change", async () => {
    const pregunta = select.value;
    if (!pregunta) return;

    cargando.style.display = "block";
    respuestaDiv.innerHTML = "";

    // Buscar texto en cascada de fuentes
    const query = encodeURIComponent(pregunta);
    const fuentes = [
      `https://www.google.com/search?q=${query}`,
      `https://www.bing.com/search?q=${query}`,
      `https://duckduckgo.com/html/?q=${query}`
    ];

    let contenido = "";
    for (let url of fuentes) {
      const html = await fetchHTML(url);
      if (html && html.length > 100) {
        contenido = html;
        break;
      }
    }

    cargando.style.display = "none";

    if (!contenido) {
      mostrarError("No se pudo obtener datos en tiempo real.", "#respuesta-ia");
      return;
    }

    // Extraer el primer número real encontrado como valor
    const match = contenido.match(/(\d{1,3}(?:[.,]\d{1,2})?)\s?(USD|\$|euros|soles)?/i);
    let valor = match ? match[1].replace(",", ".") : null;

    // Mostrar respuesta textual
    const resumen = valor
      ? `El valor estimado es <strong>${valor}</strong>.`
      : "La información fue encontrada, pero no se detectó un valor claro.";

    respuestaDiv.innerHTML = `<p>${resumen}</p>`;

    // Si hay valor, graficar
    if (valor) {
      mostrarGrafico(respuestaDiv, pregunta, parseFloat(valor));
    }
  });

  // Mostrar introducción automáticamente
  document.getElementById("ia-introduccion").style.display = "block";
});
