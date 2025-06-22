document.addEventListener("DOMContentLoaded", () => {
  mostrarSeccion("inicio");
  cargarMonedas();
  cargarCriptos();
  cargarEmpresas();
  ejecutarIA();

  document.getElementById("btn-monedas").onclick = () => mostrarSeccion("monedas");
  document.getElementById("btn-criptos").onclick = () => mostrarSeccion("criptos");
  document.getElementById("btn-empresas").onclick = () => mostrarSeccion("empresas");
  document.getElementById("btn-inicio").onclick = () => mostrarSeccion("inicio");

  document.getElementById("modo-boton").onclick = toggleModo;
  document.getElementById("abrir-menu").onclick = () => {
    document.getElementById("menu-lateral").style.display = "flex";
    document.getElementById("abrir-menu").style.display = "none";
  };
  document.getElementById("cerrar-menu").onclick = () => {
    document.getElementById("menu-lateral").style.display = "none";
    document.getElementById("abrir-menu").style.display = "block";
  };

  document.getElementById("pregunta-ia").addEventListener("keydown", e => {
    if (e.key === "Enter") responderIA();
  });
});

function mostrarSeccion(id) {
  document.querySelectorAll(".seccion").forEach(sec => sec.classList.remove("activa"));
  document.getElementById(id).classList.add("activa");
}

function toggleModo() {
  document.body.classList.toggle("light");
}

async function cargarMonedas() {
  const contenedor = document.getElementById("contenedor-monedas");
  contenedor.innerHTML = "Cargando...";
  const tarjetas = await generarTarjetas(fuentes.monedas);
  contenedor.innerHTML = "";
  tarjetas.forEach(t => contenedor.appendChild(t));
}

async function cargarCriptos() {
  const contenedor = document.getElementById("contenedor-criptos");
  contenedor.innerHTML = "Cargando...";
  const tarjetas = await generarTarjetas(fuentes.criptos);
  contenedor.innerHTML = "";
  tarjetas.forEach(t => contenedor.appendChild(t));
}

async function cargarEmpresas() {
  const contenedor = document.getElementById("contenedor-empresas");
  contenedor.innerHTML = "Cargando...";
  const tarjetas = await generarTarjetas(fuentes.empresas);
  contenedor.innerHTML = "";
  tarjetas.forEach(t => contenedor.appendChild(t));
}

async function generarTarjetas(lista) {
  return await Promise.all(lista.map(async (item) => {
    const html = await fetchHTML(item.url);
    const valor = html ? extraerPrecioGoogle(html) : "Error";

    const tarjeta = document.createElement("div");
    tarjeta.className = "tarjeta";
    tarjeta.innerHTML = `
      <h3>${item.nombre}</h3>
      <div class="valor">${valor}</div>
      <div class="descripcion">Último valor encontrado</div>
    `;
    tarjeta.onclick = () => mostrarGrafico(tarjeta, valor);
    return tarjeta;
  }));
}

function mostrarGrafico(tarjeta, valorTexto) {
  const panel = document.createElement("div");
  panel.className = "panel-grafico";

  const canvas = document.createElement("canvas");
  panel.appendChild(canvas);

  const cerrar = document.createElement("button");
  cerrar.className = "cerrar-panel";
  cerrar.textContent = "Cerrar";
  cerrar.onclick = () => panel.remove();
  panel.appendChild(cerrar);

  tarjeta.appendChild(panel);

  const valorNum = parseFloat(valorTexto.replace(",", "."));
  const datos = generarHistorialSimulado(valorNum);
  crearGrafico(canvas, datos);
}

function ejecutarIA() {
  const entrada = document.getElementById("pregunta-ia");
  entrada.value = "¿Qué hace esta aplicación?";
  responderIA();
}

function responderIA() {
  const pregunta = document.getElementById("pregunta-ia").value.toLowerCase();
  const respuesta = document.getElementById("respuesta-ia");
  const cargando = document.getElementById("ia-cargando");
  cargando.textContent = "Cargando respuesta...";

  setTimeout(() => {
    let texto = "No entiendo la pregunta.";

    if (pregunta.includes("qué hace")) {
      texto = "Esta aplicación te muestra precios de monedas, criptomonedas y empresas, obtenidos desde internet en tiempo real, además de gráficos automáticos.";
    } else if (pregunta.includes("cómo funciona")) {
      texto = "Usamos un proxy para evitar bloqueos de CORS y extraemos los datos directamente desde Google y otras fuentes.";
    } else if (pregunta.includes("quién la creó")) {
      texto = "Fue creada por G390tavo con ayuda de inteligencia artificial.";
    }

    respuesta.textContent = texto;
    cargando.textContent = "";
  }, 1000);
}
