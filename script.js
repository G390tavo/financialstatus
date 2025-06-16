document.addEventListener("DOMContentLoaded", async () => {
  await cargarMonedas();
  await cargarCriptos();
  await cargarEmpresas();
});

async function cargarMonedas() {
  try {
    const monedas = await obtenerMonedas();
    mostrarLista("listaMonedas", monedas);
  } catch (e) {
    console.error("Error cargando monedas:", e);
  }
}

async function cargarCriptos() {
  try {
    const criptos = await obtenerCriptos();
    mostrarLista("listaCriptos", criptos);
  } catch (e) {
    console.error("Error cargando criptos:", e);
  }
}

function mostrarLista(id, lista) {
  const contenedor = document.getElementById(id);
  if (!contenedor) return;
  contenedor.innerHTML = "";
  lista.slice(0, 10).forEach(nombre => {
    const div = document.createElement("div");
    div.textContent = nombre;
    contenedor.appendChild(div);
  });
}

function alternarModoOscuro() {
  document.body.classList.toggle("dark");
}

function cambiarTiempo(periodo) {
  const grafico = document.getElementById("graficoRenderizado");
  if (!grafico) return;
  grafico.innerHTML = `Cargando gráfico para el periodo: ${periodo}...`;
  setTimeout(() => {
    grafico.innerHTML = `Gráfico simulado de ${periodo} cargado (IA en desarrollo).`;
    document.getElementById("infoValorActual").textContent = `Valor actual: $${(
      Math.random() * 1000
    ).toFixed(2)}`;
  }, 800);
}

async function cargarEmpresas() {
  const empresas = [
    {
      nombre: "Tesla",
      descripcion: "Empresa de automóviles eléctricos y energía.",
      valor: "$235.50"
    },
    {
      nombre: "Apple",
      descripcion: "Tecnología y productos electrónicos.",
      valor: "$188.30"
    },
    {
      nombre: "Google",
      descripcion: "Servicios de búsqueda y publicidad.",
      valor: "$2750.10"
    }
  ];

  const contenedor = document.getElementById("listaEmpresas");
  if (!contenedor) return;

  contenedor.innerHTML = "";
  empresas.forEach(emp => {
    const card = document.createElement("div");
    card.className = "empresa";
    card.innerHTML = `
      <h3>${emp.nombre}</h3>
      <p>${emp.descripcion}</p>
      <strong>Valor actual: ${emp.valor}</strong>
    `;
    contenedor.appendChild(card);
  });
}

function preguntarIA(pregunta) {
  const respuesta = document.getElementById("respuestaIA");
  const respuestas = {
    tutorial: "Haz clic en las monedas, criptos o empresas y cambia el tiempo del gráfico arriba.",
    monedas: "Las monedas provienen de ExchangeRate.host con datos reales.",
    empresas: "Las empresas incluyen nombre, valor y sector. Pronto estarán en tiempo real.",
    fuente: "Los datos provienen de fuentes reales. La IA pronto mejorará su calidad.",
    graficos: "Los gráficos son simulados pero se actualizarán con IA en tiempo real."
  };
  respuesta.textContent = respuestas[pregunta] || "La IA aún no tiene una respuesta precisa.";
}
