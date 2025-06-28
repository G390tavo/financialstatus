// Archivo: ai.js

function obtenerRespuestaIA(pregunta) {
  const respuestas = {
    "¿qué es esta app?": "FinancialStatus te muestra información en tiempo real sobre monedas, criptomonedas y empresas, incluyendo gráficos reales y una IA integrada.",
    "¿cómo funciona?": "La app usa scraping web con proxy para obtener datos reales, sin depender de APIs externas.",
    "¿qué pasa si no carga algo?": "Se mostrará un mensaje de error claro y no se usará información falsa. Solo se trabaja con datos reales.",
    "¿cómo veo criptos o monedas?": "Selecciona la sección correspondiente desde el menú lateral para ver datos y gráficos actualizados.",
    "¿puedo usar IA?": "Sí. Haz clic en la sección 'IA' y escribe una pregunta o selecciona una sugerencia para comenzar.",
    "¿por qué aparece solo un valor sin gráfico?": "Cuando no se encuentra historial real, solo se muestra el valor actual con una nota explicativa.",
    "¿qué fuentes usa?": "Usa fuentes como CoinMarketCap, Investing, Wise, entre otras confiables. Si una falla, intenta otra automáticamente."
  };

  const preguntaLimpia = pregunta.toLowerCase().trim();
  return respuestas[preguntaLimpia] || "Lo siento, aún no tengo una respuesta entrenada para eso. Prueba con otra pregunta relacionada a cómo funciona la app.";
}
