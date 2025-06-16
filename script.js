let monedas = {};
let criptos = [];
let chartMoneda, chartCripto;

const IA = {
  ayuda: {
    "¿Cómo usar la app?": "Selecciona una sección del menú: Empresas, Monedas o Criptomonedas. Luego interactúa con las listas desplegables o gráficas para obtener más información.",
    "¿Qué hace esta IA?": "Esta IA secundaria te brinda ayuda básica y obtiene datos en caso de que las APIs no funcionen.",
    "¿Qué es una criptomoneda?": "Una criptomoneda es un activo digital que usa criptografía para asegurar transacciones y operar de forma descentralizada.",
    "¿Qué pasa si estoy sin internet?": "La app guarda los últimos datos cargados y puede mostrarlos en modo offline."
  },
  responder(pregunta) {
    return this.ayuda[pregunta] || "No tengo una respuesta programada para eso aún.";
  }
};

async function obtenerMonedas() {
  try {
    const res = await fetch("https://api.exchangerate.host/latest?base=USD");
    const data = await res.json();
    localStorage.setItem("monedas", JSON.stringify(data.rates));
    return data.rates;
  } catch {
    console.warn("Usando datos de respaldo para monedas.");
    return JSON.parse(localStorage.getItem("monedas")) || {};
  }
}

async function obtenerCriptos() {
  try {
    const res = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd");
    const data = await res.json();
    localStorage.setItem("criptos", JSON.stringify(data));
    return data;
  } catch {
    console.warn("Usando datos de respaldo para criptomonedas.");
    return JSON.parse(localStorage.getItem("criptos")) || [];
  }
}

async function obtenerEmpresaInfo(nombre) {
  const data = {
    Apple: { nombre: "Apple", descripcion: "Empresa tecnológica líder en hardware y software.", sector: "Tecnología", pais: "EE.UU.", valorActual: "$607.15" },
    Google: { nombre: "Google", descripcion: "Multinacional de servicios de internet y software.", sector: "Tecnología", pais: "EE.UU.", valorActual: "$142.87" },
    Amazon: { nombre: "Amazon", descripcion: "Empresa de comercio electrónico y servicios en la nube.", sector: "Consumo", pais: "EE.UU.", valorActual: "$187.45" },
    Tesla: { nombre: "Tesla", descripcion: "Fabricante de vehículos eléctricos y soluciones energéticas.", sector: "Automotriz", pais: "EE.UU.", valorActual: "$254.32" },
    Microsoft: { nombre: "Microsoft", descripcion: "Desarrollador líder en software y servicios digitales.", sector: "Tecnología", pais: "EE.UU.", valorActual: "$399.50" },
    Meta: { nombre: "Meta", descripcion: "Empresa matriz de Facebook e Instagram.", sector: "Redes sociales", pais: "EE.UU.", valorActual: "$342.87" },
    Samsung: { nombre: "Samsung", descripcion: "Gigante surcoreano de electrónica y tecnología.", sector: "Tecnología", pais: "Corea del Sur", valorActual: "$72.19" },
    Intel: { nombre: "Intel", descripcion: "Diseñador y fabricante de procesadores globales.", sector: "Tecnología", pais: "EE.UU.", valorActual: "$41.32" },
    IBM: { nombre: "IBM", descripcion: "Empresa centenaria en soluciones tecnológicas y de datos.", sector: "Tecnología", pais: "EE.UU.", valorActual: "$170.10" },
    Nvidia: { nombre: "Nvidia", descripcion: "Líder en diseño de GPU y soluciones de IA.", sector: "Tecnología", pais: "EE.UU.", valorActual: "$1298.44" }
  };
  return data[nombre] || {};
}

async function cargarEmpresas() {
  const empresas = ["Apple", "Google", "Amazon", "Tesla", "Microsoft", "Meta", "Samsung", "Intel", "IBM", "Nvidia"];
  const contenedor = document.getElementById("listaEmpresas");
  contenedor.innerHTML = "";
  for (let nombre of empresas) {
    const info = await obtenerEmpresaInfo(nombre);
    const div = document.createElement("div");
    div.className = "empresa";
    div.innerHTML = `
      <h3>${info.nombre}</h3>
      <p>${info.descripcion}</p>
      <small>Sector: ${info.sector} | País: ${info.pais}</small><br>
      <strong>Valor actual: ${info.valorActual}</strong>
    `;
    contenedor.appendChild(div);
  }
}

async function cargarMonedas() {
  monedas = await obtenerMonedas();
  const selector = document.getElementById("selectorMoneda");
  selector.innerHTML = "";
  Object.keys(monedas).forEach(moneda => {
    const option = document.createElement("option");
    option.value = moneda;
    option.textContent = moneda;
    selector.appendChild(option);
  });
  actualizarGraficoMoneda();
}

