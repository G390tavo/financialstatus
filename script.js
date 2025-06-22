// === CAMBIAR ENTRE SECCIONES ===
function cambiarSeccion(id) {
  const secciones = document.querySelectorAll('.seccion');
  secciones.forEach(seccion => {
    seccion.classList.remove('activa');
  });
  const activa = document.getElementById(id);
  if (activa) activa.classList.add('activa');
}

// === FUNCIONES DE CARGA DE DATOS ===

function cargarMonedas() {
  const contenedor = document.getElementById("contenedor-monedas");
  if (!contenedor) return;
  contenedor.innerHTML = "Cargando monedas...";
  fetch("https://financial-proxy.onrender.com/?url=https://www.x-rates.com/table/?from=USD&amount=1")
    .then(res => res.text())
    .then(html => {
      const div = document.createElement("div");
      div.innerHTML = html;
      const filas = div.querySelectorAll(".ratesTable tbody tr");
      contenedor.innerHTML = "";
      filas.forEach(fila => {
        const cols = fila.querySelectorAll("td");
        if (cols.length >= 2) {
          const nombre = fila.querySelector("a")?.textContent.trim();
          const valor = cols[1].textContent.trim();
          const tarjeta = crearTarjeta(nombre, valor);
          contenedor.appendChild(tarjeta);
        }
      });
    })
    .catch(err => {
      contenedor.innerHTML = "Error al cargar monedas.";
      console.error(err);
    });
}

function cargarCriptos() {
  const contenedor = document.getElementById("contenedor-criptos");
  if (!contenedor) return;
  contenedor.innerHTML = "Cargando criptomonedas...";
  fetch("https://financial-proxy.onrender.com/?url=https://www.coingecko.com/en")
    .then(res => res.text())
    .then(html => {
      const div = document.createElement("div");
      div.innerHTML = html;
      const filas = div.querySelectorAll("table tbody tr");
      contenedor.innerHTML = "";
      filas.forEach(fila => {
        const nombre = fila.querySelector(".tw-hidden")?.textContent.trim();
        const valor = fila.querySelector(".td-price")?.textContent.trim();
        if (nombre && valor) {
          const tarjeta = crearTarjeta(nombre, valor);
          contenedor.appendChild(tarjeta);
        }
      });
    })
    .catch(err => {
      contenedor.innerHTML = "Error al cargar criptomonedas.";
      console.error(err);
    });
}

function cargarEmpresas() {
  const contenedor = document.getElementById("contenedor-empresas");
  if (!contenedor) return;
  contenedor.innerHTML = "Cargando empresas...";
  fetch("https://financial-proxy.onrender.com/?url=https://www.investing.com/equities/top-stock-gainers")
    .then(res => res.text())
    .then(html => {
      const div = document.createElement("div");
      div.innerHTML = html;
      const filas = div.querySelectorAll("table tbody tr");
      contenedor.innerHTML = "";
      filas.forEach(fila => {
        const nombre = fila.querySelector("td a")?.textContent.trim();
        const valor = fila.querySelector("td:nth-child(3)")?.textContent.trim();
        if (nombre && valor) {
          const tarjeta = crearTarjeta(nombre, valor);
          contenedor.appendChild(tarjeta);
        }
      });
    })
    .catch(err => {
      contenedor.innerHTML = "Error al cargar empresas.";
      console.error(err);
    });
}

// === CREAR TARJETAS DE INFORMACIÓN ===

function crearTarjeta(nombre, valor) {
  const div = document.createElement("div");
  div.className = "tarjeta";
  div.innerHTML = `
    <h3><i class="fas fa-chart-line"></i> ${nombre}</h3>
    <div class="valor">${valor}</div>
    <div class="descripcion">Haz clic para ver más detalles</div>
  `;
  div.addEventListener("click", () => {
    mostrarGrafico(nombre, valor);
  });
  return div;
}

// === MOSTRAR PANEL CON GRÁFICO (simulado) ===

function mostrarGrafico(nombre, valor) {
  const panel = document.createElement("div");
  panel.className = "panel-grafico";
  panel.innerHTML = `
    <button class="cerrar-panel">Cerrar</button>
    <h3>${nombre}</h3>
    <canvas width="300" height="120" style="background:#fff;margin-top:10px;"></canvas>
    <p>Valor actual: ${valor}</p>
  `;
  panel.querySelector(".cerrar-panel").addEventListener("click", () => {
    panel.remove();
  });
  document.body.appendChild(panel);
}

// === MENÚ LATERAL ABRIR/CERRAR ===

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("abrir-menu").addEventListener("click", () => {
    document.getElementById("menu-lateral").style.display = "flex";
  });

  document.getElementById("cerrar-menu").addEventListener("click", () => {
    document.getElementById("menu-lateral").style.display = "none";
  });

  // Activar sección por defecto
  cambiarSeccion("inicio");

  // Cargar al inicio
  cargarMonedas();
});

// === MODO OSCURO / CLARO ===

document.addEventListener("DOMContentLoaded", () => {
  const botonModo = document.querySelector(".modo-boton");
  if (!botonModo) return;
  botonModo.addEventListener("click", () => {
    document.body.classList.toggle("light");
  });
});
