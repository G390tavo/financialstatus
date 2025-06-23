const PROXY_URL = 'https://financial-proxy.onrender.com/?url=';

async function obtenerHTML(url) {
  try {
    const res = await fetch(PROXY_URL + encodeURIComponent(url));
    return await res.text();
  } catch (err) {
    console.error("Error al obtener HTML:", err);
    return '';
  }
}

function extraerTextoDesdeHTML(html, selector) {
  const dom = document.createElement('div');
  dom.innerHTML = html;
  const el = dom.querySelector(selector);
  return el ? el.textContent.trim() : null;
}
