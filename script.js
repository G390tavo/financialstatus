document.addEventListener("DOMContentLoaded", () => {
  const botonesSecciones = document.querySelectorAll("#menu-lateral nav button");
  const secciones = document.querySelectorAll(".seccion");
  const abrirMenu = document.getElementById("abrir-menu");
  const cerrarMenu = document.getElementById("cerrar-menu");
  const menuLateral = document.getElementById("menu-lateral");
  const body = document.body;
  const modoBtn = document.getElementById("modo-boton");

  function mostrarSeccion(id) {
    secciones.forEach(sec => sec.classList.remove("activa"));
    const seccion = document.getElementById(id);
    if (seccion) seccion.classList.add("activa");
  }

  botonesSecciones.forEach(btn => {
    btn.addEventListener("click", async () => {
      const id = btn.dataset.seccion;
      mostrarSeccion(id);

      if (["monedas", "criptos", "empresas"].includes(id)) {
        const fuentes = obtenerFuentesConProxy(id);
        const fallback = `${id}.html`;
        try {
          const html = await intentarFuentes(fuentes, fallback);
          generarTarjetas(html, id);
        } catch (err) {
          document.getElementById(id).innerHTML = `<div class="error">❌ No se pudo cargar ${id}</div>`;
        }
      }

      if (window.innerWidth < 768) {
        menuLateral.style.display = "none";
        abrirMenu.style.display = "block";
      }
    });
  });

  abrirMenu.addEventListener("click", () => {
    menuLateral.style.display = "flex";
    abrirMenu.style.display = "none";
  });

  cerrarMenu.addEventListener("click", () => {
    menuLateral.style.display = "none";
    abrirMenu.style.display = "block";
  });

  modoBtn.addEventListener("click", () => {
    const esClaro = body.classList.toggle("light");
    modoBtn.textContent = esClaro ? "Modo Oscuro" : "Modo Claro";
  });

  mostrarSeccion("inicio");
});
