document.addEventListener("DOMContentLoaded", () => {
  // Activar sección de inicio por defecto
  cambiarSeccion('inicio');
  cargarMonedas();
  initIA();

  // Activar modo claro/oscuro
  const btnModo = document.getElementById("modo-claro-oscuro");
  btnModo.addEventListener("click", () => {
    document.body.classList.toggle("light");
    btnModo.textContent = document.body.classList.contains("light") ? "Modo Oscuro" : "Modo Claro";
  });

  // Menú lateral
  document.getElementById("cerrar-menu").addEventListener("click", () => {
    document.getElementById("menu-lateral").style.display = "none";
    document.getElementById("abrir-menu").style.display = "block";
  });

  document.getElementById("abrir-menu").addEventListener("click", () => {
    document.getElementById("menu-lateral").style.display = "flex";
    document.getElementById("abrir-menu").style.display = "none";
  });
});

function cambiarSeccion(id) {
  document.querySelectorAll(".seccion").forEach(s => s.classList.remove("activa"));
  const target = document.getElementById(id);
  if (target) target.classList.add("activa");
}

// ======================== MONEDAS ========================
async function cargarMonedas() {
  const contenedor = document.getElementById("contenedor-monedas");
  if (!contenedor) return;
  contenedor.innerHTML = "Cargando monedas...";

  try {
    const res = await fetch("/proxy?url=https://www.x-rates.com/table/?from=USD&amount=1");
    const html = await res.text();
    const datos = extraerTextoDesdeHTML(html, 'table.ratesTable tbody tr');

    contenedor.innerHTML = "";
    datos.slice(0, 5).forEach(dato => {
      const nombre = dato.querySelector("td:nth-child(1)").innerText.trim();
      const valor = dato.querySelector("td:nth-child(2)").innerText.trim();

      const tarjeta = document.createElement("div");
      tarjeta.className = "tarjeta";
      tarjeta.innerHTML = `<h3>${nombre}</h3><div class="valor">${valor}</div>`;
      contenedor.appendChild(tarjeta);
    });
  } catch (e) {
    contenedor.innerHTML = "Error al cargar monedas.";
    console.error(e);
  }
}

// ======================== CRIPTOMONEDAS ========================
async function cargarCriptos() {
  const contenedor = document.getElementById("contenedor-criptos");
  if (!contenedor) return;
  contenedor.innerHTML = "Cargando criptomonedas...";

  try {
    const res = await fetch("/proxy?url=https://www.coingecko.com/es");
    const html = await res.text();
    const datos = extraerTextoDesdeHTML(html, 'table.table tbody tr');

    contenedor.innerHTML = "";
    datos.slice(0, 5).forEach(dato => {
      const nombre = dato.querySelector(".tw-hidden").innerText.trim();
      const valor = dato.querySelector(".td-price").innerText.trim();

      const tarjeta = document.createElement("div");
      tarjeta.className = "tarjeta";
      tarjeta.innerHTML = `<h3>${nombre}</h3><div class="valor">${valor}</div>`;
      contenedor.appendChild(tarjeta);
    });
  } catch (e) {
    contenedor.innerHTML = "Error al cargar criptomonedas.";
    console.error(e);
  }
}

// ======================== EMPRESAS ========================
async function cargarEmpresas() {
  const contenedor = document.getElementById("contenedor-empresas");
  if (!contenedor) return;
  contenedor.innerHTML = "Cargando empresas...";

  try {
    const res = await fetch("/proxy?url=https://www.investing.com/equities/");
    const html = await res.text();
    const datos = extraerTextoDesdeHTML(html, 'table tbody tr');

    contenedor.innerHTML = "";
    datos.slice(0, 5).forEach(dato => {
      const nombre = dato.querySelector("td:nth-child(2)").innerText.trim();
      const valor = dato.querySelector("td:nth-child(3)").innerText.trim();

      const tarjeta = document.createElement("div");
      tarjeta.className = "tarjeta";
      tarjeta.innerHTML = `<h3>${nombre}</h3><div class="valor">${valor}</div>`;
      contenedor.appendChild(tarjeta);
    });
  } catch (e) {
    contenedor.innerHTML = "Error al cargar empresas.";
    console.error(e);
  }
}
