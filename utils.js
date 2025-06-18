// Crea un elemento con atributos y contenido fácilmente
function crearElemento(tag, atributos = {}, contenido = '') {
  const el = document.createElement(tag);
  for (let key in atributos) {
    if (key === 'class') el.className = atributos[key];
    else if (key === 'dataset') {
      for (let dataKey in atributos[key]) {
        el.dataset[dataKey] = atributos[key][dataKey];
      }
    } else {
      el.setAttribute(key, atributos[key]);
    }
  }
  if (typeof contenido === 'string') {
    el.innerHTML = contenido;
  } else if (contenido instanceof HTMLElement) {
    el.appendChild(contenido);
  } else if (Array.isArray(contenido)) {
    contenido.forEach(child => {
      if (typeof child === 'string') {
        el.innerHTML += child;
      } else if (child instanceof HTMLElement) {
        el.appendChild(child);
      }
    });
  }
  return el;
}

// Muestra un mensaje de error en la interfaz
function mostrarError(mensaje = 'Ocurrió un error inesperado.') {
  const errorDiv = document.getElementById('respuestaIA') || document.body;
  const mensajeError = crearElemento('div', { class: 'error' }, `<p>${mensaje}</p>`);
  errorDiv.appendChild(mensajeError);
  setTimeout(() => mensajeError.remove(), 5000);
}

// Limpia un elemento por ID
function limpiarElemento(id) {
  const elemento = document.getElementById(id);
  if (elemento) elemento.innerHTML = '';
}
