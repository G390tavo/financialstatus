function preguntarIA(pregunta) {
  const respuestaIA = document.getElementById("respuesta-ia");
  if (!respuestaIA) return;

  const respuestas = {
    "¿Qué es FinancialStatus?": "Es una plataforma para consultar datos financieros reales con ayuda de una IA.",
    "¿Qué puedo hacer aquí?": "Puedes ver valores reales de monedas, criptos y empresas con gráficas automáticas.",
    "¿Cómo obtiene los datos?": "Utiliza web scraping real desde buscadores como Google, usando un proxy local.",
    "¿Qué más hace la IA?": "Explica términos financieros, interpreta resultados y genera gráficas automáticas."
  };

  const respuesta = respuestas[pregunta] || "Estoy aprendiendo... intenta con otra pregunta.";
  respuestaIA.innerHTML = `<p><strong>Pregunta:</strong> ${pregunta}</p><p><strong>Respuesta IA:</strong> ${respuesta}</p>`;
}
