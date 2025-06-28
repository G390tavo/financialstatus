// utils.js

// Función para obtener HTML con proxy y control de errores
async function obtenerHTML(url) {
  try {
    const respuesta = await fetch(PROXY_URL + encodeURIComponent(url));
    if (!respuesta.ok) throw new Error(`HTTP ${respuesta.status}`);
    return await respuesta.text();
  } catch (error) {
    console.error("Error al obtener HTML:", error);
    return null;
  }
}
