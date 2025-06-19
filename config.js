// Preguntas predefinidas para la IA
const preguntasIA = [
  "¿Qué es una criptomoneda?",
  "¿Cómo afecta la inflación a las monedas?",
  "¿Qué es una acción de empresa?",
  "¿Cuáles son las criptomonedas más importantes?",
  "¿Cómo interpretar un gráfico financiero?",
  "Precio del oro",
  "Tendencia del mercado tecnológico",
  "Análisis de Tesla"
];

// Mapas de descripciones cortas para monedas, criptos y empresas
const descripciones = {
  monedas: {
    USD: "Dólar estadounidense, moneda oficial de EE.UU.",
    EUR: "Euro, moneda oficial de la Eurozona.",
    JPY: "Yen japonés, moneda oficial de Japón."
  },
  criptos: {
    BTC: "Bitcoin, la primera criptomoneda descentralizada.",
    ETH: "Ethereum, plataforma para contratos inteligentes.",
    ADA: "Cardano, blockchain de tercera generación."
  },
  empresas: {
    Apple: "Apple Inc., líder en tecnología y electrónica.",
    Google: "Google LLC, motor de búsqueda y tecnología.",
    Amazon: "Amazon.com, gigante del comercio electrónico.",
    Tesla: "Tesla, fabricante de vehículos eléctricos.",
    Microsoft: "Microsoft, líder en software y tecnología."
  }
};

// Colores para variación positiva y negativa
const colorVariacionUp = "#39FF14";    // Verde neón
const colorVariacionDown = "#e74c3c";  // Rojo fuerte
