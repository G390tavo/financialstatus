// ✅ ai.js — Versión con búsqueda en internet y datos reales (web scraping indirecto)
(function () {
  const memoriaTemporal = new Map();

  function almacenarEnMemoria(pregunta, respuesta) {
    memoriaTemporal.set(pregunta, { respuesta, timestamp: Date.now() });
    setTimeout(() => memoriaTemporal.delete(pregunta), 5 * 60 * 1000);
  }

  function buscarEnMemoria(pregunta) {
    const dato = memoriaTemporal.get(pregunta);
    return dato ? dato.respuesta : null;
  }

  async function buscarDatosExternos(pregunta) {
    mostrarRespuestaIA("Buscando en internet...");

    try {
      const query = encodeURIComponent(pregunta);
      const proxy = `https://api.allorigins.win/raw?url=https://www.bing.com/search?q=${query}`;

      const res = await fetch(proxy);
      const texto = await res.text();

      const fragmento = extraerTexto(texto);
      return fragmento || "No se encontró una respuesta clara.";
    } catch (e) {
      return "Error al buscar en internet.";
    }
  }

  function extraerTexto(html) {
    const doc = document.implementation.createHTMLDocument("temp");
    doc.documentElement.innerHTML = html;
    const snippet = doc.querySelector("p, .b_caption, .b_snippet");
    return snippet ? snippet.textContent.trim() : null;
  }

  const respuestasPredefinidas = {
    "¿qué es una acción?": "Una acción representa una parte proporcional del capital de una empresa.",
    "¿qué es forex?": "Forex es el mercado de divisas donde se intercambian monedas globales.",
  };

  async function responder(pregunta) {
    const salida = document.getElementById("respuestaIA");
    if (!salida) return;

    const p = pregunta.toLowerCase().trim();
    const mem = buscarEnMemoria(p);
    if (mem) return mostrarRespuestaIA("(memoria): " + mem);

    if (respuestasPredefinidas[p]) {
      almacenarEnMemoria(p, respuestasPredefinidas[p]);
      return mostrarRespuestaIA(respuestasPredefinidas[p]);
    }

    const dato = await buscarDatosExternos(p);
    almacenarEnMemoria(p, dato);
    mostrarRespuestaIA(dato);
  }

  function mostrarRespuestaIA(txt) {
    const contenedor = document.getElementById("respuestaIA");
    if (contenedor) contenedor.textContent = txt;
  }

  window.FinancialAI = { responder };
})();
