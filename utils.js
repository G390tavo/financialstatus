const PROXIES = [
  "https://financial-proxy.onrender.com?url=",
  "https://api.allorigins.win/raw?url=",
  "https://corsproxy.io/?",
  "https://thingproxy.freeboard.io/fetch/"
];

// Detecta cuál proxy está activo
async function obtenerProxyDisponible() {
  for (let proxy of PROXIES) {
    try {
      const res = await fetch(proxy + encodeURIComponent("https://example.com"));
      if (res.ok) return proxy;
    } catch (e) {}
  }
  throw new Error("Todos los proxys están caídos.");
}

// Intenta con múltiples URLs (fuentes) y múltiples proxys
async function intentarFuentes(fuentes, fallbackLocal = null) {
  for (const url of fuentes) {
    for (const proxy of PROXIES) {
      try {
        const fullURL = proxy + encodeURIComponent(url);
        const res = await fetch(fullURL);
        if (res.ok) {
          const html = await res.text();
          if (html.length > 500) return html;
        }
      } catch {}
    }
  }
  if (fallbackLocal) {
    const res = await fetch(fallbackLocal);
    return await res.text();
  }
  throw new Error("No se pudo obtener datos de ninguna fuente.");
}

// Genera tarjetas automáticamente con datos del HTML
function generarTarjetas(html, tipo) {
  const contenedor = document.getElementById(tipo);
  contenedor.innerHTML = "<div class='loader'>Cargando datos reales...</div>";

  setTimeout(() => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    let valor = "¿?";
    let variacion = "¿?";
    let descripcion = "Dato no disponible";

    try {
      if (tipo === "criptos") {
        valor = doc.querySelector(".priceValue")?.textContent || valor;
        variacion = doc.querySelector(".sc-15yy2pl-0.feeyND")?.textContent || variacion;
        descripcion = "Desde CoinMarketCap";
      } else if (tipo === "monedas") {
        valor = doc.querySelector(".text-success, .text-error")?.textContent || valor;
        descripcion = "Desde Wise.com";
      } else if (tipo === "empresas") {
        valor = doc.querySelector(".instrument-price_instrument-price__3uw25 .text-2xl")?.textContent || valor;
        variacion = doc.querySelector(".instrument-price_change-value__jkuml")?.textContent || variacion;
        descripcion = "Desde Investing.com";
      }
    } catch (e) {
      console.error("⚠️ Error al procesar HTML:", e);
    }

    contenedor.innerHTML = `
      <div class="tarjeta" tabindex="0" onclick="mostrarGrafico(this)">
        <h3><i>📊</i> ${tipo.toUpperCase()}</h3>
        <div class="valor">${valor}</div>
        <div class="variacion">${variacion}</div>
        <div class="descripcion">${descripcion}</div>
      </div>
    `;
  }, 700);
}
