document.addEventListener("DOMContentLoaded", () => {
  mostrarSeccion("inicio");
  if (document.getElementById("contenedor-monedas")) cargarMonedas();
  if (document.getElementById("contenedor-criptos")) cargarCriptos();
  if (document.getElementById("contenedor-empresas")) cargarEmpresas();
  if (document.getElementById("pregunta-ia")) ejecutarIA();

  document.getElementById("modo-boton")?.addEventListener("click", toggleModo);
  document.getElementById("abrir-menu")?.addEventListener("click", () => {
    document.getElementById("menu-lateral").style.display = "flex";
    document.getElementById("abrir-menu").style.display = "none";
  });
  document.getElementById("cerrar-menu")?.addEventListener("click", () => {
    document.getElementById("menu-lateral").style.display = "none";
    document.getElementById("abrir-menu").style.display = "block";
  });

  document.getElementById("pregunta-ia")?.addEventListener("keydown", e => {
    if (e.key === "Enter") responderIA();
  });
});

function mostrarSeccion(id) {
  document.querySelectorAll(".seccion").forEach(s => s.classList.remove("activa"));
  document.getElementById(id)?.classList.add("activa");
}

function toggleModo() {
  document.body.classList.toggle("light");
}
