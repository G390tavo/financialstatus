// ai.js
const preguntasIA = [
  "¿Tendencia actual del dólar?",
  "¿Qué criptomoneda ha subido más hoy?",
  "¿Cómo afecta la inflación a la economía?",
  "¿Qué empresa lidera el mercado hoy?"
];

const fuentesIA = [
  query => `https://www.google.com/search?q=${encodeURIComponent(query)}`,
  query => `https://www.bing.com/search?q=${encodeURIComponent(query)}`,
  query => `https://duckduckgo.com/?q=${encodeURIComponent(query)}`
];

document.addEventListener("DOMContentLoaded", () => {
  const select = document.getElementById("pregunta-ia");
  const respuestaDiv = document.getElementById("respuesta-ia");
  const loader = document.getElementById("ia-cargando");

  preguntasIA.forEach(preg => {
    const option = document.createElement("option");
    option.value = preg;
    option.textContent = preg;
    select.appendChild(option);
  });

  select.addEventListener("change", async () => {
    const pregunta = select.value;
    if (!pregunta) return;

    loader.style.display = "block";
    respuestaDiv.textContent = "";
    const intentos = fuentesIA.map(f => fetchHTML(f(pregunta)));

    try {
      const html = await Promise.any(intentos);
      if (!html) throw new Error("Sin respuesta");

      const div = document.createElement("div");
      div.innerHTML = html;
      let resultado = div.querySelector("h3, span, p");
      respuestaDiv.textContent = resultado ? resultado.textContent : "Respuesta no encontrada.";
    } catch (err) {
      respuestaDiv.textContent = "No se pudo obtener respuesta. Intenta nuevamente.";
    } finally {
      loader.style.display = "none";
    }
  });
});
