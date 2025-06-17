let cache = {
  monedas: { tiempo: 0, datos: [] },
  criptos: { tiempo: 0, datos: [] },
  empresas: { tiempo: 0, datos: [] },
};

async function obtenerMonedas() {
  const ahora = Date.now();
  if (ahora - cache.monedas.tiempo < CONFIG.tiempoDatos) return cache.monedas.datos;

  try {
    const res = await fetch(CONFIG.monedasAPI);
    const data = await res.json();
    const lista = Object.keys(data.rates || {});
    cache.monedas = { tiempo: ahora, datos: lista };
    return lista;
  } catch (error) {
    console.error("Error al obtener monedas:", error);
    return cache.monedas.datos; // Modo offline
  }
}

async function obtenerCriptos() {
  const ahora = Date.now();
  if (ahora - cache.criptos.tiempo < CONFIG.tiempoDatos) return cache.criptos.datos;

  try {
    const res = await fetch(CONFIG.criptosAPI);
    const data = await res.json();
    const lista = data.map(c => `${c.name} (${c.symbol.toUpperCase()})`);
    cache.criptos = { tiempo: ahora, datos: lista };
    return lista;
  } catch (error) {
    console.error("Error al obtener criptos:", error);
    return cache.criptos.datos;
  }
}

async function obtenerDatos(tipo, id, periodo = "1d") {
  await new Promise((res) => setTimeout(res, 300)); // simula espera de red

  const len = periodo === "realtime" ? 20 : { "1h": 6, "1d": 24, "1w": 7, "1m": 30 }[periodo] || 24;
  const vals = Array.from({ length: len }, () => Math.random() * 100 + 50);
  const labs = vals.map((_, i) => `${i + 1}`);

  return {
    vals,
    labs,
    descripcion: "Datos generados para visualización.",
    valor: vals[vals.length - 1],
  };
}

function crearElemento(tag, clase = "", texto = "") {
  const el = document.createElement(tag);
  if (clase) el.className = clase;
  if (texto) el.textContent = texto;
  return el;
}

function limpiarContenedor(id) {
  const contenedor = document.getElementById(id);
  if (contenedor) contenedor.innerHTML = "";
}

function aplicarModoOscuro(activo) {
  if (activo) {
    document.body.classList.add("dark");
  } else {
    document.body.classList.remove("dark");
  }
}
