document.addEventListener("DOMContentLoaded", () => {
  initIA();
});

function initIA() {
  const iaContenedor = document.getElementById("ia");
  const respuestaIA = document.getElementById("respuesta-ia");
  const cargandoIA = document.getElementById("ia-cargando");

  const preguntas = [
    "¿Qué es FinancialStatus?",
    "¿Cómo interpretar los gráficos?",
    "¿Qué monedas se muestran?",
    "¿Cómo se recopilan los datos?",
    "¿Quién creó esta app?"
  ];

  const respuestas = {
    "¿Qué es FinancialStatus?":
      "Es una aplicación que muestra información financiera real y actualizada sobre monedas, criptomonedas y empresas con soporte gráfico e inteligencia artificial.",
    "¿Cómo interpretar los gráficos?":
      "Los gráficos muestran la evolución del valor. Pasa el cursor para ver los valores individuales. Las líneas verdes indican crecimiento.",
    "¿Qué monedas se muestran?":
      "Se muestran principalmente monedas internacionales como USD, EUR, JPY y PEN. Se obtiene la data de fuentes como X-Rates o Google.",
    "¿Cómo se recopilan los datos?":
      "Utilizamos técnicas de web scraping a través de un proxy propio para acceder a información financiera en tiempo real.",
    "¿Quién creó esta app?":
      "Fue desarrollada por G390tavo como un proyecto de análisis financiero visual con funciones reales."
  };

  const lista = document.createElement("ul");
  lista.style.listStyle = "none";
  lista.style.padding = 0;

  preguntas.forEach(p => {
    const item = document.createElement("li");
    item.innerHTML = `<button style="margin: 6px 0; padding: 8px; width: 100%; border-radius: 6px; font-weight: bold;">${p}</button>`;
    item.querySelector("button").onclick = () => {
      respuestaIA.innerHTML = "";
      cargandoIA.style.display = "block";
      setTimeout(() => {
        cargandoIA.style.display = "none";
        respuestaIA.innerHTML = respuestas[p] || "No se encontró una respuesta.";
      }, 800);
    };
    lista.appendChild(item);
  });

  const form = document.getElementById("formulario-ia");
  if (form) form.remove(); // si hay un input antiguo, lo quita

  const antesDe = document.getElementById("respuesta-ia");
  iaContenedor.insertBefore(lista, antesDe);
}
