document.addEventListener("DOMContentLoaded", () => {
  const preguntaSelect = document.getElementById("pregunta-ia");
  const respuestaDiv = document.getElementById("respuesta-ia");
  const cargandoDiv = document.getElementById("ia-cargando");

  // Proxy base para fetch (asegúrate que tu proxy esté corriendo en localhost:3000)
  const proxyBase = "http://localhost:3000/fetch?url=";

  // Fuentes reales para búsqueda (en cascada)
  const fuentesURLs = [
    "https://www.google.com/search?q=",
    "https://www.bing.com/search?q=",
    "https://duckduckgo.com/html?q="
  ];

  // Función para hacer fetch con cascada de fuentes para evitar fallos
  async function fetchConFuentes(consulta) {
    for (const fuente of fuentesURLs) {
      try {
        const url = proxyBase + encodeURIComponent(fuente + consulta);
        const resp = await fetch(url);
        if (!resp.ok) throw new Error(`HTTP error ${resp.status}`);
        const texto = await resp.text();
        if (texto.length < 200) throw new Error("Respuesta muy corta");
        return texto;
      } catch (e) {
        // console.warn(`Fuente ${fuente} falló, intentando siguiente.`);
      }
    }
    throw new Error("No se pudo obtener datos en tiempo real");
  }

  // Extraer valor numérico positivo de HTML
  function extraerValor(html) {
    // Busca números con formato decimal (considera comas y puntos)
    const regex = /(\d{1,3}(?:[.,]\d{3})*(?:[.,]\d+)?)/g;
    const matches = html.match(regex);
    if (!matches) return null;
    for (const m of matches) {
      // Convertir formato a número decimal (punto como separador)
      let numStr = m.replace(/\./g, "").replace(",", ".");
      let num = parseFloat(numStr);
      if (!isNaN(num) && num > 0) return num;
    }
    return null;
  }

  // Genera historial simulado de 7 días basado en valor base
  function generarHistorial(baseValor) {
    const datos = [];
    for (let i = 1; i <= 7; i++) {
      // Variación ±10%
      const variacion = baseValor * (0.9 + Math.random() * 0.2);
      datos.push({ x: `Día ${i}`, y: Number(variacion.toFixed(2)) });
    }
    return datos;
  }

  // Mostrar texto y gráfico con datos
  function mostrarRespuesta(valor, historial, pregunta) {
    respuestaDiv.innerHTML = `<p><b>Respuesta para:</b> ${pregunta}</p>
      <p><b>Valor actual:</b> ${valor}</p>`;
    if (historial) {
      generarGrafico(historial, "#grafico");
    } else {
      document.getElementById("grafico").innerHTML = "";
    }
  }

  // Carga preguntas desde config.js si existen
  if (window.preguntasIA) {
    preguntasIA.forEach(pregunta => {
      const option = document.createElement("option");
      option.value = pregunta;
      option.textContent = pregunta;
      preguntaSelect.appendChild(option);
    });
  }

  // Manejo de selección de pregunta
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
      const html = await fetchConFuentes(pregunta);
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

// Función para modo claro / oscuro
document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const botonModo = document.getElementById("modo-toggle");

  botonModo.addEventListener("click", () => {
    if (body.classList.contains("dark")) {
      body.classList.remove("dark");
      body.classList.add("light");
      botonModo.textContent = "Modo oscuro";
    } else {
      body.classList.remove("light");
      body.classList.add("dark");
      botonModo.textContent = "Modo claro";
    }
  });
});

// Función para generar gráfico con Chart.js (asegúrate de incluir Chart.js en tu index.html)
function generarGrafico(data, selector) {
  const ctx = document.querySelector(selector);
  if (!ctx) return;

  // Limpia gráfico previo si existe
  if (window.myChart) window.myChart.destroy();

  const labels = data.map(d => d.x);
  const valores = data.map(d => d.y);

  window.myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [{
        label: "Valor",
        data: valores,
        borderColor: "#39FF14", // verde neón
        backgroundColor: "rgba(57, 255, 20, 0.2)",
        fill: true,
        tension: 0.3,
        pointRadius: 4,
        pointBackgroundColor: "#39FF14",
        pointHoverRadius: 6
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false },
        tooltip: { enabled: true }
      },
      scales: {
        y: {
          beginAtZero: false,
          ticks: { color: "#39FF14" }
        },
        x: {
          ticks: { color: "#fff" }
        }
      }
    }
  });
}
