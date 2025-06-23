document.addEventListener("DOMContentLoaded", () => {
  cargarMonedas();
  cargarCriptos();
  cargarEmpresas();
  initIA();
});

function cambiarSeccion(id) {
  document.querySelectorAll(".seccion").forEach(sec => sec.classList.remove("activa"));
  const nueva = document.getElementById(id);
  if (nueva) nueva.classList.add("activa");
}

async function cargarMonedas() {
  const contenedor = document.getElementById("monedas");
  if (!contenedor) return;
  contenedor.innerHTML = "Cargando...";
  const monedas = ["PEN", "EUR", "GBP", "JPY"];
  let html = "";

  for (let moneda of monedas) {
    const valor = await obtenerDatosMoneda(moneda);
    html += `
      <div class="tarjeta" onclick="mostrarGrafico('${moneda}', 'moneda')">
        <h3>${moneda}</h3>
        <div class="valor">${valor} USD</div>
        <div class="descripcion">Moneda internacional</div>
      </div>
    `;
  }
  contenedor.innerHTML = html;
}

async function cargarCriptos() {
  const contenedor = document.getElementById("criptos");
  if (!contenedor) return;
  contenedor.innerHTML = "Cargando...";
  const criptos = ["bitcoin", "ethereum", "solana", "ripple"];
  let html = "";

  for (let cripto of criptos) {
    const valor = await obtenerDatosCrypto(cripto);
    html += `
      <div class="tarjeta" onclick="mostrarGrafico('${cripto}', 'cripto')">
        <h3>${cripto.toUpperCase()}</h3>
        <div class="valor">${valor} USD</div>
        <div class="descripcion">Criptomoneda popular</div>
      </div>
    `;
  }
  contenedor.innerHTML = html;
}

async function cargarEmpresas() {
  const contenedor = document.getElementById("empresas");
  if (!contenedor) return;
  contenedor.innerHTML = "Cargando...";
  const empresas = ["AAPL", "GOOGL", "MSFT", "AMZN"];
  let html = "";

  for (let empresa of empresas) {
    const valor = await obtenerDatosEmpresa(empresa);
    html += `
      <div class="tarjeta" onclick="mostrarGrafico('${empresa}', 'empresa')">
        <h3>${empresa}</h3>
        <div class="valor">${valor} USD</div>
        <div class="descripcion">Empresa del mercado americano</div>
      </div>
    `;
  }
  contenedor.innerHTML = html;
}

function mostrarGrafico(nombre, tipo) {
  // Lógica de gráfico con Chart.js (en el próximo archivo)
  alert(`Aquí iría el gráfico de ${nombre} (${tipo})`);
}
