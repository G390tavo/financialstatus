document.addEventListener("DOMContentLoaded", async () => {
  const datos = await cargarDatos();

  document.querySelectorAll('#menu-lateral nav button').forEach(btn => {
    btn.addEventListener('click', () => {
      const seccion = btn.dataset.seccion;
      document.querySelectorAll('.seccion').forEach(s => s.classList.remove('visible'));
      document.getElementById(seccion).classList.add('visible');
    });
  });

  const abrir = document.getElementById('abrir-menu');
  const cerrar = document.getElementById('cerrar-menu');
  const menu = document.getElementById('menu-lateral');

  abrir.addEventListener('click', () => menu.classList.remove('oculto'));
  cerrar.addEventListener('click', () => menu.classList.add('oculto'));

  const modoBtn = document.getElementById('modo-boton');
  modoBtn.addEventListener('click', () => {
    document.body.classList.toggle('oscuro');
    document.body.classList.toggle('claro');
  });

  crearTarjetas(datos.cryptos, 'criptos');
  crearTarjetas(datos.monedas, 'monedas');
  crearTarjetas(datos.empresas, 'empresas');

  // Predecir
  document.querySelectorAll('.predecir').forEach(btn => {
    btn.addEventListener('click', () => {
      const tipo = btn.dataset.tipo;
      predecirTendencia(datos[tipo], tipo);
    });
  });

  // Conversión
  const select1 = document.getElementById('monedaOrigen');
  const select2 = document.getElementById('monedaDestino');
  Object.keys(datos.monedas).forEach(m => {
    const opt1 = new Option(m, m);
    const opt2 = new Option(m, m);
    select1.appendChild(opt1);
    select2.appendChild(opt2);
  });

  document.getElementById('convertir').addEventListener('click', () => {
    const origen = select1.value;
    const destino = select2.value;
    const cantidad = parseFloat(document.getElementById('cantidadOrigen').value);
    if (isNaN(cantidad)) return;

    const valorOrigen = datos.monedas[origen].historial.slice(-1)[0][1];
    const valorDestino = datos.monedas[destino].historial.slice(-1)[0][1];
    const convertido = (cantidad * valorDestino / valorOrigen).toFixed(2);
    document.getElementById('resultadoConversion').textContent = `${cantidad} ${origen} ≈ ${convertido} ${destino}`;
  });
});
