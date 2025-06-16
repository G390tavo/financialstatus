(function () {
  const memoriaTemporal = new Map();

  function almacenarEnMemoria(pregunta, respuesta) {
    memoriaTemporal.set(pregunta, { respuesta, timestamp: Date.now() });

    setTimeout(() => {
      memoriaTemporal.delete(pregunta);
    }, 5 * 60 * 1000); // 5 minutos
  }

  function buscarEnMemoria(pregunta) {
    const entry = memoriaTemporal.get(pregunta);
    if (!entry) return null;
    return entry.respuesta;
  }

  function simularBusquedaOnline(pregunta) {
    mostrarRespuestaIA("Buscando en internet...");
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(
          `Resultado simulado para: "${pregunta}". En una futura versión se integrará scraping real.`
        );
      }, 1500);
    });
  }

  const respuestasPredefinidas = {
    "¿qué es una acción?": "Una acción es una parte proporcional del capital de una empresa. Representa propiedad parcial.",
    "¿qué es una criptomoneda?": "Una criptomoneda es un activo digital que utiliza criptografía para garantizar transacciones seguras.",
    "¿qué es el análisis técnico?": "El análisis técnico estudia gráficos de precios y volúmenes para predecir movimientos futuros.",
    "¿cómo invertir en bolsa?": "Para invertir en bolsa necesitas una cuenta en una casa de valores o bróker, y conocer los riesgos.",
    "¿qué es forex?": "Forex es el mercado de divisas donde se negocian monedas a nivel global.",
  };

  function responder(pregunta) {
    pregunta = pregunta.toLowerCase().trim();

    const salida = document.getElementById("respuestaIA");
    if (!salida) return;

    const respuestaMem = buscarEnMemoria(pregunta);
    if (respuestaMem) {
      mostrarRespuestaIA(`(memoria): ${respuestaMem}`);
      return;
    }

    if (respuestasPredefinidas[pregunta]) {
      const respuesta = respuestasPredefinidas[pregunta];
      almacenarEnMemoria(pregunta, respuesta);
      mostrarRespuestaIA(respuesta);
    } else {
      simularBusquedaOnline(pregunta).then(respuesta => {
        almacenarEnMemoria(pregunta, respuesta);
        mostrarRespuestaIA(respuesta);
      });
    }
  }

  function mostrarRespuestaIA(texto) {
    const salida = document.getElementById("respuestaIA");
    if (!salida) return;
    salida.textContent = texto;
  }

  // Exponer globalmente
  window.FinancialAI = {
    responder,
  };
})();
