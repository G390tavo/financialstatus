// Función para extraer elementos desde un HTML con un selector válido
function extraerTextoDesdeHTML(html, selector) {
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    const elementos = Array.from(doc.querySelectorAll(selector));
    return elementos;
  } catch (error) {
    console.error("Error al parsear HTML:", error);
    return [];
  }
}

// Función para hacer una petición con proxy a una URL y obtener texto HTML
async function obtenerHTML(url) {
  try {
    const proxy = "https://financial-proxy.onrender.com/?url=";
    const respuesta = await fetch(proxy + encodeURIComponent(url));
    const html = await respuesta.text();
    return html;
  } catch (error) {
    console.error("Error al obtener HTML:", error);
    return "";
  }
}

// Función para limpiar texto y obtener solo el número (si es necesario)
function limpiarTexto(texto) {
  return texto.replace(/[^0-9.,\-]/g, "").trim();
}
