document.addEventListener("DOMContentLoaded", () => {
  const botones = document.querySelectorAll("aside button[data-seccion]");
  const secciones = document.querySelectorAll(".seccion");
  const modoBtn = document.getElementById("modo-btn");
  const cerrarBtn = document.getElementById("cerrar-menu");
  const body = document.body;
  const menu = document.getElementById("menu");

  botones.forEach(btn => {
    btn.addEventListener("click", () => {
      const target = btn.getAttribute("data-seccion");
      secciones.forEach(s => s.classList.remove("visible"));
      document.getElementById(target).classList.add("visible");
    });
  });

  modoBtn.addEventListener("click", () => {
    body.classList.toggle("modo-claro");
    modoBtn.textContent = body.classList.contains("modo-claro") ? "Modo Oscuro" : "Modo Claro";
  });

  cerrarBtn.addEventListener("click", () => {
    menu.style.display = menu.style.display === "none" ? "block" : "none";
  });

  // Cargar sección de criptos, monedas, empresas (simulado de momento)
  cargarDatosSeccion("monedas", ["dólar", "euro", "yen"]);
  cargarDatosSeccion("criptos", ["bitcoin", "ethereum", "dogecoin"]);
  cargarDatosSeccion("empresas", ["apple stock", "google stock", "amazon stock"]);
});

async function cargarDatosSeccion(id, items) {
  const contenedor = document.getElementById(id);
  for (const nombre of items) {
    const valor = await obtenerDatos(nombre);
    const card = document.createElement("div");
    card.className = "card";
    if (valor) {
      const flecha = Math.random() > 0.5 ? "⬆️" : "⬇️";
      const claseFlecha = flecha === "⬆️" ? "flecha-up" : "flecha-down";
      card.innerHTML = `<h3>${nombre.toUpperCase()}</h3>
        <p><strong>${valor}</strong> <span class="${claseFlecha}">${flecha}</span></p>
        <div id="grafico-${nombre}">[Gráfico simulado]</div>`;
    } else {
      mostrarError("No se pudo obtener información de " + nombre, card);
    }
    contenedor.appendChild(card);
  }
}
