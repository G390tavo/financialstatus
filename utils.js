// utils.js
export async function fetchHTML(query) {
  const fuentes = [
    `https://www.google.com/search?q=${encodeURIComponent(query)}`,
    `https://www.bing.com/search?q=${encodeURIComponent(query)}`,
    `https://duckduckgo.com/?q=${encodeURIComponent(query)}`
  ];
  for (const fuente of fuentes) {
    try {
      const url = `https://financial-proxy.onrender.com/?url=${encodeURIComponent(fuente)}`;
      const res = await fetch(url);
      const html = await res.text();
      return html;
    } catch (e) {
      console.warn("Proxy falló. Intentando acceso directo...");
    }
  }
  return null;
}

export function extraerValorDesdeHTML(html) {
  const match = html.match(/(?:>|=|\$|S\/)?\s?([\d,.]+)(?:<\/|<|&nbsp;|\s)/);
  if (match) {
    return match[1].replace(",", ".");
  }
  return null;
}
