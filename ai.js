function iniciarIA() {
  const contenedor = document.getElementById('respuesta-ia');
  const cargando = document.getElementById('ia-cargando');

  cargando.style.display = 'block';
  contenedor.innerHTML = '';

  setTimeout(() => {
    cargando.style.display = 'none';
    contenedor.innerHTML = `
      <p>Hola, soy la IA de FinancialStatus. Puedes preguntarme:</p>
      <ul>
        <li>¿Qué es una criptomoneda?</li>
        <li>¿Cómo saber si una empresa es rentable?</li>
        <li>¿Qué factores afectan el tipo de cambio?</li>
      </ul>
    `;
  }, 1200);
}
