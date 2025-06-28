// ai.js

const preguntas = {
  "¿Cuál es la tendencia del dólar?": "monedas",
  "¿Qué criptomonedas están subiendo?": "criptos",
  "¿Qué empresas están en baja esta semana?": "empresas"
};

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

function procesarPregunta() {
  const pregunta = document.getElementById("pregunta-ia").value;
  const tipo = preguntas[pregunta];
  const respuestaIA = document.getElementById("respuesta-ia");
  const loading = document.getElementById("ia-cargando");

  respuestaIA.textContent = "";
  loading.style.display = "block";

  obtenerDesdeFuentes(fuentes[tipo])
    .then(html => {
      const resp = interpretar(html, tipo);
      respuestaIA.textContent = resp;
    })
    .catch(() => {
      respuestaIA.textContent = "⚠️ No se pudo obtener respuesta. Intenta más tarde.";
    })
    .finally(() => {
      loading.style.display = "none";
    });
}
