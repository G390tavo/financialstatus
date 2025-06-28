// ai.js

async function ejecutarIA(pregunta) {
  const respuestaElemento = document.getElementById("respuesta-ia");
  const cargando = document.getElementById("ia-cargando");
  respuestaElemento.innerHTML = "";
  cargando.style.display = "block";

  try {
    const fuentesIA = [
      `https://www.google.com/search?q=${encodeURIComponent(pregunta)}`,
      `https://www.bing.com/search?q=${encodeURIComponent(pregunta)}`,
      `https://duckduckgo.com/?q=${encodeURIComponent(pregunta)}`
    ];
    const html = await intentarFuentes(fuentesIA);
    const respuesta = html.slice(0, 800);
    respuestaElemento.innerText = "Respuesta aproximada:\n\n" + respuesta + "...";
  } catch (err) {
    respuestaElemento.innerText = "❌ No se pudo obtener información. Verifica tu conexión o intenta más tarde.";
  }

  cargando.style.display = "none";
}
