document.addEventListener("DOMContentLoaded", () => {
  const iaContainer = document.getElementById("ia-contenido");
  if (!iaContainer) return console.warn("IA no inicializada. Faltan elementos.");

  const titulo = crearElemento("h3", "", "Pregúntale a la IA");
  const intro = crearElemento("p", "", "Selecciona una pregunta para ver una explicación y un gráfico automático:");
  const select = crearElemento("select");
  const grafico = document.getElementById("grafico");

  const preguntas = [
    { texto: "¿Cuál es el precio actual del Bitcoin?", tipo: "cripto", valor: "BTC" },
    { texto: "¿Cómo ha variado el dólar?", tipo: "moneda", valor: "USD" },
    { texto: "¿Cuál es el estado actual de las acciones de Apple?", tipo: "empresa", valor: "AAPL" },
    { texto: "¿Está subiendo o bajando Ethereum?", tipo: "cripto", valor: "ETH" },
    { texto: "¿Cómo le va al Euro últimamente?", tipo: "moneda", valor: "EUR" },
  ];

  preguntas.forEach(p => {
    const opt = document.createElement("option");
    opt.value = JSON.stringify(p);
    opt.textContent = p.texto;
    select.appendChild(opt);
  });

  const boton = crearElemento("button", "btn", "Consultar");
  boton.addEventListener("click", async () => {
    const seleccion = JSON.parse(select.value);
    mostrarMensaje("Buscando información para: " + seleccion.texto);
    await buscarYGraficar(seleccion.tipo, seleccion.valor);
  });

  iaContainer.appendChild(titulo);
  iaContainer.appendChild(intro);
  iaContainer.appendChild(select);
  iaContainer.appendChild(boton);
});

// Lógica real de scraping y graficación usando Google
async function buscarYGraficar(tipo, simbolo) {
  const query = tipo === "empresa"
    ? `${simbolo} stock price`
    : `${simbolo} precio`;

  try {
    const response = await fetch(`https://corsproxy.io/?https://www.google.com/search?q=${encodeURIComponent(query)}`);
    const html = await response.text();

    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    let valor = "No encontrado";
    const candidatos = doc.querySelectorAll("span");

    for (const el of candidatos) {
      const txt = el.textContent.replace(/[^\d.,-]/g, "");
      if (txt.match(/^\d{1,3}(,\d{3})*(\.\d+)?$/) || txt.match(/^\d+(\.\d+)?$/)) {
        valor = txt;
        break;
      }
    }

    if (valor === "No encontrado") throw new Error("No se pudo obtener el precio.");

    const datos = generarDatosSimulados(valor);
    graficar(datos, `${simbolo} (${tipo})`);
  } catch (e) {
    mostrarError("No se pudo obtener datos en tiempo real. Verifica tu conexión o cambia de pregunta.");
  }
}

// Crea datos simulados basados en un valor real (ej. $678)
function generarDatosSimulados(valorReal) {
  const base = parseFloat(valorReal.replace(",", "").replace("$", ""));
  const datos = [];
  for (let i = 6; i >= 0; i--) {
    const variacion = Math.random() * 0.1 * base;
    datos.push({
      dia: `Día ${7 - i}`,
      valor: Math.round((base + (Math.random() > 0.5 ? variacion : -variacion)) * 100) / 100,
    });
  }
  return datos;
}

// Muestra una gráfica en el área #grafico
function graficar(datos, titulo = "") {
  const container = document.getElementById("grafico");
  if (!container) return;

  container.innerHTML = `<h3>${titulo}</h3>`;
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("width", 600);
  svg.setAttribute("height", 200);
  svg.style.background = "#fff";
  svg.style.border = "1px solid #ccc";

  const maxValor = Math.max(...datos.map(d => d.valor));
  const minValor = Math.min(...datos.map(d => d.valor));
  const pasoX = 600 / (datos.length + 1);
  const escalaY = 150 / (maxValor - minValor || 1);

  datos.forEach((d, i) => {
    const x = (i + 1) * pasoX;
    const y = 180 - (d.valor - minValor) * escalaY;

    const punto = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    punto.setAttribute("cx", x);
    punto.setAttribute("cy", y);
    punto.setAttribute("r", 4);
    punto.setAttribute("fill", "green");

    const texto = document.createElementNS("http://www.w3.org/2000/svg", "text");
    texto.setAttribute("x", x - 10);
    texto.setAttribute("y", y - 10);
    texto.setAttribute("font-size", "12");
    texto.textContent = d.valor;

    svg.appendChild(punto);
    svg.appendChild(texto);

    if (i > 0) {
      const prevX = i * pasoX;
      const prevY = 180 - (datos[i - 1].valor - minValor) * escalaY;
      const linea = document.createElementNS("http://www.w3.org/2000/svg", "line");
      linea.setAttribute("x1", prevX);
      linea.setAttribute("y1", prevY);
      linea.setAttribute("x2", x);
      linea.setAttribute("y2", y);
      linea.setAttribute("stroke", "green");
      svg.appendChild(linea);
    }
  });

  container.appendChild(svg);
}
