// Obtener HTML desde una URL usando fetch directamente
async function obtenerHTML(url) {
  try {
    const response = await fetch(url);
    const text = await response.text();
    const parser = new DOMParser();
    return parser.parseFromString(text, "text/html");
  } catch (error) {
    console.error("Error al obtener HTML:", error);
    return null;
  }
}

// Extraer texto limpio desde un selector CSS (clase, tag, etc)
function extraerTextoDesdeHTML(doc, selector) {
  if (!doc) return "No disponible";
  try {
    const el = doc.querySelector(selector);
    return el ? el.textContent.trim() : "No encontrado";
  } catch (e) {
    console.error("Error en selector:", selector, e);
    return "Error";
  }
}
