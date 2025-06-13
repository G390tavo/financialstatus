
const empresas = [
  { nombre: "Apple Inc.", descripcion: "Diseña productos como el iPhone.", riesgo: "bajo", clave: "apple" },
  { nombre: "Tesla Inc.", descripcion: "Autos eléctricos y energía limpia.", riesgo: "alto", clave: "tesla" },
  { nombre: "Microsoft Corp.", descripcion: "Servicios de nube y software.", riesgo: "medio", clave: "microsoft" },
  { nombre: "Amazon Inc.", descripcion: "Comercio electrónico y AWS.", riesgo: "medio", clave: "amazon" },
  { nombre: "Nvidia Corp.", descripcion: "Chips para IA y gráficos.", riesgo: "alto", clave: "nvidia" }
];

function cargarEmpresas() {
  const contenedor = document.getElementById("empresas-container");
  empresas.forEach(e => {
    const div = document.createElement("div");
    div.className = "company-card";
    div.onclick = () => mostrarRecomendacion(e.clave);
    div.innerHTML = `<h3>${e.nombre}</h3><p>${e.descripcion}</p><p class="risk risk-${e.riesgo}">Riesgo: ${e.riesgo.toUpperCase()}</p>`;
    contenedor.appendChild(div);
  });
}

function cargarGrafico() {
  const ctx = document.getElementById('currencyChart').getContext('2d');
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: Array.from({ length: 30 }, (_, i) => `Día ${i + 1}`),
      datasets: [{
        label: 'USD a PEN',
        data: Array.from({ length: 30 }, () => (3.5 + Math.random() * 0.5).toFixed(2)),
        borderColor: '#2e7d32',
        backgroundColor: 'rgba(46,125,50,0.2)',
        fill: true,
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: true }
      }
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  cargarEmpresas();
  cargarGrafico();
});
