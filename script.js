document.addEventListener("DOMContentLoaded", () => {
  const btnDark = document.getElementById("btnDark");
  const btnToggle = document.getElementById("toggleSidebar");
  const sidebar = document.getElementById("sidebar");
  const navBtns = document.querySelectorAll("aside nav button");

  btnDark.onclick = () => document.body.classList.toggle("dark");
  btnToggle.onclick = () => sidebar.classList.toggle("open");

  navBtns.forEach((b) => {
    b.onclick = () => {
      document.querySelectorAll(".seccion").forEach((s) => s.classList.remove("activa"));
      document.getElementById(b.dataset.sec).classList.add("activa");
      sidebar.classList.remove("open");
      explicar(b.dataset.sec);
    };
  });

  iniciarMonedas();
  iniciarCriptos();
  iniciarEmpresas();
});

function iniciarMonedas() {
  const sel = document.getElementById("selMoneda");
  obtenerMonedas().then((list) => {
    list.forEach((m) => sel.add(new Option(m, m)));
    document.getElementById("selPeriodoMoneda").onchange = actualizarMoneda;
    sel.onchange = actualizarMoneda;
    actualizarMoneda();
  });
}

async function actualizarMoneda() {
  const sel = document.getElementById("selMoneda");
  const selP = document.getElementById("selPeriodoMoneda");
  const grafDiv = document.getElementById("grafMoneda");
  grafDiv.innerHTML = "Cargando gráfico...";
  const d = await obtenerDatos("moneda", sel.value, selP.value);
  render(grafDiv, d);
}

function iniciarCriptos() {
  const sel = document.getElementById("selCripto");
  obtenerCriptos().then((list) => {
    list.forEach((c) => sel.add(new Option(c, c)));
    document.getElementById("selPeriodoCripto").onchange = actualizarCripto;
    sel.onchange = actualizarCripto;
    actualizarCripto();
  });
}

async function actualizarCripto() {
  const sel = document.getElementById("selCripto");
  const selP = document.getElementById("selPeriodoCripto");
  const grafDiv = document.getElementById("grafCripto");
  grafDiv.innerHTML = "Cargando gráfico...";
  const d = await obtenerDatos("cripto", sel.value, selP.value);
  render(grafDiv, d);
}

function iniciarEmpresas() {
  const cont = document.getElementById("listaEmpresas");
  CONFIG.empresasEstaticas.forEach((emp) => {
    const div = document.createElement("div");
    div.className = "empresa";
    div.innerHTML = `<h3>${emp.nombre}</h3><p>${emp.sector} - ${emp.pais}</p><span>Cargando…</span>`;
    cont.appendChild(div);
    obtenerDatos("empresa", emp.simbolo).then((info) => {
      div.innerHTML = `<h3>${emp.nombre}</h3><p>${info.descripcion}</p><strong>$${info.valor.toFixed(2)}</strong>`;
    }).catch(() => {
      div.innerHTML += "<br><i>Offline</i>";
    });
  });
}

async function obtenerDatos(tipo, id, periodo) {
  await new Promise((res) => setTimeout(res, 300));
  const len = periodo === "realtime" ? 10 : { "1h": 6, "1d": 24, "1w": 7, "1m": 30 }[periodo] || 24;
  const vals = Array.from({ length: len }, () => Math.random() * 100 + 50);
  const labs = vals.map((_, i) => `${i + 1}`);
  return { vals, labs, descripcion: "Descripción IA.", valor: vals[vals.length - 1] };
}

function render(el, data) {
  el.innerHTML = "";
  const max = Math.max(...data.vals), min = Math.min(...data.vals);
  data.vals.forEach((v, i) => {
    const x = (i / (data.vals.length - 1)) * 100;
    const y = ((v - min) / (max - min)) * 90;
    const dot = document.createElement("div");
    dot.className = "punto";
    dot.style.left = x + "%";
    dot.style.bottom = y + "%";
    el.appendChild(dot);
    if (i === data.vals.length - 1) {
      const lbl = document.createElement("div");
      lbl.className = "lbl";
      lbl.style.left = x + "%";
      lbl.textContent = `$${v.toFixed(2)}`;
      el.appendChild(lbl);
    }
  });
}

function explicar(sec) {
  const out = document.getElementById("respIA");
  const m = {
    monedas: "Aquí puedes ver monedas, su gráfico y valor.",
    criptos: "Aquí puedes ver criptomonedas, gráfico y valor.",
    empresas: "Empresas con descripción y valor actual.",
    ia: "Este asistente te explica lo que ves.",
  };
  out.textContent = m[sec] || "";
}
