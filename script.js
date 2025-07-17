document.addEventListener("DOMContentLoaded", () => {
  // Botones de navegación
  document.querySelectorAll('#menu-lateral nav button').forEach(btn => {
    btn.addEventListener('click', async () => {
      const seccion = btn.dataset.seccion;

      // Oculta todas las secciones
      document.querySelectorAll('.seccion').forEach(s => {
        s.style.display = "none";
        s.classList.remove('visible');
      });

      // Muestra la sección actual
      if (seccion) {
        const actual = document.getElementById(seccion);
        actual.style.display = "block";
        actual.classList.add('visible');

        // Simula tarjetas si es necesario
        if (["monedas", "criptos", "empresas"].includes(seccion)) {
          generarTarjetasSimuladas(seccion);
        }
      }

      // Marca botón activo
      document.querySelectorAll('#menu-lateral nav button').forEach(b => b.classList.remove('activo'));
      btn.classList.add('activo');
    });
  });

  // Tema oscuro/claro
  const modoBtn = document.getElementById('modo-boton');
  if (modoBtn) {
    modoBtn.addEventListener('click', () => {
      document.body.classList.toggle('oscuro');
      document.body.classList.toggle('claro');
    });
  }

  // Abrir y cerrar menú lateral
  const menu = document.getElementById('menu-lateral');
  const abrir = document.getElementById('abrir-menu');
  const cerrar = document.getElementById('cerrar-menu');

  if (abrir && cerrar && menu) {
    abrir.addEventListener('click', () => menu.classList.remove('oculto'));
    cerrar.addEventListener('click', () => menu.classList.add('oculto'));
  }

  // Mostrar solo "inicio" al cargar
  document.querySelectorAll('.seccion').forEach(seccion => seccion.style.display = "none");
  const inicio = document.getElementById('inicio');
  if (inicio) inicio.style.display = "block";
});

// Simulación de tarjetas
function generarTarjetasSimuladas(tipo) {
  const contenedor = document.getElementById(tipo);
  contenedor.innerHTML = '';

  for (let i = 1; i <= 10; i++) {
    const nombre = tipo.slice(0, -1).toUpperCase() + i;
    const valor = (Math.random() * 1000).toFixed(2);
    const cambio = (Math.random() * 10 - 5).toFixed(2);
    const tarjeta = document.createElement('div');
    tarjeta.className = 'tarjeta';
    tarjeta.innerHTML = `
      <h3>${nombre}</h3>
      <p>Valor actual: $${valor}</p>
      <p>Variación: ${cambio}%</p>
      <button onclick="predecir('${nombre}')">Simular predicción</button>
      <canvas id="grafico-${nombre}"></canvas>
    `;
    contenedor.appendChild(tarjeta);
    setTimeout(() => {
      dibujarGrafico(`grafico-${nombre}`);
    }, 100);
  }
}

// Simular gráfica con Chart.js
function dibujarGrafico(idCanvas) {
  const ctx = document.getElementById(idCanvas);
  if (!ctx) return;

  const datos = Array.from({ length: 7 }, () => (Math.random() * 1000).toFixed(2));
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: ["Día -6", "Día -5", "Día -4", "Día -3", "Día -2", "Ayer", "Hoy"],
      datasets: [{
        label: "Valor",
        data: datos,
        borderColor: "#39FF14",
        backgroundColor: "rgba(57, 255, 20, 0.2)",
        fill: true,
        tension: 0.4,
      }]
    },
    options: {
      scales: {
        x: {
          ticks: { color: "#39FF14" }
        },
        y: {
          ticks: { color: "#39FF14" }
        }
      },
      plugins: {
        legend: { labels: { color: "#39FF14" } }
      }
    }
  });
}

// Simula predicción de tendencia
function predecir(nombre) {
  alert(`Simulando predicción para ${nombre}...\nPosible subida de ~${(Math.random() * 5).toFixed(2)}%`);
}
