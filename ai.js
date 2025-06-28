// ai.js

document.addEventListener("DOMContentLoaded", () => {
  const select = document.getElementById("pregunta-ia");
  const respuesta = document.getElementById("respuesta-ia");
  const cargando = document.getElementById("ia-cargando");

  select.addEventListener("change", async () => {
    const pregunta = select.value.trim();
    if (!pregunta) return;

    respuesta.innerHTML = "";
    cargando.textContent = "⏳ Buscando información confiable...";

    const fuentes = [
      `https://www.google.com/search?q=${encodeURIComponent(pregunta)}`,
      `https://www.bing.com/search?q=${encodeURIComponent(pregunta)}`,
      `https://duckduckgo.com/?q=${encodeURIComponent(pregunta)}`
    ];

    let encontrada = false;

    for (const url of fuentes) {
      const html = await obtenerHTML(url);
      if (html) {
        const match = html.match(/<p[^>]*>(.*?)<\/p>/i);
        if (match && match[1] && match[1].length > 30) {
          respuesta.innerHTML = match[1];
          encontrada = true;
          break;
        }
      }
    }

    cargando.textContent = "";

    if (!encontrada) {
      respuesta.innerHTML = `<div class="mensaje-error">❌ No se encontró información útil. Por favor, intenta con otra pregunta o verifica tu conexión.</div>`;
    }
  });
});
