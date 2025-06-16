export class FinancialAI {
  constructor() {
    this.cache = {};
    this.tiempoCache = 5 * 60 * 1000; // 5 minutos
  }

  async responder(pregunta) {
    const ahora = Date.now();
    if (this.cache[pregunta] && ahora - this.cache[pregunta].hora < this.tiempoCache) {
      return this.cache[pregunta].respuesta;
    }

    let respuesta;
    switch (pregunta.toLowerCase()) {
      case "¿qué es una criptomoneda?":
        respuesta = "Una criptomoneda es una moneda digital descentralizada basada en criptografía que permite transacciones seguras a través de redes blockchain.";
        break;
      case "¿cómo se lee un gráfico financiero?":
        respuesta = "Los gráficos financieros representan precios a lo largo del tiempo. El eje X indica el tiempo y el eje Y el valor. Se analizan tendencias, picos y valles para tomar decisiones de inversión.";
        break;
      case "¿qué factores afectan el precio del dólar?":
        respuesta = "Factores como tasas de interés, inflación, política monetaria de la Reserva Federal y estabilidad económica influyen directamente en el valor del dólar frente a otras divisas.";
        break;
      default:
        respuesta = await this.buscarOnline(pregunta);
        break;
    }
    this.cache[pregunta] = { respuesta, hora: ahora };
    return respuesta;
  }

  async buscarOnline(pregunta) {
    try {
      const proxy = 'https://api.allorigins.win/get?url=';
      const query = encodeURIComponent(`https://www.google.com/search?q=${encodeURIComponent(pregunta)}`);
      const res = await fetch(`${proxy}${query}`);
      const data = await res.json();
      const match = data.contents.match(/<div[^>]*>(.*?)<\/div>/gi);
      return match ? this.limpiarTexto(match[0]) : "No encontré una respuesta directa, intenta con otra pregunta.";
    } catch (e) {
      return "Sin conexión o sin respuesta. Intenta más tarde.";
    }
  }

  limpiarTexto(html) {
    const tmp = document.createElement("div");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  }
}
