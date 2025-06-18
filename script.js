document.addEventListener("DOMContentLoaded", () => {
  const btnMoneda = document.getElementById("btn-moneda");
  const btnCripto = document.getElementById("btn-cripto");
  const btnEmpresas = document.getElementById("btn-empresas");
  const grafico = document.getElementById("grafico");
  const info = document.getElementById("info");
  const monedasLista = document.getElementById("monedas-lista");
  const criptosLista = document.getElementById("criptos-lista");
  const iaChat = document.getElementById("ia-chat");
  const iaRespuesta = document.getElementById("ia-respuesta");
  const iaPreguntas = document.getElementById("ia-preguntas");
  const btnPreguntar = document.getElementById("preguntar");
  const btnModoOscuro = document.getElementById("toggle-dark");
  const sidebar = document.getElementById("sidebar");

  function ocultarSecciones() {
    monedasLista.style.display = "none";
    criptosLista.style.display = "none";
    grafico.innerHTML = "";
    info.innerHTML = "";
  }

  function mostrarInicio() {
    ocultarSecciones();
    info.innerHTML = "<h2>Bienvenido a FinancialStatus</h2><p>Selecciona una sección del menú para empezar.</p>";
  }

  function activarModoOscuro() {
    document.body.classList.toggle("dark-mode");
  }

  function mostrarMonedas() {
    ocultarSecciones();
    monedasLista.style.display = "block";
    info.innerHTML = "<h2>Monedas Internacionales</h2>";
  }

  function mostrarCriptos() {
    ocultarSecciones();
    criptosLista.style.display = "block";
    info.innerHTML = "<h2>Criptomonedas</h2>";
  }

  function mostrarEmpresas() {
    ocultarSecciones();
    info.innerHTML = "<h2>Empresas del mercado</h2><p>Aquí se mostrará información histórica de empresas.</p>";
    // Gráfico simplificado de ejemplo
    const canvas = document.createElement("canvas");
    canvas.width = 600;
    canvas.height = 300;
    grafico.appendChild(canvas);
    const ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(0, 150);
    ctx.lineTo(100, 140);
    ctx.lineTo(200, 130);
    ctx.lineTo(300, 120);
    ctx.strokeStyle = "green";
    ctx.stroke();
  }

  if (btnMoneda) btnMoneda.addEventListener("click", mostrarMonedas);
  if (btnCripto) btnCripto.addEventListener("click", mostrarCriptos);
  if (btnEmpresas) btnEmpresas.addEventListener("click", mostrarEmpresas);
  if (btnModoOscuro) btnModoOscuro.addEventListener("click", activarModoOscuro);

  if (btnPreguntar && iaPreguntas && iaRespuesta) {
    btnPreguntar.addEventListener("click", () => {
      const valor = iaPreguntas.value;
      if (valor === "funciona") {
        iaRespuesta.textContent = "Esta app usa una IA integrada que obtiene información real con fetch y la convierte en gráficos útiles.";
      } else if (valor === "tutorial") {
        iaRespuesta.textContent = "1. Elige una sección (Monedas, Criptos, Empresas).\n2. Mira el gráfico generado.\n3. Usa la IA para obtener explicaciones.";
      } else if (valor === "info") {
        iaRespuesta.textContent = "Las criptomonedas son activos digitales que utilizan criptografía para asegurar transacciones.";
      }
    });
  }

  mostrarInicio(); // Muestra la pantalla de inicio por defecto
});
