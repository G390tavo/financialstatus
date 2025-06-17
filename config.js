const CONFIG = {
  monedasAPI: 'https://api.exchangerate.host/latest?base=USD',
  criptosAPI: 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false',
  empresaAPI: 'https://financialmodelingprep.com/api/v3/stock/list?apikey=demo', // puedes cambiar 'demo' por una clave propia opcional
  tiempoDatos: 5 * 60 * 1000, // 5 minutos para cache temporal
};
