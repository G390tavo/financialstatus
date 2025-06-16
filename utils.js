async function obtenerMonedas() {
  try {
    const res = await fetch(CONFIG.monedasAPI);
    const data = await res.json();
    return Object.keys(data.rates);
  } catch (error) {
    console.error("Error al obtener monedas:", error);
    return [];
  }
}

async function obtenerCriptos() {
  try {
    const res = await fetch(CONFIG.criptosAPI);
    const data = await res.json();
    return data.map(c => `${c.name} (${c.symbol.toUpperCase()})`);
  } catch (error) {
    console.error("Error al obtener criptos:", error);
    return [];
  }
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
