// utils.js

// 1. Realiza scraping usando el proxy local
async function fetchHTML(url) {
  try {
    const response = await fetch(`http://localhost:3000/?url=${encodeURIComponent(url)}`);
    const html = await response.text();
    return html;
  } catch (error) {
    console.error("Error al hacer fetchHTML:", error);
    throw new Error("No se pudo obtener datos desde internet.");
  }
}

// 2. Formatea números con separador de miles y 2 decimales
function formatearNumero(valor) {
  return parseFloat(valor).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

// 3. Calcula la variación en porcentaje entre dos valores
function calcularVariacion(actual, anterior) {
  if (!anterior || anterior === 0) return { texto: "Sin datos", clase: "" };
  const variacion = ((actual - anterior) / anterior) * 100;
  const texto = `${variacion >= 0 ? "⬆️" : "⬇️"} ${Math.abs(variacion).toFixed(2)}%`;
  const clase = variacion >= 0 ? "up" : "down";
  return { texto, clase };
}

// 4. Limpia el contenido de un contenedor
function limpiarContenedor(id) {
  const contenedor = document.getElementById(id);
  if (contenedor) contenedor.innerHTML = "";
}

// 5. Muestra un mensaje de error dentro de un contenedor
function mostrarMensajeError(msg, id = "respuesta-ia") {
  const contenedor = document.getElementById(id);
  if (contenedor) {
    contenedor.innerHTML = `<p style="color: #e74c3c; font-weight: bold;">⚠️ ${msg}</p>`;
  }
}

// 6. Realiza scroll suave hasta un elemento
function scrollSuaveHasta(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

// 7. Genera un gráfico estilo línea con puntos conectados
function mostrarGrafico(datos, contenedorId = "grafico") {
  const contenedor = document.getElementById(contenedorId);
  if (!contenedor) return;

  // Limpia contenido anterior
  contenedor.innerHTML = "";

  // Simulación de gráfico simple (puede reemplazarse con canvas o chart.js)
  const max = Math.max(...datos);
  const puntos = datos.map(valor => {
    const altura = (valor / max) * 100;
    return `<div style="width: 10px; height: ${altura}px; background: #2ecc71; display: inline-block; margin-right: 3px;"></div>`;
  }).join("");

  contenedor.innerHTML = `
    <div style="display: flex; align-items: flex-end; height: 100px;">
      ${puntos}
    </div>
    <p style="margin-top: 10px;">Valores: ${datos.map(d => formatearNumero(d)).join(", ")}</p>
  `;
}
