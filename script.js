// Control de navegación y datos principales
document.addEventListener("DOMContentLoaded", () => {
  const botones = document.querySelectorAll("nav button[data-seccion]");
  botones.forEach(b => {
    b.addEventListener("click", () => {
      mostrarSeccion(b.dataset.seccion);
    });
  });

  document.getElementById("menu-toggle").addEventListener("click", () => {
    const aside = document.querySelector("aside");
    aside.classList.toggle("cerrado");
  });

  document.getElementById("modo-oscuro").addEventListener("click", () => {
    document.body.classList.toggle("oscuro");
  });

  document.getElementById("btn-ia").addEventListener("click", () => {
    iniciarIA();
  });

  cargarSecciones();
});

function cargarSecciones() {
  cargarMonedas();
  cargarCriptos();
  cargarEmpresas();
}

function cargarMonedas() {
  fetchHTML(FUENTES.monedas).then(html => {
    const datos = extraerDatosSimples(html, "monedas");
    mostrarDatos("monedas", datos);
  });
}

function cargarCriptos() {
  fetchHTML(FUENTES.criptos).then(html => {
    const datos = extraerDatosSimples(html, "criptos");
    mostrarDatos("criptos", datos);
  });
}

function cargarEmpresas() {
  fetchHTML(FUENTES.empresas).then(html => {
    const datos = extraerDatosSimples(html, "empresas");
    mostrarDatos("empresas", datos);
  });
}

function mostrarDatos(seccion, datos) {
  const contenedor = document.getElementById(seccion + "-datos");
  contenedor.innerHTML = "";
  datos.forEach((d, i) => {
    const div = document.createElement("div");
    div.className = "item";
    div.innerHTML = `<strong>${d.nombre}</strong>: ${d.valor}`;
    div.addEventListener("click", () => {
      mostrarDetalle(d.nombre, seccion);
    });
    contenedor.appendChild(div);
  });
}

function mostrarDetalle(nombre, tipo) {
  const seccion = document.getElementById(tipo + "-detalle");
  seccion.innerHTML = `<h4>${nombre}</h4><p>Cargando gráfico...</p>`;

  // Simula historial ficticio para graficar
  const historial = Array.from({ length: 10 }, (_, i) => ({
    valor: (Math.random() * 100).toFixed(2),
  }));

  crearGrafico(seccion, historial);
}
