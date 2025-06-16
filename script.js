let chartInstance = null;

document.addEventListener("DOMContentLoaded", async () => {
  await cargarMonedas();
  crearBotonesPeriodo();
});

async function cargarMonedas() {
  try {
    const res = await fetch("https://api.exchangerate.host/latest");
    const data = await res.json();
    const monedas = Object.keys(data.rates);
    mostrarOpciones("monedas", monedas);
  } catch (e) {
    console.error("Error cargando monedas:", e);
  }
}

function mostrarOpciones(tipo, lista) {
  const contenedor = document.getElementById("contenidoDinamico");
  contenedor.innerHTML = "";
  const tabla = document.createElement("table");

  lista.slice(0, 10).forEach(item => {
    const fila = document.createElement("tr");
    fila.innerHTML = `<td>${item}</td>`;
    tabla.appendChild(fila);
  });

  contenedor.appendChild(tabla);
}

function crearBotonesPeriodo() {
  const periodos = ["1d", "7d", "30d", "1a"];
  const contenedor = document.getElementById("periodos");
  contenedor.innerHTML = "";

  periodos.forEach(p => {
    const btn = document.createElement("button");
    btn.textContent = p;
    btn.onclick = () => actualizarGrafico(p);
    contenedor.appendChild(btn);
  });
}

async function actualizarGrafico(periodo) {
  try {
    const labels = ["Inicio", "Medio", "Fin"];
    const datos = [100, 120, 110];

    renderizarGrafico("grafico", labels, datos);
  } catch (e) {
    console.error("Error actualizando gráfico:", e);
  }
}

function renderizarGrafico(canvasId, labels, datos) {
  const ctx = document.getElementById(canvasId).getContext("2d");

  if (chartInstance) {
    chartInstance.destroy();
  }

  chartInstance = new Chart(ctx, {
    type: "line",
    data: {
      labels,
      datasets: [{
        label: "Valor",
        data: datos,
        borderColor: "green",
        backgroundColor: "rgba(0,255,0,0.2)",
      }]
    }
  });
}

function alternarModoOscuro() {
  document.body.classList.toggle("dark-mode");
}

function responderIA() {
  const pregunta = document.getElementById("preguntaIA").value;
  const respuesta = document.getElementById("respuestaIA");

  const respuestas = {
    tutorial: "Usa los botones para cambiar tipo de datos y elige un período.",
    monedas: "Se pueden consultar monedas de más de 100 países.",
    empresas: "Muestra nombre, país, sector y valor de empresas.",
    fuente: "Usamos datos reales de CoinGecko y ExchangeRate.host.",
  };

  respuesta.textContent = respuestas[pregunta] || "Lo siento, no tengo esa respuesta.";
}
