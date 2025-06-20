// config.js

const PROXY_URL = "http://localhost:3000/?url=";

const FUENTES = [
  "https://www.google.com/search?q=",
  "https://www.bing.com/search?q=",
  "https://duckduckgo.com/?q="
];

// Tiempo en milisegundos para actualizar respaldo (5 minutos)
const TIEMPO_RESPALDO = 5 * 60 * 1000;

export { PROXY_URL, FUENTES, TIEMPO_RESPALDO };
