function limpiarTexto(html) {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  const text = doc.body.textContent || '';
  return text.replace(/\s+/g, ' ').trim();
}

async function obtenerInfo(query) {
  for (let source of SOURCES) {
    try {
      const url = encodeURIComponent(source + query);
      const res = await fetch(PROXY_URL + url);
      const html = await res.text();
      const limpio = limpiarTexto(html);
      if (limpio.length > 100) return limpio;
    } catch (e) {
      console.warn('Error con fuente:', source, e.message);
    }
  }
  return 'No se pudo obtener información actualizada.';
}
