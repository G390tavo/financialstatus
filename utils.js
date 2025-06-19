// utils.js

// Crear elemento con clase y texto
function crearElemento(etiqueta, clase, texto) {
  const el = document.createElement(etiqueta);
  if (clase) el.className = clase;
  if (texto) el.textContent = texto;
  return el;
}

// Mostrar error en pantalla durante 5 segundos
function mostrarError(mensaje) {
  const error = document.createElement("div");
  error.className = "error";
  error.textContent = mensaje;
  document.body.appendChild(error);
  setTimeout(() => error.remove(), 5000);
}

// Crear tarjeta tipo Binance para monedas, criptos o empresas
function crearTarjeta(data, tipo) {
  const card = crearElemento("div", "tarjeta");

  const nombre = crearElemento("h3", "nombre", data.nombre || "Sin nombre");
  const valor = crearElemento("p", "valor", `Valor actual: ${data.valor || "?"}`);

  const cambio = crearElemento("p", "cambio");
  const porcentaje = data.cambio || 0;
  const esPositivo = parseFloat(porcentaje) >= 0;
  cambio.textContent = `Cambio semanal: ${porcentaje}%`;
  cambio.style.color = esPositivo ? "limegreen" : "crimson";
  cambio.innerHTML = `${esPositivo ? "⬆️" : "⬇️"} ${Math.abs(porcentaje)}%`;

  const descripcion = crearElemento("p", "descripcion", data.descripcion || "");

  card.appendChild(nombre);
  card.appendChild(valor);
  card.appendChild(cambio);
  card.appendChild(descripcion);

  // Al hacer clic, mostrar gráfico debajo
  card.addEventListener("click", () => {
    if (typeof generarGrafico === "function") {
      generarGrafico(data); // Debe estar definido en script.js
    }
  });

  return card;
}

// Fetch HTML real desde varias fuentes (Google → Bing → DuckDuckGo)
async function fetchHTML(query) {
  const fuentes = [
    `https://www.google.com/search?q=${encodeURIComponent(query)}`,
    `https://www.bing.com/search?q=${encodeURIComponent(query)}`,
    `https://duckduckgo.com/html?q=${encodeURIComponent(query)}`
  ];

  for (let url of fuentes) {
    try {
      const proxyURL = `http://localhost:3000/fetch?url=${encodeURIComponent(url)}`;
      const res = await fetch(proxyURL);
      if (!res.ok) throw new Error("Fuente no disponible");
      const html = await res.text();
      if (!html || html.length < 1000) throw new Error("HTML vacío o inválido");
      return html;
    } catch (err) {
      console.warn(`Error con ${url}: ${err.message}`);
    }
  }

  throw new Error("No se pudo obtener datos desde ninguna fuente confiable.");
}
