const preguntasPredefinidas = [
  "¿Cómo usar la aplicación?",
  "¿Qué significan las variaciones?",
  "¿De dónde provienen los datos?",
  "¿Por qué no se carga algún gráfico?",
  "¿Qué es una criptomoneda?",
  "¿Cuál es la diferencia entre una acción y una moneda?",
  "¿Cómo interpretar un gráfico de línea?"
];

document.addEventListener("DOMContentLoaded", () => {
  const selectIA = document.getElementById("pregunta-ia");
  const respuestaIA = document.getElementById("respuesta-ia");
  const cargandoIA = document.getElementById("ia-cargando");

  if (!selectIA || !respuestaIA) return;

  preguntasPredefinidas.forEach(p => {
    const opt = document.createElement("option");
    opt.value = p;
    opt.textContent = p;
    selectIA.appendChild(opt);
  });

  selectIA.addEventListener("change", async () => {
    const pregunta = selectIA.value;
    if (!pregunta) return;
    cargandoIA.style.display = "block";
    respuestaIA.textContent = "";
    const respuesta = await responderPreguntaIA(pregunta);
    respuestaIA.textContent = respuesta;
    cargandoIA.style.display = "none";
  });
});

async function responderPreguntaIA(pregunta) {
  if (pregunta.includes("usar")) {
    return "Usa el menú lateral para navegar entre secciones como monedas, criptos, empresas e IA.";
  } else if (pregunta.includes("variaciones")) {
    return "Las variaciones muestran el cambio reciente del valor. Verde es subida, rojo es bajada.";
  } else if (pregunta.includes("provienen")) {
    return "Los datos provienen de CoinMarketCap, Wise y Investing, mediante scraping con proxy.";
  } else if (pregunta.includes("no se carga")) {
    return "Puede deberse a fallos de red, fuente caída o bloqueo de contenido. Intenta recargar.";
  } else if (pregunta.includes("criptomoneda")) {
    return "Una criptomoneda es una moneda digital descentralizada, como Bitcoin o Ethereum.";
  } else if (pregunta.includes("acción") || pregunta.includes("moneda")) {
    return "Una acción representa parte de una empresa. Una moneda es un medio de intercambio.";
  } else if (pregunta.includes("gráfico de línea")) {
    return "Un gráfico de línea muestra la evolución del valor a lo largo del tiempo.";
  } else {
    return "No tengo una respuesta específica para esa pregunta aún.";
  }
}
