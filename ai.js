// Función para obtener HTML desde una URL usando proxy
async function obtenerHTML(url) {
  try {
    const respuesta = await fetch(PROXY_URL + encodeURIComponent(url));
    if (!respuesta.ok) throw new Error(`HTTP ${respuesta.status}`);
    const texto = await respuesta.text();
    return texto;
  } catch (error) {
    console.error("Error al obtener HTML:", error);
    throw error;
  }
}

// Intenta múltiples fuentes hasta encontrar una que funcione
async function intentarFuentes(fuentes, procesador) {
  for (const fuente of fuentes) {
    try {
      const html = await obtenerHTML(fuente);
      const datos = procesador(html);
      if (datos && datos.length > 0) return datos;
    } catch (e) {
      console.warn(`Fuente fallida: ${fuente}`);
    }
  }
  return [];
}
