// Crea y devuelve un elemento con clase y contenido opcionales
function crearElemento(tipo, clase, contenido) {
  const el = document.createElement(tipo);
  if (clase) el.className = clase;
  if (contenido) el.textContent = contenido;
  return el;
}

// Muestra un mensaje de error en la consola y en pantalla si es posible
function mostrarError(mensaje) {
  console.error("❌ Error:", mensaje);
  const contenedor = document.getElementById("grafico") || document.body;
  const errorBox = crearElemento("div", "error", mensaje);
  contenedor.appendChild(errorBox);
  setTimeout(() => errorBox.remove(), 5000);
}

// Muestra un mensaje de estado o confirmación visual
function mostrarMensaje(mensaje, tipo = "info") {
  const contenedor = document.getElementById("grafico") || document.body;
  const msgBox = crearElemento("div", tipo, mensaje);
  contenedor.appendChild(msgBox);
  setTimeout(() => msgBox.remove(), 4000);
}
