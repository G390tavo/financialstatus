// script.js

document.addEventListener("DOMContentLoaded", () => {
  const botones = document.querySelectorAll("#menu-lateral nav button");
  const secciones = document.querySelectorAll(".seccion");
  const abrirMenu = document.getElementById("abrir-menu");
  const cerrarMenu = document.getElementById("cerrar-menu");
  const menuLateral = document.getElementById("menu-lateral");

  function cambiarSeccion(id) {
    secciones.forEach(s => s.classList.remove("activa"));
    const activa = document.getElementById(id);
    if (activa) activa.classList.add("activa");
  }

  botones.forEach(b => {
    b.addEventListener("click", () => {
      const id = b.dataset.seccion;
      cambiarSeccion(id);
    });
  });

  abrirMenu.addEventListener("click", () => {
    menuLateral.style.display = "flex";
  });

  cerrarMenu.addEventListener("click", () => {
    menuLateral.style.display = "none";
  });

  document.querySelector(".modo-boton")?.addEventListener("click", () => {
    document.body.classList.toggle("light");
  });

  cargarMonedas();
  cargarCriptos();
  cargarEmpresas();
});
