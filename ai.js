// ai.js

import { fetchHTML } from "./utils.js";
import { TIEMPO_RESPALDO } from "./config.js";

const preguntasPredefinidas = [
  "¿Tendencia actual del dólar?",
  "¿Precio del oro?",
  "¿Cómo está el mercado de criptomonedas?",
  "¿Ha subido Apple esta semana?",
  "¿Cuál es la criptomoneda con mayor crecimiento reciente?"
];

const selector = document.getElementById("pregunta-ia");
const respuestaContenedor = document.getElementById("respuesta-ia");
const cargando = document.getElementById("ia-cargando");

function inicializarIA() {
  preguntasPredefinidas.forEach(p => {
    const opt = document.createElement("option");
    opt.value = p;
    opt.textContent = p;
    selector.appendChild(opt);
  });

  selector.addEventListener("change", async () => {
    const pregunta = selector.value;
    if (!pregunta) return;
    await responderIA(pregunta);
  });
}

async function responderIA(pregunta) {
  cargando.style.display = "block";
  respuestaContenedor.innerHTML = "";

  const cache = sessionStorage.getItem(pregunta);
  const tiempo = sessionStorage.getItem(pregunta + "_hora");

  if (cache && tiempo && Date.now() - parseInt(tiempo) < TIEMPO_RESPALDO) {
    mostrarRespuesta(pregunta, cache, true);
    cargando.style.display = "none";
    return;
  }

  try {
    const contenido = await fetchHTML(pregunta);
    if (!contenido) throw new Error("No se pudo interpretar respuesta.");

    sessionStorage.setItem(pregunta, contenido);
    sessionStorage.setItem(pregunta + "_hora", Date.now().toString());

    mostrarRespuesta(pregunta, contenido);
  } catch (error) {
    mostrarRespuesta(pregunta, "No se pudo obtener información. Intenta más tarde o revisa tu conexión.");
  }

  cargando.style.display = "none";
}

function mostrarRespuesta(pregunta, contenido, cache = false) {
  respuestaContenedor.innerHTML = `
    <strong>${pregunta}</strong><br/>
    ${cache ? "<em>(datos guardados)</em><br/>" : ""}
    ${contenido}
  `;
}

export { inicializarIA };
