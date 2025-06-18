document.addEventListener("DOMContentLoaded", () => {
  const secciones = {
    inicio: document.getElementById("inicio"),
    monedas: document.getElementById("monedas"),
    criptomonedas: document.getElementById("criptomonedas"),
    empresas: document.getElementById("empresas"),
    ia: document.getElementById("ia")
  };

  const botonesMenu = {
    inicio: document.getElementById("btnInicio"),
    monedas: document.getElementById("btnMonedas"),
    criptomonedas: document.getElementById("btnCriptomonedas"),
    empresas: document.getElementById("btnEmpresas"),
    ia: document.getElementById("btnIA")
  };

  const cerrarMenuBtn = document.getElementById("cerrarMenu");
  const menuLateral = document.querySelector(".menu-lateral");
  const modoOscuroBtn = document.getElementById("modoOscuro");

  // Función para mostrar una sección y ocultar las demás
  function mostrarSeccion(id) {
    for (const clave in secciones) {
      secciones[clave].style.display = "none";
    }
    secciones[id].style.display = "block";
  }

  // Mostrar sección inicio al cargar
  mostrarSeccion("inicio");

  // Asignar eventos a los botones del menú
  botonesMenu.inicio.addEventListener("click", () => mostrarSeccion("inicio"));
  botonesMenu.monedas.addEventListener("click", () => mostrarSeccion("monedas"));
  botonesMenu.criptomonedas.addEventListener("click", () => mostrarSeccion("criptomonedas"));
  botonesMenu.empresas.addEventListener("click", () => mostrarSeccion("empresas"));
  botonesMenu.ia.addEventListener("click", () => mostrarSeccion("ia"));

  // Botón cerrar menú
  cerrarMenuBtn.addEventListener("click", () => {
    menuLateral.classList.toggle("abierto");
  });

  // Botón modo oscuro
  modoOscuroBtn.addEventListener("click", () => {
    document.body.classList.toggle("oscuro");
  });

  // Activar IA automáticamente
  if (typeof iniciarIA === "function") {
    iniciarIA(); // Se ejecuta automáticamente con preguntas iniciales
  } else {
    console.warn("AI no inicializada. Faltan elementos.");
  }

  // Eventos para hacer clic en elementos y graficarlos (con ai.js)
  const listaClases = ["listaMonedas", "listaCriptos", "listaEmpresas"];
  listaClases.forEach(clase => {
    const lista = document.querySelector(`.${clase}`);
    if (lista) {
      lista.addEventListener("click", (e) => {
       
