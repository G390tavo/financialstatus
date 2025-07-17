document.addEventListener("DOMContentLoaded", () => {
  const botones = document.querySelectorAll('#menu-lateral nav button');
  const secciones = document.querySelectorAll('.seccion');

  // Navegación
  botones.forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.seccion;

      secciones.forEach(sec => {
        sec.classList.remove('visible');
        sec.style.display = 'none';
      });

      const activa = document.getElementById(id);
      if (activa) {
        activa.classList.add('visible');
        activa.style.display = 'block';
      }

      botones.forEach(b => b.classList.remove('activo'));
      btn.classList.add('activo');
    });
  });

  // Mostrar solo inicio al comenzar
  secciones.forEach(sec => sec.style.display = 'none');
  const inicio = document.getElementById('inicio');
  if (inicio) {
    inicio.style.display = 'block';
    inicio.classList.add('visible');
  }

  // Modo claro / oscuro
  const modoBtn = document.getElementById('modo-toggle');
  modoBtn.addEventListener('click', () => {
    document.body.classList.toggle('claro');
    document.body.classList.toggle('oscuro');
  });

  // Abrir y cerrar menú
  const abrir = document.getElementById('abrir-menu');
  const cerrar = document.getElementById('cerrar-menu');
  const menu = document.getElementById('menu-lateral');

  abrir.addEventListener('click', () => {
    menu.style.transform = 'translateX(0)';
  });

  cerrar.addEventListener('click', () => {
    menu.style.transform = 'translateX(-100%)';
  });

  // Ocultar menú al inicio si se desea (opcional)
  menu.style.transform = 'translateX(0)';
});
