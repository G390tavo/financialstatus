// utils.js

import { PROXY_URL, FUENTES } from "./config.js";

async function fetchHTML(query) {
  for (const fuente of FUENTES) {
    const encodedURL = encodeURIComponent(fuente + query);
    try {
      const response = await fetch(PROXY_URL + encodedURL);
      if (!response.ok) throw new Error("Proxy falló");
      const html = await response.text();
      const data = parseInfo(html);
      if (data) return data;
    } catch {
      // Proxy falló, intenta sin proxy
      try {
        const res = await fetch(fuente + query);
        const text = await res.text();
        const data = parseInfo(text);
        if (data) return data;
      } catch {
        continue;
      }
    }
  }
  return null;
}

function parseInfo(html) {
  const regex = /(\d+[\.,]?\d*)\s*(USD|EUR|soles|dólares|%)?/i;
  const match = html.match(regex);
  return match ? `Valor actual: ${match[1]} ${match[2] || ""}` : null;
}

export { fetchHTML };
