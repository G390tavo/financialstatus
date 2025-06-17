document.addEventListener("DOMContentLoaded", () => {
  const secciones = document.querySelectorAll(".seccion");
  const botonesNav = document.querySelectorAll("aside nav button");
  const toggleSidebar = document.getElementById("toggleSidebar");
  const main = document.querySelector("main");
  const aside = document.getElementById("sidebar");
  const btnDark = document.getElementById("btnDark");

  toggleSidebar.addEventListener("click", () => {
    aside.classList.toggle("open");
  });

  botonesNav.forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelector(".seccion.activa")?.classList.remove("activa");
      document.getElementById(btn.dataset.sec).classList.add("activa");
      aside.classList.remove("open");
    });
  });

  btnDark.addEventListener("click", () => {
    const isDark = document.body.classList.toggle("dark");
    localStorage.setItem("modoOscuro", isDark);
  });

  if (localStorage.getItem("modoOscuro") === "true") {
    aplicarModoOscuro(true);
  }

  cargarMonedas();
  cargarCriptos();
});

async function cargarMonedas() {
  const monedas = await obtenerMonedas();
  const sel = document.getElementById("selMoneda");
  monedas.forEach(mon => {
    const opt = document.createElement("option");
    opt.textContent = mon;
    opt.value = mon;
    sel.appendChild(opt);
  });
}

async function cargarCriptos() {
  const criptos = await obtenerCriptos();
  const sel = document.getElementById("selCripto");
  criptos.forEach(c => {
    const opt = document.createElement("option");
    opt.textContent = c;
    opt.value = c;
    sel.appendChild(opt);
  });
}
