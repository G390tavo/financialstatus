// ai.js

document.addEventListener("DOMContentLoaded", () => {
  const seccionIA = document.getElementById("ia");
  const preguntaSelect = document.getElementById("pregunta-ia");
  const respuestaDiv = document.getElementById("respuesta-ia");
  const cargando = document.getElementById("ia-cargando");

  // Mostrar preguntas predefinidas
  PREGUNTAS_IA.forEach(p => {
    const option = document.createElement("option");
    option.textContent = p;
    preguntaSelect.appendChild(option);
  });

  // Introducción automática al cargar la sección
  if (seccionIA.classList.contains("activa")) {
    respuestaDiv.textContent = "Hola, soy tu IA financiera. Selecciona una pregunta para ayudarte con información real del mercado.";
  }

  // Evento al seleccionar pregunta
  preguntaSelect.addEventListener("change", async () => {
    const pregunta = preguntaSelect.value;
    if (!pregunta) return;

    cargando.style.display = "block";
    respuestaDiv.textContent = "";

    for (const fuente of FUENTES_IA) {
      const html = await obtenerHTML(fuente + encodeURIComponent(pregunta));
      if (html && html.includes("class")) {
        const texto = extraerTextoSignificativo(html);
        if (texto) {
          cargando.style.display = "none";
          respuestaDiv.textContent = texto;
          return;
        }
      }
    }

    cargando.style.display = "none";
    respuestaDiv.textContent = "Lo siento, no pude obtener una respuesta confiable. Intenta más tarde.";
  });
});

// Extrae texto útil de HTML crudo
function extraerTextoSignificativo(html) {
  const doc = new DOMParser().parseFromString(html, "text/html");
  const bloques = doc.querySelectorAll("p, span, div");
  for (const b of bloques) {
    const txt = b.textContent.trim();
    if (txt.length > 60 && txt.length < 300) return txt;
  }
  return null;
}
