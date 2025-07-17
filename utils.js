async function cargarDatos() {
  const res = await fetch('datos_simulados.json');
  return await res.json();
}

function crearTarjetas(datos, tipo) {
  const contenedor = document.getElementById(`tarjetas-${tipo}`);
  contenedor.innerHTML = '';
  for (const [nombre, info] of Object.entries(datos)) {
    const ultima = info.historial[info.historial.length - 1];
    const div = document.createElement('div');
    div.innerHTML = `<h3>${nombre}</h3><p>Último valor: ${ultima[1].toFixed(2)}</p>`;
    contenedor.appendChild(div);
  }
}

function predecirTendencia(datos, tipo) {
  const contenedor = document.getElementById(`tarjetas-${tipo}`);
  contenedor.innerHTML = '';
  for (const [nombre, info] of Object.entries(datos)) {
    const ultimos = info.historial.slice(-3).map(e => e[1]);
    const pred = (ultimos[2] + Math.random() * 5 - 2.5).toFixed(2);
    const div = document.createElement('div');
    div.innerHTML = `<h3>${nombre}</h3><p>Predicción: ${pred}</p>`;
    contenedor.appendChild(div);
  }
}
