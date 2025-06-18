export function crearElemento(tipo, clases = '', texto = '') {
  const el = document.createElement(tipo);
  if (clases) el.className = clases;
  if (texto) el.textContent = texto;
  return el;
}

export function mostrarError(mensaje, contenedor) {
  const error = crearElemento('div', 'error', mensaje);
  error.style.color = 'red';
  error.style.margin = '10px 0';
  contenedor.innerHTML = '';
  contenedor.appendChild(error);
}

export function obtenerCambio(valorActual, valorAnterior) {
  const diferencia = valorActual - valorAnterior;
  const porcentaje = ((diferencia / valorAnterior) * 100).toFixed(2);
  const sube = diferencia > 0;
  return { porcentaje, sube };
}

export async function fetchHTML(url) {
  try {
    const respuesta = await fetch(`http://localhost:3000/fetch?url=${encodeURIComponent(url)}`);
    const texto = await respuesta.text();
    const doc = new DOMParser().parseFromString(texto, 'text/html');
    return doc;
  } catch (e) {
    console.error('Error al obtener HTML:', e);
    return null;
  }
}