async function cargarCriptos() {
  criptos = await obtenerCriptos();
  const selector = document.getElementById("selectorCripto");
  selector.innerHTML = "";
  criptos.forEach(c => {
    const option = document.createElement("option");
    option.value = c.id;
    option.textContent = c.name;
    selector.appendChild(option);
  });
  actualizarGraficoCripto();
}

function generarEtiquetasDias(dias) {
  const hoy = new Date();
  return Array.from({ length: dias }, (_, i) => {
    const fecha = new Date(hoy);
    fecha.setDate(hoy.getDate() - (dias - i - 1));
    return fecha.toISOString().split("T")[0];
  });
}

function simularVariacion(base, dias) {
  return Array.from({ length: dias }, () =>
    (base * (0.95 + Math.random() * 0.1)).toFixed(2)
  );
}

function actualizarGraficoMoneda() {
  const moneda = document.getElementById("selectorMoneda").value;
  const periodo = document.getElementById("selectorTiempoMoneda").value;
  const valor = monedas[moneda];
  if (!valor) return;

  if (chartMoneda) chartMoneda.destroy();
  const ctx = document.getElementById("graficoMoneda").getContext("2d");

  if (periodo === "real") {
    chartMoneda = new Chart(ctx, {
      type: "line",
      data: {
        labels: ["Ahora"],
        datasets: [{
          label: `1 USD = ${moneda}`,
          data: [valor],
          borderColor: "green",
          fill: false
        }]
      },
      options: {
        responsive: true,
        plugins: {
          tooltip: {
            callbacks: {
              label: ctx => `${ctx.dataset.label}: ${ctx.raw}`
            }
          }
        },
        scales: {
          y: { beginAtZero: false }
        }
      }
    });
  } else {
    const dias = 10;
    chartMoneda = new Chart(ctx, {
      type: "line",
      data: {
        labels: generarEtiquetasDias(dias),
        datasets: [{
          label: `1 USD = ${moneda}`,
          data: simularVariacion(valor, dias),
          borderColor: "green",
          fill: false
        }]
      },
      options: {
        responsive: true,
        plugins: {
          tooltip: {
            callbacks: {
              label: ctx => `${ctx.label}: ${ctx.raw}`
            }
          }
        }
      }
    });
  }
}

function actualizarGraficoCripto() {
  const criptoId = document.getElementById("selectorCripto").value;
  const periodo = document.getElementById("selectorTiempoCripto").value;
  const cripto = criptos.find(c => c.id === criptoId);
  if (!cripto) return;

  if (chartCripto) chartCripto.destroy();
  const ctx = document.getElementById("graficoCripto").getContext("2d");

  if (periodo === "real") {
    chartCripto = new Chart(ctx, {
      type: "line",
      data: {
        labels: ["Ahora"],
        datasets: [{
          label: `${cripto.name} (USD)`,
          data: [cripto.current_price],
          borderColor: "#ff9800",
          fill: false
        }]
      },
      options: {
        responsive: true,
        plugins: {
          tooltip: {
            callbacks: {
              label: ctx => `${ctx.dataset.label}: $${ctx.raw}`
            }
          }
        }
      }
    });
  } else {
    const dias = 10;
    chartCripto = new Chart(ctx, {
      type: "line",
      data: {
        labels: generarEtiquetasDias(dias),
        datasets: [{
          label: `${cripto.name} (USD)`,
          data: simularVariacion(cripto.current_price, dias),
          borderColor: "#ff9800",
          fill: false
        }]
      },
      options: {
        responsive: true,
        plugins: {
          tooltip: {
            callbacks: {
              label: ctx => `${ctx.label}: $${ctx.raw}`
            }
          }
        }
      }
    });
  }
}

function mostrarVista(id) {
  document.querySelectorAll(".seccion").forEach(s => s.style.display = "none");
  const seccion = document.getElementById(id);
  if (seccion) seccion.style.display = "block";
}

document.getElementById("modoOscuro").addEventListener("change", (e) => {
  const oscuro = e.target.checked;
  document.body.classList.toggle("dark", oscuro);
});

document.addEventListener("DOMContentLoaded", async () => {
  setTimeout(() => document.getElementById("loader").style.display = "none", 1000);
  mostrarVista("empresas");
  await cargarEmpresas();
  await cargarMonedas();
  await cargarCriptos();

  document.getElementById("selectorMoneda").addEventListener("change", actualizarGraficoMoneda);
  document.getElementById("selectorTiempoMoneda").addEventListener("change", actualizarGraficoMoneda);
  document.getElementById("selectorCripto").addEventListener("change", actualizarGraficoCripto);
  document.getElementById("selectorTiempoCripto").addEventListener("change", actualizarGraficoCripto);

  document.querySelectorAll("#chat button").forEach(btn => {
    btn.addEventListener("click", () => {
      const pregunta = btn.textContent;
      const respuesta = IA.responder(pregunta);
      document.getElementById("respuestaIA").textContent = respuesta;
    });
  });
});
