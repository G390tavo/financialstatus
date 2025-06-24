document.addEventListener("DOMContentLoaded", () => {
  const opcionesIA = document.getElementById("opciones-ia");
  const respuestaIA = document.getElementById("respuesta-ia");

  const preguntas = [
    {
      texto: "¿Qué es el mercado de valores?",
      respuesta: "El mercado de valores es un espacio donde se compran y venden acciones, bonos y otros instrumentos financieros. Su objetivo es facilitar la inversión y la financiación de empresas."
    },
    {
      texto: "¿Qué es una criptomoneda?",
      respuesta: "Una criptomoneda es una moneda digital descentralizada basada en criptografía, como Bitcoin o Ethereum. No está controlada por ningún gobierno ni institución financiera."
    },
    {
      texto: "¿Qué factores afectan el tipo de cambio?",
      respuesta: "El tipo de cambio se ve afectado por factores como tasas de interés, inflación, estabilidad económica y oferta/demanda de divisas internacionales."
    },
    {
      texto: "¿Cómo interpretar una gráfica financiera?",
      respuesta: "Una gráfica muestra la evolución de precios o valores en el tiempo. Se deben observar tendencias, máximos, mínimos y puntos de inflexión para tomar decisiones informadas."
    },
    {
      texto: "¿Qué es la inflación?",
      respuesta: "La inflación es el aumento sostenido de los precios de bienes y servicios en un país. Reduce el poder adquisitivo del dinero con el tiempo."
    }
  ];

  preguntas.forEach((pregunta, i) => {
    const btn = document.createElement("button");
    btn.textContent = `${i + 1}. ${pregunta.texto}`;
    btn.className = "tarjeta";
    btn.addEventListener("click", () => {
      respuestaIA.textContent = pregunta.respuesta;
    });
    opcionesIA.appendChild(btn);
  });
});
