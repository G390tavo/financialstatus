document.addEventListener("DOMContentLoaded", () => {
  // === Referencias a elementos ===
  const secciones = document.querySelectorAll(".seccion");
  const botonesMenu = document.querySelectorAll("#menu-lateral nav button");
  const botonCerrarMenu = document.getElementById("cerrar-menu");
  const botonAbrirMenu = document.getElementById("abrir-menu");
  const modoBoton = document.querySelector(".modo-boton");
  const cuerpo = document.body;

  // === Modo oscuro por defecto ===
  cuerpo.classList.remove("light");

  modoBoton.addEventListener("click", () => {
    cuerpo.classList.toggle("light");
  });

  // === Mostrar solo una sección a la vez ===
  function mostrarSeccion(id) {
    secciones.forEach(seccion => {
      seccion.classList.remove("activa");
    });
    const activa = document.getElementById(id);
    if (activa) activa.classList.add("activa");

    // Cerrar todos los paneles gráficos al cambiar de sección
    document.querySelectorAll(".panel-grafico").forEach(p => p.remove());
  }

  botonesMenu.forEach(boton => {
    boton.addEventListener("click", () => {
      const id = boton.getAttribute("data-seccion");
      mostrarSeccion(id);
    });
  });

  // Mostrar sección "inicio" al cargar
  mostrarSeccion("inicio");

  // === Mostrar y ocultar menú ===
  botonCerrarMenu.addEventListener("click", () => {
    document.getElementById("menu-lateral").style.display = "none";
    botonAbrirMenu.style.display = "block";
  });

  botonAbrirMenu.addEventListener("click", () => {
    document.getElementById("menu-lateral").style.display = "flex";
    botonAbrirMenu.style.display = "none";
  });

  // === Eventos para cargar contenido ===
  document.querySelector('[data-seccion="monedas"]').addEventListener("click", cargarMonedas);
  document.querySelector('[data-seccion="criptos"]').addEventListener("click", cargarCriptos);
  document.querySelector('[data-seccion="empresas"]').addEventListener("click", cargarEmpresas);
  document.querySelector('[data-seccion="ia"]').addEventListener("click", () => {
    document.getElementById("respuesta-ia").textContent = "";
    document.getElementById("ia-cargando").textContent = "";
  });

  // === Lógica de carga ===
  async function cargarMonedas() {
    const contenedor = document.getElementById("monedas");
    contenedor.innerHTML = "";
    const resultado = await intentarFuentes([
      "https://wise.com/gb/currency-converter/usd-to-pen-rate"
    ]);

    if (!resultado.ok) {
      contenedor.innerHTML = `<p style="color:red">No se pudo obtener el valor de monedas.</p>`;
      return;
    }

    const valor = parseFloat(resultado.valor);
    contenedor.innerHTML = generarTarjeta("Dólar a Sol", "S/", valor, 0.4, "Tendencia estable", "monedas");
  }

  async function cargarCriptos() {
    const contenedor = document.getElementById("criptos");
    contenedor.innerHTML = "";

    const fuentes = [
      "https://coinmarketcap.com/currencies/bitcoin/",
      "https://www.coindesk.com/price/bitcoin/"
    ];

    const resultado = await intentarFuentes(fuentes);

    if (!resultado.ok) {
      contenedor.innerHTML = `<p style="color:red">No se pudo obtener el valor de Bitcoin.</p>`;
      return;
    }

    const valor = parseFloat(resultado.valor);
    contenedor.innerHTML = generarTarjeta("Bitcoin", "₿", valor, -2.1, "En caída esta semana", "criptos");
  }

  async function cargarEmpresas() {
    const contenedor = document.getElementById("empresas");
    contenedor.innerHTML = "";

    const fuentes = [
      "https://www.investing.com/equities/",
      "https://www.marketwatch.com/tools/stockresearch/globalmarkets"
    ];

    const resultado = await intentarFuentes(fuentes);

    if (!resultado.ok) {
      contenedor.innerHTML = `<p style="color:red">No se pudo obtener el valor de empresas.</p>`;
      return;
    }

    const valor = parseFloat(resultado.valor);
    contenedor.innerHTML = generarTarjeta("Apple Inc.", "AAPL", valor, 1.5, "En alza esta semana", "empresas");
  }

  function generarTarjeta(nombre, simbolo, valor, variacion, descripcion, tipo) {
    const signo = variacion >= 0 ? "+" : "";
    const flecha = variacion >= 0
      ? `<span class="up">▲ ${signo}${variacion}%</span>`
      : `<span class="down">▼ ${signo}${variacion}%</span>`;

    return `
      <div class="contenedor-tarjetas">
        <div class="tarjeta" onclick="mostrarGrafico(this, '${nombre}', ${valor}, '${tipo}')">
          <h3><i>${simbolo}</i> ${nombre}</h3>
          <div class="valor">${valor}</div>
          <div class="variacion">${flecha}</div>
          <div class="descripcion">${descripcion}</div>
        </div>
      </div>
    `;
  }

  // === Mostrar gráfico ===
  window.mostrarGrafico = function (tarjeta, titulo, valor, tipo) {
    const panelExistente = tarjeta.querySelector(".panel-grafico");
    if (panelExistente) {
      panelExistente.remove();
      return;
    }

    // Cerrar cualquier otro gráfico abierto
    document.querySelectorAll(".panel-grafico").forEach(p => p.remove());

    const panel = document.createElement("div");
    panel.className = "panel-grafico";
    panel.innerHTML = `
      <button class="cerrar-panel" onclick="this.parentElement.remove()">X</button>
      <p style="margin-bottom:10px;font-weight:bold">${titulo} - Historial</p>
      <div><canvas style="width:100%;height:200px;background:#111;border-radius:10px;padding:10px;color:#fff;">[Aquí va el gráfico de ${titulo}]</canvas></div>
      <div class="tooltip" style="top:10px;left:10px">Valor actual: ${valor}</div>
    `;
    tarjeta.appendChild(panel);

    tarjeta.scrollIntoView({ behavior: "smooth", block: "center" });
  };

});
