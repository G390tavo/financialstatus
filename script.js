document.addEventListener("DOMContentLoaded", () => {
  const menuLateral = document.getElementById("menu-lateral");
  const abrirMenuBtn = document.getElementById("abrir-menu");
  const cerrarMenuBtn = document.getElementById("cerrar-menu");
  const modoToggleBtn = document.getElementById("modo-toggle");
  const body = document.body;

  // Secciones y botones
  const secciones = document.querySelectorAll("main .seccion");
  const botonesNav = document.querySelectorAll("#menu-lateral nav button");

  // Contenedores para listas
  const listaMonedas = document.getElementById("lista-monedas");
  const listaCriptos = document.getElementById("lista-criptos");
  const listaEmpresas = document.getElementById("lista-empresas");

  // Estado del modo (dark por defecto)
  if (!body.classList.contains("dark") && !body.classList.contains("light")) {
    body.classList.add("dark");
  }

  // Cambiar modo claro/oscuro
  modoToggleBtn.addEventListener("click", () => {
    if (body.classList.contains("dark")) {
      body.classList.replace("dark", "light");
      modoToggleBtn.textContent = "Modo oscuro";
    } else {
      body.classList.replace("light", "dark");
      modoToggleBtn.textContent = "Modo claro";
    }
  });

  // Abrir y cerrar menú lateral
  abrirMenuBtn.addEventListener("click", () => {
    menuLateral.classList.add("visible");
    abrirMenuBtn.style.display = "none";
  });

  cerrarMenuBtn.addEventListener("click", () => {
    menuLateral.classList.remove("visible");
    abrirMenuBtn.style.display = "block";
  });

  // Función para mostrar una sección y ocultar otras
  function mostrarSeccion(id) {
    secciones.forEach(sec => {
      if (sec.id === id) sec.classList.add("activa");
      else sec.classList.remove("activa");
    });
  }

  // Inicial: mostrar Inicio
  mostrarSeccion("inicio");

  // Navegación entre secciones
  botonesNav.forEach(btn => {
    btn.addEventListener("click", () => {
      const target = btn.dataset.section;
      mostrarSeccion(target);

      // Cerrar menú si está visible y estamos en modo móvil (ejemplo simple)
      if (window.innerWidth <= 768) {
        menuLateral.classList.remove("visible");
        abrirMenuBtn.style.display = "block";
      }

      // Si entramos a IA, activar IA (en ai.js se controla automáticamente)
      if (target === "ia") {
        // IA ya activada en ai.js con evento change en select
      }
    });
  });

  // --- Renderizado de tarjetas ---

  // Función para crear tarjeta (para monedas, criptos, empresas)
  function crearTarjeta(item) {
    const card = document.createElement("div");
    card.classList.add("tarjeta");

    card.innerHTML = `
      <div class="tarjeta-header">
        <div class="icono">${item.icono || ""}</div>
        <div class="nombre">${item.nombre}</div>
      </div>
      <div class="tarjeta-body">
        <div class="valor">Valor: <span class="valor-actual">${item.valorActual ?? "Cargando..."}</span></div>
        <div class="cambio ${item.cambio >= 0 ? "positivo" : "negativo"}">
          ${item.cambio >= 0 ? "⬆️" : "⬇️"} ${Math.abs(item.cambio ?? 0).toFixed(2)}%
        </div>
        <div class="descripcion">${item.descripcion || ""}</div>
      </div>
    `;

    // Al hacer clic en tarjeta, genera gráfico y detalles abajo
    card.addEventListener("click", () => {
      // Aquí podemos llamar función para obtener valores reales y mostrar gráfico
      if (typeof window.mostrarGrafico === "function") {
        window.mostrarGrafico(item);
      }
    });

    return card;
  }

  // Renderizar listas
  async function renderTarjetas() {
    // Limpia contenedores
    listaMonedas.innerHTML = "";
    listaCriptos.innerHTML = "";
    listaEmpresas.innerHTML = "";

    // Obtener datos reales (ejemplo simple, reemplazar con fetch real)

    // Simulación con config.js arrays

    function calcularCambioSemana(antiguo, actual) {
      if (!antiguo || !actual) return 0;
      return ((actual - antiguo) / antiguo) * 100;
    }

    // Función dummy para obtener valor actual real desde proxy o fetch (deberías usar fetch con proxy)
    async function obtenerValorReal(nombre) {
      // Por ahora retornamos valor simulado aleatorio entre 100 y 200
      return 100 + Math.random() * 100;
    }

    // Procesar monedas
    for (const moneda of monedas) {
      moneda.valorActual = await obtenerValorReal(moneda.nombre);
      moneda.cambio = calcularCambioSemana(moneda.valorAnterior || moneda.valorActual * 0.95, moneda.valorActual);
      listaMonedas.appendChild(crearTarjeta(moneda));
    }

    // Procesar criptos
    for (const cripto of criptos) {
      cripto.valorActual = await obtenerValorReal(cripto.nombre);
      cripto.cambio = calcularCambioSemana(cripto.valorAnterior || cripto.valorActual * 0.9, cripto.valorActual);
      listaCriptos.appendChild(crearTarjeta(cripto));
    }

    // Procesar empresas
    for (const empresa of empresas) {
      empresa.valorActual = await obtenerValorReal(empresa.nombre);
      empresa.cambio = calcularCambioSemana(empresa.valorAnterior || empresa.valorActual * 0.98, empresa.valorActual);
      listaEmpresas.appendChild(crearTarjeta(empresa));
    }
  }

  renderTarjetas();

});
