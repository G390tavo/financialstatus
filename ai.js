// ai.js

import { graficar, generarHistorial, mostrarError } from "./utils.js";

document.addEventListener("DOMContentLoaded", () => {
  const areaIA = document.getElementById("ia");
  const botonIA = document.getElementById("btn-activar-ia");
  const contenedorRespuestas = document.getElementById("ia-respuesta");
  const grafico = document.getElementById("grafico");

  let iaActiva = false;

  const respuestas = {
    "¿Qué hace esta app?": "Esta aplicación muestra información económica actual como monedas, criptomonedas, empresas y genera gráficos en tiempo real. Usa IA integrada.",
    "¿Cómo obtiene los datos?": "Los datos se obtienen en tiempo real usando técnicas de scraping desde fuentes públicas como Google, sin depender de APIs externas.",
    "¿Puede hacer gráficos automáticos?": "Sí, la IA crea gráficos automáticamente con base en los valores actuales de criptomonedas, monedas y empresas del mercado.",
    "¿Qué criptomonedas soporta?": "Por ahora Bitcoin, Ethereum y USDT. Se planea agregar más en próximas versiones.",
    "¿Qué empresas están disponibles?": "Empresas como Apple, Google, Amazon, Tesla y Microsoft están disponibles con historial y gráficas."
  };

  function crearPregunta(pregunta) {
    const btn = document.createElement("button");
    btn.textContent = pregunta;
    btn.classList.add("pregunta-ia");
    btn.addEventListener("click", () => {
      responderIA(pregunta);
    });
    return btn;
  }

  function responderIA(pregunta) {
    const respuesta = respuestas[pregunta] || "No tengo una respuesta para eso aún.";
    contenedorRespuestas.innerHTML = `<div class="respuesta-ia"><strong>${pregunta}</strong><br>${respuesta}</div>`;
    grafico.innerHTML = ""; // Limpia gráfico al responder pregunta
  }

  botonIA.addEventListener("click", () => {
    iaActiva = !iaActiva;
    if (iaActiva) {
      botonIA.disabled = true;
      areaIA.querySelector("h2").textContent = "Pregúntale a la IA";
      contenedorRespuestas.innerHTML = "<p>Estoy lista para responder. Elige una pregunta:</p>";

      Object.keys(respuestas).forEach(preg => {
        contenedorRespuestas.appendChild(crearPregunta(preg));
      });
    }
  });

  // Introducción al iniciar IA
  const intro = document.createElement("p");
  intro.textContent = "Bienvenido a la IA económica. Haz clic para activarla.";
  areaIA.insertBefore(intro, botonIA);
});
