document.addEventListener("DOMContentLoaded", () => {
  const secciones = document.querySelectorAll(".seccion");
  const botones = document.querySelectorAll(".nav-btn");
  const toggleDark = document.getElementById("toggleDarkMode");
  const cerrarMenu = document.getElementById("cerrarMenu");

  function mostrarSeccion(id) {
    secciones.forEach(sec => sec.classList.remove("visible"));
    document.getElementById(id).classList.add("visible");
  }

  botones.forEach(boton => {
    boton.addEventListener("click", () => {
      const target = boton.getAttribute("data-section");
      mostrarSeccion(target);
    });
  });

  toggleDark.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
  });

  cerrarMenu.addEventListener("click", () => {
    document.getElementById("menu").style.display = "none";
  });

  mostrarSeccion("inicio"); // por defecto

  if (document.getElementById("respuesta-ia")) {
    preguntarIA("¿Qué es FinancialStatus?");
  }

  async function fetchRealData(termino, destinoID) {
    const url = `http://localhost:3000/fetch?url=https://www.google.com/search?q=${encodeURIComponent(termino)}`;
    const contenedor = document.getElementById(destinoID);
    contenedor.innerHTML = "<p>Cargando datos reales...</p>";

    try {
      const res = await fetch(url);
      const texto = await res.text();
      const regex = /(\$[\d,.]+)/;
      const match = texto.match(regex);
      const valor = match ? match[0] : "Valor no encontrado";

      contenedor.innerHTML = `
        <h3>${termino}</h3>
        <p>Valor: ${valor}</p>
        <canvas id="grafico-${destinoID}" width="300" height="150"></canvas>
      `;

      const ctx = document.getElementById(`grafico-${destinoID}`).getContext("2d");
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Hoy'],
          datasets: [{
            label: termino,
            data: [100, 105, 103, 107, parseFloat(valor.replace(/[^\d.]/g, "")) || 110],
            borderColor: 'green',
            fill: false,
          }]
        }
      });

    } catch (err) {
      contenedor.innerHTML = `<p>Error al obtener datos reales: ${err.message}</p>`;
    }
  }

  fetchRealData("dólar", "monedas");
  fetchRealData("bitcoin", "criptos");
  fetchRealData("apple stock", "empresas");
});
