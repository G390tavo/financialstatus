document.addEventListener("DOMContentLoaded", () => {
  const botones = document.querySelectorAll("aside button[data-section]");
  const secciones = document.querySelectorAll("main .seccion");
  const modoToggle = document.getElementById("modo-toggle");
  const body = document.body;
  const menuLateral = document.getElementById("menu-lateral");
  const cerrarMenu = document.getElementById("cerrar-menu");
  const abrirMenu = document.getElementById("abrir-menu");

  // Navegación entre secciones
  botones.forEach(boton => {
    boton.addEventListener("click", () => {
      const id = boton.getAttribute("data-section");

      secciones.forEach(sec => sec.classList.remove("activa"));
      document.getElementById(id).classList.add("activa");

      if (window.innerWidth < 768) {
        menuLateral.style.display = "none";
        abrirMenu.style.display = "block";
      }
    });
  });

  // Botón para cerrar menú
  cerrarMenu.addEventListener("click", () => {
    menuLateral.style.display = "none";
    abrirMenu.style.display = "block";
  });

  // Botón para abrir menú
  abrirMenu.addEventListener("click", () => {
    menuLateral.style.display = "block";
    abrirMenu.style.display = "none";
  });

  // Modo claro/oscuro
  modoToggle.addEventListener("click", () => {
    if (body.classList.contains("dark")) {
      body.classList.remove("dark");
      modoToggle.textContent = "Modo oscuro";
    } else {
      body.classList.add("dark");
      modoToggle.textContent = "Modo claro";
    }
  });

  // Renderizar tarjetas al cargar
  renderTarjetas("monedas", monedas);
  renderTarjetas("criptos", criptos);
  renderTarjetas("empresas", empresas);
});

// Función para mostrar tarjetas de cada sección
function renderTarjetas(idContenedor, lista) {
  const contenedor = document.getElementById("lista-" + idContenedor);
  if (!contenedor) return;

  contenedor.innerHTML = "";

  lista.forEach(item => {
    const tarjeta = crearTarjeta(item, idContenedor);
    contenedor.appendChild(tarjeta);
  });
}

// Gráfico simple (puedes mejorar con Chart.js u otro)
function mostrarGrafico(nombre, datos) {
  const grafico = document.getElementById("grafico");
  grafico.innerHTML = `<h3>Gráfico: ${nombre}</h3><pre>${JSON.stringify(datos, null, 2)}</pre>`;
}
