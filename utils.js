// 🔧 Función para obtener HTML desde una URL usando el proxy local
async function fetchHTML(url) {
  try {
    const response = await fetch(`http://localhost:3000/fetch?url=${encodeURIComponent(url)}`);
    if (!response.ok) throw new Error("Error al conectar con proxy.");
    const html = await response.text();
    return html;
  } catch (error) {
    console.error("❌ fetchHTML error:", error.message);
    return null;
  }
}

// 🔴 Muestra un mensaje de error en la interfaz
function mostrarError(mensaje, contenedor = "#respuesta-ia") {
  const div = document.querySelector(contenedor);
  div.innerHTML = `<p style="color:red;">⚠️ ${mensaje}</p>`;
}

// ✅ Crea una tarjeta visual tipo Binance
function crearTarjeta(item, tipo) {
  const div = document.createElement("div");
  div.className = "tarjeta";
  div.dataset.tipo = tipo;
  div.dataset.nombre = item.nombre;
  div.dataset.busqueda = item.busqueda;

  div.innerHTML = `
    <h3>${item.nombre} (${item.simbolo})</h3>
    <div class="valor">Cargando...</div>
    <div class="variacion">🔄 Obteniendo variación...</div>
    <div class="descripcion">${item.descripcion}</div>
    <div class="zona-grafico" style="display:none;"></div>
  `;

  return div;
}

// 📈 Genera un gráfico automático estilo Google con datos reales y simulados
function mostrarGrafico(contenedor, nombre, valorActual) {
  const zona = contenedor.querySelector(".zona-grafico");
  if (!zona) return;

  // Simular historial de los últimos 7 días (relativo al valor actual)
  const historial = [];
  for (let i = 6; i >= 0; i--) {
    const variacion = Math.random() * 4 - 2; // +-2%
    const valor = +(valorActual * (1 + variacion / 100)).toFixed(2);
    historial.push(valor);
  }
  historial.push(valorActual);

  // Dibujar gráfico simple como texto (puedes reemplazar por canvas.js, chart.js, etc.)
  const puntos = historial.map((val, idx) => `<div style="margin-right:6px; display:inline-block; color:#2ecc71;">●</div>`).join("");
  const valores = historial.map(v => `<small>${v}</small>`).join(" | ");

  zona.style.display = "block";
  zona.innerHTML = `
    <p><strong>${nombre}</strong> (últimos 7 días):</p>
    <div style="font-size: 1.2em;">${puntos}</div>
    <div style="margin-top:8px; font-size:0.9em;">${valores}</div>
  `;
}
