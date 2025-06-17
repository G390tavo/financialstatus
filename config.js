const CONFIG = {
  monedasAPI: "https://api.exchangerate.host/latest?base=USD",
  criptosAPI: "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1",
  empresasAPI: "https://example.com/empresas.json", // Futuro
  tiempoDatos: 5 * 60 * 1000, // 5 minutos
  mensajesIA: [
    {
      pregunta: "¿Cómo usar la aplicación?",
      respuesta: `Puedes seleccionar monedas, criptomonedas o empresas desde los menús para ver sus gráficos y datos actualizados. 
      También puedes activar el modo oscuro o consultar a la IA desde la sección de preguntas.`
    },
    {
      pregunta: "¿Qué es esta aplicación?",
      respuesta: `Es una plataforma de visualización de datos financieros que usa una IA integrada para ayudarte a entender información económica en tiempo real.`
    },
    {
      pregunta: "¿Qué significa cada gráfico?",
      respuesta: `Los gráficos muestran el valor en el tiempo de una moneda, criptomoneda o empresa. Al colocar el cursor sobre los puntos, verás el valor específico.`
    },
    {
      pregunta: "¿Para qué sirve el modo oscuro?",
      respuesta: `El modo oscuro reduce la fatiga visual y es útil en ambientes con poca luz. Puedes activarlo desde el botón de configuración.`
    },
    {
      pregunta: "¿Por qué no carga la información?",
      respuesta: `Verifica tu conexión a internet. Si estás offline, se mostrará la última información descargada durante los últimos 5 minutos.`
    }
  ]
};
