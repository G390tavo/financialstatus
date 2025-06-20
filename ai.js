// ai.js

import { fetchHTML, limpiarTexto } from "./utils.js";

const preguntas = [
  "¿Tendencia actual del dólar?",
  "¿Conviene invertir en Bitcoin hoy?",
  "¿Cómo ha variado la inflación últimamente?",
  "¿Qué predicen los analistas sobre Apple?"
];

const select = document.getElementById("pregunta-ia");
const respuesta = document.getElementById("respuesta-ia");
const cargando = document.getElementById("ia-cargando");

preguntas.forEach(p => {
  const option = document.createElement("option");
  option.value = p;
  option.textContent = p;
  select.appendChild(option);
});

select.addEventListener("change", async () => {
  const pregunta = select.value;
  if (!pregunta) return;

  cargando.style.display = "block";
  respuesta.textContent = "";

  const fuentes = [
    `https://www.google.com/search?q=${encodeURIComponent(pregunta)}`,
    `https://www.bing.com/search?q=${encodeURIComponent(pregunta)}`,
    `https://duckduckgo.com/?q=${encodeURIComponent(pregunta)}`
  ];

  try {
    const resultados = await Promise.all(
      fuentes.map(async url => {
        const html = await fetchHTML(url);
        const texto = limpiarTexto(html.slice(0, 3000));
        return texto;
      })
    );

    const resumen = resultados
      .map(t => t.slice(0, 500))
      .join("\n\n---\n\n")
      .slice(0, 1200);

    respuesta.textContent = resumen || "No se pudo encontrar información útil.";
  } catch {
    respuesta.textContent = "No se pudo obtener respuesta en este momento.";
  }

  cargando.style.display = "none";
});
