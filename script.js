document.addEventListener("DOMContentLoaded", () => {
  cambiarSeccion("inicio");

  document.getElementById("pregunta-ia").addEventListener("keydown", (e) => {
    if (e.key === "Enter") ejecutarIA();
  });

  document.getElementById("cerrar-menu").addEventListener("click", () => {
    document.getElementById("menu-lateral").style.display = "none";
    document.getElementById("abrir-menu").style.display = "block";
    document.body.style.paddingLeft = "0";
  });

  document.getElementById("abrir-menu").addEventListener("click", () => {
    document.getElementById("menu-lateral").style.display = "flex";
    document.getElementById("abrir-menu").style.display = "none";
    document.body.style.paddingLeft = "220px";
  });
});

function cambiarSeccion(id) {
  document.querySelectorAll(".seccion").forEach(sec => sec.classList.remove("activa"));
  document.getElementById(id).classList.add("activa");

  if (window.innerWidth < 768) {
    document.getElementById("menu-lateral").style.display = "none";
    document.getElementById("abrir-menu").style.display = "block";
    document.body.style.paddingLeft = "0";
  }
}

function toggleModo() {
  document.body.classList.toggle("light");
}
