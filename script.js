function mostrarSeccion(id) {
  const secciones = document.querySelectorAll('.seccion');
  secciones.forEach(sec => sec.style.display = 'none');
  document.getElementById(id).style.display = 'block';
}

function alternarModo() {
  document.body.classList.toggle('claro');
  document.body.classList.toggle('oscuro');
}

const menu = document.getElementById('menu-lateral');
const secciones = document.querySelectorAll('.seccion');

document.getElementById('cerrar-menu').addEventListener('click', () => {
  menu.classList.add('oculto');
  secciones.forEach(sec => sec.style.marginLeft = '0');
});

document.getElementById('abrir-menu').addEventListener('click', () => {
  menu.classList.remove('oculto');
  secciones.forEach(sec => sec.style.marginLeft = '250px');
});
