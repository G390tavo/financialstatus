window.addEventListener("load", () => {
  setTimeout(() => {
    document.getElementById("loader").style.display = "none";
    document.getElementById("main-content").style.display = "block";
  }, 1000);
});

function showTab(tabId) {
  const tabs = document.querySelectorAll(".tab-content");
  tabs.forEach(tab => {
    tab.style.display = "none";
  });
  document.getElementById(tabId).style.display = "block";
}

function toggleModoOscuro() {
  document.body.classList.toggle("dark-mode");
}

// Cargar empresas de ejemplo real (luego usarás la API real)
document.addEventListener("DOMContentLoaded", async () => {
  try {
    const container = document.getElementById("empresas-container");
    if (!container) return;
    const data = [
      { nombre: "Apple Inc.", ticker: "AAPL", sector: "Tecnología", descripcion: "Empresa líder en tecnología y productos electrónicos." },
      { nombre: "Amazon", ticker: "AMZN", sector: "E-commerce", descripcion: "Plataforma de comercio electrónico más grande del mundo." },
      { nombre: "Tesla", ticker: "TSLA", sector: "Automóviles eléctricos", descripcion: "Empresa de autos eléctricos e innovación energética." }
    ];
    container.innerHTML = data.map(e =>
      `<div style="border:1px solid #ccc; margin:10px; padding:10px; border-radius:8px;">
         <h3>${e.nombre} (${e.ticker})</h3>
         <p><strong>Sector:</strong> ${e.sector}</p>
         <p>${e.descripcion}</p>
       </div>`
    ).join('');
  } catch (err) {
    console.error("Error cargando empresas", err);
  }
});
