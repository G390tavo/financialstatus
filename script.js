document.addEventListener("DOMContentLoaded", () => {
  const secciones = document.querySelectorAll(".seccion");
  const botonesMenu = document.querySelectorAll("#menu-lateral nav button");

  const cerrarMenu = document.getElementById("cerrar-menu");
  const abrirMenu = document.getElementById("abrir-menu");
  const menuLateral = document.getElementById("menu-lateral");
  const modoBoton = document.querySelector(".modo-boton");

  // Mostrar solo Inicio al comenzar
  document.getElementById("inicio").classList.add("activa");

  // Menú
  cerrarMenu.addEventListener("click", () => {
    menuLateral.style.display = "none";
    abrirMenu.style.display = "block";
  });

  abrirMenu.addEventListener("click", () => {
    menuLateral.style.display = "flex";
    abrirMenu.style.display = "none";
  });

  // Modo claro/oscuro
  modoBoton.addEventListener("click", () => {
    document.body.classList.toggle("light");
  });

  // Navegación entre secciones
  botonesMenu.forEach(boton => {
    boton.addEventListener("click", () => {
      const destino = boton.getAttribute("data-seccion");

      secciones.forEach(sec => sec.classList.remove("activa"));
      document.getElementById(destino).classList.add("activa");

      if (destino === "monedas") cargarMonedas();
      if (destino === "criptos") cargarCriptos();
      if (destino === "empresas") cargarEmpresas();
      if (destino === "ia") {
        generarOpcionesIA();
        document.getElementById("respuesta-ia").textContent = "Selecciona una pregunta para comenzar.";
      }
    });
  });

  // Pregunta a la IA
  document.getElementById("pregunta-ia").addEventListener("change", e => {
    responderIA(e.target.value);
  });
});

// === FUNCIONES PARA CADA SECCIÓN ===

async function cargarMonedas() {
  const contenedor = document.getElementById("monedas-lista");
  contenedor.innerHTML = "Cargando...";

  const datos = await intentarFuentes(FUENTES_MONEDAS, html => {
    const match = html.match(/1 USD = ([0-9.]+) PEN/i);
    if (match) {
      return [{
        nombre: "USD/PEN",
        valor: parseFloat(match[1]),
        variacion: 0,
        descripcion: "Cambio actual desde fuente oficial"
      }];
    }
    return [];
  });

  mostrarTarjetas(datos, contenedor);
}

async function cargarCriptos() {
  const contenedor = document.getElementById("criptos-lista");
  contenedor.innerHTML = "Cargando...";

  const datos = await intentarFuentes(FUENTES_CRIPTOS, html => {
    const match = html.match(/Bitcoin.*?([\d,]+\.\d+)/i);
    if (match) {
      return [{
        nombre: "Bitcoin",
        valor: parseFloat(match[1].replace(/,/g, '')),
        variacion: 2.4,
        descripcion: "Valor actual de BTC"
      }];
    }
    return [];
  });

  mostrarTarjetas(datos, contenedor);
}

async function cargarEmpresas() {
  const contenedor = document.getElementById("empresas-lista");
  contenedor.innerHTML = "Cargando...";

  const datos = await intentarFuentes(FUENTES_EMPRESAS, html => {
    const match = html.match(/Apple.*?\$([\d,]+\.\d+)/i);
    if (match) {
      return [{
        nombre: "Apple Inc.",
        valor: parseFloat(match[1].replace(/,/g, '')),
        variacion: -1.2,
        descripcion: "Acción de Apple hoy"
      }];
    }
    return [];
  });

  mostrarTarjetas(datos, contenedor);
}

// Muestra tarjetas en pantalla
function mostrarTarjetas(datos, contenedor) {
  if (!datos.length) {
    contenedor.innerHTML = "<p style='color:#e74c3c;font-weight:bold;'>No se pudieron cargar los datos.</p>";
    return;
  }

  contenedor.innerHTML = "";
  datos.forEach(dato => {
    const card = document.createElement("div");
    card.className = "tarjeta";
    card.innerHTML = `
      <h3><i>💰</i>${dato.nombre}</h3>
      <div class="valor">${dato.valor}</div>
      <div class="variacion ${dato.variacion >= 0 ? 'up' : 'down'}">
        ${dato.variacion >= 0 ? '▲' : '▼'} ${Math.abs(dato.variacion)}%
      </div>
      <div class="descripcion">${dato.descripcion}</div>
    `;
    contenedor.appendChild(card);
  });
}
