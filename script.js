document.addEventListener("DOMContentLoaded", () => {
  cambiarSeccion("inicio");
  cargarMonedas();
  cargarCriptos();
  cargarEmpresas();
  initIA();
});

function cambiarSeccion(id) {
  document.querySelectorAll(".seccion").forEach(seccion =>
    seccion.classList.remove("activa")
  );
  document.getElementById(id).classList.add("activa");
}

function alternarModo() {
  document.body.classList.toggle("light");
}

function abrirMenu() {
  document.getElementById("menu-lateral").style.display = "flex";
  document.getElementById("abrir-menu").style.display = "none";
}

function cerrarMenu() {
  document.getElementById("menu-lateral").style.display = "none";
  document.getElementById("abrir-menu").style.display = "block";
}

// MONEDAS
async function cargarMonedas() {
  const contenedor = document.getElementById("lista-monedas");
  contenedor.innerHTML = "Cargando monedas...";
  const doc = await obtenerHTML("https://www.x-rates.com/table/?from=USD&amount=1");
  if (!doc) return contenedor.innerHTML = "Error al obtener datos.";

  const filas = doc.querySelectorAll("table.tablesorter.ratesTable tbody tr");
  contenedor.innerHTML = "";
  filas.forEach(fila => {
    const tds = fila.querySelectorAll("td");
    const nombre = fila.querySelector("a")?.textContent.trim();
    const valor = tds[0]?.textContent.trim();
    if (nombre && valor) {
      const div = document.createElement("div");
      div.className = "tarjeta";
      div.innerHTML = `<h3>${nombre}</h3><div class="valor">${valor}</div>`;
      contenedor.appendChild(div);
    }
  });
}

// CRIPTOS
async function cargarCriptos() {
  const contenedor = document.getElementById("lista-criptos");
  contenedor.innerHTML = "Cargando criptomonedas...";
  const doc = await obtenerHTML("https://www.google.com/finance/markets/cryptocurrencies");
  if (!doc) return contenedor.innerHTML = "Error al obtener criptos.";

  const tarjetas = doc.querySelectorAll('div[jscontroller] [data-symbol]');
  contenedor.innerHTML = "";

  tarjetas.forEach(tarjeta => {
    const nombre = tarjeta.querySelector("div span")?.textContent;
    const valor = tarjeta.querySelector("[data-last-price]")?.textContent;
    if (nombre && valor) {
      const div = document.createElement("div");
      div.className = "tarjeta";
      div.innerHTML = `<h3>${nombre}</h3><div class="valor">${valor}</div>`;
      contenedor.appendChild(div);
    }
  });
}

// EMPRESAS
async function cargarEmpresas() {
  const contenedor = document.getElementById("lista-empresas");
  contenedor.innerHTML = "Cargando empresas...";
  const doc = await obtenerHTML("https://www.google.com/finance/markets/most-active");
  if (!doc) return contenedor.innerHTML = "Error al obtener empresas.";

  const tarjetas = doc.querySelectorAll('div[jscontroller] [data-symbol]');
  contenedor.innerHTML = "";

  tarjetas.forEach(tarjeta => {
    const nombre = tarjeta.querySelector("div span")?.textContent;
    const valor = tarjeta.querySelector("[data-last-price]")?.textContent;
    if (nombre && valor) {
      const div = document.createElement("div");
      div.className = "tarjeta";
      div.innerHTML = `<h3>${nombre}</h3><div class="valor">${valor}</div>`;
      div.addEventListener("click", () => mostrarPanelGrafico(nombre));
      contenedor.appendChild(div);
    }
  });
}

function mostrarPanelGrafico(nombre) {
  const panel = document.createElement("div");
  panel.className = "panel-grafico";
  panel.innerHTML = `
    <button class="cerrar-panel" onclick="this.parentElement.remove()">Cerrar</button>
    <canvas></canvas>
  `;
  const canvas = panel.querySelector("canvas");
  document.querySelector("main").appendChild(panel);

  // Genera valores simulados temporalmente
  const datos = Array.from({ length: 20 }, () =>
    Math.floor(100 + Math.random() * 100)
  );
  const etiquetas = datos.map((_, i) => `P${i + 1}`);
  mostrarGrafico(canvas, datos, etiquetas);
}
