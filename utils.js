const MODELOS = [
  "mistralai/mistral-7b-instruct",
  "anthropic/claude-instant-v1",
  "meta-llama/llama-3-70b-instruct"
];

async function preguntarAOpenRouter(pregunta) {
  for (const modelo of MODELOS) {
    try {
      const res = await fetch("/api/preguntar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ modelo, pregunta })
      });
      if (res.ok) {
        const data = await res.json();
        return data.respuesta || "No se obtuvo respuesta clara de la IA.";
      }
    } catch (_) {}
  }
  return "Todas las IAs están fuera de línea o no disponibles.";
}

async function obtenerHTML(url) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Error HTTP ${res.status}`);
    return await res.text();
  } catch (e) {
    console.error("Error al obtener HTML:", e);
    throw e;
  }
}

async function intentarFuentes(fuentes) {
  for (const fuente of fuentes) {
    try {
      const html = await obtenerHTML(fuente);
      if (html && html.length > 500) return html;
    } catch (e) {
      console.warn("Fuente fallida:", fuente);
    }
  }
  throw new Error("No se pudo obtener datos de ninguna fuente.");
}

function extraerValorDesdeHTML(html, selector) {
  if (!html) return "¿?";
  const doc = new DOMParser().parseFromString(html, "text/html");
  return doc.querySelector(selector)?.textContent?.trim() || "¿?";
}
