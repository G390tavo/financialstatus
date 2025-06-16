document.addEventListener("DOMContentLoaded", async () => {
  await cargarEmpresas();
  await cargarMonedas();
  await cargarCriptomonedas();
});

async function cargarEmpresas() {
  const empresas = [
    { nombre: "Apple", sector: "Tecnología", pais: "EE.UU.", valor: 607.15 },
    { nombre: "Google", sector: "Tecnología", pais: "EE.UU.", valor: 2748.80 },
    { nombre: "Amazon", sector: "Comercio", pais: "EE.UU.", valor: 3456.23 },
    { nombre: "Tesla", sector: "Automotriz", pais: "EE.UU.", valor: 1234.56 },
    { nombre: "Samsung", sector: "Tecnología", pais: "Corea", valor: 890.50 },
    { nombre: "Microsoft", sector: "Tecnología", pais: "EE.UU.", valor: 3490.80 },
    { nombre: "NVIDIA", sector: "Tecnología", pais: "EE.UU.", valor: 980.60 },
    { nombre: "Toyota", sector: "Automotriz", pais: "Japón", valor: 165.70 },
    { nombre: "Facebook", sector: "Redes", pais: "EE.UU.", valor: 329.10 },
    { nombre: "Alibaba", sector: "Comercio", pais: "China", valor: 198.20 }
  ];

  const contenedor = document.getElementById("listaEmpresas");
  contenedor.innerHTML = "";
  empresas.forEach(e => {
    const div = document.createElement("div");
    div.innerHTML = `<strong>${e.nombre}</strong><br>
    Sector: ${e.sector} | País: ${e.pais}<br>
    Valor actual: $${e.valor}`;
    contenedor.appendChild(div);
  });
}

async function cargarMonedas() {
  try {
    const res = await fetch("https://api.exchangerate.host/latest?base=USD");
    const data = await res.json();
    const select = document.getElementById("monedaSelect");
    select.innerHTML = "";
    Object.keys(data.rates).slice(0, 10).forEach(moneda => {
      const option = document.createElement("option");
      option.value = moneda;
      option.textContent = moneda;
      select.appendChild(option);
    });
  } catch (e) {
    console.error("Error al cargar monedas", e);
  }
}

async function cargarCriptomonedas() {
  try {
    const res = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd");
    const data = await res.json();
    const select = document.getElementById("criptoSelect");
    select.innerHTML = "";
    data.slice(0, 10).forEach(c => {
      const option = document.createElement("option");
      option.value = c.id;
      option.textContent = c.name;
      select.appendChild(option);
    });
  } catch (e) {
    console.error("Error al cargar criptomonedas", e);
  }
}

function renderizarGrafico(canvasId, etiquetas, valores, titulo) {
  const ctx = document.getElementById(canvasId).getContext("2d");
  if (window[canvasId] && typeof window[canvasId].destroy === "function") {
    window[canvasId].destroy();
  }

  window[canvasId] = new Chart(ctx, {
    type: 'line',
    data: {
      labels: etiquetas,
      datasets: [{
        label: titulo,
        data: valores,
        borderColor: 'green',
        fill: false,
        tension: 0.1
      }]
    },
    options: {
      responsive: true,
      plugins: {
        tooltip: {
          callbacks: {
            label: context => `Precio: $${context.parsed.y.toFixed(2)}`
          }
        }
      },
      scales: {
        x: {
          title: { display: true, text: "Fecha" }
        },
        y: {
          title: { display: true, text: "Valor" }
        }
      }
    }
  });
}

function actualizarGraficoMoneda(periodo) {
  const moneda = document.getElementById("monedaSelect").value;
  if (!moneda) return;
  const etiquetas = ["Inicio", "Mitad", "Final"];
  const valores = [1, 1.05, 1.1]; // Temporal, reemplazar por datos reales
  renderizarGrafico("graficoMoneda", etiquetas, valores, `USD a ${moneda} (${periodo})`);
}

function actualizarGraficoCripto(periodo) {
  const cripto = document.getElementById("criptoSelect").value;
  if (!cripto) return;
  const etiquetas = ["Inicio", "Mitad", "Final"];
  const valores = [1000, 1050, 1100]; // Temporal, reemplazar por datos reales
  renderizarGrafico("graficoCripto", etiquetas, valores, `${cripto} (${periodo})`);
}

function responderIA() {
  const pregunta = document.getElementById("preguntasIA").value;
  const respuestaDiv = document.getElementById("respuestaIA");
  const respuestas = {
    tutorial: "Selecciona una sección (Empresas, Monedas o Criptos). Luego escoge el valor y período que deseas ver. La gráfica se actualizará automáticamente.",
    problemas: "Si no ves los gráficos, puede ser por una mala conexión, una API caída o un error interno. Intenta recargar o revisa si seleccionaste correctamente.",
    datos: "Tomamos datos en tiempo real de fuentes como CoinGecko y ExchangeRate.host. Si fallan, se mostrará un mensaje o un gráfico estimado.",
    empresas: "Muestra las principales empresas y su valor actual. Pronto podrás ver más detalles como evolución histórica y noticias relacionadas.",
    criptomonedas: "Selecciona entre las principales criptos para ver su evolución por día, semana, mes o tiempo real.",
    seguridad: "La app no guarda tus datos y usa APIs públicas. En el futuro tendrá defensas de ciberseguridad tipo Alpha y honeypots en Matrix."
  };
  respuestaDiv.textContent = respuestas[pregunta] || "Selecciona una pregunta válida.";
}
