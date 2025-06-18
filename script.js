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

  // Cargar contenido automático al inicio (Inicio visible)
  mostrarSeccion("inicio");

  // Autocargar IA al iniciar
  if (document.getElementById("respuesta-ia")) {
    preguntarIA("¿Qué es FinancialStatus?");
  }

  // Simular carga de monedas/criptos/empresas (puedes reemplazar con fetch real)
  document.getElementById("monedas").innerHTML = "<h2>Monedas Internacionales</h2><p>Ejemplo: USD, EUR, JPY...</p>";
  document.getElementById("criptos").innerHTML = "<h2>Criptomonedas</h2><p>Ejemplo: Bitcoin, Ethereum...</p>";
  document.getElementById("empresas").innerHTML = "<h2>Empresas</h2><p>Ejemplo: Apple, Tesla, Google...</p>";
});
