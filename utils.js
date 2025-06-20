// utils.js

async function fetchHTML(pregunta) {
  const fuentes = [
    `https://www.google.com/search?q=${encodeURIComponent(pregunta)}`,
    `https://www.bing.com/search?q=${encodeURIComponent(pregunta)}`,
    `https://duckduckgo.com/?q=${encodeURIComponent(pregunta)}`,
    `https://es.finance.yahoo.com/lookup?s=${encodeURIComponent(pregunta)}`
  ];

  for (let fuente of fuentes) {
    try {
      const res = await fetch(`/proxy?url=${encodeURIComponent(fuente)}`);
      const text = await res.text();
      if (text && text.length > 100) return text;
    } catch (e) {
      console.warn("Proxy falló. Intentando acceso directo...");
    }
  }

  return null;
}

function limpiarTexto(html) {
  const temp = document.createElement("div");
  temp.innerHTML = html;
  return temp.textContent || temp.innerText || "";
}

function generarSimulacionHistorial(valor) {
  if (!valor || isNaN(valor)) return null;
  const base = parseFloat(valor);
  const datos = [];
  for (let i = 6; i >= 0; i--) {
    let variacion = (Math.random() - 0.5) * 10;
    let dia = `Día ${7 - i}`;
    let y = Math.round((base + variacion) * 100) / 100;
    datos.push({ x: dia, y });
  }
  return datos;
}

function obtenerValorActual(texto) {
  const regex = /\d+[.,]?\d*/g;
  const encontrados = texto.match(regex);
  if (!encontrados) return null;
  let valor = parseFloat(encontrados[0].replace(",", "."));
  return isNaN(valor) ? null : valor;
}

export { fetchHTML, limpiarTexto, generarSimulacionHistorial, obtenerValorActual };
