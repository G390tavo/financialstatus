// script.js

// Mostrar solo una sección a la vez
function mostrarSeccion(id) {
  const secciones = document.querySelectorAll("main section");
  secciones.forEach((sec) => {
    sec.style.display = "none";
  });

  const seleccionada = document.getElementById(id);
  if (seleccionada) {
    seleccionada.style.display = "block";
  }

  // Actualiza botón activo del menú
  const botones = document.querySelectorAll("#menu-lateral nav button");
  botones.forEach((btn) => btn.classList.remove("activo"));
  const botonActivo = document.querySelector(`#menu-lateral nav button[data-seccion='${id}']`);
  if (botonActivo) {
    botonActivo.classList.add("activo");
  }
}

// Alternar entre modo oscuro y claro
function alternarModo() {
  const body = document.body;
  const modoActual = body.classList.contains("oscuro");
  if (modoActual) {
    body.classList.remove("oscuro");
    body.classList.add("claro");
  } else {
    body.classList.remove("claro");
    body.classList.add("oscuro");
  }
}

// Cerrar menú lateral
function cerrarMenu() {
  const menu = document.getElementById("menu-lateral");
  if (menu) {
    menu.style.transform = "translateX(-100%)";
  }
}

// Abrir menú lateral
function abrirMenu() {
  const menu = document.getElementById("menu-lateral");
  if (menu) {
    menu.style.transform = "translateX(0)";
  }
}

// Detectar clic en los botones de sección
function asignarEventosSecciones() {
  const botones = document.querySelectorAll("#menu-lateral nav button[data-seccion]");
  botones.forEach((btn) => {
    btn.addEventListener("click", () => {
      const seccionId = btn.getAttribute("data-seccion");
      mostrarSeccion(seccionId);
    });
  });
}

// Animación al iniciar con modo oscuro
window.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("oscuro");
  setTimeout(() => {
    document.body.style.transition = "background-color 1s ease, color 1s ease";
  }, 100);

  // Mostrar sección de inicio
  mostrarSeccion("inicio");

  // Asignar eventos
  asignarEventosSecciones();

  // Botón modo oscuro/claro
  const btnModo = document.getElementById("btn-modo");
  if (btnModo) {
    btnModo.addEventListener("click", alternarModo);
  }

  // Botón cerrar menú
  const btnCerrar = document.getElementById("btn-cerrar-menu");
  if (btnCerrar) {
    btnCerrar.addEventListener("click", cerrarMenu);
  }

  // Botón abrir menú
  const btnAbrir = document.getElementById("btn-abrir-menu");
  if (btnAbrir) {
    btnAbrir.addEventListener("click", abrirMenu);
  }
});
