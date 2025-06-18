// Configuración de fuentes de scraping
const FUENTES = {
  google: query => `https://www.google.com/search?q=${encodeURIComponent(query)}`,
  bing: query => `https://www.bing.com/search?q=${encodeURIComponent(query)}`,
  duckduckgo: query => `https://duckduckgo.com/?q=${encodeURIComponent(query)}`
};

// Palabras clave por tipo
const CONFIG = {
  criptomonedas: ['bitcoin', 'ethereum', 'dogecoin'],
  monedas: ['dólar', 'euro', 'yen'],
  empresas: ['apple stock', 'google stock', 'amazon stock']
};

// Preguntas predefinidas para la IA
const PREGUNTAS_IA = [
  "¿Cuál es el precio del bitcoin?",
  "¿Qué hace esta aplicación?",
  "¿Cuál es el valor actual del dólar?",
  "¿Cuál es el precio de las acciones de Apple?",
  "¿Qué criptomonedas están subiendo?"
];

// Exporte si se usa en entorno con módulos (por ahora no se usa import/export directo)
window.CONFIG = CONFIG;
window.FUENTES = FUENTES;
window.PREGUNTAS_IA = PREGUNTAS_IA;
