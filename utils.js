// utils.js

export function crearElemento(tag, contenido = '', clase = '') {
  const el = document.createElement(tag);
  if (contenido) el.textContent = contenido;
  if (clase) el.classList.add(clase);
  return el;
}

export function mostrarError(msg) {
  const grafico = document.getElementById("grafico");
  grafico.innerHTML = `<div class="error">${msg}</div>`;
}

export async function obtenerValorDesdeGoogle(query) {
  try {
    const response = await fetch(`https://corsproxy.io/?https://www.google.com/search?q=${encodeURIComponent(query)}`);
    const html = await response.text();
    const match = html.match(/<span[^>]*>([0-9]+(?:[.,][0-9]+)?)<\/span>/);
    if (match) {
      return parseFloat(match[1].replace(',', '.'));
    } else {
      throw new Error('No se pudo extraer valor');
    }
  } catch (e) {
    mostrarError("Error al obtener datos de Google.");
    return null;
  }
}

export function generarHistorial(valorActual) {
  // Simula historial con fluctuaciones +/- 10%
  const historial = [];
  for (let i = 9; i >= 0; i--) {
    const variacion = valorActual * (1 + ((Math.random() - 0.5) * 0.2));
    historial.push(parseFloat(variacion.toFixed(2)));
  }
  return historial;
}

export function graficar(nombre, valores) {
  const canvas = document.createElement('canvas');
  canvas.width = 400;
  canvas.height = 200;

  const ctx = canvas.getContext("2d");
  const ancho = canvas.width;
  const alto = canvas.height;
  const margen = 40;
  const pasoX = (ancho - margen * 2) / (valores.length - 1);
  const maxY = Math.max(...valores);
  const minY = Math.min(...valores);
  const escalaY = (alto - margen * 2) / (maxY - minY);

  ctx.clearRect(0, 0, ancho, alto);
  ctx.beginPath();
  ctx.strokeStyle = "#00cc00";
  ctx.lineWidth = 2;

  valores.forEach((val, i) => {
    const x = margen + i * pasoX;
    const y = alto - margen - (val - minY) * escalaY;
    if (i === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  });
  ctx.stroke();

  valores.forEach((val, i) => {
    const x = margen + i * pasoX;
    const y = alto - margen - (val - minY) * escalaY;
    ctx.beginPath();
    ctx.arc(x, y, 3, 0, Math.PI * 2);
    ctx.fillStyle = "#00cc00";
    ctx.fill();
    ctx.font = "12px sans-serif";
    ctx.fillText(val, x - 10, y - 10);
  });

  const contenedor = document.getElementById("grafico");
  contenedor.innerHTML = `<h3>${nombre}</h3>`;
  contenedor.appendChild(canvas);
}
