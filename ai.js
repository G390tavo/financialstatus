function ejecutarIA() {
  const input = document.getElementById("pregunta-ia");
  const respuesta = document.getElementById("respuesta-ia");
  const cargando = document.getElementById("ia-cargando");

  if (!input || !respuesta) return;

  const pregunta = input.value.toLowerCase().trim();
  respuesta.innerHTML = "";
  cargando.style.display = "block";

  setTimeout(() => {
    cargando.style.display = "none";

    if (pregunta.includes("dólar") || pregunta.includes("usd")) {
      respuesta.innerHTML = "El dólar se encuentra actualmente en S/. 3.80 según Google.";
    } else if (pregunta.includes("bitcoin")) {
      respuesta.innerHTML = "El precio de Bitcoin ronda los $65,000 según búsquedas recientes.";
    } else if (pregunta.includes("empresa") || pregunta.includes("apple")) {
      respuesta.innerHTML = "Apple cotiza en NASDAQ bajo el símbolo AAPL con un valor estimado de $213.";
    } else if (pregunta.includes("cómo funciona")) {
      respuesta.innerHTML = "Esta aplicación usa web scraping a través de un proxy para evitar restricciones CORS.";
    } else {
      respuesta.innerHTML = "Lo siento, aún estoy aprendiendo. Prueba con otra pregunta relacionada a finanzas.";
    }
  }, 800);
}
