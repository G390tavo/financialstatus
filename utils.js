// utils.js

async function obtenerHTML(url) {
  try {
    const proxyURL = `https://financial-proxy.onrender.com/?url=${encodeURIComponent(url)}`;
    const res = await fetch(proxyURL);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.text();
  } catch (err) {
    console.error("Error al obtener HTML:", err);
    throw err;
  }
}

async function intentarFuentes(urls) {
  for (const url of urls) {
    try {
      const html = await obtenerHTML(url);
      if (html && html.length > 100) return html;
    } catch (_) {
      continue;
    }
  }
  throw new Error("No se pudo obtener información de ninguna fuente.");
}
