// ai.js

import { preguntasIA } from './config.js';
import { fetchHTML, extraerNumero, generarHistorial } from './utils.js';

document.addEventListener('DOMContentLoaded', () => {
  const selector = document.getElementById('pregunta-ia');
  const respuesta = document.getElementById('respuesta-ia');
  const cargando = document.getElementById('ia-cargando');

  // Llenar dropdown
  preguntasIA.forEach(p => {
    const opt = document.createElement('option');
    opt.value = p;
    opt.textContent = p;
    selector.appendChild(opt);
  });

  selector.addEventListener('change', async () => {
    const pregunta = selector.value;
    if (!pregunta) return;
    cargando.style.display = 'block';
    respuesta.innerHTML = '';

    const doc = await fetchHTML(pregunta);
    cargando.style.display = 'none';

    if (!doc) {
      respuesta.innerHTML = '<p>No se pudo obtener datos en tiempo real.</p>';
      return;
    }

    const bodyText = doc.body.innerText;
    const valor = extraerNumero(bodyText);

    if (!valor) {
      respuesta.innerHTML = '<p>No se pudo interpretar respuesta.</p>';
      return;
    }

    // Generar historial y mostrar gráfico
    const historial = generarHistorial(valor);
    mostrarGraficoEnIA(pregunta, historial, valor);
  });
});

// Inserta gráfico en sección de IA
function mostrarGraficoEnIA(titulo, datos, valor) {
  const contenedor = document.getElementById('respuesta-ia');
  const max = datos.reduce((a, b) => (a.y > b.y ? a : b), datos[0]);

  const div = document.createElement('div');
  div.innerHTML = `
    <h4>Gráfico: ${titulo}</h4>
    <p>Valor actual: ${valor}</p>
    <div class="zona-grafico">
      ${datos.length
        ? `<p>Máximo: ${max.y} (${max.x})</p><canvas id="grafico-ia" height="150"></canvas>`
        : `<div class="sin-resultados">NO SE ENCONTRARON RESULTADOS</div>`}
    </div>
  `;
  contenedor.innerHTML = '';
  contenedor.appendChild(div);

  if (datos.length) {
    dibujarLinea('grafico-ia', datos);
  }
}
