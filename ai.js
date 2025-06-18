// Módulo IA - Preguntas básicas y asistencia de usuario

class FinancialAI {
  constructor() {
    this.respuestas = {
      funciona: "Esta aplicación permite visualizar precios actualizados de monedas, criptomonedas y empresas, junto con explicaciones básicas gracias a una IA integrada.",
      tutorial: "Selecciona una categoría como Monedas, Criptomonedas o Empresas. Al hacer clic en una opción, verás información y gráficos. También puedes preguntarle a la IA para entender mejor.",
      info: "Las criptomonedas son activos digitales que utilizan criptografía para garantizar transacciones seguras. Ejemplos incluyen Bitcoin, Ethereum y muchas más.",
    };
  }

  responder(pregunta) {
    return this.respuestas[pregunta] || "Lo siento, aún no tengo respuesta para eso.";
  }
}

let IA = null;

function setupGlobalIA() {
  IA = new FinancialAI();

  const select = document.getElementById("ia-preguntas");
  const btn = document.getElementById("preguntar");
  const salida = document.getElementById("ia-respuesta");

  if (!select || !btn || !salida) {
    console.warn("AI no inicializada. Faltan elementos.");
    return;
  }

  btn.addEventListener("click", () => {
    const pregunta = select.value;
    const respuesta = IA.responder(pregunta);
    salida.innerText = respuesta;
  });
}

export { setupGlobalIA };
