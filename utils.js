async function obtenerMonedas() {
  try {
    const res = await fetch("https://api.exchangerate.host/latest?base=USD");
    const data = await res.json();
    return data.rates;
  } catch {
    console.warn("Fallo API monedas, usando ChatGPT-3.5 como fallback...");
    return await obtenerMonedasDesdeGPT();
  }
}

async function obtenerCriptos() {
  try {
    const res = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd");
    return await res.json();
  } catch {
    console.warn("Fallo API criptos, usando ChatGPT-3.5 como fallback...");
    return await obtenerCriptosDesdeGPT();
  }
}

async function obtenerEmpresaInfo(nombre) {
  const descripcionesGPT = {
    "Apple": "Apple Inc. es una empresa de tecnología reconocida por sus iPhones, iPads y Macs. Fue fundada en EE.UU. en 1976.",
    "Google": "Google LLC, empresa líder en tecnología y búsquedas en internet, parte de Alphabet Inc.",
    "Amazon": "Amazon.com, Inc. es la mayor tienda online del mundo, centrada en e-commerce y servicios cloud (AWS).",
    "Tesla": "Tesla Inc. es pionera en automóviles eléctricos y energías limpias, fundada por Elon Musk.",
    "Microsoft": "Microsoft Corp. desarrolla sistemas operativos (Windows), software y servicios en la nube.",
    "Meta": "Meta Platforms Inc. es la empresa matriz de Facebook, Instagram y WhatsApp.",
    "Samsung": "Samsung Electronics es una empresa surcoreana líder en electrónica y smartphones.",
    "Intel": "Intel Corp. es una de las mayores fabricantes de chips y microprocesadores del mundo.",
    "IBM": "IBM es una empresa de tecnología e innovación enfocada en IA y soluciones empresariales.",
    "Nvidia": "Nvidia Corporation es famosa por sus tarjetas gráficas y avances en IA y GPU computing."
  };
  return {
    nombre,
    descripcion: descripcionesGPT[nombre] || "Sin descripción disponible.",
    sector: "Tecnología",
    pais: "EE.UU.",
    valorActual: `$${(500 + Math.random() * 1000).toFixed(2)}`
  };
}

// Simulación de GPT como fallback (sin conexión real)
async function obtenerMonedasDesdeGPT() {
  return {
    EUR: 0.93,
    GBP: 0.79,
    JPY: 155.4,
    PEN: 3.7,
    BRL: 5.25
  };
}

async function obtenerCriptosDesdeGPT() {
  return [
    { id: "bitcoin", name: "Bitcoin", current_price: 67250 },
    { id: "ethereum", name: "Ethereum", current_price: 3765 },
    { id: "solana", name: "Solana", current_price: 148 }
  ];
}
