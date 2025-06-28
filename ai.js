import { mostrarGrafico } from './script.js';

const preguntasIA = {
  "¿Cuál es el valor actual del dólar?": async () => {
    document.querySelector("#respuesta-ia").innerText = "Consultando valor del dólar...";
    document.querySelector("#ia-cargando").style.display = "block";
    await document.querySelector("#monedas-btn").click();
    document.querySelector("#ia-cargando").style.display = "none";
    document.querySelector("#respuesta-ia").innerText = "El valor se ha cargado en la sección de monedas.";
  },
  "¿Cuánto vale el Bitcoin hoy?": async () => {
    document.querySelector("#respuesta-ia").innerText = "Buscando información de Bitcoin...";
    document.querySelector("#ia-cargando").style.display = "block";
    await document.querySelector("#criptos-btn").click();
    document.querySelector("#ia-cargando").style.display = "none";
    document.querySelector("#respuesta-ia").innerText = "Consulta cargada en Criptomonedas.";
  },
  "¿Cuál es la empresa más valiosa actualmente?": async () => {
    document.querySelector("#respuesta-ia").innerText = "Verificando datos de empresas...";
    document.querySelector("#ia-cargando").style.display = "block";
    await document.querySelector("#empresas-btn").click();
    document.querySelector("#ia-cargando").style.display = "none";
    document.querySelector("#respuesta-ia").innerText = "Consulta cargada en Empresas.";
  },
  "¿Cómo funciona esta aplicación?": () => {
    document.querySelector("#respuesta-ia").innerText = 
      "Esta aplicación obtiene datos reales desde internet sobre criptomonedas, monedas y empresas. Si encuentra datos históricos, los grafica automáticamente. También puedes preguntarle a la IA para ayudarte a navegar y entender los resultados.";
  },
  "¿Qué hace la IA en esta app?": () => {
    document.querySelector("#respuesta-ia").innerText = 
      "La IA te ayuda a entender cómo usar la aplicación, encontrar datos financieros relevantes y visualizar gráficos cuando estén disponibles. También detecta errores o faltas de conexión.";
  },
  "¿Por qué algunos datos no cargan?": () => {
    document.querySelector("#respuesta-ia").innerText = 
      "Los datos se obtienen de internet. Si las fuentes fallan o no se puede acceder, se mostrará un mensaje indicando que no hay historial o que el valor no está disponible temporalmente.";
  },
};

document.getElementById("pregunta-ia").addEventListener("change", (e) => {
  const pregunta = e.target.value;
  if (preguntasIA[pregunta]) {
    preguntasIA[pregunta]();
  } else {
    document.querySelector("#respuesta-ia").innerText = 
      "Lo siento, esa pregunta aún no está disponible.";
  }
});
