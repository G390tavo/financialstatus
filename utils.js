async function fetchConTimeout(url, ms = 7000) {
  return Promise.race([
    fetch(url),
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error("⌛ Tiempo de espera excedido")), ms)
    )
  ]);
}

async function cargarHTMLSeguro(url, fallback = null) {
  try {
    const res = await fetchConTimeout(url);
    return await res.text();
  } catch (err) {
    console.warn("⚠️ Falló al cargar:", url);
    if (fallback) {
      const resLocal = await fetch(fallback);
      return await resLocal.text();
    }
    return "<div class='error'>❌ Error al cargar datos.</div>";
  }
}

async function intentarFuentes(fuentes, fallback = null) {
  for (const fuente of fuentes) {
    try {
      const html = await cargarHTMLSeguro(fuente, fallback);
      if (html && html.length > 500) return html;
    } catch (_) {
      console.warn("⚠️ Fuente fallida:", fuente);
    }
  }
  throw new Error("❌ Todas las fuentes fallaron.");
}

function generarTarjetas(html, tipo) {
  const contenedor = document.getElementById(tipo);
  contenedor.innerHTML = `<div class='loader'>Cargando ${tipo}...</div>`;

  setTimeout(() => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    let valor = "¿?";
    let variacion = "¿?";
    let descripcion = "Origen desconocido";

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
      console.error("🧨 Error al analizar HTML:", e);
    }

    contenedor.innerHTML = `
      <div class="tarjeta" tabindex="0">
        <h3>📊 ${tipo.toUpperCase()}</h3>
        <p><strong>Valor:</strong> ${valor}</p>
        <p><strong>Variación:</strong> ${variacion}</p>
        <p class="fuente">${descripcion}</p>
      </div>
    `;
  }, 600);
}
