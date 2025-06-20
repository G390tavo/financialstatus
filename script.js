// === SCRIPT.JS ===
// Manejo de secciones, tarjetas y eventos de la app

const secciones = {
  inicio: document.getElementById("inicio"),
  monedas: document.getElementById("monedas"),
  criptos: document.getElementById("criptos"),
  empresas: document.getElementById("empresas"),
  ia: document.getElementById("ia")
};

const botonesMenu = document.querySelectorAll(".boton-menu");
const menuLateral = document.getElementById("menuLateral");
const btnCerrarMenu = document.getElementById("cerrarMenu");
const btnAbrirMenu = document.getElementById("abrirMenu");

// Mostrar solo una sección a la vez
function mostrarSeccion(id) {
  Object.values(secciones).forEach(sec => sec.style.display = "none");
  secciones[id].style.display = "block";

  // Cierra el menú lateral automáticamente en móvil
  if (window.innerWidth < 768) {
    menuLateral.style.display = "none";
    btnAbrirMenu.style.display = "block";
  }
}

// Botones para cambiar sección
botonesMenu.forEach(boton => {
  boton.addEventListener("click", () => {
    const id = boton.dataset.seccion;
    mostrarSeccion(id);
  });
});

// Cerrar y abrir menú
btnCerrarMenu.addEventListener("click", () => {
  menuLateral.style.display = "none";
  btnAbrirMenu.style.display = "block";
});

btnAbrirMenu.addEventListener("click", () => {
  menuLateral.style.display = "block";
  btnAbrirMenu.style.display = "none";
});

// Modo oscuro
document.getElementById("modoOscuro").addEventListener("click", () => {
  document.body.classList.toggle("oscuro");
});

// Mostrar gráfico desde tarjeta
function mostrarGrafico(nombre, valorActual, historial) {
  const ctx = document.getElementById("grafico").getContext("2d");

  const fechas = historial.map(p => p.fecha);
  const valores = historial.map(p => p.valor);

  if (window.graficoActivo) window.graficoActivo.destroy();

  window.graficoActivo = new Chart(ctx, {
    type: "line",
    data: {
      labels: fechas,
      datasets: [{
        label: nombre,
        data: valores,
        borderColor: "green",
        backgroundColor: "rgba(0,255,0,0.2)",
        tension: 0.3,
        fill: true
      }]
    },
    options: {
      responsive: true,
      plugins: {
        tooltip: {
          callbacks: {
            label: ctx => `Valor: ${ctx.raw}`
          }
        }
      }
    }
  });
}

// Función para crear tarjetas de moneda, cripto o empresa
async function crearTarjeta(nombre, query, esEmpresa = false) {
  const tarjeta = document.createElement("div");
  tarjeta.className = "tarjeta";
  tarjeta.textContent = `Cargando ${nombre}...`;

  const contenedor = esEmpresa ? secciones.empresas : (nombre.includes("coin") ? secciones.criptos : secciones.monedas);
  contenedor.appendChild(tarjeta);

  const valor = esEmpresa
    ? await obtenerValorEmpresa(query)
    : await obtenerValorDesdeGoogle(query);

  if (!valor) {
    tarjeta.textContent = `${nombre}: Error al obtener valor`;
    return;
  }

  tarjeta.textContent = `${nombre}: ${valor}`;
  const historial = generarHistorialSimulado(valor);

  tarjeta.onclick = () => {
    mostrarSeccion("inicio");
    mostrarGrafico(nombre, valor, historial);
  };
}

// Cargar tarjetas iniciales reales
crearTarjeta("Dólar", "precio del dólar en Perú");
crearTarjeta("Euro", "precio del euro en Perú");
crearTarjeta("Bitcoin", "precio del bitcoin");
crearTarjeta("Ethereum", "precio de ethereum");
crearTarjeta("Google", "GOOGL:NASDAQ", true);
crearTarjeta("Apple", "AAPL:NASDAQ", true);
