document.addEventListener('DOMContentLoaded', () => {
  const secciones = document.querySelectorAll('.seccion');
  const botonesMenu = document.querySelectorAll('#menu-lateral nav button');
  const abrirMenu = document.getElementById('abrir-menu');
  const cerrarMenu = document.getElementById('cerrar-menu');
  const menuLateral = document.getElementById('menu-lateral');
  const modoBoton = document.querySelector('.modo-boton');

  // Navegación entre secciones
  botonesMenu.forEach(boton => {
    boton.addEventListener('click', () => {
      const idSeccion = boton.getAttribute('data-seccion');
      const seccion = document.getElementById(idSeccion);

      if (!seccion) {
        console.warn(`⚠️ La sección con ID '${idSeccion}' no existe.`);
        return;
      }

      secciones.forEach(sec => sec.classList.remove('activa'));
      seccion.classList.add('activa');

      // Cierra menú en móviles
      if (window.innerWidth < 768) {
        menuLateral.style.display = 'none';
        abrirMenu.style.display = 'block';
      }
    });
  });

  // Botón abrir/cerrar menú
  if (abrirMenu && cerrarMenu && menuLateral) {
    abrirMenu.addEventListener('click', () => {
      menuLateral.style.display = 'flex';
      abrirMenu.style.display = 'none';
    });

    cerrarMenu.addEventListener('click', () => {
      menuLateral.style.display = 'none';
      abrirMenu.style.display = 'block';
    });
  }

  // Modo claro / oscuro
  if (modoBoton) {
    modoBoton.addEventListener('click', () => {
      document.body.classList.toggle('light');
    });
  }

  // Cargar secciones automáticamente
  cargarMonedas();
  cargarCriptos();
  cargarEmpresas();
  iniciarIA();
});

// ============ FUNCIONES DE CARGA ============

async function cargarMonedas() {
  const tarjetas = document.querySelector('#monedas .contenedor-tarjetas');
  tarjetas.innerHTML = '<div class="tarjeta">Cargando monedas...</div>';

  try {
    const resultados = await intentarFuentes([
      'https://wise.com/gb/currency-converter/usd-to-pen-rate'
    ]);

    mostrarDatos('monedas', resultados);
  } catch (error) {
    tarjetas.innerHTML = `<div class="tarjeta">No se pudieron obtener monedas en tiempo real.</div>`;
    console.error('Error al cargar monedas:', error);
  }
}

async function cargarCriptos() {
  const tarjetas = document.querySelector('#criptos .contenedor-tarjetas');
  tarjetas.innerHTML = '<div class="tarjeta">Cargando criptomonedas...</div>';

  try {
    const resultados = await intentarFuentes([
      'https://coinmarketcap.com/'
    ]);

    mostrarDatos('criptos', resultados);
  } catch (error) {
    tarjetas.innerHTML = `<div class="tarjeta">No se pudieron obtener criptomonedas.</div>`;
    console.error('Error al cargar criptos:', error);
  }
}

async function cargarEmpresas() {
  const tarjetas = document.querySelector('#empresas .contenedor-tarjetas');
  tarjetas.innerHTML = '<div class="tarjeta">Cargando empresas...</div>';

  try {
    const resultados = await intentarFuentes([
      'https://www.investing.com/equities/',
      'https://www.marketwatch.com/tools/stockresearch/globalmarkets'
    ]);

    mostrarDatos('empresas', resultados);
  } catch (error) {
    tarjetas.innerHTML = `<div class="tarjeta">No se pudieron obtener empresas en tiempo real.</div>`;
    console.error('Error al cargar empresas:', error);
  }
}

function mostrarDatos(seccion, datos) {
  const contenedor = document.querySelector(`#${seccion} .contenedor-tarjetas`);
  contenedor.innerHTML = '';

  if (!datos || datos.length === 0) {
    contenedor.innerHTML = '<div class="tarjeta">Sin datos disponibles.</div>';
    return;
  }

  datos.forEach(dato => {
    const tarjeta = document.createElement('div');
    tarjeta.className = 'tarjeta';
    tarjeta.innerHTML = `
      <h3><i>💲</i>${dato.nombre}</h3>
      <div class="valor">${dato.valor}</div>
      <div class="variacion ${dato.variacion > 0 ? 'up' : 'down'}">${dato.variacion > 0 ? '▲' : '▼'} ${dato.variacion}%</div>
      <div class="descripcion">${dato.descripcion || 'Sin descripción'}</div>
    `;

    tarjeta.addEventListener('click', () => {
      mostrarGrafico(dato);
    });

    contenedor.appendChild(tarjeta);
  });
}

function mostrarGrafico(dato) {
  alert(`📈 Aquí se mostraría el gráfico de: ${dato.nombre}\n(valor actual: ${dato.valor})`);
}

// ============ INICIO DE IA ============

function iniciarIA() {
  const respuesta = document.getElementById('respuesta-ia');
  const contenedor = document.getElementById('ia');
  if (!respuesta || !contenedor) return;

  respuesta.innerHTML = 'Hola, soy tu IA financiera. ¿Sobre qué deseas aprender?';

  const preguntas = [
    '¿Qué es una criptomoneda?',
    '¿Por qué varía el valor del dólar?',
    '¿Cómo interpretar un gráfico financiero?',
    '¿Qué factores afectan a las empresas?',
    '¿Qué significa inflación?',
  ];

  const selector = document.createElement('select');
  selector.id = 'pregunta-ia';
  selector.innerHTML = `<option value="">-- Selecciona una pregunta --</option>` +
    preguntas.map(p => `<option value="${p}">${p}</option>`).join('');

  contenedor.appendChild(selector);

  selector.addEventListener('change', async () => {
    const pregunta = selector.value;
    if (!pregunta) return;
    const resultado = await obtenerRespuestaIA(pregunta);
    respuesta.textContent = resultado;
  });
}
