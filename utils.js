// utils.js

// Crear un elemento con clases y contenido opcional
function crearElemento(etiqueta, clase, texto) {
  const el = document.createElement(etiqueta);
  if (clase) el.className = clase;
  if (texto) el.textContent = texto;
  return el;
}

// Mostrar un mensaje de error visual
function mostrarError(mensaje) {
  const errorDiv = document.createElement("div");
  errorDiv.className = "error";
  errorDiv.textContent = mensaje;
  document.body.appendChild(errorDiv);
  setTimeout(() => errorDiv.remove(), 5000);
}

// Obtener HTML desde múltiples fuentes en cascada
async function fetchHTML(query) {
  const fuentes = [
    `https://www.google.com/search?q=${encodeURIComponent(query)}`,
    `https://www.bing.com/search?q=${encodeURIComponent(query)}`,
    `https://duckduckgo.com/html?q=${encodeURIComponent(query)}`
  ];

  for (let url of fuentes) {
    try {
      const proxyURL = `http://localhost:3000/fetch?url=${encodeURIComponent(url)}`;
      const res = await fetch(proxyURL);
      if (!res.ok) throw new Error("Fuente caída");
      const html = await res.text();
      if (html.includes("error") || html.length < 1000) throw new Error("Respuesta inválida");
      return html;
    } catch (err) {
      console.warn(`❌ Falló ${url}: ${err.message}`);
      continue;
    }
  }

  throw new Error("No se pudo obtener datos desde ninguna fuente.");
}
