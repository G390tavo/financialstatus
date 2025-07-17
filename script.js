document.addEventListener("DOMContentLoaded", () => {
  // Activar modo oscuro por defecto con animación
  document.body.classList.add("oscuro", "transicion-tema");

  setTimeout(() => {
    document.body.classList.remove("transicion-tema");
  }, 1000);

  // Botón de modo claro/oscuro (texto solamente)
  const modoBtn = document.getElementById('modo-oscuro-toggle') || document.getElementById('modo-boton');
  if (modoBtn) {
    modoBtn.textContent = "Cambiar modo";
    modoBtn.addEventListener("click", () => {
      document.body.classList.add("transicion-tema");
      document.body.classList.toggle("oscuro");
      setTimeout(() => {
        document.body.classList.remove("transicion-tema");
      }, 500);
    });
  }

  // Mostrar solo la sección de inicio al principio
  document.querySelectorAll(".seccion").forEach(seccion => seccion.style.display = "none");
  const inicio = document.getElementById("inicio");
  if (inicio) inicio.style.display = "block";

  // Navegación entre secciones
  const botones = document.querySelectorAll("#menu-lateral nav button");
  botones.forEach(btn => {
    btn.addEventListener("click", async () => {
      const seccion = btn.dataset.seccion;

      // Oculta todas las secciones
      document.querySelectorAll(".seccion").forEach(s => {
        s.style.display = "none";
        s.classList.remove("visible");
      });

      // Muestra la sección correspondiente
      const actual = document.getElementById(seccion);
      if (actual) {
        actual.style.display = "block";
        actual.classList.add("visible");

        if (["monedas", "criptos", "empresas"].includes(seccion)) {
          if (!actual.dataset.cargado) {
            generarTarjetasSimuladas(seccion);
            actual.dataset.cargado = "true";
          }
        }
      }

      // Marcar botón activo
      botones.forEach(b => b.classList.remove("activo"));
      btn.classList.add("activo");
    });
  });

  // Abrir/cerrar menú lateral
  const menu = document.getElementById("menu-lateral");
  const abrir = document.getElementById("abrir-menu");
  const cerrar = document.getElementById("cerrar-menu");
  if (abrir && cerrar && menu) {
    abrir.addEventListener("click", () => menu.classList.remove("oculto"));
    cerrar.addEventListener("click", () => menu.classList.add("oculto"));
  }

  // Conversor de monedas (simulado)
  const convertirBtn = document.getElementById("convertir-moneda");
  if (convertirBtn) {
    convertirBtn.addEventListener("click", () => {
      const cantidad = parseFloat(document.getElementById("cantidad-moneda").value);
      const de = document.getElementById("de-moneda").value;
      const a = document.getElementById("a-moneda").value;

      if (!isNaN(cantidad)) {
        const tasa = Math.random() * 2 + 0.5; // tasa simulada
        const resultado = (cantidad * tasa).toFixed(2);
        document.getElementById("resultado-moneda").textContent = `${cantidad} ${de} ≈ ${resultado} ${a}`;
      }
    });
  }

  // Botones de predicción de valores futuros
  document.querySelectorAll(".predecir-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.objetivo;
      const contenedor = document.getElementById(id);
      if (contenedor) {
        const pred = generarPrediccion();
        contenedor.innerHTML += `<div class="prediccion">Predicción próxima semana: ${pred}</div>`;
      }
    });
  });
});

// Generador simulado de tarjetas
function generarTarjetasSimuladas(tipo) {
  const contenedor = document.getElementById(tipo);
  const ahora = Date.now();
  contenedor.innerHTML = "";

  for (let i = 1; i <= 10; i++) {
    const valor = (Math.random() * 1000 + 100).toFixed(2);
    const dias = Array.from({ length: 7 }, (_, j) => {
      const fecha = new Date(ahora - j * 86400000);
      const precio = (valor * (1 + (Math.random() - 0.5) * 0.1)).toFixed(2);
      return `${fecha.toISOString().split("T")[0]}: $${precio}`;
    }).reverse().join("<br>");

    const nombre = tipo.slice(0, -1).toUpperCase() + " " + i;

    contenedor.innerHTML += `
      <div class="tarjeta">
        <h3>${nombre}</h3>
        <p>Valor actual: $${valor}</p>
        <div class="historial">${dias}</div>
        <button class="predecir-btn" data-objetivo="${tipo}-item-${i}">Predecir</button>
        <div id="${tipo}-item-${i}" class="prediccion"></div>
      </div>
    `;
  }
}

// Generador simulado de predicción
function generarPrediccion() {
  const cambio = (Math.random() * 20 - 10).toFixed(2);
  const signo = cambio >= 0 ? "↑" : "↓";
  return `${signo} ${Math.abs(cambio)}%`;
}
