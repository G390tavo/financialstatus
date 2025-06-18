async function preguntarIA(pregunta) {
  const respuestaDiv = document.getElementById('respuestaIA');
  respuestaDiv.innerHTML = `<p><strong>Buscando respuesta...</strong></p>`;

  try {
    if (pregunta.toLowerCase().includes("criptomoneda")) {
      respuestaDiv.innerHTML = `<p>Una criptomoneda es una moneda digital descentralizada, como Bitcoin o Ethereum. Ahora se mostrará el gráfico del Bitcoin.</p>`;
      obtenerYGraficar("bitcoin");
    } else if (pregunta.toLowerCase().includes("mercado de valores")) {
      respuestaDiv.innerHTML = `<p>El mercado de valores permite a las empresas vender acciones y a los inversionistas comprar una parte de ellas. Vamos a ver el valor actual de Apple.</p>`;
      obtenerYGraficar("apple stock");
    } else if (pregunta.toLowerCase().includes("dólar")) {
      respuestaDiv.innerHTML = `<p>El tipo de cambio del dólar varía a diario. Vamos a buscar su valor actual.</p>`;
      obtenerYGraficar("dólar");
    } else {
      respuestaDiv.innerHTML = `<p>Pregunta no reconocida. Intenta con una de las preguntas sugeridas.</p>`;
    }
  } catch (error) {
    respuestaDiv.innerHTML = `<p>Error al procesar la solicitud: ${error.message}</p>`;
  }
}

async function obtenerYGraficar(nombre) {
  const resultado = document.getElementById('respuestaIA');
  const grafico = document.getElementById('grafico');
  if (grafico) grafico.innerHTML = ''; // limpiar gráfico si ya existe

  const fuentes = [
    `https://www.google.com/search?q=precio+de+${nombre}`,
    `https://www.bing.com/search?q=${nombre}`,
    `https://duckduckgo.com/?q=${nombre}`
  ];

  for (let url of fuentes) {
    try {
      const response = await fetch(`http://localhost:3000/fetch?url=${encodeURIComponent(url)}`);
      const html = await response.text();

      const valor = extraerValorDesdeHTML(html);
      if (valor) {
        mostrarGraficoSimulado(nombre, valor);
        return;
      }
    } catch (e) {
      console.warn(`Fallo al obtener datos desde ${url}`);
    }
  }

  resultado.innerHTML += `<p><strong>No se pudo obtener datos en tiempo real. Verifica tu conexión o cambia de pregunta.</strong></p>`;
}

function extraerValorDesdeHTML(html) {
  const match = html.match(/(\d{1,3}(?:[\.,]\d{3})*(?:[\.,]\d{2})?)\s*(USD|US\$|\$|EUR|€|PEN|S\/)/i);
  return match ? match[0] : null;
}

function mostrarGraficoSimulado(nombre, valor) {
  const grafico = document.getElementById('grafico') || document.createElement('div');
  grafico.id = 'grafico';
  grafico.innerHTML = `
    <h3>${nombre.toUpperCase()}</h3>
    <p>Valor actual estimado: <strong>${valor}</strong></p>
    <canvas id="graficoCanvas" width="400" height="200"></canvas>
  `;
  document.body.appendChild(grafico);

  const ctx = document.getElementById('graficoCanvas').getContext('2d');
  const valoresSimulados = generarHistorialSimulado(valor);
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: ["Hace 5 días", "Hace 4 días", "Hace 3 días", "Hace 2 días", "Ayer", "Hoy"],
      datasets: [{
        label: `${nombre}`,
        data: valoresSimulados,
        borderColor: 'green',
        backgroundColor: 'rgba(0,128,0,0.1)',
        fill: true
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false }
      }
    }
  });
}

function generarHistorialSimulado(valorActual) {
  let base = parseFloat(valorActual.replace(/[^0-9.,]/g, '').replace(',', '.'));
  return Array.from({ length: 6 }, () => {
    const variación = (Math.random() - 0.5) * 0.1;
    return parseFloat((base * (1 + variación)).toFixed(2));
  }).concat(base);
}
