const companies = [
  { name: "Apple Inc.", desc: "Diseña y fabrica productos como el iPhone.", risk: "bajo" },
  { name: "Tesla Inc.", desc: "Fabricante de autos eléctricos.", risk: "alto" },
  { name: "Microsoft Corp.", desc: "Software y servicios en la nube.", risk: "medio" },
  { name: "Amazon", desc: "Comercio electrónico y servicios web.", risk: "medio" },
  { name: "NVIDIA", desc: "Procesadores gráficos y AI.", risk: "alto" }
];

function showTab(tabId) {
  document.querySelectorAll(".tab").forEach(tab => tab.classList.remove("active"));
  document.getElementById(tabId).classList.add("active");
}

function filterCompanies() {
  const query = document.getElementById("searchCompany").value.toLowerCase();
  const container = document.getElementById("companies");
  container.innerHTML = '';
  companies.filter(c => c.name.toLowerCase().includes(query)).forEach(c => {
    const div = document.createElement("div");
    div.className = "company-card";
    div.innerHTML = `<h3>${c.name}</h3><p>${c.desc}</p><p class="risk risk-${c.risk}">Riesgo: ${c.risk}</p>`;
    container.appendChild(div);
  });
}

function loadCompanies() {
  document.getElementById("searchCompany").value = '';
  filterCompanies();
}

function updateChart() {
  const ctx = document.getElementById("coinChart").getContext("2d");
  const days = parseInt(document.getElementById("daysRange").value) || 30;
  const labels = Array.from({ length: days }, (_, i) => `Día ${i + 1}`);
  const data = Array.from({ length: days }, () => Math.floor(Math.random() * 100));

  if (window.myChart) window.myChart.destroy();
  window.myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels,
      datasets: [{
        label: "Valor de moneda",
        data,
        borderColor: "#4CAF50",
        fill: false
      }]
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  loadCompanies();
  updateChart();
});
