// script.js

// Elementos del DOM
const secciones = document.querySelectorAll(".seccion");
const botones = {
  inicio: document.getElementById("btnInicio"),
  monedas: document.getElementById("btnMonedas"),
  criptos: document.getElementById("btnCriptomonedas"),
  empresas: document.getElementById("btnEmpresas"),
  ia: document.getElementById("btnIA")
};
const modoOscuroBtn = document.getElementById("modoOscuro");
const cerrarMenuBtn = document.getElementById("cerrarMenu");
const menuLateral = document.querySelector(".menu-lateral");

// Mostrar una sección y ocultar las demás
function mostrarSeccion(id) {
  secciones.forEach(sec => {
    if (sec.id === id) {
      sec.classList.add("visible");
    } else {
      sec.classList.remove("visible");
    }
  });
}

// Al iniciar, mostrar solo INICIO
mostrarSeccion("inicio");

// Activar botones de navegación
botones.inicio.addEventListener("click", () => mostrarSeccion("inicio"));
botones.monedas.addEventListener("click", () => mostrarSeccion("monedas"));
botones.criptos.addEventListener("click", () => mostrarSeccion("criptomonedas"));
botones.empresas.addEventListener("click", () => mostrarSeccion("empresas"));
botones.ia.addEventListener("click", () => mostrarSeccion("ia"));

// Modo oscuro
modoOscuroBtn.addEventListener("click", () => {
  document.body.classList.toggle("modo-oscuro");
});

// Cerrar menú lateral
cerrarMenuBtn.addEventListener("click", () => {
  menuLateral.classList.toggle("abierto");
});

// Delegar clic en items de monedas/criptos/empresas
document.body.addEventListener("click", async (e) => {
  const item = e.target.closest(".item-dato");
  if (item) {
    const nombre = item.dataset.nombre;
    const contenedor = document.getElementById("grafico");
    contenedor.innerHTML = `<p>Cargando datos para ${nombre}...</p>`;
    mostrarSeccion("grafico");

    try {
      const valor = await obtenerValorDesdeGoogle(nombre);
      const datos = simularHistorial(valor);
      graficar(nombre, datos);
    } catch (error) {
      mostrarError("No se pudo obtener el valor. Verifica tu conexión.");
    }
  }
});
