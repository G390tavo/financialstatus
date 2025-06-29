// utils.js

async function obtenerHTML(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.text();
  } catch (error) {
    console.error('Error al obtener HTML:', error);
    throw error;
  }
}

// Función para probar varias fuentes hasta que una funcione
async function intentarFuentes(fuentes) {
  for (const fuente of fuentes) {
    try {
      const html = await obtenerHTML(fuente);
      if (html && html.length > 100) return html;
    } catch (e) {
      console.warn(`⚠️ Falló la fuente: ${fuente}`);
    }
  }
  throw new Error('Todas las fuentes fallaron');
}
