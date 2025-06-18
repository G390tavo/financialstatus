document.addEventListener('DOMContentLoaded', () => {
  // Aquí va TODO el código actual de script.js (pegar dentro de esta función)

  const botones = {
    inicio: document.getElementById('btn-inicio'),
    monedas: document.getElementById('btn-monedas'),
    criptos: document.getElementById('btn-criptos'),
    empresas: document.getElementById('btn-empresas'),
    ia: document.getElementById('btn-ia')
  };

  const secciones = {
    inicio: document.getElementById('seccion-inicio'),
    monedas: document.getElementById('seccion-monedas'),
    criptos: document.getElementById('seccion-criptos'),
    empresas: document.getElementById('seccion-empresas'),
    ia: document.getElementById('seccion-ia')
  };

  function mostrarSeccion(nombre) {
    for (const sec in secciones) {
      secciones[sec].style.display = sec === nombre ? 'block' : 'none';
    }
  }

  botones.inicio.addEventListener('click', () => mostrarSeccion('inicio'));
  botones.monedas.addEventListener('click', () => mostrarSeccion('monedas'));
  botones.criptos.addEventListener('click', () => mostrarSeccion('criptos'));
  botones.empresas.addEventListener('click', () => mostrarSeccion('empresas'));
  botones.ia.addEventListener('click', () => mostrarSeccion('ia'));

  // Modo claro/oscuro
  const modoBtn = document.getElementById('modo-claro');
  modoBtn.addEventListener('click', () => {
    document.body.classList.toggle('claro');
  });

  // Cerrar menú
  const cerrarBtn = document.getElementById('cerrar-menu');
  const aside = document.querySelector('aside');
  cerrarBtn.addEventListener('click', () => {
    aside.style.display = 'none';
  });

  // Mostrar solo inicio al cargar
  mostrarSeccion('inicio');
});
