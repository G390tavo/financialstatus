document.addEventListener("DOMContentLoaded", () => {
  const modoOscuroBtn = document.getElementById("toggle-dark");
  const body = document.body;
  const btnMoneda = document.getElementById("btn-moneda");
  const btnCripto = document.getElementById("btn-cripto");
  const btnEmpresas = document.getElementById("btn-empresas");
  const sectionGrafico = document.getElementById("grafico");
  const sectionInfo = document.getElementById("info");
  const preguntasIA = document.getElementById("ia-preguntas");
  const respuestaIA = document.getElementById("ia-respuesta");
  const preguntarBtn = document.getElementById("preguntar");

  // Toggle dark mode
  modoOscuroBtn.addEventListener("click", () => {
    body.classList.toggle("dark");
  });

  // Mostrar secciones
  btnMoneda.addEventListener("click", async () => {
    sectionInfo.textContent = "Cargando monedas...";
    const data = await obtenerMonedas();
    mostrarGrafico(data, "Monedas");
  });

  btnCripto.addEventListener("click", async () => {
    sectionInfo.textContent = "Cargando criptomonedas...";
    const data = await obtenerCriptomonedas();
    mostrarGrafico(data, "Criptomonedas");
  });

  btnEmpresas.addEventListener("click", async () => {
    sectionInfo.textContent = "Cargando empresas...";
    const data = await obtenerEmpresas();
    mostrarGrafico(data, "Empresas");
  });

  // IA respuestas básicas
  preguntarBtn.addEventListener("click", () => {
    const pregunta = preguntasIA.value;
    respuestaIA.textContent = "Buscando respuesta...";
    usarIA(pregunta).then(res => {
      respuestaIA.textContent = res;
    });
  });

  // Mostrar gráfico con puntos y líneas
  function mostrarGrafico(data, titulo) {
    sectionGrafico.innerHTML = ""; // limpiar gráfico
    sectionInfo.textContent = `Datos actuales para: ${titulo}`;

    if (!data || data.length === 0) {
      sectionGrafico.textContent = "No hay datos disponibles.";
      return;
    }

    const valores = data.map(d => d.valor);
    const fechas = data.map(d => d.fecha);
    const max = Math.max(...valores);
    const ancho = sectionGrafico.clientWidth;
    const alto = sectionGrafico.clientHeight;
    const margen = 30;

    data.forEach((p, i) => {
      const x = (i / (data.length - 1)) * (ancho - 2 * margen) + margen;
      const y = alto - ((p.valor / max) * (alto - 2 * margen)) - margen;

      const punto = document.createElement("div");
      punto.className = "punto";
      punto.style.left = `${x}px`;
      punto.style.top = `${y}px`;
      sectionGrafico.appendChild(punto);

      const etiqueta = document.createElement("div");
      etiqueta.className = "lbl";
      etiqueta.textContent = `${p.valor}`;
      etiqueta.style.left = `${x}px`;
      etiqueta.style.top = `${y}px`;
      sectionGrafico.appendChild(etiqueta);

      if (i > 0) {
        const anterior = data[i - 1];
        const x0 = ((i - 1) / (data.length - 1)) * (ancho - 2 * margen) + margen;
        const y0 = alto - ((anterior.valor / max) * (alto - 2 * margen)) - margen;

        const dx = x - x0;
        const dy = y - y0;
        const distancia = Math.sqrt(dx * dx + dy * dy);
        const angulo = Math.atan2(dy, dx) * (180 / Math.PI);

        const linea = document.createElement("div");
        linea.className = "linea";
        linea.style.width = `${distancia}px`;
        linea.style.left = `${x0}px`;
        linea.style.top = `${y0}px`;
        linea.style.transform = `rotate(${angulo}deg)`;
        sectionGrafico.appendChild(linea);
      }
    });
  }
});
