// utils.js - Funciones para obtener y limpiar datos con fetch vía proxy

// Función genérica para hacer fetch a través del proxy
function obtenerHTML(url, callback) {
  fetch('https://financial-proxy.onrender.com?url=' + encodeURIComponent(url))
    .then(res => res.text())
    .then(html => callback(html))
    .catch(err => console.error('Error al obtener HTML:', err));
}

// Función para limpiar texto HTML
function extraerTextoDesdeHTML(html, selector) {
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = html;
  const elemento = tempDiv.querySelector(selector);
  return elemento ? elemento.innerText.trim() : 'Dato no disponible';
}
