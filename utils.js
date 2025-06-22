// utils.js

function obtenerHTML(url) {
  return fetch(`${API_PROXY}${encodeURIComponent(url)}`)
    .then(res => res.text())
    .catch(() => null);
}

function limpiarTexto(html) {
  const temp = document.createElement("div");
  temp.innerHTML = html;
  return temp.textContent || temp.innerText || "";
}

function generarGrafico(datos, contenedor) {
  const canvas = document.createElement("canvas");
  contenedor.innerHTML = "";
  contenedor.appendChild(canvas);

  const ctx = canvas.getContext("2d");
  const puntos = datos.map((d, i) => ({ x: i, y: d }));
  const max = Math.max(...datos);

  const tooltip = document.createElement("div");
  tooltip.className = "tooltip";
  contenedor.appendChild(tooltip);
  tooltip.style.display = "none";

  canvas.width = contenedor.offsetWidth - 20;
  canvas.height = 200;

  ctx.strokeStyle = "#39FF14";
  ctx.lineWidth = 2;
  ctx.beginPath();

  puntos.forEach((p, i) => {
    const px = (canvas.width / (puntos.length - 1)) * i;
    const py = canvas.height - (p.y / max) * (canvas.height - 30);
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  });

  ctx.stroke();

  // Puntos
  puntos.forEach((p, i) => {
    const px = (canvas.width / (puntos.length - 1)) * i;
    const py = canvas.height - (p.y / max) * (canvas.height - 30);
    ctx.beginPath();
    ctx.arc(px, py, 4, 0, Math.PI * 2);
    ctx.fillStyle = "#39FF14";
    ctx.fill();
  });

  // Tooltip al mover
  canvas.onmousemove = (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const index = Math.round((x / canvas.width) * (puntos.length - 1));
    const punto = puntos[index];
    if (!punto) return;

    const px = (canvas.width / (puntos.length - 1)) * index;
    const py = canvas.height - (punto.y / max) * (canvas.height - 30);

    tooltip.innerText = `Valor: ${punto.y}`;
    tooltip.style.left = px + "px";
    tooltip.style.top = py - 30 + "px";
    tooltip.style.display = "block";
  };

  canvas.onmouseleave = () => {
    tooltip.style.display = "none";
  };
}
