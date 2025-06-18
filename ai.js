// ai.js
import { FUENTES_CRIPTO, FUENTES_MONEDAS, FUENTES_EMPRESAS, PREGUNTAS_PREDEFINIDAS } from "./config.js";
import { crearElemento, mostrarError } from "./utils.js";

document.addEventListener("DOMContentLoaded", () => {
  const seccionIA = document.getElementById("ia");
  const contenedorPreguntas = document.getElementById("preguntas");
  const contenedorGrafico = document.getElementById("grafico");

  function iniciarIA() {
    if (!seccionIA || !contenedorPreguntas || !contenedorGrafico) {
      console.warn("IA no inicializada. Faltan elementos.");
      return;
    }

    seccionIA.querySelector("p").textContent = "¡Hola! Soy la IA de FinancialStatus. Selecciona una pregunta para comenzar.";

    PREGUNTAS_PREDEFINIDAS.forEach(pregunta => {
      const btn = crearElemento("button", pregunta, "pregunta");
      btn.addEventListener("click", () => responderPregunta(pregunta));
      contenedorPreguntas.appendChild(btn);
    });
  }

  async function responderPregunta(pregunta) {
    contenedorGrafico.innerHTML = "<p>Cargando datos...</p>";

    try {
      const url = definirFuenteDesdePregunta(pregunta);
      if (!url) {
        mostrarError("Pregunta no reconocida.");
        return;
      }

      const html = await obtenerHTMLConProxy(url);
      const valor = extraerValorDesdeHTML(html);

      if (!valor) {
        mostrarError("No se pudo obtener datos en tiempo real. Verifica tu conexión o cambia de pregunta.");
        return;
      }

      mostrarGraficoSimulado(pregunta, valor);

    } catch (e) {
      mostrarError("Error al conectar: " + e.message);
    }
  }

  function definirFuenteDesdePregunta(pregunta) {
    if (pregunta.includes("Bitcoin")) return FUENTES_CRIPTO[0];
    if (pregunta.includes("dólar")) return FUENTES_MONEDAS[0];
    if (pregunta.includes("Apple")) return FUENTES_EMPRESAS[0].url;
    return null;
  }

  async function obtenerHTMLConProxy(url) {
    const respuesta = await fetch(`http://localhost:3000/fetch?url=${encodeURIComponent(url)}`);
    const data = await respuesta.text();
    return data;
  }

  function extraerValorDesdeHTML(html) {
    const match = html.match(/<span[^>]*>(\d{1,3}(?:[\.,]\d{1,3})*)<\/span>/);
    return match ? match[1] : null;
  }

  function mostrarGraficoSimulado(titulo, valorActual) {
    const grafico = document.createElement("div");
    grafico.className = "grafico";

    grafico.innerHTML = `
      <h3>${titulo}</h3>
      <p>Valor actual: <strong>${valorActual}</strong></p>
      <canvas id="graficoCanvas"></canvas>
    `;

    contenedorGrafico.innerHTML = "";
    contenedorGrafico.appendChild(grafico);

    // Simular datos para gráfica
    const datos = Array.from({ length: 7 }, () => parseFloat(valorActual) + (Math.random() - 0.5) * 10);
    graficar(datos, titulo);
  }

  function graficar(datos, titulo) {
    const ctx = document.getElementById("graficoCanvas").getContext("2d");

    new Chart(ctx, {
      type: "line",
      data: {
        labels: ["Hace 6 días", "5", "4", "3", "2", "1", "Hoy"],
        datasets: [{
          label: titulo,
          data: datos,
          borderColor: "green",
          borderWidth: 2,
          pointBackgroundColor: "black",
          fill: false
        }]
      }
    });
  }

  iniciarIA();
});
