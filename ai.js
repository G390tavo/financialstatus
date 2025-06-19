document.addEventListener("DOMContentLoaded", () => {
  const select = document.getElementById("pregunta-ia");
  const respuestaIA = document.getElementById("respuesta-ia");
  const loaderIA = document.getElementById("ia-cargando");

  if (!select || !respuestaIA) return;

  // Cargar preguntas en dropdown
  preguntasIA.forEach(preg => {
    const opt = document.createElement("option");
    opt.value = preg;
    opt.textContent = preg;
    select.appendChild(opt);
  });

  // Mostrar introducción
  respuestaIA.innerHTML = `
    <p>Hola, soy tu asistente financiero. Selecciona una pregunta para comenzar.</p>
  `;

  // Evento al seleccionar pregunta
  select.addEventListener("change", async () => {
    const pregunta = select.value;
    if (!pregunta) return;

    respuestaIA.innerHTML = "";
    loaderIA.style.display = "block";

    try {
      const html = await fetchHTML(pregunta);
      loaderIA.style.display = "none";

      const match = html.match(/(?:\S)\$?(\d{1,3}(?:[\.,]\d{3})*(?:[\.,]\d+)?)/);
      const valor = match ? match[0] : "No se encontró valor";

      respuestaIA.innerHTML = `
        <p><strong>Resultado para:</strong> ${pregunta}</p>
        <p><strong>Valor actual:</strong> ${valor}</p>
      `;

      const datos = Array.from({ length: 7 }, (_, i) => ({
        x: `Día ${i + 1}`,
        y: Math.floor(Math.random() * 100) + 100,
      }));

      mostrarGrafico(pregunta, datos);

    } catch (err) {
      loaderIA.style.display = "none";
      mostrarError("No se pudo interpretar respuesta.", respuestaIA);
    }
  });
});
