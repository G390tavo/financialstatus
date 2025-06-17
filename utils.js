// Cache temporal para uso offline básico (resetea cada 5 minutos)
const cache = {
  monedas: { data: null, timestamp: 0 },
  criptos: { data: null, timestamp: 0 },
  empresas: { data: null, timestamp: 0 }
};

const CACHE_TIEMPO_MS = 5 * 60 * 1000; // 5 minutos

async function obtenerMonedas() {
  const ahora = Date.now();
  if (cache.monedas.data && ahora - cache.monedas.timestamp < CACHE_TIEMPO_MS) {
    return cache.monedas.data;
  }

  try {
    const res = await fetch("https://api.exchangerate.host/latest?base=USD");
    const json = await res.json();
    const monedas = Object.keys(json.rates).slice(0, 10).map(nombre => ({
      nombre,
      valor: json.rates[nombre],
      fecha: json.date
    }));
    cache.monedas = { data: monedas, timestamp: ahora };
    return monedas;
  } catch (e) {
    console.warn("Error al obtener monedas, usando datos base.", e);
    return [
      { nombre: "USD", valor: 1, fecha: "hoy" },
      { nombre: "EUR", valor: 0.93, fecha: "hoy" },
      { nombre: "JPY", valor: 156.4, fecha: "hoy" }
    ];
  }
}

async function obtenerCriptomonedas() {
  const ahora = Date.now();
  if (cache.criptos.data && ahora - cache.criptos.timestamp < CACHE_TIEMPO_MS) {
    return cache.criptos.data;
  }

  try {
    const res = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd");
    const json = await res.json();
    const criptos = json.slice(0, 10).map(c => ({
      nombre: c.name,
      valor: c.current_price,
      fecha: new Date(c.last_updated).toLocaleDateString()
    }));
    cache.criptos = { data: criptos, timestamp: ahora };
    return criptos;
  } catch (e) {
    console.warn("Error al obtener criptomonedas, usando datos base.", e);
    return [
      { nombre: "Bitcoin", valor: 67000, fecha: "hoy" },
      { nombre: "Ethereum", valor: 3500, fecha: "hoy" },
      { nombre: "Solana", valor: 145, fecha: "hoy" }
    ];
  }
}

async function obtenerEmpresas() {
  const ahora = Date.now();
  if (cache.empresas.data && ahora - cache.empresas.timestamp < CACHE_TIEMPO_MS) {
    return cache.empresas.data;
  }

  // Lista fija por ahora hasta implementar proxy o backend con scraping real
  try {
    const res = await fetch("https://finnhub.io/api/v1/quote?symbol=AAPL&token=demo");
    const json = await res.json();
    const empresas = [
      { nombre: "Apple", valor: json.c, fecha: new Date().toLocaleDateString() },
      { nombre: "Google", valor: 176.8, fecha: "hoy" },
      { nombre: "Microsoft", valor: 338.4, fecha: "hoy" }
    ];
    cache.empresas = { data: empresas, timestamp: ahora };
    return empresas;
  } catch (e) {
    console.warn("Error al obtener empresas, usando valores base.", e);
    return [
      { nombre: "Apple", valor: 190.3, fecha: "hoy" },
      { nombre: "Google", valor: 176.8, fecha: "hoy" },
      { nombre: "Microsoft", valor: 338.4, fecha: "hoy" }
    ];
  }
}
