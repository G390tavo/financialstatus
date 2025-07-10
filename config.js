const PROXIES = [
  "https://financial-proxy.onrender.com?url=",
  "https://api.allorigins.win/raw?url=",
  "https://corsproxy.io/?",
  "https://thingproxy.freeboard.io/fetch/"
];

const FUENTES_ORIGINALES = {
  monedas: [
    "https://wise.com/es/currency-converter/usd-to-pen-rate",
    "https://wise.com/es/currency-converter/eur-to-pen-rate"
  ],
  criptos: [
    "https://coinmarketcap.com/currencies/bitcoin/",
    "https://coinmarketcap.com/currencies/ethereum/"
  ],
  empresas: [
    "https://www.investing.com/equities/apple-computer-inc",
    "https://www.investing.com/equities/microsoft-corp"
  ]
};

function obtenerFuentesConProxy(tipo) {
  return PROXIES.flatMap(proxy =>
    FUENTES_ORIGINALES[tipo].map(url => `${proxy}${encodeURIComponent(url)}`)
  );
}
