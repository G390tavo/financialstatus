// === UTILS.JS - Herramientas para scraping y manejo de datos ===

function limpiarTexto(texto) {
  return texto.replace(/[^\d.,-]/g, "").trim();
}

function extraerTextoDesdeHTML(html, selector) {
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    const elementos = Array.from(doc.querySelectorAll(selector));
    return elementos.length > 0 ? elementos.map(el => el.textContent.trim()) : [];
  } catch (error) {
    console.error("Error al extraer selector:", selector, error);
    return [];
  }
}

async function obtenerHTML(url) {
  const proxyURL = "https://financial-proxy.onrender.com/?url=" + encodeURIComponent(url);
  try {
    const response = await fetch(proxyURL);
    if (!response.ok) throw new Error(`Error HTTP ${response.status}`);
    return await response.text();
  } catch (error) {
    console.error("❌ Error al obtener HTML:", error.message);
    return "";
  }
}

async function obtenerValorDesdeHTML(url, selector) {
  const html = await obtenerHTML(url);
  const valores = extraerTextoDesdeHTML(html, selector);
  if (valores.length > 0) {
    return limpiarTexto(valores[0]);
  } else {
    return null;
  }
}
