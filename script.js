let graficoActual = null;

document.addEventListener("DOMContentLoaded", () => {
  cambiarSeccion("inicio");

  const secciones = ["inicio", "monedas", "criptos", "empresas", "ia"];
  secciones.forEach((seccion) => {
    const boton = document.getElementById(`btn-${seccion}`);
    if (boton) {
      boton.addEventListener("click", () => cambiarSeccion(seccion));
    }
  });

  cargarMonedas();
  cargarCriptos();
  cargarEmpresas();
});

// Cambia de sección mostrando solo una
function cambiarSeccion(id) {
  document.querySelectorAll(".seccion").forEach((sec) => {
    sec.classList.remove("activa");
  });
  const seccionActiva = document.getElementById(id);
  if (seccionActiva) {
    seccionActiva.classList.add("activa");
  }
}

async function cargarMonedas() {
  const contenedor = document.querySelector("#monedas .contenedor-tarjetas");
  if (!contenedor) return;

  limpiarContenedor("#monedas .contenedor-tarjetas");

  const fallback = crearTarjeta("USD a PEN", "S/. 3.75", "≈ Estimado", "Fuente alternativa sin conexión.", () => {});
  contenedor.appendChild(fallback);

  try {
    const html = await obtenerHTML("https://wise.com/gb/currency-converter/usd-to-pen-rate");
    if (!html) return;

    const valor = html.querySelector("h1")?.textContent || "Desconocido";
    contenedor.innerHTML = "";
    const tarjeta = crearTarjeta("USD a PEN", valor, "Real", "Fuente: Wise", () => {
      mostrarGrafico("USD a PEN", [3.70, 3.72, 3.75, 3.76, 3.74]);
    });
    contenedor.appendChild(tarjeta);
  } catch (e) {
    console.error("Error al cargar monedas:", e);
  }
}

async function cargarCriptos() {
  const contenedor = document.querySelector("#criptos .contenedor-tarjetas");
  if (!contenedor) return;

  limpiarContenedor("#criptos .contenedor-tarjetas");

  const fallback = crearTarjeta("Bitcoin", "$65,000", "↑ 2%", "Estimado sin conexión", () => {});
  contenedor.appendChild(fallback);

  try {
    const html = await obtenerHTML("https://coinmarketcap.com/");
    if (!html) return;

    const fila = html.querySelector("tbody tr");
    const nombre = fila?.querySelector("p")?.textContent || "BTC";
    const valor = fila?.querySelector(".coin-item-symbol + span")?.textContent || "$65,000";

    contenedor.innerHTML = "";
    const tarjeta = crearTarjeta(nombre, valor, "↑ 2.3%", "Fuente: CoinMarketCap", () => {
      mostrarGrafico(nombre, [64000, 64200, 65000, 65300, 65100]);
    });
    contenedor.appendChild(tarjeta);
  } catch (e) {
    console.error("Error al cargar criptos:", e);
  }
}

async function cargarEmpresas() {
  const contenedor = document.querySelector("#empresas .contenedor-tarjetas");
  if (!contenedor) return;

  limpiarContenedor("#empresas .contenedor-tarjetas");

  const fallback = crearTarjeta("Apple Inc.", "$189", "↓ 0.4%", "Estimado sin conexión", () => {});
  contenedor.appendChild(fallback);

  try {
    const html = await obtenerHTML("https://www.investing.com/equities/");
    if (!html) return;

    const fila = html.querySelector("tbody tr");
    const nombre = fila?.querySelector("td a")?.textContent || "Empresa";
    const valor = fila?.querySelector("td:nth-child(3)")?.textContent || "S/. 0.00";

    contenedor.innerHTML = "";
    const tarjeta = crearTarjeta(nombre, valor, "↑ 1.2%", "Fuente: Investing", () => {
      mostrarGrafico(nombre, [188, 189, 190, 189.5, 189]);
    });
    contenedor.appendChild(tarjeta);
  } catch (e) {
    console.error("Error al cargar empresas:", e);
  }
}

// Mostrar gráfico estilo Modelo 1
function mostrarGrafico(titulo, datos) {
  const contenedorExistente = document.querySelector(".panel-grafico");
  if (contenedorExistente) contenedorExistente.remove();

  const contenedor = document.createElement("div");
  contenedor.className = "panel-grafico";
  contenedor.innerHTML = `
    <button class="cerrar-panel">Cerrar</button>
    <canvas id="graficoCanvas" width="400" height="200"></canvas>
  `;
  document.querySelector("main").appendChild(contenedor);

  contenedor.querySelector(".cerrar-panel").addEventListener("click", () => {
    contenedor.remove();
    if (graficoActual) {
      graficoActual.destroy();
      graficoActual = null;
    }
  });

  const ctx = document.getElementById("graficoCanvas").getContext("2d");
  if (graficoActual) graficoActual.destroy();

  graficoActual = new Chart(ctx, {
    type: "line",
    data: {
      labels: datos.map((_, i) => `Día ${i + 1}`),
      datasets: [{
        label: titulo,
        data: datos,
        borderColor: "#39FF14",
        backgroundColor: "rgba(57, 255, 20, 0.2)",
        tension: 0.3,
        pointRadius: 5,
        pointHoverRadius: 7,
      }]
    },
    options: {
      plugins: {
        tooltip: {
          enabled: true
        }
      },
      scales: {
        y: {
          beginAtZero: false,
          ticks: {
            color: "#39FF14"
          }
        },
        x: {
          ticks: {
            color: "#39FF14"
          }
        }
      }
    }
  });
}
