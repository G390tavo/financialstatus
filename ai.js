// ai.js

async function obtenerInfo(palabraClave) {
    try {
        const urls = [
            `https://www.google.com/search?q=${encodeURIComponent(palabraClave)}`,
            `https://www.bing.com/search?q=${encodeURIComponent(palabraClave)}`,
            `https://duckduckgo.com/?q=${encodeURIComponent(palabraClave)}`
        ];

        for (const url of urls) {
            const response = await fetch(`http://localhost:3000/fetch?url=${encodeURIComponent(url)}`);
            const html = await response.text();
            const match = html.match(/<span[^>]*>([^<]{20,250})<\/span>/i);
            if (match && match[1]) {
                return match[1].replace(/<[^>]*>/g, '').trim();
            }
        }

        return "No se encontró información detallada por ahora.";
    } catch (e) {
        return "Error al obtener información. Verifica la conexión con el proxy.";
    }
}

async function preguntarIA(pregunta) {
    const contenedor = document.getElementById("respuestaIA");
    contenedor.innerHTML = "Buscando información...";
    const respuesta = await obtenerInfo(pregunta);
    contenedor.innerHTML = `<b>Respuesta IA:</b><br>${respuesta}`;
}

// Preguntas base al iniciar
document.addEventListener("DOMContentLoaded", () => {
    const intro = document.getElementById("respuestaIA");
    if (intro) {
        intro.innerHTML = "Hola, soy tu IA financiera. Puedes preguntarme cosas como:<br>• ¿Qué es el dólar?<br>• ¿Qué hace Google?<br>• ¿Cómo va el bitcoin?<br>Haz clic en un botón o escribe una consulta.";
    }
});
