const preguntasPredefinidas = [
  "¿Qué es Bitcoin?",
  "¿Qué significa la variación?",
  "¿Cuál es la fuente de los datos?",
  "¿Cuál es el precio actual del dólar?",
  "¿Cómo leer los gráficos de esta app?",
  "Explícame Ethereum"
];

async function responderPreguntaIA(pregunta) {
  const texto = pregunta.toLowerCase();

  if (texto.includes("bitcoin")) {
    try {
      const html = await intentarFuentes(obtenerFuentesConProxy("criptos"));
      const valor = extraerValorDesdeHTML(html, ".priceValue");
      const variacion = extraerValorDesdeHTML(html, ".sc-15yy2pl-0.feeyND");
      return `El precio actual de Bitcoin es ${valor} con una variación de ${variacion}. Bitcoin es una criptomoneda usada como activo digital descentralizado.`;
    } catch {
      return "No se pudo obtener el valor actual de Bitcoin.";
    }
  }

  if (texto.includes("ethereum")) {
    return "Ethereum es una plataforma descentralizada que permite la creación de contratos inteligentes. Su criptomoneda, Ether, se usa tanto para transacciones como para operar dentro de su red.";
  }

  if (texto.includes("variación")) {
    return "La variación muestra cuánto ha cambiado el valor respecto a un periodo anterior. Si es positiva, subió; si es negativa, bajó.";
  }

  if (texto.includes("dólar") || texto.includes("usd")) {
    try {
      const html = await intentarFuentes(obtenerFuentesConProxy("monedas"));
      const valor = extraerValorDesdeHTML(html, ".text-success, .text-error");
      return `El dólar estadounidense (USD a PEN) tiene un valor aproximado de ${valor}, según Wise.`;
    } catch {
      return "No se pudo obtener el valor actual del dólar.";
    }
  }

  if (texto.includes("fuente")) {
    return "Los datos provienen de sitios como CoinMarketCap, Wise y Investing. Se obtienen mediante scraping utilizando múltiples proxys.";
  }

  if (texto.includes("gráfico")) {
    return "Los gráficos muestran la evolución de precios. El eje horizontal representa el tiempo y el vertical, el valor. Si la línea sube, el precio aumentó; si baja, disminuyó.";
  }

  // IA real solo si se ejecuta local con backend
  if (typeof location !== "undefined" && location.hostname === "localhost") {
    return await preguntarAOpenRouter(pregunta);
  } else {
    return "La IA avanzada está disponible solo si activas el backend local con OpenRouter.";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const selectIA = document.getElementById("pregunta-ia");
  const inputIA = document.getElementById("pregunta-manual");
  const botonIA = document.getElementById("preguntar-manual");
  const respuestaIA = document.getElementById("respuesta-ia");
  const cargandoIA = document.getElementById("ia-cargando");

  preguntasPredefinidas.forEach(p => {
    const opt = document.createElement("option");
    opt.value = p;
    opt.textContent = p;
    selectIA.appendChild(opt);
  });

  async function procesarPregunta(pregunta) {
    if (!pregunta) return;
    cargandoIA.style.display = "block";
    respuestaIA.textContent = "";
    const respuesta = await responderPreguntaIA(pregunta);
    respuestaIA.textContent = respuesta;
    cargandoIA.style.display = "none";
  }

  selectIA.addEventListener("change", () => {
    const pregunta = selectIA.value;
    procesarPregunta(pregunta);
  });

  botonIA.addEventListener("click", () => {
    const pregunta = inputIA.value.trim();
    if (pregunta) {
      procesarPregunta(pregunta);
      inputIA.value = "";
    }
  });

  inputIA.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      botonIA.click();
    }
  });
});
