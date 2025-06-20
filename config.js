// config.js
export const ACTUALIZACION_INTERVALO = 5 * 60 * 1000; // 5 minutos
export const PROXY = "https://financial-proxy.onrender.com/?url=";
export const FUENTES_BUSQUEDA = [
  query => `https://www.google.com/search?q=${encodeURIComponent(query)}`,
  query => `https://www.bing.com/search?q=${encodeURIComponent(query)}`,
  query => `https://duckduckgo.com/?q=${encodeURIComponent(query)}`
];
