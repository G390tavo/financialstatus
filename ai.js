document.addEventListener("DOMContentLoaded", () => {
  const preguntas = [
    "¿Qué hace esta aplicación?",
    "¿Cómo puedo ver los datos de las monedas?",
    "¿Qué información me da de las empresas?",
    "¿Cómo funcionan los gráficos?",
    "¿Dónde consigo el valor de las criptos?",
    "¿Puedo usar esto para estudiar economía?",
    "¿Es posible buscar noticias económicas aquí?",
    "¿Cómo activo el modo oscuro?",
    "¿Qué hace la IA exactamente?",
    "¿Cómo cargo más datos?"
  ];

  const seccionIA = document.getElementById("ia");
  const respuestaContenedor = document.getElementById("respuesta-ia");
  const cargando = document.getElementById("ia-cargando");

  let index = 0;

  function mostrarPreguntaAutomatica() {
    if (index >= preguntas.length) return;
    cargando.style.display = "block";

    const pregunta = preguntas[index];
    setTimeout(() => {
      mostrarRespuesta(pregunta);
      index++;
      mostrarPreguntaAutomatica();
    }, 2500);
  }

  function mostrarRespuesta(pregunta) {
    cargando.style.display = "none";

    let respuesta = obtenerRespuesta(pregunta);
    const bloque = document.createElement("div");
    bloque.className = "respuesta-bloque";
    bloque.innerHTML = `<p><strong>${pregunta}</strong></p><p>${respuesta}</p>`;
    respuestaContenedor.appendChild(bloque);
  }

  function obtenerRespuesta(pregunta) {
    const p = pregunta.toLowerCase();
    if (p.includes("qué hace esta aplicación")) return "Te muestra valores reales de monedas, criptomonedas y empresas, junto con gráficos simples.";
    if (p.includes("ver los datos de las monedas")) return "Haz clic en la sección 'Monedas' y verás una lista con sus valores en tiempo real.";
    if (p.includes("información me da de las empresas")) return "Te brinda el nombre, valor actual y un gráfico histórico básico.";
    if (p.includes("cómo funcionan los gráficos")) return "Se cargan automáticamente cuando haces clic en una tarjeta. Son gráficos simples tipo línea.";
    if (p.includes("valor de las criptos")) return "Se obtiene de páginas como CoinGecko usando un proxy para evitar bloqueos.";
    if (p.includes("usar esto para estudiar economía")) return "Sí, especialmente para entender cómo se relacionan valores y tendencias.";
    if (p.includes("buscar noticias económicas")) return "En una versión futura se añadirá un apartado con noticias extraídas en tiempo real.";
    if (p.includes("activar el modo oscuro")) return "Haz clic en el botón verde 'Modo Claro/Oscuro' en la esquina superior derecha.";
    if (p.includes("qué hace la ia exactamente")) return "Te explica cómo funciona la app, los gráficos, y podrá buscar respuestas en línea.";
    if (p.includes("cómo cargo más datos")) return "Recarga la página o haz clic de nuevo en las secciones para actualizar la información.";
    return "Lo siento, no tengo una respuesta para esa pregunta aún.";
  }

  mostrarPreguntaAutomatica();
});
