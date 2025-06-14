
async function cargarEmpresas() {
  const empresas = [
    { nombre: "Apple", descripcion: "Diseña productos electrónicos", riesgo: "bajo" },
    { nombre: "Tesla", descripcion: "Autos eléctricos e innovación", riesgo: "alto" },
    { nombre: "Microsoft", descripcion: "Software y servicios en la nube", riesgo: "medio" },
    { nombre: "Amazon", descripcion: "E-commerce y servicios web", riesgo: "medio" },
    { nombre: "Nvidia", descripcion: "Chips de IA y gráficos avanzados", riesgo: "bajo" }
  ];
  const contenedor = document.getElementById("empresas");
  empresas.forEach(e => {
    const div = document.createElement("div");
    div.className = "company-card";
    div.innerHTML = `<h3>${e.nombre}</h3><p>${e.descripcion}</p><p class='risk risk-${e.riesgo}'>Riesgo: ${e.riesgo}</p>`;
    contenedor.appendChild(div);
  });
}

async function cargarGraficoMoneda() {
  const response = await fetch("https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=30");
  const data = await response.json();
  const precios = data.prices.map(p => p[1]);
  const etiquetas = data.prices.map((_, i) => "Día " + (i + 1));
  const ctx = document.getElementById("graficoMoneda").getContext("2d");
  new Chart(ctx, {
    type: "line",
    data: {
      labels: etiquetas,
      datasets: [{
        label: "Precio de Bitcoin (USD)",
        data: precios,
        borderColor: "green",
        fill: false
      }]
    },
    options: { responsive: true }
  });
}

window.onload = () => {
  cargarEmpresas();
  cargarGraficoMoneda();
};
