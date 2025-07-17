document.addEventListener("DOMContentLoaded", () => {
  // Navegación entre secciones
  document.querySelectorAll('#menu-lateral nav button').forEach(btn => {
    btn.addEventListener('click', async () => {
      const seccion = btn.dataset.seccion;

      // Oculta todas las secciones
      document.querySelectorAll('.seccion').forEach(s => {
        s.style.display = "none";
        s.classList.remove('visible');
      });

      // Activa la sección correspondiente
      if (seccion) {
        const actual = document.getElementById(seccion);
        actual.style.display = "block";
        actual.classList.add('visible');

        // Cargar datos si aplica
        if (["monedas", "criptos", "empresas"].includes(seccion)) {
          try {
            const fuentes = obtenerFuentesConProxy(seccion);
            const html = await intentarFuentes(fuentes);
            generarTarjetas(html, seccion);
          } catch {
            const html = await obtenerHTML(`${seccion}.html`);
            if (html) generarTarjetas(html, seccion);
          }
        }
      }

      // Marcar botón activo
      document.querySelectorAll('#menu-lateral nav button').forEach(b => b.classList.remove('activo'));
      btn.classList.add('activo');
    });
  });

  // Modo oscuro
  const modoBtn = document.getElementById('modo-oscuro-toggle') || document.getElementById('modo-boton');
  if (modoBtn) {
    modoBtn.addEventListener('click', () => {
      document.body.classList.toggle('oscuro');
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

// Utilidad para simular tarjetas (puedes personalizarla)
function generarTarjetas(html, tipo) {
  const contenedor = document.getElementById(tipo);
  contenedor.innerHTML = `<pre>${html}</pre>`;
}
