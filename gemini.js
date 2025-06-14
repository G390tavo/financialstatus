const GEMINI_API_KEY = "AIzaSyAju9sc_vfVAdVdRqVmKqPBfMEz8yOq0BI";

async function fetchGeminiAdvice() {
  const prompt = "Dame 3 recomendaciones de inversión con bajo, medio y alto riesgo y explica por qué, en texto largo.";

  const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" + GEMINI_API_KEY, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }]
    })
  });

  const data = await response.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "No se pudo cargar la recomendación.";
  document.getElementById("gemini-response").innerText = text;
}

document.addEventListener("DOMContentLoaded", fetchGeminiAdvice);
