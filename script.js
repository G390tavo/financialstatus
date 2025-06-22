// script.js - Funcionalidad principal de la app

document.addEventListener('DOMContentLoaded', () => {
  cambiarSeccion('inicio'); // Mostrar sección por defecto
  cargarMonedas();
  cargarCriptos();
  cargarEmpresas();
});

function cambiarSeccion(id) {
  document.querySelectorAll('.seccion').forEach(seccion => {
    seccion.classList.remove('activa');
  });
  document.getElementById(id).classList.add('activa');
}

// ================== MONEDAS ==================
function cargarMonedas() {
  const contenedor = document.getElementById('contenedor-monedas');
  if (!contenedor) return;

  obtenerHTML('https://www.x-rates.com/table/?from=PEN&amount=1', html => {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    const filas = tempDiv.querySelectorAll('table.tablesorter.ratesTable tbody tr');
    contenedor.innerHTML = '';

    filas.forEach(fila => {
      const nombre = fila.children[0]?.innerText.trim();
      const valor = fila.children[1]?.innerText.trim();
      if (nombre && valor) {
        contenedor.innerHTML += `
          <div class="tarjeta">
            <h3>${nombre}</h3>
            <div class="valor">${valor}</div>
            <div class="descripcion">1 Sol peruano equivale a</div>
          </div>`;
      }
    });
  });
}

// ================== CRIPTOMONEDAS ==================
function cargarCriptos() {
  const contenedor = document.getElementById('contenedor-criptos');
  if (!contenedor) return;

  obtenerHTML('https://coinmarketcap.com/', html => {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    const filas = tempDiv.querySelectorAll('table tbody tr');
    contenedor.innerHTML = '';

    for (let i = 0; i < 5; i++) {
      const fila = filas[i];
      if (!fila) continue;
      const nombre = fila.querySelector('.coin-item-symbol')?.innerText.trim();
      const valor = fila.querySelector('td:nth-child(4)')?.innerText.trim();
      if (nombre && valor) {
        contenedor.innerHTML += `
          <div class="tarjeta">
            <h3>${nombre}</h3>
            <div class="valor">${valor}</div>
            <div class="descripcion">Valor en USD</div>
          </div>`;
      }
    }
  });
}

// ================== EMPRESAS ==================
function cargarEmpresas() {
  const contenedor = document.getElementById('contenedor-empresas');
  if (!contenedor) return;

  const empresas = ['AAPL', 'GOOG', 'AMZN', 'MSFT', 'TSLA'];
  contenedor.innerHTML = '';

  empresas.forEach(simbolo => {
    obtenerHTML('https://finance.yahoo.com/quote/' + simbolo, html => {
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = html;
      const nombre = simbolo;
      const valor = extraerTextoDesdeHTML(html, 'fin-streamer[data-symbol="' + simbolo + '"][data-field="regularMarketPrice"]');

      contenedor.innerHTML += `
        <div class="tarjeta">
          <h3>${nombre}</h3>
          <div class="valor">${valor}</div>
          <div class="descripcion">Precio en tiempo real (Yahoo Finance)</div>
        </div>`;
    });
  });
}
