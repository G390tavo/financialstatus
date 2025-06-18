document.addEventListener('DOMContentLoaded', () => {
  const secciones = {
    inicio: document.getElementById('inicio'),
    monedas: document.getElementById('monedas'),
    criptos: document.getElementById('criptos'),
    empresas: document.getElementById('empresas'),
    ia: document.getElementById('ia')
  };

  const botones = {
    inicio: document.getElementById('btnInicio'),
    monedas: document.getElementById('btnMonedas'),
    criptos: document.getElementById('btnCriptos'),
    empresas: document.getElementById('btnEmpresas'),
    ia: document.getElementById('btnIA'),
    cerrarMenu: document.getElementById('btnCerrarMenu'),
    toggleModo: document.getElementById('btnModoClaro')
  };

  // Oculta todas las secciones
  function ocultarSecciones() {
    Object.values(secciones).forEach(sec => sec.style.display = 'none');
  }

  // Cambia de sección
  function mostrarSeccion(nombre) {
    ocultarSecciones();
    if (secciones[nombre]) {
      secciones[nombre].style.display = 'block';
    }
  }

  // Evento para cada botón del menú
  botones.inicio?.addEventListener('click', () => mostrarSeccion('inicio'));
  botones.monedas?.addEventListener('click', () => mostrarSeccion('monedas'));
  botones.criptos?.addEventListener('click', () => mostrarSeccion('criptos'));
  botones.empresas?.addEventListener('click', () => mostrarSeccion('empresas'));
  botones.ia?.addEventListener('click', () => mostrarSeccion('ia'));

  // Modo oscuro activado por defecto
  document.body.classList.add('oscuro');

  botones.toggleModo?.addEventListener('click', () => {
    document.body.classList.toggle('oscuro');
    document.body.classList.toggle('claro');
  });

  // Botón para cerrar menú
  botones.cerrarMenu?.addEventListener('click', () => {
    const aside = document.querySelector('aside');
    if (aside) {
      aside.style.display = (aside.style.display === 'none') ? 'block' : 'none';
    }
  });

  // Mostrar sección inicio por defecto
  mostrarSeccion('inicio');

  // Activar IA automáticamente
  const preguntaInicial = "¿Qué es una criptomoneda?";
  preguntarIA(preguntaInicial);
});
