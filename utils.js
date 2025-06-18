export function crearElemento(tipo, clase, contenido) {
  const el = document.createElement(tipo);
  if (clase) el.className = clase;
  if (contenido) el.textContent = contenido;
  return el;
}

export function mostrarError(mensaje) {
  const info = document.getElementById('info');
  info.innerHTML = '';
  const error = crearElemento('div', 'error', mensaje);
  info.appendChild(error);
}
