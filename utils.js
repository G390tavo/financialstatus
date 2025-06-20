// utils.js

const PROXY = "https://financial-proxy.onrender.com/?url=";

export async function fetchHTML(url) {
  try {
    const response = await fetch(PROXY + encodeURIComponent(url));
    if (!response.ok) throw new Error("Proxy falló");
    const html = await response.text();
    return html;
  } catch (error) {
    console.warn("Proxy falló. Intentando acceso directo...");
    try {
      const fallback = await fetch(url);
      return await fallback.text();
    } catch {
      throw new Error("No se pudo acceder ni con proxy ni directamente.");
    }
  }
}

export function extraerValor(html, regex) {
  const match = html.match(regex);
  return match ? match[1].replace(/,/g, "") : null;
}

export function limpiarTexto(texto) {
  return texto.replace(/<[^>]*>/g, "").trim();
}
