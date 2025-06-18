// utils.js

// Función para crear una tarjeta visual para un ítem
function crearTarjeta(dato, tipo) {
  const tarjeta = document.createElement("div");
  tarjeta.className = "tarjeta";

  const titulo = document.createElement("h3");
  titulo.textContent = `${dato.nombre} (${dato.simbolo})`;

  const valor = document.createElement("div");
  valor.className = "valor";
  valor.textContent = "Cargando...";

  const variacion = document.createElement("div");
  variacion.className = "variacion";
  variacion.textContent = "Variación semanal: -";

  const descripcion = document.createElement("div");
  descripcion.className = "descripcion";
  descripcion.textContent = dato.descripcion || "";

  tarjeta.appendChild(titulo);
  tarjeta.appendChild(valor);
  tarjeta.appendChild(variacion);
  tarjeta.appendChild(descripcion);

  tarjeta.addEventListener("click", () => {
    obtenerDatosYGraficar(dato.nombre, tipo, tarjeta, valor, variacion);
  });

  return tarjeta;
}

// Muestra mensaje de error en consola y opcionalmente en pantalla
function mostrarError(msg) {
  console.error("Error:", msg);
  if (document.querySelector("#respuesta-ia")) {
    document.querySelector("#respuesta-ia").innerHTML = `<p style="color:red;">⚠️ ${msg}</p>`;
  }
}

// Fetch real con cascada de fuentes (Google → Bing → DuckDuckGo)
async function fetchHTML(query) {
  const fuentes = [
    `https://www.google.com/search?q=${encodeURIComponent(query)}`,
    `https://www.bing.com/search?q=${encodeURIComponent(query)}`,
    `https://duckduckgo.com/?q=${encodeURIComponent(query)}`
  ];

  for (const fuente of fuentes) {
    try {
      const respuesta = await fetch(`http://localhost:3000/fetch?url=${encodeURIComponent(fuente)}`);
      const texto = await respuesta.text();
      if (texto && texto.length > 100) return texto;
    } catch (e) {
      console.warn("Fallo con fuente:", fuente);
    }
  }

  throw new Error("No se pudo obtener datos en tiempo real.");
}
