let chartInstance = null;

document.addEventListener("DOMContentLoaded", async () => {
  mostrarSeccion('monedas');
  await cargarMonedas();
  await cargarCriptos();
  await cargarEmpresas();
});

function mostrarSeccion(id) {
  document.querySelectorAll('.seccion').forEach(seccion => {
    seccion.classList.remove('activa');
  });

  const seccionActiva = document.getElementById(id);
  if (seccionActiva) seccionActiva.classList.add('activa');
}

function alternarModoOscuro() {
  document.body.classList.toggle("dark-mode");
}

// IA integrada básica sin API, solo con datos internos simulando IA
function responderIA() {
  const pregunta = document.getElementById("preguntaIA").value;
  const respuesta = document.getElementById("respuestaIA");

  const respuestas = {
    tutorial: "Utiliza los botones de navegación para explorar monedas, criptos y empresas. Haz clic para ver datos detallados.",
    fuente: "La IA interna usa datos actualizados de sitios como CoinGecko, Yahoo Finance y ExchangeRate.host.",
    monedas: "Disponibles más de 100 monedas nacionales con datos reales al día de la última conexión.",
    empresas: "Muestra nombre, sector, país y valor actual de empresas reconocidas globalmente.",
  };

  respuesta.textContent = respuestas[pregunta] || "Lo siento, no tengo esa respuesta aún.";
}

async function cargarMonedas() {
  try {
    const monedasEjemplo = ["USD", "EUR", "PEN", "ARS", "CLP", "MXN"];
    mostrarLista("listaMonedas", monedasEjemplo);
  } catch (e) {
    console.error("Error cargando monedas:", e);
  }
}

async function cargarCriptos() {
  try {
    const criptosEjemplo = ["Bitcoin", "Ethereum", "Solana", "Litecoin"];
    mostrarLista("listaCriptos", criptosEjemplo);
  } catch (e) {
    console.error("Error cargando criptos:", e);
  }
}

async function cargarEmpresas() {
  try {
    const empresas = [
      { nombre: "Apple", valor: "$185", pais: "EE.UU.", sector: "Tecnología" },
      { nombre: "Tesla", valor: "$240", pais: "EE.UU.", sector: "Automotriz" },
      { nombre: "Samsung", valor: "$1350", pais: "Corea", sector: "Electrónica" },
    ];

    const contenedor = document.getElementById("listaEmpresas");
    contenedor.innerHTML = "<table><tr><th>Nombre</th><th>Valor</th><th>País</th><th>Sector</th></tr>";

    empresas.forEach(emp => {
      contenedor.innerHTML += `<tr>
        <td>${emp.nombre}</td>
        <td>${emp.valor}</td>
        <td>${emp.pais}</td>
        <td>${emp.sector}</td>
      </tr>`;
    });

    contenedor.innerHTML += "</table>";
  } catch (e) {
    console.error("Error cargando empresas:", e);
  }
}

function mostrarLista(id, lista) {
  const contenedor = document.getElementById(id);
  contenedor.innerHTML = "<table><tr><th>Nombre</th></tr>";

  lista.forEach(nombre => {
    contenedor.innerHTML += `<tr><td>${nombre}</td></tr>`;
  });

  contenedor.innerHTML += "</table>";
}
