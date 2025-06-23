document.addEventListener("DOMContentLoaded", () => {
  cargarMonedas();
  cargarCriptos();
  cargarEmpresas();
  initIA();
});

async function cargarMonedas() {
  const contenedor = document.getElementById("monedas-lista");
  if (!contenedor) return;

  contenedor.innerHTML = "<p>Cargando monedas...</p>";

  const monedas = [
    { nombre: "USD a PEN", url: "https://www.x-rates.com/calculator/?from=USD&to=PEN&amount=1", selector: ".ccOutputTrail" },
    { nombre: "EUR a USD", url: "https://www.x-rates.com/calculator/?from=EUR&to=USD&amount=1", selector: ".ccOutputTrail" }
  ];

  contenedor.innerHTML = "";

  for (const moneda of monedas) {
    const valor = await obtenerValorDesdeHTML(moneda.url, moneda.selector);
    if (valor) {
      const tarjeta = crearTarjeta(moneda.nombre, valor, "moneda");
      contenedor.appendChild(tarjeta);
    } else {
      contenedor.innerHTML += `<p>No se pudo obtener ${moneda.nombre}</p>`;
    }
  }
}

async function cargarCriptos() {
  const contenedor = document.getElementById("criptos-lista");
  if (!contenedor) return;

  contenedor.innerHTML = "<p>Cargando criptomonedas...</p>";

  const criptos = [
    { nombre: "Bitcoin", url: "https://www.coingecko.com/es/monedas/bitcoin", selector: ".tw-text-3xl" },
    { nombre: "Ethereum", url: "https://www.coingecko.com/es/monedas/ethereum", selector: ".tw-text-3xl" }
  ];

  contenedor.innerHTML = "";

  for (const cripto of criptos) {
    const valor = await obtenerValorDesdeHTML(cripto.url, cripto.selector);
    if (valor) {
      const tarjeta = crearTarjeta(cripto.nombre, valor, "cripto");
      contenedor.appendChild(tarjeta);
    } else {
      contenedor.innerHTML += `<p>No se pudo obtener ${cripto.nombre}</p>`;
    }
  }
}

async function cargarEmpresas() {
  const contenedor = document.getElementById("empresas-lista");
  if (!contenedor) return;

  contenedor.innerHTML = "<p>Cargando empresas...</p>";

  const empresas = [
    { nombre: "Apple", url: "https://www.google.com/finance/quote/AAPL:NASDAQ", selector: ".YMlKec.fxKbKc" },
    { nombre: "Tesla", url: "https://www.google.com/finance/quote/TSLA:NASDAQ", selector: ".YMlKec.fxKbKc" }
  ];

  contenedor.innerHTML = "";

  for (const empresa of empresas) {
    const valor = await obtenerValorDesdeHTML(empresa.url, empresa.selector);
    if (valor) {
      const tarjeta = crearTarjeta(empresa.nombre, valor, "empresa");
      contenedor.appendChild(tarjeta);
    } else {
      contenedor.innerHTML += `<p>No se pudo obtener ${empresa.nombre}</p>`;
    }
  }
}

// === TARJETA VISUAL CON GRÁFICO ===
function crearTarjeta(nombre, valor, tipo) {
  const tarjeta = document.createElement("div");
  tarjeta.className = "tarjeta";
  tarjeta.innerHTML = `
    <h3>${nombre}</h3>
    <p class="valor">$${valor}</p>
    <div class="panel-grafico" style="display:none;">
      <canvas></canvas>
      <button class="cerrar-panel">Cerrar</button>
    </div>
  `;

  tarjeta.addEventListener("click", () => {
    const panel = tarjeta.querySelector(".panel-grafico");
    panel.style.display = "block";

    const canvas = panel.querySelector("canvas");
    const ctx = canvas.getContext("2d");
    new Chart(ctx, {
      type: "line",
      data: {
        labels: ["1D", "2D", "3D", "4D", "5D"],
        datasets: [{
          label: nombre,
          data: generarHistorialSimulado(valor),
          borderColor: "#39FF14",
          backgroundColor: "rgba(57, 255, 20, 0.2)",
          tension: 0.3,
          pointRadius: 4,
          pointHoverRadius: 6
        }]
      },
      options: {
        responsive: true,
        plugins: {
          tooltip: { enabled: true }
        },
        scales: {
          y: {
            ticks: { color: "#39FF14" },
            beginAtZero: false
          },
          x: {
            ticks: { color: "#39FF14" }
          }
        }
      }
    });

    panel.querySelector(".cerrar-panel").addEventListener("click", (e) => {
      e.stopPropagation();
      panel.style.display = "none";
    });
  });

  return tarjeta;
}

// Historial aleatorio basado en valor real
function generarHistorialSimulado(valorActual) {
  const valor = parseFloat(valorActual.replace(",", ""));
  if (isNaN(valor)) return [1, 2, 3, 4, 5];

  return Array.from({ length: 5 }, (_, i) =>
    parseFloat((valor * (1 + (Math.random() - 0.5) / 10)).toFixed(2))
  );
}
