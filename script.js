document.addEventListener("DOMContentLoaded", () => {
  const botones = document.querySelectorAll("nav button[data-seccion]");
  const secciones = document.querySelectorAll(".seccion");
  const contenedorIA = document.getElementById("respuesta-ia");
  const selectIA = document.getElementById("pregunta-ia");
  const inputManual = document.getElementById("pregunta-manual");
  const botonManual = document.getElementById("preguntar-manual");

  // Menú lateral
  const abrirMenu = document.getElementById("abrir-menu");
  const cerrarMenu = document.getElementById("cerrar-menu");
  const menu = document.getElementById("menu-lateral");

  abrirMenu?.addEventListener("click", () => menu.style.display = "flex");
  cerrarMenu?.addEventListener("click", () => menu.style.display = "none");

  // Activar solo una sección
  botones.forEach(boton => {
    boton.addEventListener("click", async () => {
      const seccion = boton.getAttribute("data-seccion");

      secciones.forEach(sec => sec.classList.remove("activa"));
      document.getElementById(seccion)?.classList.add("activa");

      if (["monedas", "criptos", "empresas"].includes(seccion)) {
        const contenedor = document.getElementById(seccion);
        const fuentes = obtenerFuentesConProxy(seccion);
        const html = await intentarFuentes(fuentes).catch(async () => {
          return await obtenerHTML(`${seccion}.html`);
        });
        generarTarjetas(html, seccion);
      }
    });
  });

  // Preguntas predefinidas
  preguntasPredefinidas.forEach(p => {
    const option = document.createElement("option");
    option.value = p;
    option.textContent = p;
    selectIA?.appendChild(option);
  });

  selectIA?.addEventListener("change", async () => {
    contenedorIA.textContent = "Cargando...";
    const respuesta = await responderPreguntaIA(selectIA.value);
    contenedorIA.textContent = respuesta;
  });

  botonManual?.addEventListener("click", async () => {
    const pregunta = inputManual.value.trim();
    if (!pregunta) return;
    contenedorIA.textContent = "Cargando...";
    const respuesta = await responderPreguntaIA(pregunta);
    contenedorIA.textContent = respuesta;
  });
});

function generarTarjetas(html, tipo) {
  const doc = new DOMParser().parseFromString(html, "text/html");
  let valor = "¿?";
  let variacion = "";

  if (tipo === "criptos") {
    valor = doc.querySelector(".priceValue")?.textContent?.trim() || "¿?";
    variacion = doc.querySelector(".sc-15yy2pl-0.feeyND")?.textContent?.trim() || "";
  } else if (tipo === "monedas") {
    valor = doc.querySelector(".text-success, .text-error")?.textContent?.trim() || "¿?";
  } else if (tipo === "empresas") {
    valor = doc.querySelector(".text-2xl")?.textContent?.trim() || "¿?";
  }

  document.getElementById(tipo).innerHTML = `
    <div class="tarjeta">
      <h3>${tipo.toUpperCase()}</h3>
      <div class="valor">${valor}</div>
      ${variacion ? `<div class="variacion">${variacion}</div>` : ""}
      <div class="descripcion">Datos obtenidos automáticamente.</div>
    </div>
  `;
}
