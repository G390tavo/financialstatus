// script.js

import { fetchHTML } from "./utils.js";
import { inicializarIA } from "./ai.js";

document.addEventListener("DOMContentLoaded", () => {
  const botones = document.querySelectorAll("#menu-lateral nav button");
  const secciones = document.querySelectorAll(".seccion");
  const modoBtn = document.getElementById("modo-toggle");
  const abrirMenu = document.getElementById("abrir-menu");
  const cerrarMenu = document.getElementById("cerrar-menu");

  let panelActivo = null;

  botones.forEach(btn => {
    btn.addEventListener("click", () => {
      secciones.forEach(sec => sec.classList.remove("activa"));
      document.getElementById(btn.dataset.section).classList.add("activa");

      if (panelActivo) panelActivo.remove(); // cerrar panel si hay
    });
  });

  abrirMenu.addEventListener("click", () => {
    document.getElementById("menu-lateral").style.display = "flex";
  });

  cerrarMenu.addEventListener("click", () => {
    document.getElementById("menu-lateral").style.display = "none";
  });

  modoBtn.addEventListener("click", () => {
    document.body.classList.toggle("light");
    modoBtn.textContent = document.body.classList.contains("light") ? "Modo oscuro" : "Modo claro";
  });

  cargarTodo();
  inicializarIA();

  async function cargarTodo() {
    await cargarDatos("monedas", ["dólar hoy", "euro hoy", "yen japonés"]);
    await cargarDatos("criptos", ["Bitcoin precio", "Ethereum precio", "Litecoin hoy"]);
    await cargarDatos("empresas", ["precio acciones Apple", "Tesla acciones hoy", "Microsoft en bolsa"]);
  }

  async function cargarDatos(tipo, busquedas) {
    const contenedor = document.getElementById(`lista-${tipo}`);
    contenedor.innerHTML = "";

    const datos = await Promise.all(busquedas.map(async busqueda => {
      const texto = await fetchHTML(busqueda);
      return { nombre: busqueda.split(" ")[0], texto, busqueda };
    }));

    datos.forEach(item => {
      const tarjeta = document.createElement("div");
      tarjeta.className = "tarjeta";

      tarjeta.innerHTML = `
        <h3><i class="fas fa-circle-dollar-to-slot"></i> ${item.nombre}</h3>
        <div class="valor">${item.texto || "No disponible"}</div>
        <div class="descripcion">Pulsa para ver detalles y gráfico</div>
      `;

      tarjeta.addEventListener("click", () => {
        if (panelActivo) panelActivo.remove();

        const panel = document.createElement("div");
        panel.className = "panel-grafico";
        panel.innerHTML = `
          <button class="cerrar-panel">X</button>
          <div>${item.texto ? `Gráfico de ${item.nombre}...` : "NO SE ENCONTRARON RESULTADOS"}</div>
        `;

        panel.querySelector(".cerrar-panel").onclick = () => panel.remove();
        tarjeta.appendChild(panel);
        panelActivo = panel;
      });

      contenedor.appendChild(tarjeta);
    });
  }
});
