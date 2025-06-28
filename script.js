// script.js

document.addEventListener("DOMContentLoaded", () => {
  const secciones = document.querySelectorAll(".seccion");
  const botonesNav = document.querySelectorAll("#menu-lateral nav button");
  const modoBoton = document.querySelector(".modo-boton");

  const abrirMenuBtn = document.getElementById("abrir-menu");
  const cerrarMenuBtn = document.getElementById("cerrar-menu");
  const menuLateral = document.getElementById("menu-lateral");

  // Modo claro/oscuro
  modoBoton.addEventListener("click", () => {
    document.body.classList.toggle("light");
  });

  // Navegación
  botonesNav.forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-seccion");
      secciones.forEach(sec => sec.classList.remove("activa"));
      document.getElementById(id).classList.add("activa");

      if (id === "ia") ejecutarIA("¿Qué puedo hacer en esta app?");
    });
  });

  // Menú responsive
  abrirMenuBtn.addEventListener("click", () => menuLateral.style.display = "flex");
  cerrarMenuBtn.addEventListener("click", () => menuLateral.style.display = "none");

  // Carga inicial
  document.getElementById("inicio").classList.add("activa");

  document.getElementById("btn-monedas").addEventListener("click", cargarMonedas);
  document.getElementById("btn-criptos").addEventListener("click", cargarCriptos);
  document.getElementById("btn-empresas").addEventListener("click", cargarEmpresas);
});

// Funciones de carga con datos reales

async function cargarMonedas() {
  const contenedor = document.querySelector("#monedas .contenedor-tarjetas");
  contenedor.innerHTML = "Cargando...";
  try {
    const html = await intentarFuentes(FUENTES.monedas);
    contenedor.innerHTML = extraerDatosBasicos(html, "USD-PEN");
  } catch {
    contenedor.innerHTML = "⚠️ No se pudo obtener datos reales.";
  }
}

async function cargarCriptos() {
  const contenedor = document.querySelector("#criptos .contenedor-tarjetas");
  contenedor.innerHTML = "Cargando...";
  try {
    const html = await intentarFuentes(FUENTES.criptos);
    contenedor.innerHTML = extraerDatosBasicos(html, "bitcoin");
  } catch {
    contenedor.innerHTML = "⚠️ No se pudo obtener datos reales.";
  }
}

async function cargarEmpresas() {
  const contenedor = document.querySelector("#empresas .contenedor-tarjetas");
  contenedor.innerHTML = "Cargando...";
  try {
    const html = await intentarFuentes(FUENTES.empresas);
    contenedor.innerHTML = extraerDatosBasicos(html, "apple");
  } catch {
    contenedor.innerHTML = "⚠️ No se pudo obtener datos reales.";
  }
}

// Función simulada para extraer datos básicos — reemplazar por parseo real
function extraerDatosBasicos(html, clave) {
  return `
    <div class="tarjeta">
      <h3><i class="fa-solid fa-chart-line"></i> ${clave}</h3>
      <div class="valor">S/ 3.65</div>
      <div class="variacion"><span class="up">▲</span> +1.2%</div>
      <div class="descripcion">Tendencia estable esta semana</div>
    </div>
  `;
}
