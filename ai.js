// Simulación de IA integrada sin API externa
function iniciarIA() {
  const bloqueIA = document.getElementById("ia-output");
  const preguntasPredefinidas = [
    "¿Qué es esta aplicación?",
    "¿Cómo puedo ver el precio del dólar?",
    "¿Qué empresas se muestran?",
    "¿Qué criptomonedas incluye?",
    "¿Cómo interpretar los gráficos?",
  ];

  let respuesta = "Bienvenido a FinancialStatus, una app para ver precios reales de monedas, criptos y empresas. Pregunta algo como:\n\n";
  preguntasPredefinidas.forEach(p => {
    respuesta += `• ${p}\n`;
  });

  bloqueIA.textContent = respuesta;
}

function responderIA(pregunta) {
  const bloque = document.getElementById("ia-output");

  const respuestas = {
    "precio del dólar": "Para ver el precio del dólar, ve a la sección de monedas.",
    "precio del bitcoin": "Bitcoin está en la sección de criptomonedas.",
    "empresas": "Mostramos valores de empresas como Apple, Amazon, Google, etc.",
    "cómo ver": "Haz clic en la sección correspondiente y se mostrarán resultados reales.",
    "graficos": "Los gráficos muestran el valor en el tiempo de forma simple y conectada.",
  };

  const clave = Object.keys(respuestas).find(k => pregunta.toLowerCase().includes(k));
  if (clave) {
    bloque.textContent = respuestas[clave];
  } else {
    bloque.textContent = "No se pudo obtener datos en tiempo real. Verifica tu conexión o cambia de pregunta.";
  }
}
