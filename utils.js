// utils.js

const fuentes = {
  empresas: [
    'https://finance.yahoo.com/screener/predefined/ms_technology',
    'https://www.tradingview.com/markets/stocks-usa/',
    'https://www.investing.com/equities/'
  ],
  criptos: [
    'https://coinmarketcap.com/',
    'https://www.coingecko.com/',
    'https://www.tradingview.com/markets/cryptocurrencies/'
  ],
  monedas: [
    'https://wise.com/gb/currency-converter/usd-to-pen-rate',
    'https://www.x-rates.com/table/?from=USD&amount=1',
    'https://www.exchangerates.org.uk/USD-PEN-exchange-rate-history.html'
  ]
};

async function obtenerHTML(url) {
  try {
    const proxy = 'https://financial-proxy.onrender.com/?url=';
    const respuesta = await fetch(proxy + encodeURIComponent(url));
    if (!respuesta.ok) throw new Error(`HTTP ${respuesta.status}`);
    const texto = await respuesta.text();
    if (!texto || texto.length < 300) throw new Error('Contenido insuficiente');
    return texto;
  } catch (error) {
    console.error('Error al obtener HTML:', error);
    throw error;
  }
}

async function obtenerDesdeFuentes(lista) {
  for (const fuente of lista) {
    try {
      const html = await obtenerHTML(fuente);
      return html;
    } catch (e) {
      console.warn('Fallo fuente:', fuente);
    }
  }
  throw new Error('No se pudo obtener datos de ninguna fuente.');
}

export { fuentes, obtenerDesdeFuentes };
