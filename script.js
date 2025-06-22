// === FUNCIONES PRINCIPALES ===

function cambiarSeccion(id) {
  const secciones = document.querySelectorAll('.seccion');
  secciones.forEach(sec => sec.classList.remove('activa'));
  document.getElementById(id).classList.add('activa');
}

// === CARGA DE MONEDAS ===
function cargarMonedas() {
  const contenedor = document.getElementById('monedas');
  if (!contenedor) return;
  contenedor.innerHTML = '<p>Cargando monedas...</p>';

  // Simulado
  setTimeout(() => {
    contenedor.innerHTML = `
      <div class="tarjeta" onclick="mostrarGrafico('USD')">
        <h3><i>💵</i>Dólar (USD)</h3>
        <div class="valor">3.78</div>
        <div class="variacion"><span class="up">+0.03</span></div>
        <div class="descripcion">Valor actual frente al sol peruano.</div>
      </div>
    `;
  }, 1000);
}

function cargarCriptos() {
  const contenedor = document.getElementById('criptos');
  if (!contenedor) return;
  contenedor.innerHTML = '<p>Cargando criptomonedas...</p>';

  setTimeout(() => {
    contenedor.innerHTML = `
      <div class="tarjeta" onclick="mostrarGrafico('BTC')">
        <h3><i>₿</i>Bitcoin (BTC)</h3>
        <div class="valor">$67,200</div>
        <div class="variacion"><span class="down">-0.6%</span></div>
        <div class="descripcion">Valor estimado en USD.</div>
      </div>
    `;
  }, 1000);
}

function cargarEmpresas() {
  const contenedor = document.getElementById('empresas');
  if (!contenedor) return;
  contenedor.innerHTML = '<p>Cargando empresas...</p>';

  setTimeout(() => {
    contenedor.innerHTML = `
      <div class="tarjeta" onclick="mostrarGrafico('Apple')">
        <h3><i>🍎</i>Apple Inc.</h3>
        <div class="valor">$195.35</div>
        <div class="variacion"><span class="up">+1.2%</span></div>
        <div class="descripcion">Acciones AAPL en la bolsa de NY.</div>
      </div>
    `;
  }, 1000);
}

// === MOSTRAR GRÁFICO ===
function mostrarGrafico(nombre) {
  const panel = document.createElement('div');
  panel.className = 'panel-grafico';
  panel.innerHTML = `
    <button class="cerrar-panel" onclick="this.parentNode.remove()">Cerrar</button>
    <h4>Gráfico: ${nombre}</h4>
    <canvas id="grafico-${nombre}" width="300" height="150" style="margin-top:10px;"></canvas>
  `;
  const tarjeta = event.currentTarget;
  tarjeta.appendChild(panel);

  // Simular puntos con canvas
  const canvas = panel.querySelector('canvas');
  const ctx = canvas.getContext('2d');
  ctx.beginPath();
  ctx.moveTo(0, 120);
  ctx.lineTo(50, 100);
  ctx.lineTo(100, 90);
  ctx.lineTo(150, 70);
  ctx.lineTo(200, 80);
  ctx.lineTo(250, 60);
  ctx.strokeStyle = '#39FF14';
  ctx.lineWidth = 2;
  ctx.stroke();
}

// === MODO OSCURO/CLARO ===
function toggleModo() {
  document.body.classList.toggle('light');
  const boton = document.getElementById('modo-boton');
  boton.textContent = document.body.classList.contains('light') ? 'Modo Oscuro' : 'Modo Claro';
}

// === MENÚ LATERAL ===
function cerrarMenu() {
  document.getElementById('menu-lateral').style.display = 'none';
  document.getElementById('abrir-menu').style.display = 'block';
}
function abrirMenu() {
  document.getElementById('menu-lateral').style.display = 'flex';
  document.getElementById('abrir-menu').style.display = 'none';
}

// === INICIO AUTOMÁTICO ===
document.addEventListener('DOMContentLoaded', () => {
  cambiarSeccion('inicio');
  cargarMonedas();
  cargarCriptos();
  cargarEmpresas();
});
