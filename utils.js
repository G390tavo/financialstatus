// Esta función realiza un fetch HTML usando proxy local
async function fetchHTML(url) {
  try {
    const proxyUrl = `http://localhost:3000/?url=${encodeURIComponent(url)}`;
    const response = await fetch(proxyUrl);
    if (!response.ok) throw new Error("Error al cargar desde proxy.");
    const text = await response.text();
    return text;
  } catch (proxyError) {
    console.warn("Proxy falló. Intentando acceso directo...");

    try {
      const response = await fetch(url, {
        mode: "no-cors"
      });
      const text = await response.text();
      return text;
    } catch (directError) {
      console.error("Fallo total al obtener HTML:", directError);
      return null;
    }
  }
}

// Extraer número desde texto con separadores
function extraerValorDesdeTexto(texto) {
  if (!texto) return null;

  const match = texto.replace(/,/g, '.').match(/-?\d+(\.\d+)?/g);
  if (match) return parseFloat(match[0]);
  return null;
}

// Simular historial para gráficos (valores aleatorios alrededor del actual)
function generarHistorial(valorActual) {
  if (!valorActual || isNaN(valorActual)) return [];

  const historial = [];
  const base = valorActual;

  for (let i = 6; i >= 0; i--) {
    const variacion = (Math.random() - 0.5) * 10;
    const y = Math.max(0, Math.round((base + variacion) * 100) / 100);
    historial.push({ x: `Día ${7 - i}`, y });
  }

  return historial;
}

// Mostrar mensaje si no hay historial
function mostrarSinHistorial(idContenedor) {
  const zona = document.getElementById(idContenedor);
  if (zona) {
    zona.innerHTML = `<p style="color:#888;font-style:italic;">NO SE ENCONTRARON RESULTADOS</p>`;
  }
}
