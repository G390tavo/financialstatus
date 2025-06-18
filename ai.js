document.addEventListener("DOMContentLoaded", () => {
  const select = document.getElementById("ia-preguntas");
  const btn = document.getElementById("preguntar");
  const salida = document.getElementById("ia-respuesta");

  if (!select || !btn || !salida) {
    console.warn("AI no inicializada. Faltan elementos.");
    return;
  }

  salida.innerHTML = "<p>Bienvenido a la IA de FinancialStatus. Puedes hacerme preguntas sobre monedas y criptomonedas.</p>";

  btn.addEventListener("click", async () => {
    const valor = select.value;
    if (valor === "funciona") {
      salida.textContent = "Esta aplicación permite ver precios reales de criptomonedas, monedas y empresas.";
    } else if (valor === "tutorial") {
      salida.textContent = "Usa el menú lateral para cambiar entre secciones. Haz clic en una pregunta y presiona 'Preguntar'.";
    } else if (valor === "bitcoin") {
      salida.textContent = "Buscando el precio actual del Bitcoin...";
      try {
        const res = await fetch("https://corsproxy.io/?https://www.google.com/search?q=bitcoin+price");
        const html = await res.text();
        const match = html.match(/([\d,]+(\.\d+)?)[\s]?USD/);
        if (match) {
          salida.textContent = `Precio actual del Bitcoin: ${match[0]}`;
        } else {
          salida.textContent = "No se pudo encontrar el precio del Bitcoin.";
        }
      } catch (e) {
        salida.textContent = "Error al obtener los datos.";
      }
    }
  });
});
