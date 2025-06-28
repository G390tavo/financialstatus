// ai.js
import { fuentes, obtenerDesdeFuentes } from './utils.js';

const preguntas = {
  "¿Cuál es la tendencia del dólar?": "monedas",
  "¿Qué criptomonedas están subiendo?": "criptos",
  "¿Qué empresas están en baja esta semana?": "empresas"
};

const respuestaIA = document.getElementById("respuesta-ia");
const preguntaSelect = document.getElementById("pregunta-ia");
const loading = document.getElementById("ia-cargando");

function interpretar(html, tipo) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  let resultado = "";

  switch (tipo) {
    case "monedas":
      const tabla = doc.querySelector("table");
      if (tabla) resultado = "Dólar y monedas analizados correctamente.";
      break;
    case "criptos":
      const lista = doc.querySelectorAll("table, .coin-item, .cmc-table");
      if (lista.length > 0) resultado = "Criptomonedas obtenidas correctamente.";
      break;
    case "empresas":
      const filas = doc.querySelectorAll("table tr");
      if (filas.length > 5) resultado = "Empresas procesadas correctamente.";
      break;
  }

  return resultado || "No se pudo interpretar el contenido correctamente.";
}

async function procesarPregunta() {
  const pregunta = preguntaSelect.value;
  const tipo = preguntas[pregunta];
  respuestaIA.textContent = "";
  loading.style.display = "block";

  try {
    const html = await obtenerDesdeFuentes(fuentes[tipo]);
    const respuesta = interpretar(html, tipo);
    respuestaIA.textContent = respuesta;
  } catch (e) {
    respuestaIA.textContent = "⚠️ No se pudo obtener respuesta. Intenta más tarde.";
  }

  loading.style.display = "none";
}

export { preguntas, procesarPregunta };
