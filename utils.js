// utils.js

const PROXY = "https://financial-proxy.onrender.com/";

async function obtenerHTML(url) {
  try {
    const encodedURL = encodeURIComponent(url);
    const fullURL = `${PROXY}${encodedURL}`;
    const response = await fetch(fullURL, {
      method: "GET",
      headers: {
        "Content-Type": "text/html"
      },
      mode: "cors",
      cache: "no-store"
    });

    if (!response.ok) {
      console.warn(`⚠️ Error HTTP ${response.status}: ${response.statusText}`);
      throw new Error(`HTTP ${response.status}`);
    }

    const html = await response.text();
    if (!html || html.length < 100) throw new Error("Contenido muy corto o vacío");

    return html;
  } catch (error) {
    console.error("❌ Error en obtenerHTML():", error.message || error);
    return null;
  }
}
