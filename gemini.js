
async function usarIA() {
  const apiKey = "AIzaSyAju9sc_vfVAdVdRqVmKqPBfMEz8yOq0BI";
  const prompt = "Dime 3 empresas para invertir hoy: una de bajo riesgo, una de medio riesgo y una de alto riesgo, con razones para cada una.";
  const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" + apiKey, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
  });
  const result = await response.json();
  const texto = result.candidates?.[0]?.content?.parts?.[0]?.text || "Sin respuesta de IA.";
  document.getElementById("recomendaciones").innerText = texto;
}
