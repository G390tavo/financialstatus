document.addEventListener("DOMContentLoaded", () => {
  const btns = document.querySelectorAll("aside#menu nav button");
  const sections = document.querySelectorAll(".seccion");
  const modeBtn = document.getElementById("modo-btn");
  const closeBtn = document.getElementById("cerrar-menu");
  const menu = document.getElementById("menu");
  const body = document.body;

  btns.forEach(btn => {
    btn.addEventListener("click", () => {
      sections.forEach(sec => sec.classList.remove("visible"));
      document.getElementById(btn.dataset.seccion).classList.add("visible");
    });
  });

  modeBtn.addEventListener("click", () => {
    body.classList.toggle("modo-claro");
    body.classList.toggle("modo-oscuro");
    modeBtn.textContent = body.classList.contains("modo-claro") ? "Modo Oscuro" : "Modo Claro";
  });

  closeBtn.addEventListener("click", () => {
    menu.style.display = menu.style.display === "none" ? "block" : "none";
  });

  for (let tipo in ITEMS) {
    cargarSeccion(tipo, ITEMS[tipo]);
  }
});

async function cargarSeccion(tipo, lista) {
  const cont = document.getElementById(`contenedor-${tipo}`);
  for (let item of lista) {
    const val = await fetchValor(item);
    const card = crearElemento("div", "card");
    if (val) {
      const flecha = Math.random() < 0.5 ? "⬆️" : "⬇️";
      const claseF = flecha === "⬆️" ? "flecha-up" : "flecha-down";
      card.innerHTML = `<h3>${item.toUpperCase()}</h3>
        <p><strong>${val}</strong> <span class="${claseF}">${flecha}</span></p>`;
    } else {
      mostrarError("No se pudo obtener " + item, card);
    }
    cont.appendChild(card);
  }
}
