// Funciones utilitarias para obtener y procesar datos

async function obtenerMonedas() {
  try {
    const response = await fetch(API_CONFIG.monedas);
    const data = await response.json();
    const tasas = data.rates;
    return Object.keys(tasas).map(moneda => ({
      nombre: moneda,
      valor: tasas[moneda]
    }));
  } catch (error) {
    console.error("Error al obtener monedas:", error);
    return [];
  }
}

async function obtenerCriptomonedas() {
  try {
    const response = await fetch(API_CONFIG.criptos);
    const data = await response.json();
    return data.map(cripto => ({
      nombre: cripto.name,
      simbolo: cripto.symbol.toUpperCase(),
      valor: cripto.current_price
    }));
  } catch (error) {
    console.error("Error al obtener criptomonedas:", error);
    return [];
  }
}

async function obtenerPrecioEmpresa(ticker) {
  try {
    const url = `https://query1.finance.yahoo.com/v8/finance/chart/${ticker}`;
    const response = await fetch(url);
    const data = await response.json();
    const precios = data.chart.result?.[0]?.indicators?.quote?.[0]?.close || [];
    const fechas = data.chart.result?.[0]?.timestamp || [];
    return { precios, fechas };
  } catch (error) {
    console.error("Error al obtener datos de empresa:", error);
    return { precios: [], fechas: [] };
  }
}
