// Función para hacer fetch con proxy y cascada de fuentes
async function fetchHTML(url) {
  const proxyUrl = "http://localhost:3000/fetch?url=";
  const sources = [
    `https://www.google.com/search?q=${encodeURIComponent(url)}`,
    `https://www.bing.com/search?q=${encodeURIComponent(url)}`,
    `https://duckduckgo.com/html/?q=${encodeURIComponent(url)}`
  ];

  for (const source of sources) {
    try {
      const response = await fetch(proxyUrl + encodeURIComponent(source));
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const text = await response.text();
      if (text && text.length > 100) { // mínima validación
        return text;
      }
    } catch (error) {
      console.warn(`Falló fuente: ${source}`, error);
      // continuar con la siguiente fuente
    }
  }

  throw new Error("No se pudo obtener datos en tiempo real");
}

// Función para crear tarjetas con info y eventos
function crearTarjeta(item, tipo, containerId) {
  /*
    item: objeto con datos (nombre, valor, variacion, etc)
    tipo: 'moneda', 'cripto', 'empresa'
    containerId: id del contenedor donde añadir la tarjeta
  */
  const container = document.getElementById(containerId);
  if (!container) return;

  // Crear tarjeta
  const tarjeta = document.createElement("div");
  tarjeta.classList.add("tarjeta");
  tarjeta.setAttribute("tabindex", "0"); // para accesibilidad

  // Icono FontAwesome según tipo
  let iconHTML = "";
  if (tipo === "moneda") iconHTML = '<i class="fa-solid fa-coins"></i>';
  else if (tipo === "cripto") iconHTML = '<i class="fa-brands fa-bitcoin"></i>';
  else if (tipo === "empresa") iconHTML = '<i class="fa-solid fa-building"></i>';

  // Variación con color y flechas
  const variacionClass = item.variacion >= 0 ? "up" : "down";
  const variacionIcon = item.variacion >= 0 ? "▲" : "▼";

  // Descripción
  const desc = descripciones[tipo + "s"] && descripciones[tipo + "s"][item.nombre]
    ? descripciones[tipo + "s"][item.nombre]
    : "Sin descripción disponible.";

  tarjeta.innerHTML = `
    <h3>${iconHTML} ${item.nombre}</h3>
    <div class="valor">${item.valor.toFixed(2)}</div>
    <div class="variacion ${variacionClass}">${variacionIcon} ${Math.abs(item.variacion).toFixed(2)}%</div>
    <div class="descripcion">${desc}</div>
  `;

  // Panel gráfico que se abre dentro de la tarjeta (inicialmente oculto)
  const panelGrafico = document.createElement("div");
  panelGrafico.classList.add("panel-grafico");
  panelGrafico.style.display = "none";
  tarjeta.appendChild(panelGrafico);

  // Botón cerrar para panel gráfico
  const btnCerrar = document.createElement("button");
  btnCerrar.textContent = "×";
  btnCerrar.classList.add("cerrar-panel");
  btnCerrar.setAttribute("aria-label", "Cerrar gráfico");
  panelGrafico.appendChild(btnCerrar);

  // Evento cerrar gráfico
  btnCerrar.addEventListener("click", (e) => {
    e.stopPropagation();
    cerrarGrafico(panelGrafico);
  });

  // Evento para abrir/cerrar gráfico al hacer clic en tarjeta
  tarjeta.addEventListener("click", async () => {
    const abierto = panelGrafico.style.display === "block";
    if (abierto) {
      cerrarGrafico(panelGrafico);
    } else {
      await abrirGrafico(item, panelGrafico);
    }
  });

  container.appendChild(tarjeta);
}

// Función para abrir gráfico dentro de tarjeta
async function abrirGrafico(item, panel) {
  // Cerrar cualquier panel abierto en otras tarjetas
  document.querySelectorAll(".panel-grafico").forEach(p => {
    if (p !== panel) cerrarGrafico(p);
  });

  panel.innerHTML = '<button class="cerrar-panel" aria-label="Cerrar gráfico">×</button><p>Cargando gráfico...</p>';
  panel.style.display = "block";

  try {
    // Aquí llamarías función que crea gráfico real con datos, por ahora ejemplo simulado
    const datosSimulados = generarDatosSimuladosSemana();

    // Crear gráfico con Chart.js u otro (esto lo manejamos en script.js)
    // Emitiremos evento para actualizar gráfico global (por simplicidad)
    const event = new CustomEvent("mostrarGrafico", { detail: { datos: datosSimulados, contenedor: panel } });
    document.dispatchEvent(event);

  } catch (error) {
    panel.innerHTML += "<p>Error cargando gráfico</p>";
  }
}

// Función para cerrar gráfico
function cerrarGrafico(panel) {
  panel.style.display = "none";
  panel.innerHTML = "";
}

// Función para generar datos simulados semanalmente
function generarDatosSimuladosSemana() {
  // Genera 7 días con valores aleatorios
  const datos = [];
  let base = 100 + Math.random() * 50;
  for (let i = 1; i <= 7; i++) {
    base += (Math.random() - 0.5) * 10; // cambios pequeños diarios
    datos.push({ x: `Día ${i}`, y: Math.round(base * 100) / 100 });
  }
  return datos;
}
