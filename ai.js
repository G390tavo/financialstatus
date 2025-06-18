document.addEventListener("DOMContentLoaded", () => {
  const select = document.getElementById("pregunta-ia");
  const respuestaDiv = document.getElementById("respuesta-ia");
  const cargando = document.getElementById("ia-cargando");

  preguntasIA.forEach(p => {
    const opt = document.createElement("option");
    opt.value = p;
    opt.textContent = p;
    select.appendChild(opt);
  });

  select.addEventListener("change", async () => {
    const pregunta = select.value;
    if (!pregunta) return;

    respuestaDiv.innerHTML = "";
    cargando.style.display = "block";

    try {
      const busqueda = encodeURIComponent(pregunta + " precio");
      const html = await fetchHTML(`https://www.google.com/search?q=${busqueda}`);
      if (!html) throw new Error("Sin datos");

      const match = html.match(/(?:\$|S\/\.|€)?\s?([\d,]+\.\d{2})/);
      if (match) {
        const valor = match[1];
        respuestaDiv.innerHTML = `<p>Respuesta: ${pregunta} es ${valor}</p>`;
      } else {
        respuestaDiv.innerHTML = `<p>No se pudo interpretar respuesta.</p>`;
      }
    } catch (e) {
      respuestaDiv.innerHTML = "<p>Error: no se pudieron obtener datos.</p>";
    } finally {
      cargando.style.display = "none";
    }
  });
});
