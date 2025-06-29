document.addEventListener("DOMContentLoaded", () => {
  const botonesSecciones = document.querySelectorAll("#menu-lateral nav button");
  const secciones = document.querySelectorAll(".seccion");
  const abrirMenu = document.getElementById("abrir-menu");
  const cerrarMenu = document.getElementById("cerrar-menu");
  const menuLateral = document.getElementById("menu-lateral");
  const body = document.body;
  const modoBtn = document.querySelector(".modo-boton");

  // Navegación por secciones
  botonesSecciones.forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.seccion;
      const seccion = document.getElementById(id);
      if (!seccion) {
        console.warn(`⚠️ La sección con ID '${id}' no existe.`);
        return;
      }

      secciones.forEach(s => s.classList.remove("activa"));
      seccion.classList.add("activa");

      if (window.innerWidth < 768) {
        menuLateral.style.display = "none";
        abrirMenu.style.display = "block";
      }
    });
  });

  // Abrir y cerrar menú lateral
  abrirMenu.addEventListener("click", () => {
    menuLateral.style.display = "flex";
    abrirMenu.style.display = "none";
  });

  cerrarMenu.addEventListener("click", () => {
    menuLateral.style.display = "none";
    abrirMenu.style.display = "block";
  });

  // Modo claro/oscuro
  modoBtn.addEventListener("click", () => {
    body.classList.toggle("light");
  });

  // Carga inicial
  cargarMonedas();
  cargarCriptos();
  cargarEmpresas();
});

// =======================
// FUNCIONES DE CARGA
// =======================
async function cargarMonedas() {
  const contenedor = document.getElementById("monedas");
  if (!contenedor) return;

  try {
    const html = await intentarFuentes(FUENTES.monedas);
    contenedor.innerHTML = generarTarjetas(html, "moneda");
  } catch (error) {
    console.error("Error al cargar monedas:", error);
    contenedor.innerHTML = `<p>No se pudo cargar información de monedas.</p>`;
  }
}

async function cargarCriptos() {
  const contenedor = document.getElementById("criptos");
  if (!contenedor) return;

  try {
    const html = await intentarFuentes(FUENTES.criptos);
    contenedor.innerHTML = generarTarjetas(html, "cripto");
  } catch (error) {
    console.error("Error al cargar criptos:", error);
    contenedor.innerHTML = `<p>No se pudo cargar información de criptomonedas.</p>`;
  }
}

async function cargarEmpresas() {
  const contenedor = document.getElementById("empresas");
  if (!contenedor) return;

  try {
    const html = await intentarFuentes(FUENTES.empresas);
    contenedor.innerHTML = generarTarjetas(html, "empresa");
  } catch (error) {
    console.error("Error al cargar empresas:", error);
    contenedor.innerHTML = `<p>No se pudo cargar información de empresas.</p>`;
  }
}

// =======================
// TARJETAS INTERACTIVAS
// =======================
function generarTarjetas(html, tipo) {
  // Aquí va tu lógica personalizada según el tipo
  // Por ahora, simulamos un único valor extraído
  const valorEjemplo = "S/ 3.75";
  return `
    <div class="contenedor-tarjetas">
      <div class="tarjeta" tabindex="0" onclick="mostrarGrafico(this)">
        <h3><i>📈</i> ${tipo.toUpperCase()}</h3>
        <div class="valor">${valorEjemplo}</div>
        <div class="variacion"><span class="up">▲ +0.2%</span></div>
        <div class="descripcion">Último valor registrado</div>
      </div>
    </div>
  `;
}

function mostrarGrafico(elemento) {
  if (!elemento || elemento.querySelector(".panel-grafico")) return;

  const panel = document.createElement("div");
  panel.className = "panel-grafico";
  panel.innerHTML = `
    <button class="cerrar-panel" onclick="this.parentElement.remove()">X</button>
    <p>Gráfico no disponible. Solo se muestra el valor actual.</p>
  `;
  elemento.appendChild(panel);
}
