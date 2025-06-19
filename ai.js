// Variables globales para IA
const selectPregunta = document.getElementById("pregunta-ia");
const respuestaIA = document.getElementById("respuesta-ia");
const iaCargando = document.getElementById("ia-cargando");

// Cargar preguntas en dropdown
function cargarPreguntas() {
  preguntasIA.forEach(p => {
    const option = document.createElement("option");
    option.value = p;
    option.textContent = p;
    selectPregunta.appendChild(option);
  });
}

// Función para consultar IA (simulación fetch real con proxy y cascada)
async function consultarIA(pregunta) {
  if (!pregunta) return;

  iaCargando.style.display = "block";
  respuestaIA.textContent = "";

  try {
    // Aquí implementa fetchHTML u otro fetch real si tienes proxy activo
    const respuestaTexto = await fetchRespuestaSimulada(pregunta);

    // Procesar respuesta (simulación)
    respuestaIA.innerHTML = `<p>${respuestaTexto.text}</p>`;

    // Si respuesta tiene gráfico, emitir evento para graficar
    if (respuestaTexto.datosGrafico) {
      const event = new CustomEvent("mostrarGrafico", { detail: { datos: respuestaTexto.datosGrafico, contenedor: respuestaIA } });
      document.dispatchEvent(event);
    }

  } catch (error) {
    respuestaIA.textContent = "No se pudo interpretar respuesta.";
  } finally {
    iaCargando.style.display = "none";
  }
}

// Simulación respuesta IA con gráfico y texto
async function fetchRespuestaSimulada(pregunta) {
  // Aquí podría implementarse fetch real con proxy, por ahora simulamos

  const respuestas = {
    "¿Qué es una criptomoneda?": { text: "Una criptomoneda es una moneda digital descentralizada que utiliza criptografía para asegurar transacciones.", datosGrafico: null },
    "Precio del oro": {
      text: "Gráfico de precios del oro en la última semana:",
      datosGrafico: [
        { x: "Día 1", y: 180 },
        { x: "Día 2", y: 177 },
        { x: "Día 3", y: 149 },
        { x: "Día 4", y: 176 },
        { x: "Día 5", y: 157 },
        { x: "Día 6", y: 138 },
        { x: "Día 7", y: 136 }
      ]
    }
  };

  return respuestas[pregunta] || { text: "No tengo información para esa pregunta.", datosGrafico: null };
}

// Evento cambio en select
selectPregunta.addEventListener("change", () => {
  const pregunta = selectPregunta.value;
  consultarIA(pregunta);
});

// Inicialización IA
function iniciarIA() {
  cargarPreguntas();
  // Consultar pregunta inicial para activar IA desde el inicio
  if (preguntasIA.length > 0) {
    consultarIA(preguntasIA[0]);
  }
}
