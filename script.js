let chartInstance = null;

document.addEventListener("DOMContentLoaded", async () => {
  crearBotonesPeriodo();
  document.getElementById("tipoDato").addEventListener("change", cargarDatos);
  await cargarDatos(); // Cargar al inicio
});

function crearBotonesPeriodo() {
  const periodos = ["1d", "7d", "30d", "1a"];
  const contenedor = document.getElementById("periodos");
  contenedor.innerHTML = "";
  periodos.forEach(p => {
    const btn = document.createElement("button");
    btn.textContent = p;
    btn.onclick = () => cargarDatos(p);
    contenedor.appendChild(btn);
  });
}

async function cargarDatos(periodo = "1d") {
  const tipo = document.getElementById("tipoDato").value;
  const contenedor = document.getElementById("contenidoDinamico");
  contenedor.innerHTML = "<p>Cargando...</p>";

  try {
    let datos = [];

    if (tipo === "monedas") {
      const res = await fetch("https://api.exchangerate.host/latest");
      const data = await res.json();
      if (!data || !data.rates) throw new Error("Datos no válidos");
      datos = Object.keys(data.rates);
      renderizarTabla(datos);
      renderizarGrafico(["Inicio", "Medio", "Fin"], [100, 120, 110]);
    } else if (tipo === "criptomonedas") {
      const res = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd");
      const data = await res.json();
      if (!Array.isArray(data)) throw new Error("Datos no válidos");
      datos = data.map(c => `${c.name} (${c.symbol.toUpperCase()})`);
      renderizarTabla(datos);
      renderizarGrafico(["Inicio", "Medio", "Fin"], [210, 180, 230]);
    } else if (tipo === "empresas") {
      datos = ["Apple", "Microsoft", "Amazon", "Google", "Tesla", "Meta"];
      renderizarTabla(datos);
      renderizarGrafico(["2022", "2023", "2024"], [500, 620, 580]);
    }
  } catch (e) {
    contenedor.innerHTML = "<p>Error al cargar datos.</p>";
    console.error("Error cargando datos:", e);
  }
}

function renderizarTabla(lista) {
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

function renderizarGrafico(labels, datos) {
  const ctx = document.getElementById("grafico").getContext("2d");
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
            color: document.body.classList.contains("dark-mode") ? "#fff" : "#000"
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: document.body.classList.contains("dark-mode") ? "#fff" : "#000"
          }
        },
        y: {
          ticks: {
            color: document.body.classList.contains("dark-mode") ? "#fff" : "#000"
          }
        }
      }
    }
  });
}

function alternarModoOscuro() {
  document.body.classList.toggle("dark-mode");
  renderizarGrafico(["Actualizando..."], [0]); // Forzar recarga con colores nuevos
}

function responderIA() {
  const pregunta = document.getElementById("preguntaIA").value;
  const respuesta = document.getElementById("respuestaIA");

  const respuestas = {
    tutorial: "Selecciona un tipo de dato (moneda, cripto, empresa), luego elige un período y verás la tabla y gráfico correspondientes.",
    monedas: "Se muestran más de 150 monedas internacionales con tasas en tiempo real.",
    empresas: "Puedes ver algunas de las empresas más importantes y su comportamiento general.",
    fuente: "Los datos provienen de CoinGecko y ExchangeRate.host."
  };

  respuesta.innerHTML = `<p>${respuestas[pregunta] || "Lo siento, no tengo esa respuesta."}</p>`;
}
