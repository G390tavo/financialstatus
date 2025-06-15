document.addEventListener("DOMContentLoaded", function () {
    showTab('monedas'); // mostrar sección por defecto
    renderEmpresas();
    document.getElementById('darkModeToggle').addEventListener('change', toggleDarkMode);
});

function showTab(tabName) {
    const sections = ['monedas', 'criptos', 'empresas', 'config'];
    sections.forEach(sec => {
        const el = document.getElementById(`seccion-${sec}`);
        if (el) el.style.display = (sec === tabName) ? 'block' : 'none';
    });
}

function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
}

function renderEmpresas() {
    const empresas = [
        { nombre: "Apple", sector: "Tecnología", precio: 190.25 },
        { nombre: "Microsoft", sector: "Tecnología", precio: 315.50 },
        { nombre: "Amazon", sector: "E-commerce", precio: 128.34 }
    ];
    const container = document.getElementById("empresas-list");
    if (!container) return;
    container.innerHTML = empresas.map(e => `
        <div class="empresa-card">
            <h3>${e.nombre}</h3>
            <p>Sector: ${e.sector}</p>
            <p>Precio actual: $${e.precio}</p>
        </div>
    `).join("");
}