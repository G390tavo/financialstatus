function crearElemento(tag, clases, texto) {
  const el = document.createElement(tag);
  if (clases) el.className = clases;
  if (texto) el.textContent = texto;
  return el;
}

function mostrarError(mensaje, contenedor) {
  contenedor.innerHTML = `<div class="card">${mensaje}</div>`;
}

async function fetchValor(keyword) {
  for (let fuente of FUENTES) {
    try {
      const url = PROXY_URL + encodeURIComponent(fuente + keyword);
      const res = await fetch(url);
      if (!res.ok) continue;
      const html = await res.text();
      const match = html.match(/(\d{1,3}(?:[\.,]\d{1,3})+)/);
      if (match) return match[0];
    } catch {}
  }
  return null;
}
