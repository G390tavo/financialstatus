document.addEventListener("DOMContentLoaded", () => {
  const select = document.getElementById("preguntas");
  const respuestaIA = document.getElementById("respuesta-ia");

  if (!select || !respuestaIA) {
    console.log("IA no inicializada. Faltan elementos.");
    return;
  }

  select.addEventListener("change", async () => {
    const pregunta = select.value;
    if (!pregunta) return;
    respuestaIA.innerHTML = "🔍 Buscando...";

    const valor = await obtenerDatos(pregunta);
    if (valor) {
      respuestaIA.innerHTML = `📊 ${pregunta}: <strong>${valor}</strong>`;
    } else {
      mostrarError("❌ No se pudo obtener datos en tiempo real. Verifica tu conexión o cambia de pregunta.", respuestaIA);
    }
  });
});
