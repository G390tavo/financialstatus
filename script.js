// script.js - Lógica de navegación, carga, gráficos y modo

document.addEventListener('DOMContentLoaded', () => {
  cambiarSeccion('inicio');
  habilitarMenuMovil();
  document.getElementById('modo-toggle').addEventListener('click', alternarModo);
  cargarMonedas();
  cargarCriptos();
  cargarEmpresas();
  initIA();
});

function cambiarSeccion(seccion) {
  document.querySelectorAll('.seccion').forEach(s => s.classList.remove('activa'));
  document.getElementById(seccion).classList.add('activa');
  cerrarPanelesActivos();
  if (window.innerWidth <= 768) toggleMenu(false);
}

function habilitarMenuMovil() {
  document.getElementById('abrir-menu').addEventListener('click', () => toggleMenu(true));
  document.getElementById('cerrar-menu').addEventListener('click', () => toggleMenu(false));
}
function toggleMenu(abierto) {
  document.getElementById('menu-lateral').style.display = abierto ? 'flex' : 'none';
  document.getElementById('abrir-menu').style.display = abierto ? 'none' : 'block';
}

function alternarModo() {
  document.body.classList.toggle('light');
  this.innerText = document.body.classList.contains('light') ? 'Modo oscuro' : 'Modo claro';
}

// Cerrar paneles gráficos abiertos
function cerrarPanelesActivos() {
  document.querySelectorAll('.panel-grafico').forEach(p => p.remove());
}

// Crear tarjeta base con panel al clic
function crearTarjeta(tipo, label, valor, descripcion, fetchURL) {
  const t = document.createElement('div');
  t.className = 'tarjeta';
  t.innerHTML = `<h3><i class="fas fa-chart-line"></i>${label}</h3><div class="valor">${valor}</div><div class="descripcion">${descripcion}</div>`;
  t.onclick = () => {
    cerrarPanelesActivos();
    mostrarGrafico(t, fetchURL);
  };
  return t;
}

function mostrarGrafico(tarjeta, fetchURL) {
  const panel = document.createElement('div');
  panel.className = 'panel-grafico';
  panel.innerHTML = `<button class="cerrar-panel">✖</button><div class="canvas-contenedor"><canvas></canvas></div><div class="tooltip" style="display:none;"></div>`;
  tarjeta.appendChild(panel);
  
  panel.querySelector('.cerrar-panel').onclick = () => panel.remove();
  generarGrafico(panel.querySelector('canvas'), fetchURL, panel.querySelector('.tooltip'));
}

// Simular gráfico con datos reales actuales + historial ficticio
function generarGrafico(canvas, fetchURL, tooltipEl) {
  obtenerHTML(fetchURL, html => {
    const valorActual = extraerTextoDesdeHTML(html, /[\\d,\\.]+/);
    const datos = Array.from({length: 7}, (_,i) => ({x: i+1, y: parseFloat(valorActual.replace(/,/g,'')) * (1 + (Math.random()-0.5)/10)}));
    new Chart(canvas, {
      type: 'line',
      data: {labels: datos.map(d=>`Día ${d.x}`), datasets:[{data: datos.map(d=>d.y), borderColor:'#39FF14', pointBackgroundColor:'#fff', fill:false}]},
      options: {
        responsive:true,
        plugins:{tooltip:{enabled:false}, legend:{display:false}},
        scales:{x:{display:true}, y:{display:true}}
      }
    });
    // tooltip máximo
    const max = datos.reduce((a,b)=>a.y>b.y?a:b);
    setTimeout(()=> {
      const coords = canvas.getBoundingClientRect();
      tooltipEl.style.top = `${max.x/7*coords.height}px`;
      tooltipEl.style.left = `${coords.width*0.9}px`;
      tooltipEl.innerText = `Máx: ${max.y.toFixed(2)}`;
      tooltipEl.style.display = 'block';
    },500);
  }, () => {
    const area = document.createElement('p');
    area.innerText = 'NO SE ENCONTRARON RESULTADOS';
    area.style.color = '#f00';
    canvas.parentElement.parentElement.appendChild(area);
  });
}

// Cargas de tarjetas
function cargarMonedas() {
  const c = document.getElementById('contenedor-monedas'); c.innerHTML = '';
  obtenerHTML('https://www.x-rates.com/table/?from=PEN&amount=1', html => {
    const filas = document.createElement('div'); filas.innerHTML = html;
    filas.querySelectorAll('table.tablesorter.ratesTable tbody tr').forEach(f => {
      c.appendChild(crearTarjeta('mon',f.children[0].innerText, f.children[1].innerText,'Valor vs Sol','https://www.x-rates.com/table/?from=' + f.children[0].innerText));
    });
  });
}

function cargarCriptos() {
  const c = document.getElementById('contenedor-criptos'); c.innerHTML = '';
  obtenerHTML('https://coinmarketcap.com/', html => {
    const doc = document.createElement('div'); doc.innerHTML = html;
    doc.querySelectorAll('table tbody tr').forEach((r,i)=>{
      if (i>=5) return;
      const sym = r.querySelector('.coin-item-symbol')?.innerText;
      const val = r.querySelector('td:nth-child(4)')?.innerText;
      if (sym && val) c.appendChild(crearTarjeta('crypto',sym,val,'USD','https://coinmarketcap.com/currencies/' + sym.toLowerCase() + '/'));
    });
  });
}

function cargarEmpresas() {
  const c = document.getElementById('contenedor-empresas'); c.innerHTML = '';
  ['AAPL','GOOG','AMZN','MSFT','TSLA'].forEach(sym => {
    c.appendChild(crearTarjeta('empresa', sym, '...', 'Precio actual','https://finance.yahoo.com/quote/' + sym));
  });
}
