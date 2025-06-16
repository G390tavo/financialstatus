document.addEventListener("DOMContentLoaded", async () => {
  const botonesNav = document.querySelectorAll("aside nav button");
  const secciones = document.querySelectorAll(".seccion");
  const sidebar = document.getElementById("sidebar");
  const toggleSidebar = document.getElementById("toggleSidebar");
  const btnDark = document.getElementById("btnDark");

  let dark = false;
  aplicarModoOscuro(dark);

  toggleSidebar.onclick = () => sidebar.classList.toggle("open");
  btnDark.onclick = () => {
    dark = !dark;
    aplicarModoOscuro(dark);
  };

  botonesNav.forEach(b => {
    b.onclick = () => {
      secciones.forEach(s => s.classList.remove("activa"));
      document.getElementById(b.dataset.sec).classList.add("activa");
    };
  });

  // Cargar monedas
  const monedas = await obtenerMonedas();
  const selMoneda = document.getElementById("selMoneda");
  monedas.forEach(m => {
    const opt = document.createElement("option");
    opt.value = m;
    opt.textContent = m;
    selMoneda.appendChild(opt);
  });

  // Cargar criptos
  const criptos = await obtenerCriptos();
  const selCripto = document.getElementById("selCripto");
  criptos.forEach(c => {
    const opt = document.createElement("option");
    opt.value = c;
    opt.textContent = c;
    selCripto.appendChild(opt);
  });

  // Mostrar empresas
  const contEmpresas = document.getElementById("listaEmpresas");
  CONFIG.empresasEstaticas.forEach(emp => {
    const div = crearElemento("div", "empresa");
    div.innerHTML = `<strong>${emp.nombre}</strong><br>
    Símbolo: ${emp.simbolo}<br>
    Sector: ${emp.sector}<br>
    País: ${emp.pais}`;
    contEmpresas.appendChild(div);
  });

  // IA básica por botones
  window.responderIA = function (pregunta) {
    const div = document.getElementById("respIA");
    if (pregunta.includes("monedas")) {
      div.innerHTML = "Selecciona una moneda en el menú, elige el periodo, y espera el gráfico.";
    } else if (pregunta.includes("criptos")) {
      div.innerHTML = "Selecciona una criptomoneda, un periodo, y observa el gráfico.";
    } else if (pregunta.includes("empresas")) {
      div.innerHTML = "Haz clic en la pestaña Empresas para ver la información de compañías reales.";
    } else {
      div.innerHTML = "Estoy buscando una respuesta...";
    }
  };
});
