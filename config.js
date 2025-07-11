const PROXIES = [
  "https://api.allorigins.win/raw?url=",
  "https://corsproxy.io/?",
  "https://thingproxy.freeboard.io/fetch/",
  "https://financial-proxy.onrender.com?url="
];

const FUENTES_ORIGINALES = {
  monedas: [
    "https://wise.com/es/currency-converter/usd-to-pen-rate"
  ],
  criptos: [
    "https://coinmarketcap.com/currencies/bitcoin/",
    "https://www.coingecko.com/en/coins/bitcoin"
  ],
  empresas: [
    "https://www.macrotrends.net/stocks/charts/AAPL/apple/stock-price-history"
  ]
};

function obtenerFuentesConProxy(tipo) {
  if (!FUENTES_ORIGINALES[tipo]) return [];
  return PROXIES.flatMap(proxy =>
    FUENTES_ORIGINALES[tipo].map(url => `${proxy}${encodeURIComponent(url)}`)
  );
}
