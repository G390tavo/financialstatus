// ai.js

document.addEventListener("DOMContentLoaded", () => {
  const bloqueIA = document.getElementById("ia");
  const respuestaIA = document.getElementById("respuesta-ia");
  const cargandoIA = document.getElementById("ia-cargando");

  if (!bloqueIA || !respuestaIA) return;

  const contenedorPreguntas = document.createElement("div");
  contenedorPreguntas.style.display = "flex";
  contenedorPreguntas.style.flexDirection = "column";
  contenedorPreguntas.style.gap = "10px";

  PREGUNTAS_IA.forEach(pregunta => {
    const btn = document.createElement("button");
    btn.textContent = pregunta;
    btn.style.padding = "10px";
    btn.style.borderRadius = "6px";
    btn.style.cursor = "pointer";
    btn.style.backgroundColor = "#39FF14";
    btn.style.color = "#000";
    btn.style.fontWeight = "bold";
    btn.style.border = "none";
    btn.onclick = () => ejecutarIA(pregunta);
    contenedorPreguntas.appendChild(btn);
  });

  bloqueIA.insertBefore(contenedorPreguntas, cargandoIA);

  function ejecutarIA(pregunta) {
    respuestaIA.innerHTML = "";
    cargandoIA.style.display = "block";
    cargandoIA.innerText = `Buscando: ${pregunta}`;

    fetch(`https://financial-proxy.onrender.com?url=${encodeURIComponent("https://www.google.com/search?q=" + pregunta)}`)
      .then(res => res.text())
      .then(html => {
        const texto = limpiarTexto(html);
        const fragmento = texto.split('. ').slice(0, 3).join('. ') + '.';
        respuestaIA.innerText = fragmento || "No se encontró información.";
      })
      .catch(() => {
        respuestaIA.innerText = "Error al conectar con la web. Verifica tu conexión o el proxy.";
      })
      .finally(() => {
        cargandoIA.style.display = "none";
      });
  }

  ejecutarIA(PREGUNTAS_IA[0]); // Ejecuta automáticamente la primera pregunta
});
