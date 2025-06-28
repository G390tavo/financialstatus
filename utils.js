const proxy = 'https://financial-proxy.onrender.com/?url=';

async function obtenerHTML(url) {
  try {
    const res = await fetch(proxy + encodeURIComponent(url));
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const texto = await res.text();
    return texto;
  } catch (e) {
    throw new Error('Error al obtener HTML: ' + e.message);
  }
}

// Esta función intentará usar varias fuentes hasta que una funcione
async function intentarFuentes(fuentes) {
  for (const url of fuentes) {
    try {
      const html = await obtenerHTML(url);
      const datos = extraerDatos(html);
      if (datos && datos.length > 0) {
        return datos;
      }
    } catch (e) {
      console.warn('Fuente fallida:', url, e.message);
    }
  }
  throw new Error('Todas las fuentes fallaron');
}

function extraerDatos(html) {
  // Aquí se debe personalizar según la fuente.
  // Para esta prueba devolvemos datos simulados si entra.
  return [
    { nombre: 'USD/PEN', valor: '3.71', variacion: 0.42, descripcion: 'Cambio actual del dólar.' },
    { nombre: 'Bitcoin', valor: '62,000', variacion: 1.2, descripcion: 'Valor actual del BTC.' },
    { nombre: 'Google Inc.', valor: '141.23', variacion: -0.3, descripcion: 'Precio por acción.' },
  ];
}

export { obtenerHTML, intentarFuentes };
