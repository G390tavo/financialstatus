async function obtenerMonedas() {
  try {
    const res = await fetch("https://api.exchangerate.host/latest?base=USD");
    const data = await res.json();
    return data.rates;
  } catch {
    console.warn("API monedas falló, usando IA (modo offline)");
    return await obtenerMonedasIA();
  }
}

async function obtenerMonedasIA() {
  return {
    EUR: 0.93,
    PEN: 3.65,
    MXN: 17.0,
    JPY: 157.2,
    GBP: 0.78
  };
}

async function obtenerCriptos() {
  try {
    const res = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd");
    const data = await res.json();
    return data.slice(0, 5); // Limitar por ahora
  } catch {
    console.warn("API criptos falló, usando IA");
    return [
      { id: "bitcoin", name: "Bitcoin", current_price: 67000 },
      { id: "ethereum", name: "Ethereum", current_price: 3500 },
      { id: "solana", name: "Solana", current_price: 150 }
    ];
  }
}

async function obtenerEmpresaInfo(nombre) {
  // En versión futura se usará IA o API real
  return {
    nombre: nombre,
    descripcion: `Descripción breve de ${nombre}`,
    sector: "Tecnología",
    pais: "EE.UU.",
    valorActual: `$${(500 + Math.random() * 1000).toFixed(2)}`
  };
}
