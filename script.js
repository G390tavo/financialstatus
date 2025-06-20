document.addEventListener("DOMContentLoaded", () => {
  const botones = document.querySelectorAll("nav button");
  const secciones = document.querySelectorAll(".seccion");
  const modoToggle = document.getElementById("modo-toggle");
  const cerrarMenu = document.getElementById("cerrar-menu");
  const abrirMenu = document.getElementById("abrir-menu");
  const menuLateral = document.getElementById("menu-lateral");

  botones.forEach(boton => {
    boton.addEventListener("click", () => {
      const target = boton.dataset.section;
      secciones.forEach(sec => sec.classList.remove("activa"));
      document.getElementById(target).classList.add("activa");

      if (window.innerWidth < 768) menuLateral.style.display = "none";
    });
  });

  modoToggle.addEventListener("click", () => {
    document.body.classList.toggle("light");
    modoToggle.textContent = document.body.classList.contains("light") ? "Modo oscuro" : "Modo claro";
  });

  cerrarMenu.addEventListener("click", () => {
    menuLateral.style.display = "none";
    abrirMenu.style.display = "block";
  });

  abrirMenu.addEventListener("click", () => {
    menuLateral.style.display = "flex";
    abrirMenu.style.display = "none";
  });

  renderTarjetas("lista-monedas", monedas);
  renderTarjetas("lista-criptos", criptos);
  renderTarjetas("lista-empresas", empresas);
});

function renderTarjetas(idContenedor, lista) {
  const contenedor = document.getElementById(idContenedor);
  contenedor.innerHTML = "";

  lista.forEach(async (item) => {
    const tarjeta = document.createElement("div");
    tarjeta.className = "tarjeta";

    const html = await fetchHTML(`https://www.google.com/search?q=${encodeURIComponent(item.nombre + " precio")}`);
    const valor = extraerValorDesdeTexto(html);
    const historial = generarHistorial(valor);

    tarjeta.innerHTML = `
      <h3>${item.nombre}</h3>
      <div class="valor">${valor ?? 'No disponible'}</div>
      <div class="descripcion">${item.descripcion ?? ""}</div>
      <div class="zona-grafico" style="margin-top:10px;">
        ${historial.length > 0
          ? generarGraficoHTML(historial, item.nombre)
          : '<p style="color:#888;font-style:italic;">NO SE ENCONTRARON RESULTADOS</p>'
        }
      </div>
    `;

    contenedor.appendChild(tarjeta);
  });
}
