document.addEventListener("DOMContentLoaded", () => {
  const preguntaSelect = document.getElementById("pregunta-ia");
  const respuestaDiv = document.getElementById("respuesta-ia");
  const cargandoDiv = document.getElementById("ia-cargando");

  // Lista de fuentes para consulta (en cascada)
  const fuentes = [
    "https://localhost:3000/fetch?url=",
    "https://localhost:3000/fetch?url=",
    "https://localhost:3000/fetch?url="
  ];
  // Fuentes reales a usar por orden (solo cambio la base url al proxy)
  const fuentesURLs = [
    "https://www.google.com/search?q=",
    "https://www.bing.com/search?q=",
    "https://duckduckgo.com/html?q="
  ];

  // Carga las preguntas del config.js en el select
  if(window.preguntasIA) {
    preguntasIA.forEach(pregunta => {
      const option = document.createElement("option");
      option.value = pregunta;
      option.textContent = pregunta;
      preguntaSelect.appendChild(option);
    });
  }

  // Función para hacer fetch con cascada de fuentes
  async function fetchConFuentes(consulta) {
    for (let i = 0; i < fuentesURLs.length; i++) {
      try {
        const url = fuentes[i] + encodeURIComponent(fuentesURLs[i] + consulta);
        const resp = await fetch(url);
        if (!resp.ok) throw new Error("HTTP error " + resp.status);
        const texto = await resp.text();
        if (texto.length < 200) throw new Error("Respuesta demasiado corta");
        return texto;
      } catch (e) {
        // console.warn(`Fuente ${fuentesURLs[i]} falló, probando siguiente.`);
      }
    }
    throw new Error("No se pudo obtener datos en tiempo real");
  }

  // Función para extraer valor numérico positivo y con formato correcto
  function extraerValor(html) {
    const regex = /(\d{1,3}(?:[.,]\d{3})*(?:[.,]\d+)?)/g;
    const matches = html.match(regex);
    if (!matches) return null;
    for (const m of matches) {
      // Convertir a número decimal con punto como separador
      let numStr = m.replace(/\./g, '').replace(',', '.');
      let num = parseFloat(numStr);
      if (!isNaN(num) && num > 0) return num;
    }
    return null;
  }

  // Generar datos simulados coherentes para 7 días a partir del valor base
  function generarHistorial(baseValor) {
    const datos = [];
    for (let i = 1; i <= 7; i++) {
      const variacion = baseValor * (0.9 + Math.random() * 0.2); // ±10%
      datos.push({ x: `Día ${i}`, y: Number(variacion.toFixed(2)) });
    }
    return datos;
  }

  // Mostrar respuesta con texto y gráfico si aplica
  function mostrarRespuesta(valor, historial, pregunta) {
    respuestaDiv.innerHTML = `<p><b>Respuesta para:</b> ${pregunta}</p>
      <p><b>Valor actual:</b> ${valor}</p>`;
    if (historial) {
      // Aquí asumo que tienes una función para graficar llamada 'generarGrafico'
      generarGrafico(historial, "#grafico");
    } else {
      document.getElementById("grafico").innerHTML = "";
    }
  }

  // Evento al cambiar pregunta
  preguntaSelect.addEventListener("change", async () => {
    const pregunta = preguntaSelect.value;
    if (!pregunta) {
      respuestaDiv.innerHTML = "";
      document.getElementById("grafico").innerHTML = "";
      return;
    }
    cargandoDiv.style.display = "block";
    respuestaDiv.innerHTML = "";
    document.getElementById("grafico").innerHTML = "";

    try {
      // Sacar consulta simple (ejemplo: "precio de Bitcoin")
      // Aquí asumo que config.js tiene preguntasIA y cada pregunta tiene consulta? 
      // Sino, usar el texto mismo
      let consulta = pregunta;
      // Por ejemplo, podrías mapear pregunta->consulta si config.js tiene ese dato
      // Para ahora, solo usar pregunta directamente en la búsqueda

      const html = await fetchConFuentes(consulta);
      const valor = extraerValor(html);
      if (!valor) throw new Error("No se pudo interpretar respuesta.");

      const historial = generarHistorial(valor);

      mostrarRespuesta(valor, historial, pregunta);
    } catch (e) {
      respuestaDiv.innerHTML = `<p style="color:red;">Error: ${e.message}</p>`;
      document.getElementById("grafico").innerHTML = "";
    } finally {
      cargandoDiv.style.display = "none";
    }
  });

});
