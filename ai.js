document.addEventListener("DOMContentLoaded", () => {
  const selectPregunta = document.getElementById("pregunta-ia");
  const contenedorRespuesta = document.getElementById("respuesta-ia");
  const cargandoIA = document.getElementById("ia-cargando");

  preguntasIA.forEach(preg => {
    const opt = document.createElement("option");
    opt.value = preg;
    opt.textContent = preg;
    selectPregunta.appendChild(opt);
  });

  selectPregunta.addEventListener("change", async () => {
    const pregunta = selectPregunta.value;
    if (!pregunta) return;

    cargandoIA.style.display = "block";
    contenedorRespuesta.innerHTML = "";

    const fuentes = [
      `https://www.google.com/search?q=${encodeURIComponent(pregunta)}`,
      `https://www.bing.com/search?q=${encodeURIComponent(pregunta)}`,
      `https://duckduckgo.com/?q=${encodeURIComponent(pregunta)}`
    ];

    let html = null;
    for (const fuente of fuentes) {
      html = await fetchHTML(fuente);
      if (html) break;
    }

    cargandoIA.style.display = "none";

    if (!html) {
      contenedorRespuesta.innerHTML = `<p style="color:red;">No se pudo obtener datos en tiempo real.</p>`;
      return;
    }

    const valor = extraerValorDesdeTexto(html);
    const historial = generarHistorial(valor);

    let contenido = `<p><strong>Valor actual:</strong> ${valor ?? 'No encontrado'}</p>`;

    if (historial.length > 0) {
      contenido += `<div class="zona-grafico">${generarGraficoHTML(historial, pregunta)}</div>`;
    } else {
      contenido += `<p style="color:#888;font-style:italic;">NO SE ENCONTRARON RESULTADOS</p>`;
    }

    contenedorRespuesta.innerHTML = contenido;
  });
});

function generarGraficoHTML(datos, titulo) {
  const puntos = datos.map(d => `<div title="${d.x}: ${d.y}" class="punto" style="left:${datos.indexOf(d)*40}px;bottom:${d.y}px;"></div>`).join("");
  return `
    <div>
      <strong style="color:#39FF14">${titulo}</strong>
      <div style="position:relative;height:150px;margin-top:10px;background:#111;border:1px solid #39FF14;border-radius:8px;">
        ${puntos}
      </div>
    </div>
  `;
}
