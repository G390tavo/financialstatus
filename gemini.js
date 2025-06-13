
const API_KEY = "AIzaSyAju9sc_vfVAdVdRqVmKqPBfMEz8yOq0BI";

const respuestas = {
  apple: { riesgo: "bajo", texto: "Apple es una inversión estable con fuerte respaldo financiero." },
  tesla: { riesgo: "alto", texto: "Tesla tiene crecimiento acelerado pero alto riesgo por volatilidad." },
  microsoft: { riesgo: "medio", texto: "Microsoft ofrece estabilidad y crecimiento sostenido." },
  amazon: { riesgo: "medio", texto: "Amazon lidera el ecommerce, ideal para riesgo moderado." },
  nvidia: { riesgo: "alto", texto: "Nvidia domina en IA, gran potencial pero con riesgo." }
};

function mostrarRecomendacion(clave) {
  const div = document.getElementById("ia-response");
  const r = respuestas[clave];
  div.innerHTML = `<h3>Análisis IA Gemini: ${clave.toUpperCase()}</h3><p>${r.texto}</p><p><strong>Riesgo:</strong> ${r.riesgo.toUpperCase()}</p>`;
}
