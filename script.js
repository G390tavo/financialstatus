document.addEventListener("DOMContentLoaded", () => {
  cargarMonedas();
  cambiarSeccion('inicio');
});

function cambiarSeccion(id) {
  document.querySelectorAll('.seccion').forEach(sec => sec.classList.remove('activa'));
  document.getElementById(id).classList.add('activa');
}

function toggleModo() {
  document.body.classList.toggle('light');
}

// Cargar monedas (ej. USD, PEN, EUR)
async function cargarMonedas() {
  const contenedor = document.getElementById('contenedor-monedas');
  contenedor.innerHTML = 'Cargando...';
  const urls = [
    { nombre: 'Dólar Americano', url: 'https://www.x-rates.com/calculator/?from=USD&to=PEN&amount=1' },
    { nombre: 'Euro', url: 'https://www.x-rates.com/calculator/?from=EUR&to=PEN&amount=1' }
  ];

  const tarjetas = await Promise.all(urls.map(async ({ nombre, url }) => {
    const html = await obtenerHTML(url);
    const tasa = extraerTextoDesdeHTML(html, 'span.ccOutputTrail');
    return `<div class="tarjeta"><h3>${nombre}</h3><div class="valor">${tasa || 'No disponible'}</div></div>`;
  }));

  contenedor.innerHTML = tarjetas.join('');
}

// Cargar criptos
async function cargarCriptos() {
  const contenedor = document.getElementById('contenedor-criptos');
  contenedor.innerHTML = 'Cargando...';
  const urls = [
    { nombre: 'Bitcoin', url: 'https://www.google.com/search?q=bitcoin+price' },
    { nombre: 'Ethereum', url: 'https://www.google.com/search?q=ethereum+price' }
  ];

  const tarjetas = await Promise.all(urls.map(async ({ nombre, url }) => {
    const html = await obtenerHTML(url);
    const precio = extraerTextoDesdeHTML(html, 'span.DFlfde');
    return `<div class="tarjeta"><h3>${nombre}</h3><div class="valor">${precio || 'No disponible'}</div></div>`;
  }));

  contenedor.innerHTML = tarjetas.join('');
}

// Cargar empresas
async function cargarEmpresas() {
  const contenedor = document.getElementById('contenedor-empresas');
  contenedor.innerHTML = 'Cargando...';
  const urls = [
    { nombre: 'Apple', url: 'https://www.google.com/finance/quote/AAPL:NASDAQ' },
    { nombre: 'Microsoft', url: 'https://www.google.com/finance/quote/MSFT:NASDAQ' }
  ];

  const tarjetas = await Promise.all(urls.map(async ({ nombre, url }) => {
    const html = await obtenerHTML(url);
    const precio = extraerTextoDesdeHTML(html, '.YMlKec.fxKbKc');
    return `<div class="tarjeta"><h3>${nombre}</h3><div class="valor">${precio || 'No disponible'}</div></div>`;
  }));

  contenedor.innerHTML = tarjetas.join('');
}
