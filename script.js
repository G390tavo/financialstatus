document.addEventListener('DOMContentLoaded', async () => {
  mostrarSeccion('empresas');
  await cargarEmpresas();
  await cargarMonedas();
  await cargarCriptos();
});

function mostrarSeccion(id) {
  document.querySelectorAll('.seccion').forEach(sec => sec.style.display = 'none');
  const seccion = document.getElementById(id);
  if (seccion) seccion.style.display = 'block';
}

async function cargarEmpresas() {
  const contenedor = document.getElementById('empresas-lista');
  const empresas = await obtenerEmpresas();
  contenedor.innerHTML = empresas.map(e => `
    <div class="card">
      <h3>${e.nombre}</h3>
      <p>${e.descripcion}</p>
      <p>Valor: ${e.valor_actual} USD</p>
    </div>
  `).join('');
}

async function cargarMonedas() {
  try {
    const data = await obtenerMonedas();
    const lista = document.getElementById('monedas-lista');
    lista.innerHTML = Object.entries(data).map(([clave, valor]) => `
      <div class="card" onclick="verGraficoMoneda('${clave}')">
        <h4>${clave}</h4>
        <p>${valor.toFixed(2)} (comparado con PEN)</p>
      </div>
    `).join('');
  } catch (e) {
    console.error("Error cargando monedas:", e);
  }
}

async function cargarCriptos() {
  const lista = document.getElementById('criptos-lista');
  const criptos = await obtenerCriptos();
  lista.innerHTML = criptos.map(c => `
    <div class="card" onclick="verGraficoCripto('${c.id}')">
      <h4>${c.nombre}</h4>
      <p>${c.valor.toFixed(2)} USD</p>
    </div>
  `).join('');
}

async function verGraficoMoneda(moneda) {
  const contenedor = document.getElementById('grafico-container');
  contenedor.innerHTML = `<p>Cargando gráfico de ${moneda}...</p>`;
  const chartHTML = await generarGraficoMoneda(moneda);
  contenedor.innerHTML = chartHTML;
}

async function verGraficoCripto(criptoId) {
  const contenedor = document.getElementById('grafico-cripto');
  contenedor.innerHTML = `<p>Cargando gráfico de ${criptoId}...</p>`;
  const chartHTML = await generarGraficoCripto(criptoId);
  contenedor.innerHTML = chartHTML;
}

function toggleModoOscuro() {
  document.body.classList.toggle('modo-oscuro');
}
