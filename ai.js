document.addEventListener("DOMContentLoaded", () => {
  const contenedorIA = document.getElementById("ia");
  const preguntaInput = document.getElementById("pregunta-ia");
  const respuestaOutput = document.getElementById("respuesta-ia");
  const contenedorPreguntas = document.createElement("div");
  contenedorPreguntas.classList.add("contenedor-preguntas");

  const preguntas = [
    "¿Cómo funciona esta aplicación?",
    "¿Qué puedo ver en la sección de empresas?",
    "¿Cómo se actualizan los valores?",
    "¿Qué son las criptomonedas?",
    "¿Cómo interpreta el gráfico?",
    "¿Qué pasa si no carga algún valor?"
  ];

  preguntas.forEach(preg => {
    const item = document.createElement("button");
    item.textContent = preg;
    item.className = "pregunta-predefinida";
    item.onclick = () => mostrarRespuesta(preg);
    contenedorPreguntas.appendChild(item);
  });

  contenedorIA.insertBefore(contenedorPreguntas, preguntaInput);

  function mostrarRespuesta(pregunta) {
    const respuestas = {
      "¿Cómo funciona esta aplicación?": "Esta aplicación obtiene datos reales de internet (sin API) y los organiza por secciones: monedas, criptomonedas y empresas. También tiene una IA que te guía.",
      "¿Qué puedo ver en la sección de empresas?": "Allí verás empresas relevantes del mercado, su valor actual y una gráfica del comportamiento reciente.",
      "¿Cómo se actualizan los valores?": "Los datos se actualizan automáticamente desde sitios web confiables mediante técnicas de web scraping.",
      "¿Qué son las criptomonedas?": "Son activos digitales descentralizados que se negocian en mercados globales. Ejemplos: Bitcoin, Ethereum.",
      "¿Cómo interpreta el gráfico?": "Cada punto representa un valor en el tiempo. Al pasar el cursor, verás el valor exacto para ese día.",
      "¿Qué pasa si no carga algún valor?": "Puede deberse a la conexión o bloqueo del sitio. En ese caso, se muestra un valor estimado como respaldo."
    };

    respuestaOutput.innerHTML = respuestas[pregunta] || "Lo siento, no tengo una respuesta para esa pregunta aún.";
  }

  // Si se hace click en enviar pregunta escrita (futuro)
  document.getElementById("btn-ejecutar-ia").addEventListener("click", () => {
    const texto = preguntaInput.value.trim();
    if (texto !== "") mostrarRespuesta(texto);
  });
});
