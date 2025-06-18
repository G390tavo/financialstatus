document.addEventListener("DOMContentLoaded", () => {
  const secciones = document.querySelectorAll(".seccion");
  const botones = document.querySelectorAll("nav button");
  const abrirMenu = document.getElementById("abrir-menu");
  const cerrarMenu = document.getElementById("cerrar-menu");
  const menuLateral = document.getElementById("menu-lateral");
  const modoToggle = document.getElementById("modo-toggle");

  botones.forEach(boton => {
    boton.addEventListener("click", () => {
      const id = boton.getAttribute("data-section");
      secciones.forEach(sec => sec.classList.remove("activa"));
      document.getElementById(id).classList.add("activa");
    });
  });

  cerrarMenu.addEventListener("click", () => {
    menuLateral.style.display = "none";
    abrirMenu.style.display = "block";
  });

  abrirMenu.addEventListener("click", () => {
    menuLateral.style.display = "block";
    abrirMenu.style.display = "none";
  });

  modoToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    modoToggle.textContent = document.body.classList.contains("dark") ? "Modo claro" : "Modo oscuro";
  });

  renderTarjetas("lista-criptos", criptos);
  renderTarjetas("lista-monedas", monedas);
  renderTarjetas("lista-empresas", empresas);
});

function renderTarjetas(id, lista) {
  const contenedor = document.getElementById(id);
  lista.forEach(item => {
    const tarjeta = crearTarjeta(item);
    contenedor.appendChild(tarjeta);
  });
}
