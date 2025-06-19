// Función de scraping con múltiples fuentes (Google → Bing → DuckDuckGo)
async function fetchHTML(pregunta) {
  const fuentes = [
    `https://www.google.com/search?q=${encodeURIComponent(pregunta)}`,
    `https://www.bing.com/search?q=${encodeURIComponent(pregunta)}`,
    `https://duckduckgo.com/html/?q=${encodeURIComponent(pregunta)}`
  ];

  for (let url of fuentes) {
    try {
      const res = await fetch(`http://localhost:3000/fetch?url=${encodeURIComponent(url)}`);
      if (!res.ok) throw new Error(`Proxy respondió ${res.status}`);

      const html = await res.text();
      if (html && html.length > 1000) return html;
    } catch (err) {
      console.warn("Fallo fuente:", url, err);
    }
  }

  throw new Error("No se pudo obtener datos desde ninguna fuente.");
}

// Mostrar error de forma visual
function mostrarError(mensaje, contenedor) {
  if (!contenedor) return;
  contenedor.innerHTML = `<p class="error">${mensaje}</p>`;
}

// ✅ ESTA FUNCIÓN ES CLAVE para mostrar monedas, criptos y empresas
function crearTarjeta(item, tipo) {
  const tarjeta = document.createElement("div");
  tarjeta.className = "tarjeta";

  const nombre = document.createElement("h3");
  nombre.textContent = item.nombre;
  tarjeta.appendChild(nombre);

  const descripcion = document.createElement("p");
  descripcion.textContent = item.descripcion;
  tarjeta.appendChild(descripcion);

  const valor = document.createElement("div");
  valor.className = "valor";
  valor.textContent = "Cargando...";
  tarjeta.appendChild(valor);

  const tendencia = document.createElement("div");
  tendencia.className = "tendencia";
  tendencia.textContent = "📈 ...";
  tarjeta.appendChild(tendencia);

  // Evento al hacer clic en la tarjeta
  tarjeta.addEventListener("click", async () => {
    try {
      valor.textContent = "Buscando...";
      const html = await fetchHTML(`precio ${item.nombre}`);
      const match = html.match(/(?:\S)\$?(\d{1,3}(?:[\.,]\d{3})*(?:[\.,]\d+)?)/);
      const precio = match ? match[0] : "No disponible";

      valor.textContent = `Valor: ${precio}`;

      // Historial simulado (puedes cambiarlo por real luego)
      const historial = Array.from({ length: 7 }, (_, i) => ({
        x: `Día ${i + 1}`,
        y: Math.floor(Math.random() * 100) + 50,
      }));

      mostrarGrafico(item.nombre, historial);
    } catch (e) {
      valor.textContent = "Error";
      mostrarError("No se pudo obtener datos", tarjeta);
    }
  });

  return tarjeta;
}
