document.addEventListener("DOMContentLoaded", () => {
  cambiarSeccion("inicio"); // Mostrar inicio al cargar

  const modoBoton = document.querySelector(".modo-boton");
  if (modoBoton) {
    modoBoton.addEventListener("click", () => {
      document.body.classList.toggle("light");
    });
  }

  const cerrarMenu = document.getElementById("cerrar-menu");
  const abrirMenu = document.getElementById("abrir-menu");
  const menuLateral = document.getElementById("menu-lateral");

  if (cerrarMenu && abrirMenu && menuLateral) {
    cerrarMenu.addEventListener("click", () => {
      menuLateral.style.display = "none";
      abrirMenu.style.display = "block";
    });

    abrirMenu.addEventListener("click", () => {
      menuLateral.style.display = "flex";
      abrirMenu.style.display = "none";
    });
  }

  // Ejecutar IA al inicio si está definida
  if (typeof initIA === "function") {
    initIA();
  }
});

// ================== CAMBIO DE SECCIONES ==================
function cambiarSeccion(seccionId) {
  const secciones = document.querySelectorAll(".seccion");
  secciones.forEach(seccion => {
    seccion.classList.remove("activa");
  });

  const activa = document.getElementById(seccionId);
  if (activa) {
    activa.classList.add("activa");
  }

  if (seccionId === "monedas") cargarMonedas();
  if (seccionId === "criptos") cargarCriptos();
  if (seccionId === "empresas") cargarEmpresas();
}

// ================== CARGA DE MONEDAS ==================
async function cargarMonedas() {
  const contenedor = document.getElementById("contenedor-monedas");
  if (!contenedor) return;

  contenedor.innerHTML = "Cargando monedas...";

  try {
    const html = await obtenerHTML("https://www.x-rates.com/calculator/?from=USD&to=PEN&amount=1");
    const texto = extraerTextoDesdeHTML(html, ".ccOutputTrail");
    contenedor.innerHTML = `
      <div class="tarjeta" onclick="mostrarGrafico('USD/PEN', [3.65, 3.68, 3.70, 3.69, 3.66])">
        <h3>USD a PEN</h3>
        <div class="valor">${texto}</div>
        <div class="variacion"><span class="up">+0.02%</span></div>
        <div class="descripcion">Tasa de cambio del dólar al sol</div>
      </div>`;
  } catch (e) {
    contenedor.innerHTML = "Error al cargar monedas.";
    console.error(e);
  }
}

// ================== CARGA DE CRIPTOS ==================
async function cargarCriptos() {
  const contenedor = document.getElementById("contenedor-criptos");
  if (!contenedor) return;

  contenedor.innerHTML = "Cargando criptomonedas...";

  try {
    const html = await obtenerHTML("https://www.coingecko.com/es");
    const texto = extraerTextoDesdeHTML(html, "tbody tr:nth-child(1) td:nth-child(4)");
    contenedor.innerHTML = `
      <div class="tarjeta" onclick="mostrarGrafico('Bitcoin', [69000, 68500, 68800, 69200, 69500])">
        <h3>Bitcoin</h3>
        <div class="valor">${texto}</div>
        <div class="variacion"><span class="up">+1.4%</span></div>
        <div class="descripcion">Precio actual de BTC</div>
      </div>`;
  } catch (e) {
    contenedor.innerHTML = "Error al cargar criptomonedas.";
    console.error(e);
  }
}

// ================== CARGA DE EMPRESAS ==================
async function cargarEmpresas() {
  const contenedor = document.getElementById("contenedor-empresas");
  if (!contenedor) return;

  contenedor.innerHTML = "Cargando empresas...";

  try {
    const html = await obtenerHTML("https://www.investing.com/equities/");
    const texto = extraerTextoDesdeHTML(html, "table tbody tr:nth-child(1) td:nth-child(2)");
    contenedor.innerHTML = `
      <div class="tarjeta" onclick="mostrarGrafico('Apple Inc.', [180, 182, 185, 187, 186])">
        <h3>Apple Inc.</h3>
        <div class="valor">${texto}</div>
        <div class="variacion"><span class="down">-0.5%</span></div>
        <div class="descripcion">Precio actual de acciones de Apple</div>
      </div>`;
  } catch (e) {
    contenedor.innerHTML = "Error al cargar empresas.";
    console.error(e);
  }
}

// ================== MOSTRAR GRÁFICO ==================
function mostrarGrafico(titulo, datos) {
  const panel = document.createElement("div");
  panel.className = "panel-grafico";
  panel.innerHTML = `
    <button class="cerrar-panel" onclick="this.parentElement.remove()">X</button>
    <canvas id="graficoCanvas" width="400" height="200"></canvas>
  `;

  const seccionActiva = document.querySelector(".seccion.activa");
  if (seccionActiva) {
    seccionActiva.appendChild(panel);
    setTimeout(() => {
      const ctx = document.getElementById("graficoCanvas").getContext("2d");
      new Chart(ctx, {
        type: "line",
        data: {
          labels: ["Lun", "Mar", "Mié", "Jue", "Vie"],
          datasets: [{
            label: titulo,
            data: datos,
            borderColor: "#39FF14",
            backgroundColor: "rgba(57, 255, 20, 0.2)",
            pointBackgroundColor: "#39FF14",
            fill: true,
            tension: 0.3
          }]
        },
        options: {
          plugins: {
            tooltip: {
              enabled: true
            }
          },
          responsive: true,
          scales: {
            y: {
              beginAtZero: false
            }
          }
        }
      });
    }, 100);
  }
}
