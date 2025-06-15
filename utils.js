async function obtenerMonedas() {
  try {
    const res = await fetch("https://api.exchangerate.host/latest?base=PEN");
    const data = await res.json();
    return data.rates;
  } catch (e) {
    console.error("Error obteniendo monedas:", e);
    return {};
  }
}

async function obtenerCriptos() {
  try {
    const res = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=10&page=1");
    const data = await res.json();
    return data;
  } catch (e) {
    console.error("Error obteniendo criptos:", e);
    return [];
  }
}

async function obtenerEmpresaInfo(nombre) {
  // Simulación básica
  return {
    nombre,
    descripcion: "Empresa destacada del mercado global.",
    sector: "Tecnología",
    pais: "EE.UU.",
    valorActual: "$1,234.56",
  };
}
