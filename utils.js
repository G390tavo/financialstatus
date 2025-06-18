function crearElemento(tag, clase, texto) {
  const el = document.createElement(tag);
  if (clase) el.className = clase;
  if (texto) el.textContent = texto;
  return el;
}

function mostrarError(mensaje, contenedor) {
  contenedor.innerHTML = `<div class="card">${mensaje}</div>`;
}

async function obtenerDatos(palabraClave) {
  for (const fuente of FUENTES) {
    try {
      const res = await fetch(PROXY_URL + encodeURIComponent(fuente + palabraClave));
      if (res.ok) {
        const html = await res.text();
        const valor = extraerNumero(html);
        if (valor) return valor;
      }
    } catch (e) {
      continue;
    }
  }
  return null;
}

function extraerNumero(texto) {
  const match = texto.match(/\d{1,3}(?:[.,]\d{1,3}){1,2}/);
  return match ? match[0] : null;
}
