// utils.js
export function crearElemento(tag, contenido, clase = "") {
  const el = document.createElement(tag);
  if (contenido) el.textContent = contenido;
  if (clase) el.className = clase;
  return el;
}

export function mostrarError(mensaje, contenedorId = "grafico") {
  const contenedor = document.getElementById(contenedorId);
  if (contenedor) {
    contenedor.innerHTML = `<p style="color: red;">${mensaje}</p>`;
  }
}
