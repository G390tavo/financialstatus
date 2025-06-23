async function obtenerHTMLDesdeURL(url) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Error HTTP: ${res.status}`);
    return await res.text();
  } catch (e) {
    console.error("Error al obtener HTML:", e.message);
    return null;
  }
}

function extraerTexto(html, regex) {
  const match = html.match(regex);
  return match ? match[1].trim() : "No disponible";
}

async function obtenerDatosMoneda(moneda) {
  const fuentes = [
    `https://www.xe.com/currencyconverter/convert/?Amount=1&From=${moneda}&To=USD`,
    `https://www.x-rates.com/calculator/?from=${moneda}&to=USD&amount=1`,
    `https://wise.com/gb/currency-converter/${moneda}-to-usd-rate`,
    `https://www.google.com/finance/quote/${moneda}-USD`,
    `https://www.fx-exchange.com/${moneda.toLowerCase()}/usd/`
  ];
  for (let url of fuentes) {
    const html = await obtenerHTMLDesdeURL(url);
    if (html) {
      const valor = extraerTexto(html, /(?:1\s*[^=]*=\s*|\s)(\d+(?:[\.,]\d+)?)/i);
      if (valor && valor !== "No disponible") return valor;
    }
  }
  return "No se pudo obtener";
}

async function obtenerDatosCrypto(crypto) {
  const fuentes = [
    `https://www.coingecko.com/en/coins/${crypto}`,
    `https://coinmarketcap.com/currencies/${crypto}/`,
    `https://www.investing.com/crypto/${crypto}/`,
    `https://www.binance.com/en/price/${crypto}`,
    `https://www.google.com/finance/quote/${crypto.toUpperCase()}-USD`
  ];
  for (let url of fuentes) {
    const html = await obtenerHTMLDesdeURL(url);
    if (html) {
      const valor = extraerTexto(html, /(\d{1,3}(?:[\.,]\d{3})*(?:[\.,]\d{2}))/);
      if (valor && valor !== "No disponible") return valor;
    }
  }
  return "No se pudo obtener";
}

async function obtenerDatosEmpresa(empresa) {
  const fuentes = [
    `https://www.google.com/finance/quote/${empresa}:NASDAQ`,
    `https://www.marketwatch.com/investing/stock/${empresa}`,
    `https://finance.yahoo.com/quote/${empresa}`,
    `https://www.investing.com/equities/${empresa.toLowerCase()}`,
    `https://www.wsj.com/market-data/quotes/${empresa}`
  ];
  for (let url of fuentes) {
    const html = await obtenerHTMLDesdeURL(url);
    if (html) {
      const valor = extraerTexto(html, /(\d{1,3}(?:[\.,]\d{3})*(?:[\.,]\d{2}))/);
      if (valor && valor !== "No disponible") return valor;
    }
  }
  return "No se pudo obtener";
}
