function crearElemento(tipo, contenido) {
  const el = document.createElement(tipo);
  el.textContent = contenido;
  return el;
}

function mostrarError(msg) {
  alert("Error: " + msg);
}
