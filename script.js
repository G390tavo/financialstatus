document.addEventListener("DOMContentLoaded", () => {
  const botones = document.querySelectorAll("[data-section]");
  const secciones = document.querySelectorAll(".seccion");
  const modoBoton = document.getElementById("modo-toggle");

  // Mostrar solo una sección a la vez
  botones.forEach(boton => {
    boton.addEventListener("click", () => {
      const id = boton.getAttribute("data-section");
      secciones.forEach(sec => sec.classList.remove("activa"));
      document.getElementById(id).classList.add("activa");

      // Cerrar gráficos al cambiar de sección
      document.querySelectorAll(".zona-grafico").forEach(z => z.style.display = "none");
    });
  });

  // Botón abrir / cerrar menú
  document.getElementById("cerrar-menu").addEventListener("click", () => {
    document.getElementById("menu-lateral").style.display = "none";
    document.getElementById("abrir-menu").style.display = "block";
  });

  document.getElementById("abrir-menu").addEventListener("click", () => {
    document.getElementById("menu-lateral").style.display = "flex";
    document.getElementById("abrir-menu").style.display = "none";
  });

  // Modo claro / oscuro
  modoBoton.addEventListener("click", () => {
    document.body.classList.toggle("light");
    modoBoton.textContent = document.body.classList.contains("light")
      ? "Modo oscuro" : "Modo claro";
  });

  // Cargar tarjetas
  renderTarjetas(monedas, "lista-monedas", "moneda");
  renderTarjetas(criptos, "lista-criptos", "cripto");
  renderTarjetas(empresas, "lista-empresas", "empresa");
});

// Mostrar tarjetas en contenedor
function renderTarjetas(lista, contenedorId, tipo) {
  const contenedor = document.getElementById(contenedorId);
  lista.forEach(item => {
    const tarjeta = crearTarjeta(item, tipo);
    contenedor.appendChild(tarjeta);
  });
}
