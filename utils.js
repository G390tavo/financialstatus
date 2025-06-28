// Archivo: utils.js

async function obtenerHTML(url) {
  try {
    const response = await fetch(PROXY_URL + encodeURIComponent(url));
    if (!response.ok) throw new Error("HTTP " + response.status);
    return await response.text();
  } catch (error) {
    console.error("Error al obtener HTML:", error);
    throw error;
  }
}

async function intentarFuentes(fuentes, procesarHTML) {
  for (const url of fuentes) {
    try {
      const html = await obtenerHTML(url);
      const resultado = procesarHTML(html);
      if (resultado) return resultado;
    } catch (_) {
      // Intenta la siguiente fuente
    }
  }
  return null;
}
