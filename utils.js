import { PROXY_URL } from './config.js';

export async function obtenerHTML(url) {
  try {
    const respuesta = await fetch(PROXY_URL + encodeURIComponent(url));
    if (!respuesta.ok) throw new Error(`HTTP ${respuesta.status}`);
    return await respuesta.text();
  } catch (error) {
    throw new Error("Error al obtener HTML: " + error.message);
  }
}

export async function intentarFuentes(fuentes, parsearFn) {
  for (const fuente of fuentes) {
    try {
      const html = await obtenerHTML(fuente);
      const datos = parsearFn(html);
      if (datos && datos.length > 0) return datos;
    } catch (e) {
      console.warn("Fuente fallida:", fuente);
    }
  }
  return [];
}
