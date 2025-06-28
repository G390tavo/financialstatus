// utils.js

const fuentes = {
  monedas: [
    "https://financial-proxy.onrender.com/?url=https://wise.com/gb/currency-converter/usd-to-pen-rate",
    "https://financial-proxy.onrender.com/?url=https://www.x-rates.com/calculator/?from=USD&to=PEN&amount=1",
    "https://financial-proxy.onrender.com/?url=https://www.google.com/finance/quote/USD-PEN"
  ],
  criptos: [
    "https://financial-proxy.onrender.com/?url=https://coinmarketcap.com/",
    "https://financial-proxy.onrender.com/?url=https://www.coingecko.com/",
    "https://financial-proxy.onrender.com/?url=https://www.google.com/finance/quote/BTC-USD"
  ],
  empresas: [
    "https://financial-proxy.onrender.com/?url=https://www.investing.com/equities/",
    "https://financial-proxy.onrender.com/?url=https://www.google.com/finance/markets/most-active",
    "https://financial-proxy.onrender.com/?url=https://finance.yahoo.com/most-active"
  ]
};

async function obtenerDesdeFuentes(fuentesLista) {
  for (let url of fuentesLista) {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error("HTTP " + res.status);
      const html = await res.text();
      return html;
    } catch (e) {
      console.warn("Error con fuente:", url, e.message);
    }
  }
  throw new Error("⚠️ No se pudo obtener datos desde ninguna fuente.");
}
