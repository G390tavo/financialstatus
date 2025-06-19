// config.js

const CRIPTOS = [
  { nombre: "Bitcoin", simbolo: "BTC", descripcion: "La primera criptomoneda descentralizada." },
  { nombre: "Ethereum", simbolo: "ETH", descripcion: "Criptomoneda basada en contratos inteligentes." },
  { nombre: "Tether", simbolo: "USDT", descripcion: "Stablecoin vinculada al dólar." }
];

const MONEDAS = [
  { nombre: "Dólar estadounidense", simbolo: "USD", descripcion: "Moneda oficial de EE.UU." },
  { nombre: "Euro", simbolo: "EUR", descripcion: "Moneda oficial de la zona euro." },
  { nombre: "Yen japonés", simbolo: "JPY", descripcion: "Moneda de Japón." }
];

const EMPRESAS = [
  { nombre: "Apple", simbolo: "AAPL", descripcion: "Empresa de tecnología y electrónica." },
  { nombre: "Google", simbolo: "GOOGL", descripcion: "Gigante de búsqueda y software." },
  { nombre: "Amazon", simbolo: "AMZN", descripcion: "Plataforma de comercio electrónico." },
  { nombre: "Tesla", simbolo: "TSLA", descripcion: "Fabricante de autos eléctricos." },
  { nombre: "Microsoft", simbolo: "MSFT", descripcion: "Empresa de software y servicios digitales." }
];

const PREGUNTAS_IA = [
  { texto: "¿Qué hace esta app?", accion: "explicacionApp" },
  { texto: "Precio actual de Bitcoin", accion: "precioBitcoin" },
  { texto: "¿Qué es una criptomoneda?", accion: "explicacionCripto" },
  { texto: "Precio actual del dólar", accion: "precioDolar" },
  { texto: "Gráfico de Amazon", accion: "graficoAmazon" }
];
