document.querySelectorAll('#menu-lateral nav button').forEach(btn => {
  btn.addEventListener('click', () => {
    const seccion = btn.dataset.seccion;
    document.querySelectorAll('.seccion').forEach(s => s.classList.remove('visible'));
    if (seccion) document.getElementById(seccion).classList.add('visible');

    document.querySelectorAll('#menu-lateral nav button').forEach(b => b.classList.remove('activo'));
    btn.classList.add('activo');
  });
});

document.getElementById('modo-oscuro-toggle').addEventListener('click', () => {
  document.body.classList.toggle('oscuro');
});

document.getElementById('cerrar-menu').addEventListener('click', () => {
  document.getElementById('menu-lateral').classList.add('oculto');
});

document.getElementById('abrir-menu').addEventListener('click', () => {
  document.getElementById('menu-lateral').classList.remove('oculto');
});
