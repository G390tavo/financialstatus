// ai.js
function iniciarIA() {
  const contenedorIA = document.getElementById("contenedorIA");
  const salidaIA = document.getElementById("salidaIA");

  if (!contenedorIA || !salidaIA) {
    console.warn("Elementos de IA no encontrados.");
    return;
  }

  // Introducción automática
  mostrarEnIA("Hola, soy la IA integrada de FinancialStatus. Estoy aquí para ayudarte a entender mejor el estado económico actual.");
  mostrarEnIA("Estas son algunas cosas que puedo hacer:");
  mostrarEnIA("- Obtener valores reales de criptomonedas o empresas.");
  mostrarEnIA("- Generar gráficos automáticos en tiempo real.");
  mostrarEnIA("- Mostrar explicaciones simples sobre los datos.");

  // Preguntas preestablecidas que se ejecutan automáticamente
  const preguntasIniciales = [
    "¿Cuál es el precio del Bitcoin?",
    "Muéstrame la gráfica de Google",
    "¿Cómo está el dólar hoy?"
  ];

  preguntasIniciales.forEach((pregunta, i) => {
    setTimeout(() => responderIA(pregunta), 2000 + i * 3000);
  });

  // Evento botón preguntar
  const btnPreguntar = document.getElementById("btnPreguntar");
  if (btnPreguntar) {
    btnPreguntar.addEventListener("click", () => {
      const entrada = document.getElementById("preguntaIA");
      if (entrada && entrada.value.trim() !== "") {
        responderIA(entrada.value.trim());
        entrada.value = "";
      }
    });
  }
}

// Mostrar texto en el área de salida de la IA
function mostrarEnIA(texto) {
  const salida = document.getElementById("salidaIA");
  if (salida) {
    const p = document.createElement("p");
    p.textContent = texto;
    salida.appendChild(p);
  }
}

// Lógica para responder preguntas
function responderIA(pregunta) {
  mostrarEnIA("Pregunta: " + pregunta);

  if (pregunta.toLowerCase().includes("bitcoin")) {
    obtenerYGraficar("Bitcoin");
  } else if (pregunta.toLowerCase().includes("google")) {
    obtenerYGraficar("Google");
  } else if (pregunta.toLowerCase().includes("dólar") || pregunta.toLowerCase().includes("dolar")) {
    obtenerYGraficar("Dólar");
  } else {
    mostrarEnIA("Lo siento, aún no puedo responder esa pregunta.");
  }
}

// Función para obtener valor real desde Google (scraping básico)
function obtenerYGraficar(nombre) {
  mostrarEnIA("Buscando datos en tiempo real sobre " + nombre + "...");

  fetch("https://corsproxy.io/?https://www.google.com/search?q=" + encodeURIComponent(nombre + " precio"))
    .then(res => res.text())
    .then(html => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");
      const valorElemento = doc.querySelector(".DFlfde, .IsqQVc, .SwHCTb");

      if (valorElemento) {
        const valor = valorElemento.textContent.trim().replace(",", "");
        mostrarEnIA(nombre + " actualmente vale: $" + valor);
        generarGraficoSimulado(nombre, parseFloat(valor));
      } else {
        mostrarEnIA("No se pudo obtener el valor actual de " + nombre + ".");
      }
    })
    .catch(err => {
      mostrarEnIA("Error al obtener los datos de " + nombre + ". Revisa tu conexión.");
    });
}

// Función para graficar simulando histórico
function generarGraficoSimulado(nombre, valorActual) {
  const grafico = document.getElementById("grafico");
  if (!grafico) return;

  const valores = Array.from({ length: 10 }, (_, i) => ({
    x: `Día ${i + 1}`,
    y: Math.round((valorActual + (Math.random() - 0.5) * valorActual * 0.1) * 100) / 100
  }));

  grafico.innerHTML = `<h3>${nombre}</h3>
  <canvas id="canvasGrafico" width="400" height="200"></canvas>`;

  const ctx = document.getElementById("canvasGrafico").getContext("2d");

  new Chart(ctx, {
    type: "line",
    data: {
      labels: valores.map(v => v.x),
      datasets: [{
        label: nombre,
        data: valores.map(v => v.y),
        borderColor: "green",
        backgroundColor: "lightgreen",
        fill: false,
        tension: 0.3,
        pointRadius: 4,
        pointHoverRadius: 6
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: false
        }
      }
    }
  });
}

// Exportar funciones si se usa como módulo
// export { iniciarIA, responderIA };
