const FinancialAI = {
  respuestas: {
    "¿Qué es una acción?": "Una acción es una parte del capital social de una empresa. Representa propiedad parcial y da derecho a beneficios económicos como dividendos.",
    "¿Qué es forex?": "Forex es el mercado de divisas donde se compran y venden monedas internacionales. Es uno de los mercados más líquidos del mundo."
  },

  responder: function (texto) {
    const div = document.getElementById("respuestaIA");
    if (!texto || !this.respuestas[texto]) {
      div.textContent = "Por favor selecciona una pregunta válida del menú.";
      return;
    }
    div.textContent = "Buscando...";
    setTimeout(() => {
      div.textContent = this.respuestas[texto];
    }, 800);
  }
};
