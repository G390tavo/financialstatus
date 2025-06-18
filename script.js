// script.js - Control general de la aplicación
document.addEventListener("DOMContentLoaded", () => {
  const btnMoneda = document.getElementById("btn-moneda");
  const btnCripto = document.getElementById("btn-cripto");
  const btnEmpresas = document.getElementById("btn-empresas");
  const toggleDark = document.getElementById("toggle-dark");
  const sidebar = document.getElementById("sidebar");

  // Mostrar el menú lateral al inicio
  sidebar.classList.remove("hidden");

  // Cambiar modo oscuro
  toggleDark.addEventListener("click", () => {
    document.body.classList.toggle("dark");
  });

  // Botones principales
  btnMoneda.addEventListener("click", () => {
    mostrarSeccion("monedas");
    obtenerMonedas();
  });

  btnCripto.addEventListener("click", () => {
    mostrarSeccion("criptos");
    obtenerCriptos();
  });

  btnEmpresas.addEventListener("click", () => {
    mostrarSeccion("empresas");
    obtenerEmpresas();
  });

  // Inicializar IA
  if (typeof setupGlobalIA === "function") {
    setupGlobalIA();
  } else {
    console.warn("setupGlobalIA no está definido");
  }
});

function mostrarSeccion(seccion) {
  document.getElementById("monedas-lista").style.display = seccion === "monedas" ? "block" : "none";
  document.getElementById("criptos-lista").style.display = seccion === "criptos" ? "block" : "none";
  document.getElementById("info").innerText = "";
  document.getElementById("grafico").innerHTML = "";
}

// Adaptar a global si no usas módulos
function setupGlobalIA() {
  const IA = new FinancialAI();

  const select = document.getElementById("ia-preguntas");
  const btn = document.getElementById("preguntar");
  const salida = document.getElementById("ia-respuesta");

  if (!select || !btn || !salida) {
    console.warn("IA no inicializada. Faltan elementos.");
    return;
  }

  btn.addEventListener("click", () => {
    const pregunta = select.value;
    const respuesta = IA.responder(pregunta);
    salida.innerText = respuesta;
  });
}

// Mover clase FinancialAI aquí si no estás usando módulos
class FinancialAI {
  constructor() {
    this.respuestas = {
      funciona: "Esta aplicación permite visualizar precios actualizados de monedas, criptomonedas y empresas, junto con explicaciones básicas gracias a una IA integrada.",
      tutorial: "Selecciona una categoría como Monedas, Criptomonedas o Empresas. Al hacer clic en una opción, verás información y gráficos. También puedes preguntarle a la IA para entender mejor.",
      info: "Las criptomonedas son activos digitales que utilizan criptografía para garantizar transacciones seguras. Ejemplos incluyen Bitcoin, Ethereum y muchas más.",
    };
  }

  responder(pregunta) {
    return this.respuestas[pregunta] || "Lo siento, aún no tengo respuesta para eso.";
  }
}
