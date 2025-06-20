// === UTILS.JS ===
// Funciones para obtener datos reales y generar historial simulado

// Proxy seguro
const PROXY = "https://financial-proxy.onrender.com/?url=";

// Obtener HTML real (intenta con proxy, luego directo)
async function fetchHTML(url) {
  try {
    const proxyRes = await fetch(PROXY + encodeURIComponent(url));
    if (!proxyRes.ok) throw new Error("Proxy falló");
    const text = await proxyRes.text();
    return text;
  } catch (err) {
    console.warn("Proxy falló. Intentando acceso directo...");
    try {
      const directRes = await fetch(url);
      if (!directRes.ok) throw new Error("Directo falló");
      const text = await directRes.text();
      return text;
    } catch (e) {
      console.error("Ambos métodos fallaron:", e);
      return null;
    }
  }
}

// Obtener valor desde Google
async function obtenerValorDesdeGoogle(query) {
  const url = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
  const html = await fetchHTML(url);
  if (!html) return null;

  const match = html.match(/(?:S\/|\$|€|USD|US\$)?\s?([\d.,]+)(?:\s?soles?|dólares?|euros?)/i);
  return match ? match[1].replace(",", "") : null;
}

// Obtener valor de empresa desde Google Finance
async function obtenerValorEmpresa(ticker) {
  const url = `https://www.google.com/finance/quote/${ticker}`;
  const html = await fetchHTML(url);
  if (!html) return null;

  const match = html.match(/>(\$[\d,.]+)</);
  return match ? match[1].replace("$", "") : null;
}

// Simula historial con datos cercanos
function generarHistorialSimulado(valorActual) {
  const historial = [];
  const base = parseFloat(valorActual.replace(",", "."));

  for (let i = 6; i >= 0; i--) {
    const variacion = (Math.random() - 0.5) * 0.1 * base;
    const valor = (base + variacion).toFixed(2);
    const fecha = new Date();
    fecha.setDate(fecha.getDate() - i);
    historial.push({
      fecha: fecha.toISOString().split("T")[0],
      valor: parseFloat(valor)
    });
  }

  return historial;
}
