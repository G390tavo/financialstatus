document.addEventListener("DOMContentLoaded", () => {
  const botones = document.querySelectorAll("[data-seccion]");
  botones.forEach(boton => {
    boton.addEventListener("click", async () => {
      const id = boton.dataset.seccion;
      document.querySelectorAll(".seccion").forEach(seccion => {
        seccion.style.display = "none";
        seccion.classList.remove("activa");
      });
      const activa = document.getElementById(id);
      activa.style.display = "block";
      activa.classList.add("activa");

      if (["monedas", "criptos", "empresas"].includes(id)) {
        const fuentes = obtenerFuentesConProxy(id);
        const html = await intentarFuentes(fuentes).catch(async () => {
          return await obtenerHTML(`${id}.html`);
        });
        if (html) generarTarjetas(html, id);
      }
    });
  });
});

function generarTarjetas(html, tipo) {
  const contenedor = document.getElementById(tipo);
  contenedor.innerHTML = `<pre>${html}</pre>`; // Simulación visual
}
