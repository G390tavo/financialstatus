document.addEventListener("DOMContentLoaded", () => {
  // Secciones disponibles
  const secciones = {
    inicio: document.getElementById("seccion-inicio"),
    monedas: document.getElementById("seccion-monedas"),
    criptos: document.getElementById("seccion-criptos"),
    empresas: document.getElementById("seccion-empresas"),
    ia: document.getElementById("seccion-ia"),
  };

  const botones = {
    inicio: document.getElementById("btn-inicio"),
    monedas: document.getElementById("btn-monedas"),
    criptos: document.getElementById("btn-criptos"),
    empresas: document.getElementById("btn-empresas"),
    ia: document.getElementById("btn-ia"),
  };

  const aside = document.querySelector("aside");
  const cerrarMenu = document.getElementById("cerrar-menu");
  const modoClaroBtn = document.getElementById("modo-claro");

  // Mostrar solo la sección indicada
  function mostrarSeccion(id) {
    for (let clave in secciones) {
      secciones[clave].style.display = (clave === id) ? "block" : "none";
    }
  }

  // Activar el menú lateral
  cerrarMenu.addEventListener("click", () => {
    aside.classList.toggle("cerrado");
  });

  // Modo claro por defecto oculto, modo oscuro activado
  modoClaroBtn.addEventListener("click", () => {
    document.body.classList.toggle("claro");
  });

  // Listeners a los botones de navegación
  for (let clave in botones) {
    botones[clave].addEventListener("click", () => {
      mostrarSeccion(clave);
    });
  }

  // Mostrar solo "inicio" al cargar
  mostrarSeccion("inicio");

  // Cargar elementos dinámicos en monedas/criptos/empresas
  cargarMonedas();
  cargarCriptos();
  cargarEmpresas();
});

// Generador de ítems con flecha y descripción
function crearItem(nombre, valor, anterior, tipo = "moneda") {
  const cont = crearElemento("div", "item");
  const titulo = crearElemento("h4", "", nombre);
  const cambio = valor - anterior;
  const flecha = cambio >= 0 ? "⬆️" : "⬇️";
  const porcentaje = Math.abs(((cambio / anterior) * 100).toFixed(2));
  const resumen = crearElemento("p", "", `${flecha} ${porcentaje}% desde la semana pasada`);
  cont.appendChild(titulo);
  cont.appendChild(resumen);

  cont.addEventListener("click", () => {
    buscarYGraficar(tipo, nombre);
  });

  return cont;
}

// Simula valores de ejemplo para monedas
function cargarMonedas() {
  const contenedor = document.getElementById("seccion-monedas");
  const monedas = [
    { nombre: "USD", valor: 3.75, anterior: 3.65 },
    { nombre: "EUR", valor: 4.20, anterior: 4.10 },
    { nombre: "JPY", valor: 0.028, anterior: 0.027 },
  ];
  monedas.forEach(m => {
    contenedor.appendChild(crearItem(m.nombre, m.valor, m.anterior, "moneda"));
  });
}

// Simula valores de ejemplo para criptos
function cargarCriptos() {
  const contenedor = document.getElementById("seccion-criptos");
  const criptos = [
    { nombre: "BTC", valor: 68000, anterior: 65000 },
    { nombre: "ETH", valor: 3600, anterior: 3400 },
    { nombre: "USDT", valor: 1.00, anterior: 1.00 },
  ];
  criptos.forEach(c => {
    contenedor.appendChild(crearItem(c.nombre, c.valor, c.anterior, "cripto"));
  });
}

// Simula valores de ejemplo para empresas
function cargarEmpresas() {
  const contenedor = document.getElementById("seccion-empresas");
  const empresas = [
    { nombre: "AAPL", valor: 188, anterior: 180 },
    { nombre: "GOOGL", valor: 135, anterior: 132 },
    { nombre: "AMZN", valor: 123, anterior: 120 },
  ];
  empresas.forEach(e => {
    contenedor.appendChild(crearItem(e.nombre, e.valor, e.anterior, "empresa"));
  });
}
