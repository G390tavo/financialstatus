import { MONEDAS, CRIPTOS, EMPRESAS } from './config.js';
import { crearElemento, mostrarError } from './utils.js';
import { inicializarIA, responderPregunta } from './ai.js';

document.addEventListener('DOMContentLoaded', () => {
  const btnMoneda = document.getElementById('btn-moneda');
  const btnCripto = document.getElementById('btn-cripto');
  const btnEmpresas = document.getElementById('btn-empresas');
  const btnPreguntar = document.getElementById('preguntar');
  const selectIA = document.getElementById('ia-preguntas');
  const aside = document.getElementById('sidebar');
  const toggleDark = document.getElementById('toggle-dark');

  const monedasDiv = document.getElementById('monedas-lista');
  const criptosDiv = document.getElementById('criptos-lista');
  const grafico = document.getElementById('grafico');

  function mostrarInicio() {
    document.getElementById('info').innerHTML = '';
    grafico.innerHTML = '<h2>Bienvenido a FinancialStatus</h2><p>Selecciona una opción del menú para empezar.</p>';
  }

  function cargarLista(lista, contenedor, tipo) {
    contenedor.innerHTML = '';
    lista.forEach(nombre => {
      const btn = crearElemento('button', '', nombre.nombre || nombre);
      btn.addEventListener('click', () => graficar(nombre, tipo));
      contenedor.appendChild(btn);
    });
  }

  async function graficar(nombre, tipo) {
    try {
      grafico.innerHTML = '<p>Cargando datos...</p>';
      const datos = await fetch(`https://api.coingecko.com/api/v3/coins/${nombre.id || nombre.simbolo || nombre.toLowerCase()}/market_chart?vs_currency=usd&days=1`).then(r => r.json());

      const canvas = document.createElement('canvas');
      grafico.innerHTML = '';
      grafico.appendChild(canvas);

      const ctx = canvas.getContext('2d');
      const puntos = datos.prices.map(([t, v]) => ({ x: new Date(t).toLocaleTimeString(), y: v }));
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: puntos.map(p => p.x),
          datasets: [{
            label: `${nombre.nombre || nombre} (USD)`,
            data: puntos.map(p => p.y),
            fill: false,
            borderColor: 'lime',
            tension: 0.3,
            pointBackgroundColor: 'white',
            pointRadius: 2
          }]
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: false
            }
          }
        }
      });
    } catch (err) {
      mostrarError('No se pudo obtener la información. Verifica tu conexión.');
    }
  }

  btnMoneda.addEventListener('click', () => {
    aside.classList.remove('hidden');
    cargarLista(MONEDAS, monedasDiv, 'moneda');
  });

  btnCripto.addEventListener('click', () => {
    aside.classList.remove('hidden');
    cargarLista(CRIPTOS, criptosDiv, 'cripto');
  });

  btnEmpresas.addEventListener('click', () => {
    aside.classList.remove('hidden');
    cargarLista(EMPRESAS, monedasDiv, 'empresa');
  });

  toggleDark.addEventListener('click', () => {
    document.body.classList.toggle('dark');
  });

  btnPreguntar.addEventListener('click', () => {
    const pregunta = selectIA.value;
    responderPregunta(pregunta);
  });

  mostrarInicio();
  inicializarIA();
});
