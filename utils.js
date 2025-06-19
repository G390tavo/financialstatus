// utils.js

// Función general para mostrar errores
function mostrarError(mensaje) {
  alert("❌ Error: " + mensaje);
}

// Función para crear tarjetas visuales por ítem
function crearTarjeta(data, tipo) {
  const card = document.createElement("div");
  card.className = "tarjeta";

  const nombre = document.createElement("h3");
  nombre.textContent = data.nombre;

  const descripcion = document.createElement("p");
  descripcion.textContent = data.descripcion || "";

  const valor = document.createElement("p");
  valor.className = "valor-actual";
  valor.textContent = "Cargando...";

  const cambio = document.createElement("p");
  cambio.className = "cambio-semanal";
  cambio.textContent = "Cargando cambio...";

  // Gráfico individual debajo de la tarjeta
  const grafico = document.createElement("div");
  grafico.className = "grafico-item";
  grafico.style.display = "none";

  card.appendChild(nombre);
  card.appendChild(descripcion);
  card.appendChild(valor);
  card.appendChild(cambio);
  card.appendChild(grafico);

  // Evento clic para obtener valor real y graficar
  card.addEventListener("click", async () => {
    try {
      valor.textContent = "Consultando...";
      cambio.textContent = "Calculando...";
      grafico.innerHTML = "<small>Cargando gráfica...</small>";
      grafico.style.display = "block";

      const resultado = await fetchHTML(`${data.nombre} precio hoy`);
      if (!resultado) throw new Error("No se obtuvo resultado");

      valor.textContent = `Valor actual: ${resultado}`;
      cambio.textContent = "Variación semanal estimada: -";

      // Aquí simular un historial para el gráfico
      const datos = [80, 82, 85, 84, 86, 87, 90];
      graficar(grafico, datos, data.nombre);

    } catch (e) {
      console.error(e);
      mostrarError("No se pudo cargar la tarjeta.");
    }
  });

  return card;
}

// Función para graficar (línea simple con canvas)
function graficar(container, datos, titulo = "Gráfico") {
  container.innerHTML = "";

  const canvas = document.createElement("canvas");
  canvas.width = 300;
  canvas.height = 150;
  container.appendChild(canvas);

  const ctx = canvas.getContext("2d");

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  ctx.strokeStyle = "#0f0"; // Verde neón

  const max = Math.max(...datos);
  const min = Math.min(...datos);
  const padding = 20;
  const stepX = (canvas.width - 2 * padding) / (datos.length - 1);

  datos.forEach((p, i) => {
    const x = padding + i * stepX;
    const y = padding + ((max - p) / (max - min)) * (canvas.height - 2 * padding);

    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);

    // Dibuja punto
    ctx.fillStyle = "#0f0";
    ctx.beginPath();
    ctx.arc(x, y, 3, 0, Math.PI * 2);
    ctx.fill();

    // Valor visible
    ctx.fillText(p, x - 10, y - 10);
  });

  ctx.stroke();
}

// Función para obtener texto desde Google usando tu proxy
async function fetchHTML(texto) {
  const query = encodeURIComponent(texto.trim());
  const fuentes = [
    `https://www.google.com/search?q=${query}`,
    `https://www.bing.com/search?q=${query}`,
    `https://duckduckgo.com/?q=${query}`
  ];

  for (let fuente of fuentes) {
    try {
      const url = `http://localhost:3000/fetch?url=${encodeURIComponent(fuente)}`;
      const response = await fetch(url);
      const html = await response.text();

      // Filtrar algún resultado clave desde la página
      const match = html.match(/[\d.,]+/); // Captura un número cualquiera
      if (match) return match[0];

    } catch (e) {
      console.warn("Fallo fuente:", fuente);
      continue;
    }
  }

  return null;
}
