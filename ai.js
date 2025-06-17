class FinancialAI {
  constructor(mensajesBase) {
    this.mensajes = mensajesBase || [];
    this.cacheDatos = {};
    this.ultimoFetch = 0;
    this.cajaRespuestas = document.getElementById("respuestasIA");
    this.selectorPreguntas = document.getElementById("preguntasIA");
    this.selectorPreguntas.addEventListener("change", () => this.responder());
    this.inicializarPreguntas();
  }

  inicializarPreguntas() {
    this.selectorPreguntas.innerHTML = "";
    const opcion = document.createElement("option");
    opcion.textContent = "Selecciona una pregunta";
    opcion.disabled = true;
    opcion.selected = true;
    this.selectorPreguntas.appendChild(opcion);

    CONFIG.mensajesIA.forEach(p => {
      const opt = document.createElement("option");
      opt.value = p.pregunta;
      opt.textContent = p.pregunta;
      this.selectorPreguntas.appendChild(opt);
    });
  }

  async responder() {
    const pregunta = this.selectorPreguntas.value;
    const respuestaLocal = CONFIG.mensajesIA.find(p => p.pregunta === pregunta);
    this.mostrarRespuesta("Buscando información...");

    if (respuestaLocal) {
      this.mostrarRespuesta(respuestaLocal.respuesta);
    } else {
      const respuestaOnline = await this.buscarEnInternet(pregunta);
      this.mostrarRespuesta(respuestaOnline || "No se pudo obtener una respuesta útil en este momento.");
    }
  }

  mostrarRespuesta(texto) {
    this.cajaRespuestas.textContent = texto;
  }

  async buscarEnInternet(pregunta) {
    const ahora = Date.now();
    if (this.cacheDatos[pregunta] && (ahora - this.ultimoFetch < CONFIG.tiempoDatos)) {
      return this.cacheDatos[pregunta];
    }

    try {
      const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent("https://www.google.com/search?q=" + encodeURIComponent(pregunta))}`);
      const data = await response.json();
      const html = data.contents;
      const resumen = this.extraerSnippet(html);
      this.cacheDatos[pregunta] = resumen;
      this.ultimoFetch = ahora;
      return resumen;
    } catch (error) {
      console.error("Error al buscar online:", error);
      return null;
    }
  }

  extraerSnippet(html) {
    const match = html.match(/<div class="BNeawe[^>]*>(.*?)<\/div>/);
    if (match && match[1]) {
      return match[1];
    }
    return "No se encontró información específica. Intenta otra pregunta.";
  }
}

// Inicialización global
function setupGlobal() {
  if (window.CONFIG && document.getElementById("preguntasIA")) {
    window.FinancialAppAI = new FinancialAI(CONFIG.mensajesIA);
  } else {
    console.warn("AI no inicializada. Faltan elementos.");
  }
}

document.addEventListener("DOMContentLoaded", setupGlobal);
