document.addEventListener("DOMContentLoaded", () => {
  const botonesSeccion = document.querySelectorAll("#menu-lateral nav button");
  const secciones = document.querySelectorAll(".seccion");
  const btnModo = document.getElementById("modo");
  const body = document.body;

  // Mostrar solo una sección a la vez
  botonesSeccion.forEach((btn) => {
    btn.addEventListener("click", () => {
      const seccionId = btn.getAttribute("data-seccion");
      secciones.forEach((sec) => {
        if (sec.id === seccionId) {
          sec.classList.remove("oculto");
        } else {
          sec.classList.add("oculto");
        }
      });

      // Actualizar botón activo
      botonesSeccion.forEach(b => b.classList.remove("activo"));
      btn.classList.add("activo");
    });
  });

  // Modo oscuro/claro
  btnModo.addEventListener("click", () => {
    if (body.classList.contains("claro")) {
      body.classList.remove("claro");
      btnModo.textContent = "Modo Claro";
    } else {
      body.classList.add("claro");
      btnModo.textContent = "Modo Oscuro";
    }
  });

  // Botones de abrir/cerrar menú
  const abrir = document.getElementById("abrir-menu");
  const cerrar = document.getElementById("cerrar-menu");
  const menu = document.getElementById("menu-lateral");

  abrir.addEventListener("click", () => {
    menu.style.display = "block";
  });

  cerrar.addEventListener("click", () => {
    menu.style.display = "none";
  });

  // Mostrar sección de inicio por defecto
  document.querySelector('[data-seccion="inicio"]').click();
});
