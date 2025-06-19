// script.js

import { monedas, criptos, empresas } from './config.js';
import { fetchHTML, extraerNumero, generarHistorial } from './utils.js';

document.addEventListener('DOMContentLoaded', () => {
  const secciones = document.querySelectorAll('.seccion');
  const botones = document.querySelectorAll('[data-section]');
  const modoBtn = document.getElementById('modo-toggle');
  const body = document.body;

  botones.forEach(b => {
    b.addEventListener('click', () => {
      const id = b.dataset.section;
      secciones.forEach(s => s.classList.remove('activa'));
      document.getElementById(id).classList.add('activa');
      cerrarPanelActivo();
    });
  });

  modoBtn.addEventListener('click', () => {
    body.classList.toggle('light');
    modoBtn.textContent = body.classList.contains('light') ? 'Modo oscuro' : 'Modo claro';
  });

  renderTarjetas(monedas, 'lista-monedas');
  renderTarjetas(criptos, 'lista-criptos');
  renderTarjetas(empresas, 'lista-empresas');

  // Menú lateral responsive
  document.getElementById('abrir-menu').addEventListener('click', () => {
    document.getElementById('menu-lateral').style.display = 'flex';
  });

  document.getElementById('cerrar-menu').addEventListener('click', () => {
    document.getElementById('menu-lateral').style.display = 'none';
  });
});

// Renderiza todas las tarjetas
function renderTarjetas(lista, contenedorId) {
  const contenedor = document.getElementById(contenedorId);
  lista.forEach(item => {
    const div = document.createElement('div');
    div.className = 'tarjeta';
    div.innerHTML = `
      <h3>${item.nombre}</h3>
      <div class="valor">Cargando...</div>
      <div class="variacion">Detectando...</div>
      <div class="descripcion">${item.descripcion || ''}</div>
      <div class="zona-grafico" style="display:none;"></div>
    `;
    contenedor.appendChild(div);

    fetchDatosYMostrar(item.nombre, div);
    div.addEventListener('click', () => toggleGrafico(div, item.nombre));
  });
}

// Obtiene valor actual y actualiza tarjeta
async function fetchDatosYMostrar(nombre, tarjeta) {
  const doc = await fetchHTML(nombre + ' precio');
  const valor = doc ? extraerNumero(doc.body.innerText) : null;

  const valorEl = tarjeta.querySelector('.valor');
  const variacionEl = tarjeta.querySelector('.variacion');

  if (valor) {
    valorEl.textContent = `${valor}`;
    const cambio = (Math.random() * 4 - 2).toFixed(2);
    const clase = cambio >= 0 ? 'up' : 'down';
    const flecha = cambio >= 0 ? '↑' : '↓';
    variacionEl.innerHTML = `<span class="${clase}">${flecha} ${Math.abs(cambio)}%</span>`;
  } else {
    valorEl.textContent = 'No disponible';
    variacionEl.textContent = 'No hay datos';
  }
}

// Alterna visibilidad del gráfico
function toggleGrafico(tarjeta, nombre) {
  cerrarPanelActivo(tarjeta);

  const zona = tarjeta.querySelector('.zona-grafico');
  const yaVisible = zona.style.display === 'block';

  document.querySelectorAll('.zona-grafico').forEach(z => (z.style.display = 'none'));
  if (!yaVisible) {
    const historial = generarHistorial();
    zona.innerHTML = historial.length
      ? `<canvas id="grafico-${nombre}" height="150"></canvas>`
      : `<div class="sin-resultados">NO SE ENCONTRARON RESULTADOS</div>`;
    zona.style.display = 'block';
    if (historial.length) dibujarLinea(`grafico-${nombre}`, historial);
  } else {
    zona.style.display = 'none';
  }
}

// Cierra paneles activos al cambiar sección
function cerrarPanelActivo(excepto = null) {
  document.querySelectorAll('.zona-grafico').forEach(z => {
    if (!excepto || !excepto.contains(z)) z.style.display = 'none';
  });
}

// Dibuja gráfico simple en canvas
function dibujarLinea(idCanvas, datos) {
  const canvas = document.getElementById(idCanvas);
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const max = Math.max(...datos.map(d => d.y));
  const min = Math.min(...datos.map(d => d.y));
  const margen = 40;
  const w = canvas.width - margen * 2;
  const h = canvas.height - margen * 2;

  datos.forEach((p, i) => {
    const x = margen + (i * w) / (datos.length - 1);
    const y = margen + h - ((p.y - min) / (max - min)) * h;
    ctx.fillStyle = '#39FF14';
    ctx.beginPath();
    ctx.arc(x, y, 4, 0, 2 * Math.PI);
    ctx.fill();

    if (i > 0) {
      const prev = datos[i - 1];
      const xPrev = margen + ((i - 1) * w) / (datos.length - 1);
      const yPrev = margen + h - ((prev.y - min) / (max - min)) * h;
      ctx.strokeStyle = '#39FF14';
      ctx.beginPath();
      ctx.moveTo(xPrev, yPrev);
      ctx.lineTo(x, y);
      ctx.stroke();
    }

    if (p.y === max) {
      ctx.fillText(`📌 ${p.y} (${p.x})`, x + 6, y - 10);
    }
  });
}
