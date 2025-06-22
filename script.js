document.addEventListener("DOMContentLoaded", async () => {
  mostrarSeccion("inicio");
  cargarMonedas(); // Función que ahora sí existe

  document.getElementById("btn-monedas").addEventListener("click", () => {
    mostrarSeccion("monedas");
  });

  document.getElementById("btn-criptos").addEventListener("click", () => {
    mostrarSeccion("criptos");
  });

  document.getElementById("btn-empresas").addEventListener("click", () => {
    mostrarSeccion("empresas");
  });

  document.getElementById("btn-inicio").addEventListener("click", () => {
    mostrarSeccion("inicio");
  });
});

function mostrarSeccion(id) {
  document.querySelectorAll(".seccion").forEach(sec => {
    sec.classList.remove("activa");
  });
  document.getElementById(id).classList.add("activa");

  document.getElementById("menu-lateral").style.display = "none";
  document.getElementById("abrir-menu").style.display = "block";
}

async function cargarMonedas() {
  const contenedor = document.getElementById("contenedor-monedas");
  contenedor.innerHTML = "Cargando...";

  const tarjetas = await Promise.all(window.fuentes.monedas.map(async (moneda) => {
    const html = await fetchHTML(moneda.url);
    const valor = html ? extraerPrecioGoogle(html) : "Error";

    const tarjeta = document.createElement("div");
    tarjeta.className = "tarjeta";
    tarjeta.innerHTML = `
      <h3>${moneda.nombre}</h3>
      <div class="valor">${valor}</div>
      <div class="descripcion">Último valor encontrado</div>
    `;

    tarjeta.onclick = () => {
      mostrarGrafico(tarjeta, valor);
    };

    return tarjeta;
  }));

  contenedor.innerHTML = "";
  tarjetas.forEach(t => contenedor.appendChild(t));
}

function mostrarGrafico(tarjeta, valorActual) {
  const panel = document.createElement("div");
  panel.className = "panel-grafico";

  const canvas = document.createElement("canvas");
  panel.appendChild(canvas);

  const cerrar = document.createElement("button");
  cerrar.textContent = "Cerrar";
  cerrar.className = "cerrar-panel";
  cerrar.onclick = () => panel.remove();
  panel.appendChild(cerrar);

  tarjeta.appendChild(panel);

  const historial = generarHistorialSimulado(Number(valorActual.replace(",", ".")));
  crearGrafico(canvas, historial);
}

function generarHistorialSimulado(valorBase) {
  const historial = [];
  for (let i = 0; i < 10; i++) {
    const variacion = (Math.random() - 0.5) * 0.1;
    valorBase *= 1 + variacion;
    historial.push(parseFloat(valorBase.toFixed(2)));
  }
  return historial;
}
