// === AI.JS ===
// IA básica con preguntas predefinidas y respuestas reales desde la web

const selectPreguntas = document.getElementById("preguntasIA");
const respuestaIA = document.getElementById("respuestaIA");

const preguntasPredefinidas = [
  { pregunta: "¿Cuánto cuesta el dólar en Perú?", query: "precio del dólar en Perú" },
  { pregunta: "¿Cuánto cuesta el euro en Perú?", query: "precio del euro en Perú" },
  { pregunta: "¿Cuál es el precio del bitcoin?", query: "precio del bitcoin" },
  { pregunta: "¿Cuál es el precio del ethereum?", query: "precio de ethereum" },
  { pregunta: "¿Cuánto vale Google en bolsa?", ticker: "GOOGL:NASDAQ" },
  { pregunta: "¿Cuánto vale Apple en bolsa?", ticker: "AAPL:NASDAQ" },
  { pregunta: "¿Cómo ha variado la inflación últimamente?", query: "¿Cómo ha variado la inflación últimamente?" }
];

// Mostrar preguntas en el selector
preguntasPredefinidas.forEach((p, i) => {
  const option = document.createElement("option");
  option.value = i;
  option.textContent = p.pregunta;
  selectPreguntas.appendChild(option);
});

// Escuchar selección
selectPreguntas.addEventListener("change", async (e) => {
  const seleccion = preguntasPredefinidas[e.target.value];
  respuestaIA.textContent = "Cargando respuesta...";

  if (!seleccion) return;

  if (seleccion.query) {
    const valor = await obtenerValorDesdeGoogle(seleccion.query);
    if (valor) {
      respuestaIA.textContent = `El valor actual es aproximadamente ${valor} soles.`;
    } else {
      respuestaIA.textContent = "No se pudo obtener el valor actual.";
    }
  } else if (seleccion.ticker) {
    const valor = await obtenerValorEmpresa(seleccion.ticker);
    if (valor) {
      respuestaIA.textContent = `El valor actual de la acción es aproximadamente $${valor}.`;
    } else {
      respuestaIA.textContent = "No se pudo obtener el valor actual de la empresa.";
    }
  } else {
    respuestaIA.textContent = "Consulta no válida.";
  }
});
