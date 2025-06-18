export async function obtenerPrecioBitcoin() {
  try {
    const proxyURL = "https://api.allorigins.win/raw?url=";
    const googleURL = "https://www.google.com/search?q=precio+bitcoin";

    const respuesta = await fetch(proxyURL + encodeURIComponent(googleURL));
    const html = await respuesta.text();

    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    const elementos = doc.querySelectorAll("span");

    let precio = null;

    elementos.forEach(el => {
      const texto = el.textContent;
      if (texto.includes("$") && texto.length < 20) {
        const limpio = texto.replace(/[^0-9.]/g, "");
        if (!isNaN(limpio) && limpio.length > 3) {
          precio = parseFloat(limpio);
        }
      }
    });

    if (precio) {
      return precio;
    } else {
      throw new Error("No se encontró el precio de Bitcoin.");
    }

  } catch (error) {
    throw new Error("Error al obtener precio: " + error.message);
  }
}

export async function graficarBitcoin() {
  const grafico = document.getElementById("grafico");
  const info = document.getElementById("info");
  if (!grafico || !info) return;

  info.innerHTML = "<h2>Gráfico de Bitcoin (precio actual)</h2>";
  grafico.innerHTML = "";

  try {
    const precio = await obtenerPrecioBitcoin();
    const valores = [precio - 300, precio - 200, precio - 100, precio, precio + 100];

    const canvas = document.createElement("canvas");
    canvas.width = 600;
    canvas.height = 300;
    grafico.appendChild(canvas);
    const ctx = canvas.getContext("2d");

    ctx.beginPath();
    ctx.moveTo(0, 300 - (valores[0] % 200));
    valores.forEach((v, i) => {
      const x = i * 150;
      const y = 300 - (v % 200);
      ctx.lineTo(x, y);
      ctx.arc(x, y, 3, 0, 2 * Math.PI);
      ctx.moveTo(x, y);
      ctx.fillText("$" + v.toFixed(2), x + 4, y - 8);
    });
    ctx.strokeStyle = "#27ae60";
    ctx.stroke();

  } catch (error) {
    grafico.innerHTML = "<p style='color:red'>" + error.message + "</p>";
  }
}
