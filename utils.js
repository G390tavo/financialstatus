// utils.js - Funciones utilitarias sin módulos

async function obtenerMonedas() {
  try {
    const respuesta = await fetch("https://api.exchangerate-api.com/v4/latest/USD");
    const datos = await respuesta.json();
    const monedas = Object.keys(datos.rates).map(clave => ({
      nombre: clave,
      valor: datos.rates[clave]
    }));
    return monedas;
  } catch (error) {
    console.error("Error al obtener monedas:", error);
    return [{ nombre: "USD", valor: 1 }, { nombre: "EUR", valor: 0.9 }, { nombre: "PEN", valor: 3.7 }];
  }
}

async function obtenerCriptos() {
  try {
    const respuesta = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd");
    const datos = await respuesta.json();
    return datos.map(c => ({
      nombre: c.name,
      simbolo: c.symbol.toUpperCase(),
      valor: c.current_price
    }));
  } catch (error) {
    console.error("Error al obtener criptomonedas:", error);
    return [{ nombre: "Bitcoin", simbolo: "BTC", valor: 27000 }, { nombre: "Ethereum", simbolo: "ETH", valor: 1800 }];
  }
}

async function obtenerEmpresas() {
  try {
    const respuesta = await fetch("https://financialmodelingprep.com/api/v3/stock/list?apikey=demo");
    const datos = await respuesta.json();
    return datos.slice(0, 10).map(e => ({
      nombre: e.name || e.symbol,
      simbolo: e.symbol,
      valor: e.price || "No disponible"
    }));
  } catch (error) {
    console.error("Error al obtener empresas:", error);
    return [
      { nombre: "Apple", simbolo: "AAPL", valor: 180 },
      { nombre: "Microsoft", simbolo: "MSFT", valor: 250 }
    ];
  }
}
