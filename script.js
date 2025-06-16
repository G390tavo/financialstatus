document.getElementById("toggleSidebar").addEventListener("click", () => {
  document.querySelector("aside").classList.toggle("open");
});

const secciones = document.querySelectorAll(".seccion");
document.querySelectorAll("aside nav button").forEach(btn => {
  btn.addEventListener("click", () => {
    const id = btn.dataset.seccion;
    secciones.forEach(s => s.classList.remove("activa"));
    document.getElementById(id).classList.add("activa");
  });
});

document.getElementById("btnDark").addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

window.addEventListener("load", async () => {
  const monedas = await utils.obtenerMonedas();
  const criptos = await obtenerCriptos();
  llenarSelect("selectMoneda", monedas);
  llenarSelect("selectCripto", criptos);
});

function llenarSelect(id, items) {
  const select = document.getElementById(id);
  select.innerHTML = "";
  items.forEach(i => {
    const opt = document.createElement("option");
    opt.value = i;
    opt.textContent = i;
    select.appendChild(opt);
  });
}

// IA
import { FinancialAI } from "./ai.js";
const IA = new FinancialAI();

document.querySelectorAll(".iaPrompt").forEach(btn => {
  btn.addEventListener("click", async () => {
    const pregunta = btn.textContent;
    document.getElementById("iaRespuesta").textContent = "Buscando respuesta...";
    const respuesta = await IA.responder(pregunta);
    document.getElementById("iaRespuesta").textContent = respuesta;
  });
});
