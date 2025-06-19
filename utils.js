// Función para hacer scraping real con múltiples fuentes (usando proxy)
async function fetchHTML(pregunta) {
  const fuentes = [
    `https://www.google.com/search?q=${encodeURIComponent(pregunta)}`,
    `https://www.bing.com/search?q=${encodeURIComponent(pregunta)}`,
    `https://duckduckgo.com/html/?q=${encodeURIComponent(pregunta)}`
  ];

  for (let url of fuentes) {
    try {
      const res = await fetch(`http://localhost:3000/fetch?url=${encodeURIComponent(url)}`);
      if (!res.ok) throw new Error(`Error en proxy (${res.status}) para ${url}`);

      const html = await res.text();

      // Validación mínima para detectar si se obtuvo contenido
      if (html && html.length > 1000) {
        return html;
      } else {
        console.warn(`Respuesta vacía o incompleta desde: ${url}`);
      }
    } catch (err) {
      console.error(`❌ Falló el intento con ${url}`, err);
    }
  }

  throw new Error("No se pudo obtener contenido de ninguna fuente.");
}

// Utilidad para mostrar errores en pantalla (si algo falla)
function mostrarError(mensaje, contenedor) {
  if (!contenedor) return;
  contenedor.innerHTML = `<p class="error">${mensaje}</p>`;
}
