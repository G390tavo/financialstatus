// === FUNCIONES DE UTILIDAD GENERAL ===

// Limpia texto para dejar solo números y puntos
function limpiarTexto(texto) {
  return texto.replace(/[^0-9.,\-]/g, "").trim();
}

// Intenta extraer nodos desde HTML con un selector
function extraerTextoDesdeHTML(html, selector) {
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    const elementos = Array.from(doc.querySelectorAll(selector));
    if (elementos.length === 0) {
      console.warn("No se encontraron elementos con el selector:", selector);
    }
    return elementos;
  } catch (error) {
    console.error("Error al parsear HTML con selector", selector, ":", error);
    return [];
  }
}

// Hace fetch usando tu proxy y devuelve HTML plano
async function obtenerHTML(url) {
  const proxyURL = "https://financial-proxy.onrender.com/?url=" + encodeURIComponent(url);
  try {
    const res = await fetch(proxyURL);
    if (!res.ok) {
      throw new Error(`Error ${res.status} (${res.statusText}) al acceder a ${url}`);
    }
    return await res.text();
  } catch (error) {
    console.error("❌ Error al obtener HTML de:", url, "\nDetalles:", error);
    return "";
  }
}

// Extrae y limpia texto numérico desde HTML directo (acelerado)
async function obtenerValorDesdeHTML(url, selector) {
  const html = await obtenerHTML(url);
  if (!html) return null;

  const elementos = extraerTextoDesdeHTML(html, selector);
  if (elementos.length === 0) return null;

  return limpiarTexto(elementos[0].textContent);
}
