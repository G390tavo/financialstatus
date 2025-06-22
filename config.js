// config.js

const API_PROXY = "https://financial-proxy.onrender.com?url=";

// URLs reales (puedes agregar más fuentes si deseas)
const FUENTES = {
  monedas: [
    "https://www.x-rates.com/table/?from=USD&amount=1",
    "https://www.iban.com/exchange-rates"
  ],
  criptos: [
    "https://www.coindesk.com/",
    "https://coinmarketcap.com/"
  ],
  empresas: [
    "https://www.investing.com/equities/",
    "https://www.bloomberg.com/markets/stocks"
  ]
};

const PREGUNTAS_IA = [
  "¿Qué es el tipo de cambio?",
  "¿Cómo funciona el mercado de criptomonedas?",
  "¿Qué empresa tiene mayor crecimiento hoy?",
  "Explica la inflación en palabras simples.",
  "¿Cómo leer una gráfica financiera?"
];
