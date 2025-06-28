// config.js

// Preguntas disponibles para la IA
const PREGUNTAS_IA = [
  "¿Cuál es el valor actual del dólar en Perú?",
  "¿Qué es una criptomoneda?",
  "¿Qué empresas lideran el mercado hoy?",
  "¿Qué significa inflación?",
  "¿Cuánto vale el Bitcoin hoy?",
  "¿Qué moneda está subiendo esta semana?",
  "¿Qué empresa ha caído más esta semana?"
];

// Fuentes para búsqueda inteligente en IA (prioridad en orden)
const FUENTES_IA = [
  "https://www.google.com/search?q=",
  "https://www.bing.com/search?q=",
  "https://duckduckgo.com/?q="
];

// Proxy local confiable para evitar CORS
const PROXY_URL = "https://financial-proxy.onrender.com?url=";

// URLs base para scraping por sección
const FUENTES_DATOS = {
  monedas: "https://wise.com/gb/currency-converter/",
  criptos: "https://coinmarketcap.com/",
  empresas: "https://www.investing.com/equities/"
};

// Configuraciones visuales opcionales
const CONFIG_VISUAL = {
  colorPrincipal: "#39FF14", // verde neón
  fondoOscuro: "#000000",
  fondoClaro: "#ffffff"
};
