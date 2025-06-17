// --- Configuración inicial y lógica de interfaz ---
document.addEventListener("DOMContentLoaded", () => {
  const btnMenu = document.getElementById("toggleSidebar");
  const aside = document.querySelector("aside");
  const main = document.querySelector("main");
  const btnDark = document.getElementById("btnDark");

  btnMenu.addEventListener("click", () => {
    aside.classList.toggle("open");
    main.classList.toggle("margen-abierto");
  });

  btnDark.addEventListener("click", () => {
    const activo = document.body.classList.toggle("dark");
    aplicarModoOscuro(activo);
  });

  document.querySelectorAll("aside nav button").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".seccion").forEach(sec => sec.classList.remove("activa"));
      const seccionActiva = document.getElementById(btn.dataset.seccion);
      if (seccionActiva) seccionActiva.classList.add("activa");
    });
  });

  cargarDatosMonedas();
  cargarDatosCriptos();
  cargarEmpresas();
  setupGlobal(); // Inicializa la IA
});

// --- Datos de monedas ---
async function cargarDatosMonedas() {
  const selector = document.getElementById("selectorMoneda");
  const contenedor = document.getElementById("grafMoneda");
  limpiarContenedor("grafMoneda");

  try {
    const monedas = await utils.obtenerMonedas();
    monedas.slice(0, 10).forEach(moneda => {
      const opt = document.createElement("option");
      opt.textContent = moneda;
      selector.appendChild(opt);
    });

    selector.addEventListener("change", () => dibujarGrafico("grafMoneda", selector.value));
    dibujarGrafico("grafMoneda", monedas[0]);
  } catch (e) {
    contenedor.textContent = "Error cargando monedas";
  }
}

// --- Datos de criptos ---
async function cargarDatosCriptos() {
  const selector = document.getElementById("selectorCripto");
  const contenedor = document.getElementById("grafCripto");
  limpiarContenedor("grafCripto");

  try {
    const criptos = await utils.obtenerCriptos();
    criptos.slice(0, 10).forEach(cripto => {
      const opt = document.createElement("option");
      opt.textContent = cripto;
      selector.appendChild(opt);
    });

    selector.addEventListener("change", () => dibujarGrafico("grafCripto", selector.value));
    dibujarGrafico("grafCripto", criptos[0]);
  } catch (e) {
    contenedor.textContent = "Error cargando criptomonedas";
  }
}

// --- Empresas ---
function cargarEmpresas() {
  const lista = document.getElementById("listaEmpresas");
  const empresas = CONFIG.empresas || [];

  lista.innerHTML = "";
  empresas.forEach(e => {
    const div = document.createElement("div");
    div.className = "empresa";
    div.innerHTML = `<strong>${e.nombre}</strong><br>Valor actual: ${e.valor}`;
    lista.appendChild(div);
  });
}

// --- Gráfico con puntos conectados ---
function dibujarGrafico(idContenedor, tipo) {
  const contenedor = document.getElementById(idContenedor);
  limpiarContenedor(idContenedor);

  const puntos = [];
  for (let i = 0; i <= 10; i++) {
    const valor = Math.random() * 100;
    const punto = document.createElement("div");
    punto.className = "punto";
    punto.style.left = `${(i / 10) * 100}%`;
    punto.style.bottom = `${valor}%`;

    const lbl = document.createElement("div");
    lbl.className = "lbl";
    lbl.textContent = valor.toFixed(2);
    punto.appendChild(lbl);
    contenedor.appendChild(punto);

    puntos.push({ x: (i / 10) * contenedor.clientWidth, y: contenedor.clientHeight - (valor / 100) * contenedor.clientHeight });
  }

  const canvas = document.createElement("canvas");
  canvas.width = contenedor.clientWidth;
  canvas.height = contenedor.clientHeight;
  canvas.style.position = "absolute";
  canvas.style.top = "0";
  canvas.style.left = "0";
  contenedor.appendChild(canvas);

  const ctx = canvas.getContext("2d");
  ctx.strokeStyle = "#007a33";
  ctx.lineWidth = 2;
  ctx.beginPath();
  puntos.forEach((p, i) => {
    if (i === 0) ctx.moveTo(p.x, p.y);
    else ctx.lineTo(p.x, p.y);
  });
  ctx.stroke();
}
