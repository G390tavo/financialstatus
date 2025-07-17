document.addEventListener("DOMContentLoaded", () => {
  const secciones = document.querySelectorAll(".seccion");
  const botones = document.querySelectorAll("#menu-lateral nav button");

  // Mostrar sección inicial
  mostrarSeccion("inicio");

  botones.forEach(btn => {
    btn.addEventListener("click", () => {
      const seccion = btn.dataset.seccion;
      mostrarSeccion(seccion);

      botones.forEach(b => b.classList.remove("activo"));
      btn.classList.add("activo");
    });
  });

  function mostrarSeccion(id) {
    secciones.forEach(sec => {
      if (sec.id === id) {
        sec.classList.add("visible");
      } else {
        sec.classList.remove("visible");
      }
    });
  }

  // Modo oscuro/claro
  const modoBoton = document.getElementById("modo-boton");
  modoBoton.addEventListener("click", () => {
    document.body.classList.toggle("oscuro");
  });

  // Abrir/cerrar menú
  const menu = document.getElementById("menu-lateral");
  const abrir = document.getElementById("abrir-menu");
  const cerrar = document.getElementById("cerrar-menu");

  abrir.addEventListener("click", () => {
    menu.classList.remove("oculto");
  });

  cerrar.addEventListener("click", () => {
    menu.classList.add("oculto");
  });
});
