// config.js

// URLs a través del proxy (para sortear CORS)
const PROXY = 'https://financial-proxy.onrender.com/?url=';

const FUENTES = {
  monedas: [
    `${PROXY}https://wise.com/gb/currency-converter/usd-to-pen-rate`,
    `${PROXY}https://www.x-rates.com/calculator/?from=USD&to=PEN&amount=1`,
  ],
  criptos: [
    `${PROXY}https://coinmarketcap.com/`,
    `${PROXY}https://www.coingecko.com/`,
  ],
  empresas: [
    `${PROXY}https://www.investing.com/equities/`,
    `${PROXY}https://www.marketwatch.com/tools/stockresearch/globalmarkets`,
  ]
};
