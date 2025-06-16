document.addEventListener("DOMContentLoaded", async () => {
  const sidebar = document.getElementById("sidebar");
  const toggleSidebar = document.getElementById("toggleSidebar");
  const btnDark = document.getElementById("btnDark");
  const botonesNav = document.querySelectorAll("aside nav button");
  const secciones = document.querySelectorAll(".seccion");

  // Activar menú lateral
  if (toggleSidebar && sidebar) {
    toggleSidebar.onclick = () => {
      sidebar.classList.toggle("open");
    };
  }

  // Modo oscuro
  let dark = false;
  if (btnDark) {
    btnDark.onclick = () => {
      dark = !dark;
      aplicarModoOscuro(dark);
    };
  }

  // Navegación por secciones
  botonesNav.forEach(b => {
    b.onclick = () => {
      secciones.forEach(s => s.classList.remove("activa"));
      const destino = document.getElementById(b.dataset.sec);
      if (destino) destino.classList.add("activa");
    };
  });

  // Cargar monedas
  try {
    const monedas = await obtenerMonedas();
    const selMoneda = document.getElementById("selMoneda");
    if (selMoneda) {
      monedas.forEach(m => {
        const opt = document.createElement("option");
        opt.value = m;
        opt.textContent = m;
        selMoneda.appendChild(opt);
      });
    }
  } catch (err) {
    console.error("Error cargando monedas:", err);
  }

  // Cargar criptomonedas
  try {
    const criptos = await obtenerCriptos();
    const selCripto = document.getElementById("selCripto");
    if (selCripto) {
      criptos.forEach(c => {
        const opt = document.createElement("option");
        opt.value = c;
        opt.textContent = c;
        selCripto.appendChild(opt);
      });
    }
  } catch (err) {
    console.error("Error cargando criptomonedas:", err);
  }

  // Mostrar empresas (estáticas por ahora)
  const contEmpresas = document.getElementById("listaEmpresas");
  if (contEmpresas && CONFIG.empresasEstaticas) {
    CONFIG.empresasEstaticas.forEach(emp => {
      const div = crearElemento("div", "empresa");
      div.innerHTML = `<strong>${emp.nombre}</strong><br>
      Símbolo: ${emp.simbolo}<br>
      Sector: ${emp.sector}<br>
      País: ${emp.pais}`;
      contEmpresas.appendChild(div);
    });
  }

  // Botones de preguntas IA predefinidas
  const btnsIA = document.querySelectorAll(".btnIA");
  btnsIA.forEach(btn => {
    btn.onclick = () => {
      const pregunta = btn.dataset.pregunta;
      if (window.FinancialAI && typeof window.FinancialAI.responder === "function") {
        window.FinancialAI.responder(pregunta);
      }
    };
  });
});
