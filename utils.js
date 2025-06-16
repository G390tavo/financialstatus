const utils = {
  obtenerMonedas: async function () {
    try {
      const res = await fetch(CONFIG.monedasAPI);
      const data = await res.json();
      return data && data.rates ? Object.keys(data.rates) : [];
    } catch (error) {
      console.error("Error al obtener monedas:", error);
      return [];
    }
  },

  obtenerCriptos: async function () {
    try {
      const res = await fetch(CONFIG.criptosAPI);
      const data = await res.json();
      return data.map(c => `${c.name} (${c.symbol.toUpperCase()})`);
    } catch (error) {
      console.error("Error al obtener criptos:", error);
      return [];
    }
  },

  crearElemento: function (tag, clase = "", texto = "") {
    const el = document.createElement(tag);
    if (clase) el.className = clase;
    if (texto) el.textContent = texto;
    return el;
  },

  limpiarContenedor: function (id) {
    const contenedor = document.getElementById(id);
    if (contenedor) contenedor.innerHTML = "";
  },

  aplicarModoOscuro: function (activo) {
    if (activo) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }
};
