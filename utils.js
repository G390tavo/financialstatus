const CONFIG = {
  monedaBase: "USD",
  maxEmpresas: 10,
  version: "1.7",
  gptRespaldo: true
};

async function obtenerMonedas() {
  try {
    const res = await fetch(`https://api.exchangerate.host/latest?base=${CONFIG.monedaBase}`);
    const data = await res.json();
    return data.rates;
  } catch (err) {
    console.warn("Fallo en ExchangeRate, intentando con GPT...");
    if (CONFIG.gptRespaldo) return await respaldoGPT("monedas");
    return {};
  }
}

async function obtenerCriptos() {
  try {
    const res = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1");
    const data = await res.json();
    return data.map(c => ({
      id: c.id,
      name: c.name,
      current_price: c.current_price,
      symbol: c.symbol
    }));
  } catch (err) {
    console.warn("Fallo en CoinGecko, intentando con GPT...");
    if (CONFIG.gptRespaldo) return await respaldoGPT("criptos");
    return [];
  }
}

async function obtenerEmpresaInfo(nombre) {
  try {
    const res = await fetch(`https://query1.finance.yahoo.com/v7/finance/quote?symbols=${nombre}`);
    const data = await res.json();
    const quote = data.quoteResponse.result[0];
    return {
      nombre: nombre,
      descripcion: "Descripción obtenida en línea",
      sector: "Tecnología",
      pais: quote?.region || "EE.UU.",
      valorActual: `$${quote?.regularMarketPrice || "Desconocido"}`
    };
  } catch {
    return {
      nombre,
      descripcion: "Descripción breve de " + nombre,
      sector: "Tecnología",
      pais: "EE.UU.",
      valorActual: "$607.15"
    };
  }
}

async function respaldoGPT(tipo) {
  const prompts = {
    monedas: `Dame una lista de monedas nacionales con sus tasas respecto al dólar (USD). Ejemplo: { "PEN": 3.6, "EUR": 0.9 }`,
    criptos: `Dame una lista de criptomonedas principales con su nombre, id y precio actual en USD. Ejemplo: [{ id: "bitcoin", name: "Bitcoin", current_price: 67000 }]`
  };

  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": "Bearer TU_API_KEY_GPT",  // REEMPLAZAR
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "Eres una IA experta en economía." },
          { role: "user", content: prompts[tipo] }
        ]
      })
    });

    const data = await res.json();
    const raw = data.choices[0].message.content;

    return JSON.parse(raw);
  } catch (e) {
    console.error("Error al usar GPT como respaldo:", e);
    return tipo === "monedas" ? {} : [];
  }
}
