async function obtenerEmpresaInfo(nombre) {
  return {
    nombre,
    descripcion: `Descripción breve de ${nombre}`,
    sector: "Tecnología",
    pais: "EE.UU.",
    valorActual: (Math.random() * 1000).toFixed(2)
  };
}

async function obtenerMonedas() {
  try {
    const res = await fetch(`https://api.exchangerate.host/latest?base=PEN`);
    const data = await res.json();
    return data.rates;
  } catch (err) {
    console.warn("Modo offline activado para monedas");
    return {
      USD: 0.26,
      EUR: 0.24,
      JPY: 41.50,
      GBP: 0.20
    };
  }
}

async function obtenerCriptos() {
  try {
    const res = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd");
    const data = await res.json();
    return data;
  } catch (err) {
    console.warn("Modo offline activado para criptos");
    return [{
      id: "bitcoin",
      name: "Bitcoin",
      current_price: 60000
    }, {
      id: "ethereum",
      name: "Ethereum",
      current_price: 3500
    }];
  }
}
