export function inicializarIA() {
  if (!document.getElementById('ia-respuesta')) {
    console.warn('AI no inicializada. Faltan elementos.');
    return;
  }
}

export async function responderPregunta(pregunta) {
  const div = document.getElementById('ia-respuesta');
  div.innerHTML = 'Pensando...';

  if (pregunta === 'funciona') {
    div.innerHTML = `
      Esta aplicación obtiene datos económicos en tiempo real usando "fetch".
      Puedes explorar monedas, criptomonedas y empresas, y ver sus valores en gráficos.
      También puedes preguntarme cosas básicas de finanzas.
    `;
  } else if (pregunta === 'tutorial') {
    div.innerHTML = `
      1. Usa los botones de arriba para seleccionar la categoría.<br>
      2. Haz clic en un nombre para ver su gráfico.<br>
      3. Pregúntame lo que quieras abajo.
    `;
  } else if (pregunta === 'info') {
    div.innerHTML = `
      Las criptomonedas son monedas digitales descentralizadas.
      Su valor depende de la oferta, demanda y otros factores del mercado.
    `;
  } else {
    div.innerHTML = 'Lo siento, aún no entiendo esa pregunta.';
  }
}
