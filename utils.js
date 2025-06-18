// Utilidades generales

function mostrarSeccion(id) {
  document.querySelectorAll(".seccion").forEach(sec => sec.classList.remove("visible"));
  const target = document.getElementById(id);
  if (target) target.classList.add("visible");
}

function fetchHTML(url) {
  return fetch(PROXY_URL + encodeURIComponent(url))
    .then(res => res.text())
    .catch(err => {
      console.error("Error al hacer fetch:", err);
      return `<p style="color:red">Error al conectar con el proxy o la fuente externa.</p>`;
    });
}

function extraerDatosSimples(html, tipo) {
  const container = document.createElement("div");
  container.innerHTML = html;

  let elementos = [];
  const spanItems = [...container.querySelectorAll("span")];

  for (let i = 0; i < spanItems.length; i++) {
    const texto = spanItems[i].textContent.trim();
    if (texto.match(/^[A-Z]{2,5}/) && spanItems[i + 1]) {
      const valor = spanItems[i + 1].textContent.trim();
      elementos.push({ nombre: texto, valor });
    }
  }

  if (elementos.length === 0) {
    elementos.push({ nombre: "Sin resultados", valor: "N/A" });
  }

  return elementos.slice(0, 10); // máximo 10 ítems
}

function crearGrafico(container, valores) {
  if (!valores || valores.length === 0) return;

  const canvas = document.createElement("canvas");
  canvas.width = 400;
  canvas.height = 200;
  const ctx = canvas.getContext("2d");

  ctx.beginPath();
  ctx.strokeStyle = "#008f39";
  ctx.lineWidth = 2;

  valores.forEach((v, i) => {
    const x = (i / (valores.length - 1)) * canvas.width;
    const y = canvas.height - (parseFloat(v.valor.replace(/[^0-9.]/g, "")) || 0);
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
    ctx.arc(x, y, 2, 0, Math.PI * 2);
  });

  ctx.stroke();
  container.innerHTML = "";
  container.appendChild(canvas);
}
