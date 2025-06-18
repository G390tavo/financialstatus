// Configuración general de la app FinancialStatus

const API_CONFIG = {
  monedas: 'https://api.exchangerate-api.com/v4/latest/USD',
  criptos: 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd',
  empresas: [
    { nombre: "Apple", ticker: "AAPL" },
    { nombre: "Microsoft", ticker: "MSFT" },
    { nombre: "Amazon", ticker: "AMZN" },
    { nombre: "Tesla", ticker: "TSLA" },
    { nombre: "Google", ticker: "GOOGL" },
    { nombre: "Meta", ticker: "META" },
    { nombre: "NVIDIA", ticker: "NVDA" },
    { nombre: "Netflix", ticker: "NFLX" },
    { nombre: "AMD", ticker: "AMD" },
    { nombre: "Intel", ticker: "INTC" }
  ]
};

const FETCH_TIMEOUT = 5000; // 5 segundos para considerar datos offline
