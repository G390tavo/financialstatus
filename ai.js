document.addEventListener('DOMContentLoaded', () => {
  const contenedorIA = document.getElementById('ia-contenido');
  if (!contenedorIA) {
    console.error('IA no inicializada. Faltan elementos.');
    return;
  }

  contenedorIA.innerHTML = `
    <p>Hola, soy tu asistente financiero inteligente. Puedes hacerme preguntas como:</p>
    <select id="preguntas-ia">
      <option value="">--Selecciona una pregunta--</option>
      <option value="¿Qué hace esta app?">¿Qué hace esta app?</option>
      <option value="¿Cuál es el valor del Bitcoin?">¿Cuál es el valor del Bitcoin?</option>
      <option value="Muestra el gráfico de Amazon">Muestra el gráfico de Amazon</option>
    </select>
    <button id="preguntar-ia">Preguntar</button>
    <div id="respuesta-ia"></div>
  `;

  document.getElementById('preguntar-ia').addEventListener('click', () => {
    const pregunta = document.getElementById('preguntas-ia').value;
    const respuestaDiv = document.getElementById('respuesta-ia');

    if (!pregunta) {
      respuestaDiv.innerText = 'Por favor, selecciona una pregunta.';
      return;
    }

    if (pregunta === '¿Qué hace esta app?') {
      respuestaDiv.innerText = 'Esta app permite ver el estado financiero de monedas, criptomonedas y empresas en tiempo real, con ayuda de una IA que interpreta y grafica los valores.';
    } else if (pregunta.includes('Bitcoin')) {
      respuestaDiv.innerText = 'Obteniendo datos de Bitcoin...';
      // Llamada real a gráfica se integra aquí
    } else if (pregunta.includes('Amazon')) {
      respuestaDiv.innerText = 'Obteniendo gráfica de Amazon...';
      // Llamada real a gráfica se integra aquí
    } else {
      respuestaDiv.innerText = 'Aún no puedo responder esa pregunta.';
    }
  });
});
