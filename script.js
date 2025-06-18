document.addEventListener("DOMContentLoaded", () => {
  const botonesMenu = document.querySelectorAll("[data-section]");
  const secciones = document.querySelectorAll(".seccion");
  const menu = document.getElementById("menu-lateral");
  const btnCerrar = document.getElementById("cerrar-menu");
  const btnAbrir = document.getElementById("abrir-menu");
  const modoToggle = document.getElementById("modo-toggle");
  const body = document.body;

  // Mostrar solo una sección
  function mostrarSeccion(id) {
    secciones.forEach(sec => sec.classList.remove("activa"));
    document.getElementById(id).classList.add("activa");
  }

  botonesMenu.forEach(btn => {
    btn.addEventListener("click", () => {
      mostrarSeccion(btn.dataset.section);
    });
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

  // Menú lateral abrir/cerrar
  btnCerrar.addEventListener("click", () => {
    menu.style.display = "none";
    btnAbrir.style.display = "block";
  });

  btnAbrir.addEventListener("click", () => {
    menu.style.display = "block";
    btnAbrir.style.display = "none";
  });

  // Renderizar tarjetas (criptos, monedas, empresas)
  function renderTarjetas(lista, contenedorID, tipo) {
    const contenedor = document.getElementById(contenedorID);
    contenedor.innerHTML = "";

    lista.forEach(async (item) => {
      const tarjeta = crearTarjeta(item, tipo);
      contenedor.appendChild(tarjeta);

      // Buscar valor actual
      const html = await fetchHTML(`https://www.google.com/search?q=${encodeURIComponent(item.busqueda)}`);
      const match = html && html.match(/(\d{1,3}(?:[.,]\d{1,2})?)\s?(USD|\$|euros|soles)?/i);
      const valorActual = match ? parseFloat(match[1].replace(",", ".")) : null;

      const valorDiv = tarjeta.querySelector(".valor");
      const variacionDiv = tarjeta.querySelector(".variacion");

      if (!valorActual) {
        valorDiv.innerHTML = "No disponible";
        variacionDiv.style.display = "none";
        return;
      }

      // Calcular variación aleatoria de ejemplo (puedes mejorar con histórico real)
      const variacion = (Math.random() * 6 - 3).toFixed(2);
      const esSubida = variacion >= 0;
      valorDiv.innerHTML = `$${valorActual}`;
      variacionDiv.innerHTML = `${esSubida ? "⬆️" : "⬇️"} ${Math.abs(variacion)}%`;
      variacionDiv.style.color = esSubida ? "#2ecc71" : "#e74c3c";

      // Al hacer clic en la tarjeta → mostrar gráfico debajo
      tarjeta.addEventListener("click", () => {
        mostrarGrafico(tarjeta, item.nombre, valorActual);
      });
    });
  }

  // Mostrar por defecto sección inicio
  mostrarSeccion("inicio");

  // Renderizar elementos
  renderTarjetas(criptomonedas, "lista-criptos", "cripto");
  renderTarjetas(monedas, "lista-monedas", "moneda");
  renderTarjetas(empresas, "lista-empresas", "empresa");
});
