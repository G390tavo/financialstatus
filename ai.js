// ai.js

document.addEventListener("DOMContentLoaded", () => {
  const preguntaSelect = document.getElementById("pregunta-ia");
  const respuestaDiv = document.getElementById("respuesta-ia");
  const cargando = document.getElementById("ia-cargando");

  function mostrarRespuesta(texto) {
    cargando.style.display = "none";
    respuestaDiv.innerHTML = `<p>${texto}</p>`;
  }

  function mostrarErrorIA() {
    cargando.style.display = "none";
    respuestaDiv.innerHTML = `<p>No se pudo interpretar respuesta o conectar.</p>`;
  }

  async function procesarPregunta(valor) {
    cargando.style.display = "block";
    respuestaDiv.innerHTML = "";

    try {
      if (valor === "explicacionApp") {
        mostrarRespuesta("Esta app te permite consultar valores reales de criptomonedas, monedas internacionales y empresas, con gráficos automáticos y ayuda de IA.");
      } else if (valor === "explicacionCripto") {
        mostrarRespuesta("Una criptomoneda es un activo digital que utiliza criptografía para asegurar sus transacciones.");
      } else {
        const textoBusqueda = {
          precioBitcoin: "precio del bitcoin hoy",
          precioDolar: "precio del dólar hoy",
          graficoAmazon: "acciones de Amazon hoy"
        }[valor];

        const resultado = await fetchHTML(textoBusqueda);
        if (!resultado || resultado === "") {
          mostrarErrorIA();
          return;
        }

        mostrarRespuesta(`Resultado obtenido: ${resultado}`);
        // Aquí puedes insertar la función de graficar si aplica.
      }
    } catch (e) {
      console.error(e);
      mostrarErrorIA();
    }
  }

  // Cargar preguntas en el select
  PREGUNTAS_IA.forEach(p => {
    const option = document.createElement("option");
    option.value = p.accion;
    option.textContent = p.texto;
    preguntaSelect.appendChild(option);
  });

  // Evento al seleccionar pregunta
  preguntaSelect.addEventListener("change", () => {
    const accion = preguntaSelect.value;
    if (accion) {
      procesarPregunta(accion);
    }
  });
});
