// utils.js

// Convierte texto HTML a DOM
export function parseHTML(html) {
  const parser = new DOMParser();
  return parser.parseFromString(html, 'text/html');
}

// Intenta múltiples fuentes en cascada (Google → Bing → DuckDuckGo)
export async function fetchHTML(keyword) {
  const fuentes = [
    `https://www.google.com/search?q=${encodeURIComponent(keyword)}`,
    `https://www.bing.com/search?q=${encodeURIComponent(keyword)}`,
    `https://duckduckgo.com/html/?q=${encodeURIComponent(keyword)}`
  ];

  for (let url of fuentes) {
    try {
      const res = await fetch(`http://localhost:3000/fetch?url=${encodeURIComponent(url)}`);
      if (res.ok) {
        const text = await res.text();
        if (text.includes('<html')) return parseHTML(text);
      }
    } catch (e) {
      console.warn(`Fallo en fuente: ${url}`);
    }
  }
  return null;
}

// Extrae un número (precio) de texto
export function extraerNumero(texto) {
  const match = texto.replaceAll(',', '').match(/(\d{1,3}(?:[.,]\d{3})*(?:[.,]\d+)?)/);
  return match ? parseFloat(match[0].replace(',', '')) : null;
}

// Genera historial simulado (si no hay datos reales)
export function generarHistorial(base = 100) {
  const historial = [];
  for (let i = 6; i >= 0; i--) {
    const variacion = Math.random() * 10 - 5;
    const valor = Math.max(1, base + variacion);
    historial.push({ x: `Día ${7 - i}`, y: parseFloat(valor.toFixed(2)) });
  }
  return historial;
}
