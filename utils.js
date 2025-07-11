async function obtenerHTML(url) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Error HTTP " + res.status);
    return await res.text();
  } catch (e) {
    console.warn("Error al obtener HTML:", e);
    return null;
  }
}

async function intentarFuentes(fuentes) {
  for (const url of fuentes) {
    const html = await obtenerHTML(url);
    if (html) return html;
  }
  return null;
}

function extraerValorDesdeHTML(html, selector) {
  if (!html) return "¿?";
  const doc = new DOMParser().parseFromString(html, "text/html");
  return doc.querySelector(selector)?.textContent?.trim() || "¿?";
}

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
        return data.respuesta || "Sin respuesta clara.";
      }
    } catch (e) {
      console.warn("Error con modelo", modelo, e);
    }
  }
  return "No se pudo contactar con la IA.";
}
