// ai.js - Lógica básica de IA con respuestas pregrabadas
document.addEventListener('DOMContentLoaded', () => {
  const select = document.getElementById('pregunta-ia');
  const respuesta = document.getElementById('respuesta-ia');
  const cargando = document.getElementById('ia-cargando');

  const preguntas = [
    {
      q: '¿Qué es una acción?',
      a: 'Una acción es una unidad de propiedad en una empresa. Al poseer acciones, te conviertes en accionista y puedes beneficiarte de sus ganancias.'
    },
    {
      q: '¿Qué es una criptomoneda?',
      a: 'Es una moneda digital descentralizada basada en tecnología blockchain. Ejemplos incluyen Bitcoin, Ethereum y Solana.'
    },
    {
      q: '¿Qué factores afectan al tipo de cambio?',
      a: 'Factores como inflación, tasas de interés, deuda externa, estabilidad política y demanda internacional afectan al tipo de cambio.'
    },
    {
      q: '¿Qué empresa tiene mayor capitalización en EE.UU.?',
      a: 'Actualmente Apple es una de las empresas con mayor capitalización bursátil en EE.UU., superando los 2.5 billones de USD.'
    },
    {
      q: '¿Cuál es la criptomoneda más estable?',
      a: 'Las stablecoins como USDT o USDC están diseñadas para mantener un valor estable frente al dólar.'
    }
  ];

  preguntas.forEach(p => {
    const opt = document.createElement('option');
    opt.textContent = p.q;
    select.appendChild(opt);
  });

  select.addEventListener('change', () => {
    const sel = preguntas.find(p => p.q === select.value);
    if (!sel) return;
    cargando.style.display = 'block';
    respuesta.innerHTML = '';
    setTimeout(() => {
      cargando.style.display = 'none';
      respuesta.textContent = sel.a;
    }, 1000);
  });

  // Activar la primera pregunta automáticamente
  select.selectedIndex = 0;
  select.dispatchEvent(new Event('change'));
});
