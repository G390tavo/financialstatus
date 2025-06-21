document.addEventListener("DOMContentLoaded", () => {
  const secciones = document.querySelectorAll(".seccion");
  const botonesMenu = document.querySelectorAll("#menuLateral nav button");
  const botonAbrir = document.getElementById("abrirMenu");
  const botonCerrar = document.getElementById("cerrarMenu");
  const menu = document.getElementById("menuLateral");
  const botonModo = document.getElementById("modoToggle");

  // Mostrar solo la sección seleccionada
  window.cambiarSeccion = function (id) {
    secciones.forEach(s => s.classList.remove("activa"));
    document.getElementById(id).classList.add("activa");

    // Cerrar menú si es móvil
    if (window.innerWidth <= 768) {
      menu.style.display = "none";
      botonAbrir.style.display = "block";
    }
  };

  // Abrir/cerrar menú
  botonAbrir.onclick = () => {
    menu.style.display = "flex";
    botonAbrir.style.display = "none";
  };

  botonCerrar.onclick = () => {
    menu.style.display = "none";
    botonAbrir.style.display = "block";
  };

  // Modo oscuro
  botonModo.onclick = () => {
    document.body.classList.toggle("light");
  };

  // IA
  const preguntas = document.getElementById("preguntasIA");
  const respuesta = document.getElementById("respuestaIA");
  const cargando = document.getElementById("ia-cargando");

  preguntas.addEventListener("change", async () => {
    const pregunta = preguntas.value;
    if (!pregunta) return;

    cargando.style.display = "block";
    respuesta.innerText = "";

    try {
      const paginas = [`https://www.google.com/search?q=${encodeURIComponent(pregunta)}`];
      const resultados = await Promise.all(paginas.map(fetchHTML));
      const resumen = extraerTexto(resultados.join(" "));
      respuesta.innerText = resumen;
    } catch (e) {
      respuesta.innerText = "Ocurrió un error al obtener la respuesta.";
    }

    cargando.style.display = "none";
  });

  // Cargar tarjetas
  cargarMonedas();
  cargarCriptos();
  cargarEmpresas();
});

// Mostrar gráfico al hacer clic
function mostrarGrafico(data) {
  const panel = document.createElement("div");
  panel.className = "panel-grafico";
  panel.innerHTML = `<button class="cerrar-panel">Cerrar</button><canvas></canvas>`;
  data.tarjeta.appendChild(panel);

  panel.querySelector(".cerrar-panel").onclick = () => panel.remove();
  crearGrafico(panel.querySelector("canvas"), data.historial);
}
