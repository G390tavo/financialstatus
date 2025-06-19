// Variables para navegación y modo
const secciones = document.querySelectorAll(".seccion");
const botonesNav = document.querySelectorAll("#menu-lateral nav button");
const botonCerrarMenu = document.getElementById("cerrar-menu");
const botonAbrirMenu = document.getElementById("abrir-menu");
const botonModo = document.getElementById("modo-toggle");
const body = document.body;

// Mostrar solo sección activa
function mostrarSeccion(nombre) {
  secciones.forEach(sec => {
    if (sec.id === nombre) sec.classList.add("activa");
    else sec.classList.remove("activa");
  });

  // Cerrar menú en móvil al cambiar sección
  if (window.innerWidth <= 768) {
    cerrarMenu();
  }

  // Cerrar panel gráfico abierto al cambiar sección
  document.querySelectorAll(".panel-grafico").forEach(panel => {
    panel.style.display = "none";
    panel.innerHTML = "";
  });
}

// Abrir y cerrar menú lateral
function cerrarMenu() {
  document.getElementById("menu-lateral").style.display = "none";
  botonAbrirMenu.style.display = "block";
}

function abrirMenu() {
  document.getElementById("menu-lateral").style.display = "flex";
  botonAbrirMenu.style.display = "none";
}

// Modo claro/oscuro toggle
function toggleModo() {
  if (body.classList.contains("light")) {
    body.classList.remove("light");
    botonModo.textContent = "Modo claro";
  } else {
    body.classList.add("light");
    botonModo.textContent = "Modo oscuro";
  }
}

// Manejar evento mostrar gráfico global
document.addEventListener("mostrarGrafico", e => {
  const { datos, contenedor } = e.detail;

  // Crear canvas para gráfico
  let canvas = contenedor.querySelector("canvas");
  if (!canvas) {
    canvas = document.createElement("canvas");
    contenedor.appendChild(canvas);
  }

  // Si ya hay gráfico, destruirlo
  if (window.chart) {
    window.chart.destroy();
  }

  // Crear gráfico con Chart.js
  window.chart = new Chart(canvas.getContext("2d"), {
    type: "line",
    data: {
      labels: datos.map(d => d.x),
      datasets: [{
        label: "Valor",
        data: datos.map(d => d.y),
        borderColor: "#39FF14",
        backgroundColor: "rgba(57, 255, 20, 0.3)",
        fill: true,
        tension: 0.3,
        pointRadius: 5,
        pointHoverRadius: 7
      }]
    },
    options: {
      responsive: true,
      plugins: {
        tooltip: {
          enabled: true,
          backgroundColor: "#39FF14",
          titleColor: "#000",
          bodyColor: "#000",
          displayColors: false,
          callbacks: {
            title: ctx => `Fecha: ${ctx[0].label}`,
            label: ctx => `Valor: ${ctx.formattedValue}`
          }
        }
      },
      scales: {
        y: {
          beginAtZero: false
        }
      },
      animation: {
        duration: 500
      }
    }
  });
});

// Inicialización de la app
document.addEventListener("DOMContentLoaded", () => {
  // Mostrar Inicio por defecto
  mostrarSeccion("inicio");

  // Botones de navegación
  botonesNav.forEach(boton => {
    boton.addEventListener("click", () => {
      mostrarSeccion(boton.getAttribute("data-section"));
    });
  });

  // Botón cerrar/abrir menú
  botonCerrarMenu.addEventListener("click", cerrarMenu);
  botonAbrirMenu.addEventListener("click", abrirMenu);

  // Botón modo claro/oscuro
  botonModo.addEventListener("click", toggleModo);

  // Inicializar IA
  iniciarIA();
});
