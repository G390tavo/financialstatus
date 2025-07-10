document.addEventListener("DOMContentLoaded", () => {
  const botonesSecciones = document.querySelectorAll("#menu-lateral nav button");
  const secciones = document.querySelectorAll(".seccion");
  const abrirMenu = document.getElementById("abrir-menu");
  const cerrarMenu = document.getElementById("cerrar-menu");
  const menuLateral = document.getElementById("menu-lateral");
  const body = document.body;
  const modoBtn = document.getElementById("modo-boton");
  const selectIA = document.getElementById("pregunta-ia");
  const respuestaIA = document.getElementById("respuesta-ia");

  function mostrarSeccion(id) {
    secciones.forEach(sec => sec.classList.remove("activa"));
    const seccion = document.getElementById(id);
    if (seccion) seccion.classList.add("activa");
  }

  // Preguntas IA (ya vienen de ai.js)
  preguntasPredefinidas.forEach(p => {
    const opt = document.createElement("option");
    opt.value = p;
    opt.textContent = p;
    selectIA.appendChild(opt);
  });

  selectIA.addEventListener("change", async () => {
    const pregunta = selectIA.value;
    const cargando = document.getElementById("ia-cargando");
    if (cargando) cargando.style.display = "block";
    respuestaIA.textContent = "";

    const respuesta = await responderPreguntaIA(pregunta);
    respuestaIA.textContent = respuesta;
    if (cargando) cargando.style.display = "none";
  });

  // Botones de navegación
  botonesSecciones.forEach(btn => {
    btn.addEventListener("click", async () => {
      const id = btn.dataset.seccion;
      mostrarSeccion(id);
      if (window.innerWidth < 768) {
        menuLateral.style.display = "none";
        abrirMenu.style.display = "block";
      }

      if (id === "monedas" || id === "criptos" || id === "empresas") {
        const fuentes = FUENTES[id];
        const fallback = `${id}.html`;
        try {
          const html = await intentarFuentes(fuentes, fallback);
          generarTarjetas(html, id);
        } catch (e) {
          document.getElementById(id).innerHTML = "<p>Error al cargar datos.</p>";
        }
      }
    });
  });

  abrirMenu.addEventListener("click", () => {
    menuLateral.style.display = "flex";
    abrirMenu.style.display = "none";
  });

  cerrarMenu.addEventListener("click", () => {
    menuLateral.style.display = "none";
    abrirMenu.style.display = "block";
  });

  modoBtn.addEventListener("click", () => {
    const esClaro = body.classList.toggle("light");
    modoBtn.textContent = esClaro ? "Modo Oscuro" : "Modo Claro";
  });

  mostrarSeccion("inicio");
});
