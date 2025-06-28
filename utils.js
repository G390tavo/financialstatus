// === utils.js ===
// Lógica de obtención de HTML desde múltiples fuentes usando proxy

const proxy = "https://financial-proxy.onrender.com/?url=";

async function obtenerHTML(url) {
  try {
    const respuesta = await fetch(proxy + encodeURIComponent(url));
    if (!respuesta.ok) throw new Error("HTTP " + respuesta.status);
    return await respuesta.text();
  } catch (error) {
    console.error("Error al obtener HTML:", error);
    throw error;
  }
}

// Extraer valor de HTML de distintas fuentes según el sitio
function extraerValor(html, fuente) {
  try {
    if (fuente.includes("wise.com")) {
      const match = html.match(/data-testid="rate-value".*?>([\d.]+)</);
      return match ? match[1] : null;
    }

    if (fuente.includes("coinmarketcap.com")) {
      const match = html.match(/class="priceValue[^"]*">\$([\d.,]+)/);
      return match ? match[1].replace(",", "") : null;
    }

    if (fuente.includes("coindesk.com")) {
      const match = html.match(/"price":([\d.]+)/);
      return match ? match[1] : null;
    }

    if (fuente.includes("investing.com")) {
      const match = html.match(/<span[^>]*data-test="instrument-price-last"[^>]*>([\d.,]+)/);
      return match ? match[1].replace(",", "") : null;
    }

    if (fuente.includes("marketwatch.com")) {
      const match = html.match(/<bg-quote[^>]*field="Last"[^>]*>([\d.,]+)</);
      return match ? match[1].replace(",", "") : null;
    }

    return null;
  } catch (e) {
    console.warn("Error al extraer valor:", e);
    return null;
  }
}

// Probar varias fuentes y devolver la primera que funcione
async function intentarFuentes(fuentes) {
  for (const fuente of fuentes) {
    try {
      const html = await obtenerHTML(fuente);
      const valor = extraerValor(html, fuente);
      if (valor) return { ok: true, valor };
    } catch (e) {
      console.warn("Fuente fallida:", fuente);
    }
  }
  return { ok: false };
}
