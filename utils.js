async function obtenerMonedas() {
  try {
    const res = await fetch("https://api.exchangerate.host/latest?base=USD");
    const data = await res.json();
    return data.rates || {}; // Asegura que sea objeto
  } catch (e) {
    console.error("Error cargando monedas:", e);
    return {}; // Previene crash
  }
}

async function obtenerCriptos() {
  try {
    const res = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd");
    const data = await res.json();
    return data;
  } catch (e) {
    console.error("Error cargando criptomonedas:", e);
    return [];
  }
}

async function obtenerEmpresaInfo(nombre) {
  return {
    nombre,
    descripcion: `Descripción breve de ${nombre}`,
    sector: "Tecnología",
    pais: "EE.UU.",
    valorActual: "$" + (Math.random() * 1000).toFixed(2)
  };
}
