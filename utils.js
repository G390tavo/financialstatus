// === UTILS.JS ===
// Funciones utilitarias globales para obtener datos REALES mediante scraping con proxy Render

// Función para obtener HTML real desde internet con prioridad al proxy
async function fetchHTML(url) {
  const proxyUrl = 'https://financial-proxy.onrender.com/?url=' + encodeURIComponent(url);

  try {
    const response = await fetch(proxyUrl);
    if (!response.ok) throw new Error('Proxy falló');
    const html = await response.text();
    return html;
  } catch (error) {
    console.warn('Proxy falló. Intentando acceso directo...');

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Directo falló');
      return await response.text();
    } catch (err) {
      console.error('Error total al obtener HTML:', err);
      return null;
    }
  }
}

// Extrae valor numérico desde texto plano
function extraerNumero(texto) {
  const match = texto.replace(/,/g, '').match(/[\d.]+/);
  return match ? parseFloat(match[0]) : null;
}

// Convierte HTML en documento DOM manipulable
function htmlAElemento(html) {
  const parser = new DOMParser();
  return parser.parseFromString(html, 'text/html');
}

// Función general para obtener valor desde Google (criptos y monedas)
async function obtenerValorDesdeGoogle(query) {
  const url = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
  const html = await fetchHTML(url);
  if (!html) return null;

  const doc = htmlAElemento(html);
  const span = doc.querySelector('span.DFlfde, .pclqee'); // Google money display

  if (!span) return null;
  return extraerNumero(span.textContent);
}

// Obtener valor desde Google Finance (empresas)
async function obtenerValorEmpresa(ticker) {
  const url = `https://www.google.com/finance/quote/${ticker}`;
  const html = await fetchHTML(url);
  if (!html) return null;

  const doc = htmlAElemento(html);
  const el = doc.querySelector('div.YMlKec.fxKbKc'); // Google Finance price

  if (!el) return null;
  return extraerNumero(el.textContent);
}

// Generar historial simulado si no hay datos reales
function generarHistorialSimulado(valorActual) {
  const historial = [];
  const timestampActual = Date.now();

  for (let i = 9; i >= 0; i--) {
    const fecha = new Date(timestampActual - i * 24 * 60 * 60 * 1000);
    const valor = valorActual + (Math.random() * 2 - 1) * 0.05 * valorActual;
    historial.push({ fecha: fecha.toISOString().split('T')[0], valor: parseFloat(valor.toFixed(2)) });
  }

  return historial;
}

// Exportar funciones globales
window.obtenerValorDesdeGoogle = obtenerValorDesdeGoogle;
window.obtenerValorEmpresa = obtenerValorEmpresa;
window.generarHistorialSimulado = generarHistorialSimulado;
