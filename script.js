document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("modo-oscuro").addEventListener("click", () => {
    document.body.classList.toggle("oscuro");
  });

  document.getElementById("cerrar-menu").addEventListener("click", () => {
    document.getElementById("menu-lateral").style.display = "none";
  });

  document.getElementById("abrir-menu").addEventListener("click", () => {
    document.getElementById("menu-lateral").style.display = "block";
  });

  mostrarDatos("monedas", monedas);
  mostrarDatos("criptos", criptos);
  mostrarEmpresas();
});

function mostrarSeccion(id) {
  document.querySelectorAll(".seccion").forEach(seccion => {
    seccion.classList.remove("visible");
  });
  document.getElementById(id).classList.add("visible");

  document.querySelectorAll("#menu-lateral nav button").forEach(btn => {
    btn.classList.remove("activo");
  });
  const botonActivo = Array.from(document.querySelectorAll("#menu-lateral nav button"))
    .find(b => b.textContent.toLowerCase().includes(id));
  if (botonActivo) botonActivo.classList.add("activo");
}

function mostrarDatos(id, datos) {
  const contenedor = document.getElementById(id);
  datos.forEach((item, i) => {
    const tarjeta = document.createElement("div");
    tarjeta.className = "tarjeta";
    tarjeta.innerHTML = `<h3>${item.nombre}</h3><canvas id="${id}-grafico-${i}" width="400" height="200"></canvas>`;
    contenedor.appendChild(tarjeta);
    generarGrafico(`${id}-grafico-${i}`, item.historia);
  });
}

function mostrarEmpresas() {
  const contenedor = document.getElementById("empresas");
  empresas.forEach((empresa, i) => {
    const tarjeta = document.createElement("div");
    tarjeta.className = "tarjeta";
    const info = document.createElement("p");
    info.innerText = empresa.resumen;
    info.onclick = () => {
      info.innerText = empresa.analisis;
    };
    tarjeta.innerHTML = `<h3>${empresa.nombre}</h3><canvas id="empresa-grafico-${i}" width="400" height="200"></canvas>`;
    tarjeta.appendChild(info);
    contenedor.appendChild(tarjeta);
    generarGrafico(`empresa-grafico-${i}`, empresa.historia);
  });
}
