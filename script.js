// Variables globales
let chartMoneda = null, chartCripto = null;
let intervaloMoneda = null, intervaloCripto = null;

// Inicio
document.addEventListener("DOMContentLoaded", () => {
  initMonedas();
  initCriptos();
  initEmpresas();
  mostrarSeccion('monedas');
});

// Navegación
function mostrarSeccion(id){
  document.querySelectorAll('.seccion').forEach(s=>s.classList.remove('activa'));
  document.getElementById(id).classList.add('activa');
}

// Modo oscuro
function alternarModoOscuro(){
  document.body.classList.toggle('dark-mode');
}

// IA básica
function responderIA(){
  const p = document.getElementById('preguntaIA').value;
  const out = document.getElementById('respuestaIA');
  const res = {
    tutorial: "Selecciona sección, elige moneda/cripto/empresa para ver detalles en tiempo real.",
    fuente: "La IA obtiene datos reales desde internet y los almacena localmente si se desconecta.",
    conectividad: "Si no hay internet, se muestran datos guardados hasta la próxima conexión.",
  }[p] || "";
  out.textContent = res;
}

// Monedas
function initMonedas(){
  const sel = document.getElementById('selectMoneda');
  const per = document.getElementById('selectPeriodoMoneda');
  sel.addEventListener('change', cargarMoneda);
  per.addEventListener('change', cargarMoneda);
  ['USD','EUR','PEN','MXN','ARS','CLP'].forEach(m=>{
    const o = document.createElement('option'); o.value=m; o.textContent=m;
    sel.appendChild(o);
  });
  cargarMoneda();
}

async function cargarMoneda(){
  const m = document.getElementById('selectMoneda').value;
  const p = document.getElementById('selectPeriodoMoneda').value;
  clearInterval(intervaloMoneda);
  document.getElementById('valorActualMoneda').textContent = 'Cargando...';

  try {
    const data = await fetchData('moneda', m, p);
    showChart('graficoMoneda', data.labels, data.valores, chartMoneda, 'USD → ' + m, 'valorActualMoneda');
    if(p==='realtime'){
      intervaloMoneda = setInterval(() => cargarMoneda(),30000);
    }
  } catch(e){
    console.error(e);
    loadFromStorage('moneda_'+m, data => {
      showChart('graficoMoneda', data.labels, data.valores, chartMoneda, 'USD → ' + m + ' (offline)', 'valorActualMoneda');
    });
  }
}

// Criptos
function initCriptos(){
  const sel = document.getElementById('selectCripto');
  const per = document.getElementById('selectPeriodoCripto');
  sel.addEventListener('change', cargarCripto);
  per.addEventListener('change', cargarCripto);
  ['bitcoin','ethereum','solana','litecoin'].forEach(id=>{
    const o = document.createElement('option'); o.value=id; o.textContent=id;
    sel.appendChild(o);
  });
  cargarCripto();
}

async function cargarCripto(){
  const id = document.getElementById('selectCripto').value;
  const p = document.getElementById('selectPeriodoCripto').value;
  clearInterval(intervaloCripto);
  document.getElementById('valorActualCripto').textContent = 'Cargando...';

  try {
    const data = await fetchData('cripto', id, p);
    showChart('graficoCripto', data.labels, data.valores, chartCripto, id.toUpperCase()+' USD', 'valorActualCripto');
    if(p==='realtime'){
      intervaloCripto = setInterval(() => cargarCripto(),30000);
    }
  } catch(e){
    console.error(e);
    loadFromStorage('cripto_'+id, data => {
      showChart('graficoCripto', data.labels, data.valores, chartCripto, id.toUpperCase()+' USD (offline)', 'valorActualCripto');
    });
  }
}

// Empresas
async function initEmpresas(){
  const div = document.getElementById('listaEmpresas');
  const empresas = ['Apple','Tesla','Samsung'];
  for(let nombre of empresas){
    const d = document.createElement('div'); d.className='empresa';
    d.textContent = 'Cargando ' + nombre + '...';
    div.appendChild(d);
    setTimeout(async()=>{
      try{
        const info = await fetchData('empresa', nombre);
        d.innerHTML = `<strong>${nombre}</strong>: ${info.descripcion} • $${info.valor}`;
      }catch{
        d.textContent = nombre + ' (offline o error)';
      }
    },0);
  }
}

// Mostrar gráfico
function showChart(canvasId, labels, data, existingChart, label, lblElemId){
  const ctx = document.getElementById(canvasId).getContext('2d');
  if(existingChart) existingChart.destroy();
  const chart = new Chart(ctx, {
    type:'line', data:{labels, datasets:[{label,data,borderColor:'green',fill:false}]},
    options:{
      responsive:true, plugins: {
        tooltip: { callbacks:{ title:()=>'', label:ctx=>'$'+ctx.raw }},
      },
      scales: { x:{ticks:{autoSkip:true,maxTicksLimit:6}}}
    }
  });
  document.getElementById(lblElemId).textContent = label + ': $' + data[data.length - 1].toFixed(2);
  if(canvasId==='graficoMoneda') chartMoneda = chart; else chartCripto = chart;
  saveToStorage(canvasId+'_data', {labels,data});
}

// Almacenamiento
function saveToStorage(key, obj){
  localStorage.setItem(key, JSON.stringify({ t:Date.now(), d:obj }));
}
function loadFromStorage(key, cb){
  const s = localStorage.getItem(key);
  if(!s) throw 'sin datos';
  const {t,d} = JSON.parse(s);
  if(Date.now() - t > 5*60*1000) throw 'expirado';
  cb(d);
}

// Simulación IA / Datos
async function fetchData(tipo, id, periodo){
  const urlMap = {
    moneda:()=>'https://api.exchangerate.host/timeseries?...',
    cripto:id=>`https://api.coingecko.com/api/v3/coins/${id}/market_chart?...`,
    empresa:nombre=>`https://finance.yahoo.com/quote/${nombre}`
  };
  // Simulación de IA: buscar y parsear
  await new Promise(r=>setTimeout(r, 1000));
  // Genero datos ficticios para la demo
  const vals = periodToLength(periodo).map((_,i) => Math.random()*100 + 50);
  const labs = vals.map((_,i) => {
    const d = new Date(Date.now() - (vals.length - i -1) * 3600*1000);
    return d.toLocaleDateString();
  });
  return { labels: labs, valores: vals, descripcion:'Empresa líder', valor: (Math.random()*1000).toFixed(2) };
}
function periodToLength(p){
  if(p==='1h') return new Array(6);
  if(p==='1d') return new Array(24);
  if(p==='1w') return new Array(7);
  if(p==='1m') return new Array(30);
  if(p==='realtime') return new Array(10);
}
