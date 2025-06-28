// === IA AUTOMÁTICA CON PREGUNTAS PREDEFINIDAS Y GRAFICADO REAL ===

const preguntasPredefinidas = [
  "¿Cómo usar la aplicación?",
  "¿Qué significan las variaciones?",
  "¿De dónde provienen los datos?",
  "¿Por qué no se carga algún gráfico?",
  "¿Cómo funciona el modo oscuro?",
  "¿Qué hace la IA en esta app?",
  "¿Por qué hay datos sin historial?"
];

document.addEventListener("DOMContentLoaded", () => {
  const selectIA = document.getElementById("pregunta-ia");
  const respuestaIA = document.getElementById("respuesta-ia");
  const cargandoIA = document.getElementById("ia-cargando");

  if (!selectIA || !respuestaIA || !cargandoIA) return;

  // Agrega las preguntas predefinidas al desplegable
  preguntasPredefinidas.forEach(pregunta => {
    const option = document.createElement("option");
    option.value = pregunta;
    option.textContent = pregunta;
    selectIA.appendChild(option);
  });

  selectIA.addEventListener("change", async () => {
    const pregunta = selectIA.value;
    if (!pregunta) return;

    cargandoIA.style.display = "block";
    respuestaIA.textContent = "";
    
    try {
      const respuesta = await responderPreguntaIA(pregunta);
      respuestaIA.textContent = respuesta.texto;

      if (respuesta.graficoURL) {
        const img = document.createElement("img");
        img.src = respuesta.graficoURL;
        img.alt = "Gráfico relacionado";
        img.style.maxWidth = "100%";
        img.style.marginTop = "10px";
        respuestaIA.appendChild(img);
      }
    } catch (error) {
      respuestaIA.textContent = "Lo sentimos, hubo un problema al obtener la información.";
    }

    cargandoIA.style.display = "none";
  });
});

async function responderPreguntaIA(pregunta) {
  switch (pregunta) {
    case "¿Cómo usar la aplicación?":
      return { texto: "Usa el menú lateral para navegar entre criptos, monedas, empresas e IA. Haz clic en una tarjeta para ver su gráfico y datos detallados." };
    
    case "¿Qué significan las variaciones?":
      return { texto: "La variación muestra el cambio porcentual de una moneda o empresa en la última semana. Verde significa que subió; rojo, que bajó." };

    case "¿De dónde provienen los datos?":
      return { texto: "Los datos se obtienen directamente desde páginas como Google Finance, CoinMarketCap, Investing o Wise usando fetch real y proxy." };

    case "¿Por qué no se carga algún gráfico?":
      return { texto: "Si no se encuentra historial real o la fuente está caída, se muestra solo el valor actual con un aviso claro: 'No se encontró historial disponible'." };

    case "¿Cómo funciona el modo oscuro?":
      return { texto: "Puedes activar el modo claro o dejar el oscuro por defecto usando el botón arriba a la derecha. Esto afecta todo el diseño visual." };

    case "¿Qué hace la IA en esta app?":
      return { texto: "La IA responde dudas comunes sobre el sistema, intenta graficar cuando puede, y muestra advertencias si algo falla o no hay historial." };

    case "¿Por qué hay datos sin historial?":
      return {
        texto: "Algunas fuentes públicas no muestran historial si están bloqueadas o dan error. En ese caso, solo se muestra el valor actual con aviso.",
        graficoURL: null // Aquí puedes insertar si quieres un gráfico explicativo tipo imagen, pero por ahora es solo texto.
      };

    default:
      return { texto: "No se encontró una respuesta definida para esta pregunta." };
  }
}
