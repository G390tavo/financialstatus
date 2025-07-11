const preguntasPredefinidas = [
  "¿Qué es Bitcoin?",
  "¿Qué significa la variación?",
  "¿Cuál es la fuente de los datos?",
  "¿Cuál es el precio actual del dólar?",
  "¿Cómo leer los gráficos de esta app?",
  "¿Explícame Ethereum?"
];

async function responderPreguntaIA(pregunta) {
  const texto = pregunta.toLowerCase();

  if (texto.includes("bitcoin")) {
    try {
      const html = await intentarFuentes(obtenerFuentesConProxy("criptos"));
      const valor = extraerValorDesdeHTML(html, ".priceValue");
      const variacion = extraerValorDesdeHTML(html, ".sc-15yy2pl-0.feeyND");
      return `El precio actual de Bitcoin es ${valor} con una variación de ${variacion}. Bitcoin es una criptomoneda altamente volátil usada como activo digital.`;
    } catch {
      return "No se pudo obtener el valor de Bitcoin.";
    }
  }

  if (texto.includes("variación")) {
    return "La variación indica el cambio porcentual del precio. Si es positiva, el valor ha subido; si es negativa, ha bajado.";
  }

  if (texto.includes("dólar") || texto.includes("usd")) {
    try {
      const html = await intentarFuentes(obtenerFuentesConProxy("monedas"));
      const valor = extraerValorDesdeHTML(html, ".text-success, .text-error");
      return `El dólar (USD a PEN) está a ${valor}, según Wise.com.`;
    } catch {
      return "No se pudo obtener el valor del dólar.";
    }
  }

  if (texto.includes("fuente")) {
    return "Los datos se obtienen desde CoinMarketCap, Wise y otras fuentes públicas mediante scraping usando proxy.";
  }

  if (texto.includes("leer") && texto.includes("gráfico")) {
    return "Nuestros gráficos muestran la evolución de precios. El eje X representa el tiempo, y el eje Y representa el precio.";
  }

  if (typeof location !== "undefined" && location.hostname === "localhost") {
    return await preguntarAOpenRouter(pregunta);
  } else {
    return "La IA avanzada está disponible solo en modo local con backend activo.";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const select = document.getElementById("pregunta-ia");
  const input = document.getElementById("pregunta-manual");
  const boton = document.getElementById("preguntar-manual");
  const respuesta = document.getElementById("respuesta-ia");
  const cargando = document.getElementById("ia-cargando");

  preguntasPredefinidas.forEach(p => {
    const opcion = document.createElement("option");
    opcion.textContent = p;
    opcion.value = p;
    select.appendChild(opcion);
  });

  select.addEventListener("change", async () => {
    cargando.style.display = "block";
    const texto = await responderPreguntaIA(select.value);
    cargando.style.display = "none";
    respuesta.textContent = texto;
  });

  boton.addEventListener("click", async () => {
    const pregunta = input.value.trim();
    if (!pregunta) return;
    cargando.style.display = "block";
    const texto = await responderPreguntaIA(pregunta);
    cargando.style.display = "none";
    respuesta.textContent = texto;
  });
});
