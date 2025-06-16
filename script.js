let chartInstance = null;
let tipoActual = "monedas";
let periodoActual = "1d";

document.addEventListener("DOMContentLoaded", async () => {
  await cargarDatos();
  crearBotonesPeriodo();
  document.getElementById("tipoDato").addEventListener("change", async (e) => {
    tipoActual = e.target.value;
    await cargarDatos();
  });
});

async function cargarDatos() {
  try {
    if (tipoActual === "monedas") {
      const res = await fetch("https://api.exchangerate.host/latest");
      const data = await res.json();
      const monedas = Object.keys(data.rates);
      mostrarOpciones(monedas);
      renderizarGrafico("grafico", ["Inicio", "Medio", "Fin"], [100, 120, 110]);
    } else if (tipoActual === "criptomonedas") {
      const res = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd");
      const data = await res.json();
      const criptos = data.map(c => `${c.name} (${c.symbol.toUpperCase()})`);
      mostrarOpciones(criptos);
      renderizarGrafico("grafico", ["Inicio", "Medio", "Fin"], [200, 180, 210]);
    } else if (tipoActual === "empresas") {
      const empresas = ["Apple", "Microsoft", "Amazon", "Google", "Tesla", "Meta"];
      mostrarOpciones(empresas);
      renderizarGrafico("grafico", ["2022", "2023", "2024"], [500, 600, 580]);
    }
  } catch (e) {
    console.error("Error al cargar datos:", e);
  }
}

function mostrarOpciones(lista) {
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
    btn.onclick = () => {
      periodoActual = p;
      cargarDatos();
    };
    contenedor.appendChild(btn);
  });
}

function renderizarGrafico(canvasId, labels, datos) {
  const ctx = document.getElementById(canvasId).getContext("2d");

  if (chartInstance instanceof Chart) {
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
        tension: 0.4
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          labels: {
            color: document.body.classList.contains("dark-mode") ? "#ffffff" : "#000000"
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: document.body.classList.contains("dark-mode") ? "#ffffff" : "#000000"
          }
        },
        y: {
          ticks: {
            color: document.body.classList.contains("dark-mode") ? "#ffffff" : "#000000"
          }
        }
      }
    }
  });
}

function alternarModoOscuro() {
  document.body.classList.toggle("dark-mode");
  cargarDatos(); // actualiza colores del gráfico también
}

function responderIA() {
  const pregunta = document.getElementById("preguntaIA").value;
  const respuesta = document.getElementById("respuestaIA");

  const respuestas = {
    tutorial: "Usa los selectores para cambiar entre monedas, criptomonedas o empresas. Luego elige el período para ver datos históricos.",
    monedas: "Se pueden consultar monedas de más de 150 países en tiempo casi real.",
    empresas: "Se muestra información básica: nombre, evolución de precio y más pronto.",
    fuente: "Usamos CoinGecko y ExchangeRate.host como fuentes de datos."
  };

  respuesta.innerHTML = `<p>${respuestas[pregunta] || "Lo siento, no tengo esa respuesta."}</p>`;
}
