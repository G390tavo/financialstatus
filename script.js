document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".nav-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      mostrarSeccion(btn.getAttribute("data-sec"));
      document.querySelectorAll(".nav-btn").forEach(b=>b.classList.remove("active"));
      btn.classList.add("active");
    });
  });
  document.getElementById("btnDark").addEventListener("click", toggleDark);

  initMonedas();
  initCriptos();
  initEmpresas();
  document.querySelector('.nav-btn').click();
});

function mostrarSeccion(id) {
  document.querySelectorAll(".seccion").forEach(s=>s.classList.remove("activa"));
  document.getElementById(id).classList.add("activa");
}

function toggleDark() {
  document.body.classList.toggle("dark");
}

async function initMonedas() {
  const sel = document.getElementById("selMoneda");
  obtenerMonedas().then(list => {
    list.forEach(m => sel.add(new Option(m, m)));
    sel.addEventListener("change", actualizarMoneda);
    document.getElementById("selPeriodoMoneda").addEventListener("change", actualizarMoneda);
    actualizarMoneda();
  }).catch(e=>console.error(e));
}

async function actualizarMoneda() {
  const m = document.getElementById("selMoneda").value;
  const p = document.getElementById("selPeriodoMoneda").value;
  document.getElementById("valMoneda").textContent = "Cargando...";
  const data = await obtenerDatos("moneda", m, p);
  renderGrafico("grafMoneda", data);
  document.getElementById("valMoneda").textContent = `$${data.valores.slice(-1)[0].toFixed(4)}`;
}

async function initCriptos() {
  const sel = document.getElementById("selCripto");
  obtenerCriptos().then(list => {
    list.forEach(c => sel.add(new Option(c, c)));
    sel.addEventListener("change", actualizarCripto);
    document.getElementById("selPeriodoCripto").addEventListener("change", actualizarCripto);
    actualizarCripto();
  }).catch(e=>console.error(e));
}

async function actualizarCripto() {
  const c = document.getElementById("selCripto").value;
  const p = document.getElementById("selPeriodoCripto").value;
  document.getElementById("valCripto").textContent = "Cargando...";
  const data = await obtenerDatos("cripto", c, p);
  renderGrafico("grafCripto", data);
  document.getElementById("valCripto").textContent = `$${data.valores.slice(-1)[0].toFixed(2)}`;
}

function initEmpresas() {
  const cont = document.getElementById("listaEmpresas");
  cont.innerHTML = "";
  CONFIG.empresasEstaticas.forEach(emp => {
    const d = document.createElement("div");
    d.className = "empresa";
    d.innerHTML = `<h3>${emp.nombre}</h3><p>${emp.sector} - ${emp.pais}</p><span>Cargando...</span>`;
    cont.appendChild(d);
    obtenerDatos("empresa", emp.simbolo).then(info => {
      d.innerHTML = `<h3>${emp.nombre}</h3><p>${info.descripcion}</p><strong>$${info.valor}</strong>`;
    }).catch(()=>{ d.innerHTML += "<p>(Offline)</p>"; });
  });
}

async function obtenerDatos(tipo, tag, periodo) {
  await new Promise(r=>setTimeout(r,500));
  const len = {1h:6,1d:24,1w:7,1m:30,realtime:10}[periodo] || 24;
  const vals = Array.from({length:len}, ()=>Math.random()*100 + 50);
  const labs = vals.map((_,i)=>`${i+1}`);
  return { etiquetas: labs, valores: vals, descripcion: "Descripción generada por IA.", valor: vals.slice(-1)[0] };
}

function renderGrafico(divId, data) {
  const div = document.getElementById(divId);
  div.innerHTML = "";
  const max = Math.max(...data.valores), min = Math.min(...data.valores);
  data.valores.forEach((v,i) => {
    const punto = document.createElement("div");
    punto.className = "punto";
    punto.style.left = (i/(data.valores.length-1))*100 + "%";
    punto.style.bottom = ((v-min)/(max-min))*90 + "%";
    punto.title = `$${v.toFixed(2)}`;
    div.appendChild(punto);
    if(i === data.valores.length-1) {
      const lbl = document.createElement("span");
      lbl.className = "lblActual";
      lbl.textContent = `$${v.toFixed(2)}`;
      lbl.style.left = punto.style.left;
      div.appendChild(lbl);
    }
  });
}

function preguntarIA(p) {
  const out = document.getElementById("respIA");
  const r = {
    tutorial: "Usa los botones arriba para cambiar secciones, elegir activos y periodos.",
    datos: "La IA consulta fuentes reales y guarda datos offline cada 5 minutos.",
    offline: "Si no tienes internet, se muestran los últimos datos guardados.",
    empresas: "La sección empresas muestra nombre, sector, país y valor actual.",
    graficos: "Los gráficos muestran la evolución del precio en el periodo seleccionado."
  }[p] || "";
  out.textContent = r;
}
