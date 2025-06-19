// === fetchHTML desde múltiples fuentes con proxy ===
async function fetchHTML(query) {
  const fuentes = [
    `https://www.google.com/search?q=${encodeURIComponent(query)}`,
    `https://www.bing.com/search?q=${encodeURIComponent(query)}`,
    `https://duckduckgo.com/html/?q=${encodeURIComponent(query)}`
  ];

  for (let url of fuentes) {
    try {
      const proxyUrl = `http://localhost:3000/fetch?url=${encodeURIComponent(url)}`;
      const res = await fetch(proxyUrl);
      if (res.ok) {
        const html = await res.text();
        return html;
      }
    } catch (err) {
      console.warn("Fallo una fuente, probando otra...");
    }
  }

  // Último intento sin proxy (solo si falla todo)
  try {
    const res = await fetch(fuentes[2]);
    if (res.ok) {
      const html = await res.text();
      return html;
    }
  } catch (err) {
    console.error("Sin conexión a ninguna fuente.");
  }

  return null;
}

// === Limpiar texto HTML para IA ===
function limpiarTexto(html) {
  const doc = new DOMParser().parseFromString(html, "text/html");
  const resultados = doc.querySelectorAll("div, span, p");
  for (let el of resultados) {
    if (el.textContent && el.textContent.length > 80 && !el.textContent.includes("cookies")) {
      return el.textContent.trim().slice(0, 400) + "...";
    }
  }
  return "No se pudo interpretar respuesta.";
}

// === Simular historial para gráfico semanal ===
function generarDatosSimuladosSemana() {
  const datos = [];
  let valor = Math.floor(Math.random() * 100) + 100;
  for (let i = 1; i <= 7; i++) {
    const variacion = Math.floor(Math.random() * 15 - 7); // +/-7
    valor += variacion;
    datos.push({ x: `Día ${i}`, y: valor });
  }
  return datos;
}

// === Crear tarjeta visual para ítems ===
function crearTarjeta(item, tipo) {
  const tarjeta = document.createElement("div");
  tarjeta.className = "tarjeta";

  const nombre = document.createElement("h3");
  nombre.textContent = item.nombre;

  const valor = document.createElement("div");
  valor.className = "valor";
  valor.textContent = item.valor || "Cargando...";

  const variacion = document.createElement("div");
  variacion.className = "variacion";
  variacion.innerHTML = item.variacion > 0
    ? `<span class="up">▲ ${item.variacion}%</span>`
    : `<span class="down">▼ ${Math.abs(item.variacion)}%</span>`;

  const descripcion = document.createElement("div");
  descripcion.className = "descripcion";
  descripcion.textContent = item.descripcion || "";

  const zonaGrafico = document.createElement("div");
  zonaGrafico.className = "zona-grafico";
  zonaGrafico.style.display = "none";
  zonaGrafico.innerHTML = "<div id='grafico-" + item.nombre + "'></div>";

  const cerrar = document.createElement("button");
  cerrar.textContent = "✖";
  cerrar.className = "cerrar-grafico";
  cerrar.onclick = () => cerrarGrafico(zonaGrafico);

  tarjeta.append(nombre, valor, variacion, descripcion, cerrar, zonaGrafico);

  tarjeta.onclick = (e) => {
    if (e.target !== cerrar) abrirGrafico(item.nombre, zonaGrafico);
  };

  return tarjeta;
}

// === Mostrar gráfico en zona específica ===
function abrirGrafico(nombre, contenedor) {
  document.querySelectorAll(".zona-grafico").forEach(z => z.style.display = "none");
  contenedor.style.display = "block";

  const datos = generarDatosSimuladosSemana();
  const canvas = document.createElement("canvas");
  const graficoCont = contenedor.querySelector("div");
  graficoCont.innerHTML = "";
  graficoCont.appendChild(canvas);

  new Chart(canvas, {
    type: "line",
    data: {
      labels: datos.map(d => d.x),
      datasets: [{
        label: nombre,
        data: datos.map(d => d.y),
        fill: false,
        borderColor: "#39FF14",
        backgroundColor: "#39FF14",
        tension: 0.3,
        pointRadius: 5
      }]
    },
    options: {
      responsive: true,
      plugins: {
        tooltip: {
          enabled: true
        },
        legend: {
          display: false
        }
      }
    }
  });
}

function cerrarGrafico(contenedor) {
  contenedor.style.display = "none";
}
