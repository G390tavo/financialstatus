async function obtenerEmpresas() {
  return [
    { nombre: 'Google', descripcion: 'Tecnología y publicidad', valor_actual: 174.32 },
    { nombre: 'Apple', descripcion: 'Tecnología y hardware', valor_actual: 185.62 },
    { nombre: 'Tesla', descripcion: 'Autos eléctricos', valor_actual: 225.14 }
  ];
}

async function obtenerMonedas() {
  const res = await fetch("https://api.exchangerate.host/latest?base=PEN");
  const data = await res.json();
  return {
    USD: data.rates.USD,
    EUR: data.rates.EUR,
    CLP: data.rates.CLP,
    MXN: data.rates.MXN,
    ARS: data.rates.ARS
  };
}

async function obtenerCriptos() {
  const res = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana&vs_currencies=usd");
  const data = await res.json();
  return [
    { id: "bitcoin", nombre: "Bitcoin", valor: data.bitcoin.usd },
    { id: "ethereum", nombre: "Ethereum", valor: data.ethereum.usd },
    { id: "solana", nombre: "Solana", valor: data.solana.usd }
  ];
}

async function generarGraficoMoneda(moneda) {
  return `<iframe src="https://www.tradingview.com/chart/?symbol=FX_IDC:${moneda}PEN" width="100%" height="300" frameborder="0"></iframe>`;
}

async function generarGraficoCripto(id) {
  return `<iframe src="https://www.coingecko.com/en/coins/${id}" width="100%" height="300" frameborder="0"></iframe>`;
}
