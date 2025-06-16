class FinancialAI {
  constructor() {
    this.historial = [];
    this.cache = JSON.parse(sessionStorage.getItem('AI_CACHE')||'{}');
    this.cacheTime = parseInt(localStorage.getItem('AI_CACHE_TIME'))||0;
    this.cacheTTL = 5*60*1000;
    this.updateCacheStorage();
    this.setupTerminal();
    document.getElementById('iaEnviar').addEventListener('click', ()=>this.handle(this.getIAInput()));
  }

  getIAInput() {
    const v = document.getElementById('iaInput').value;
    document.getElementById('iaInput').value='';
    return v.trim();
  }

  async handle(msg) {
    if (!msg) return;
    this.logTerminal(`> ${msg}`);
    const resp = await this.respond(msg);
    this.logTerminal(resp);
    this.showIA(resp);
  }

  logTerminal(text){
    const t = document.getElementById('terminal');
    t.innerText += text+"\n";
    t.scrollTop = t.scrollHeight;
  }

  showIA(text){
    document.getElementById('respIA').innerText = text;
  }

  async respond(q){
    const now = Date.now();
    if (now - this.cacheTime < this.cacheTTL && this.cache[q]) return this.cache[q];
    let r = await this._process(q);
    this.cache[q]=r; this.cacheTime=now; this.updateCacheStorage();
    return r;
  }

  updateCacheStorage(){
    sessionStorage.setItem('AI_CACHE',JSON.stringify(this.cache));
    localStorage.setItem('AI_CACHE_TIME',this.cacheTime);
  }

  async _process(q){
    const p=q.toLowerCase();
    if (p.startsWith('mostrar ')) return this._commandNavigate(p.replace('mostrar ',''));
    if (p.startsWith('grafico ')) return this._commandGraph(p);
    return await this._qLogic(p);
  }

  async _commandNavigate(sec){
    const s = document.getElementById(sec);
    if(s) { document.querySelectorAll('.seccion').forEach(x=>x.classList.remove('activa'));
      s.classList.add('activa');
      return `Sección "${sec}" mostrada.`;
    } else return `Sección "${sec}" no encontrada.`;
  }

  async _commandGraph(q){
    const parts = q.replace('grafico ','').split(' ');
    const id = parts[0], per=parts[1]||'1d';
    const fn = id.length<=3 ? 'moneda':'cripto';
    await window[`actualizar${fn.charAt(0).toUpperCase()+fn.slice(1)}`](id,per);
    return `Gráfico para ${id.toUpperCase()} en periodo ${per} generado.`;
  }

  async _qLogic(q){
    const cod = ['usd','eur','btc','eth'];
    for(const c of cod) if(q.includes(c)) return FSM[c];
    if(q.includes('acción')) return FSM['acción'];
    if(q.includes('cripto')||q.includes('criptomoneda')) return FSM['criptomoneda'];
    return "No puedo procesar esa consulta. Usa 'mostrar sección' o 'grafico ID periodo'.";
  }
}

const FSM = {
  usd:"USD es la moneda oficial de EE.UU., reserva global.",
  eur:"EUR es moneda de la Eurozona.",
  btc:"Bitcoin es criptomoneda descentralizada basada en blockchain.",
  eth:"Ethereum es plataforma para contratos inteligentes y DApps.",
  'acción':"Una acción representa parte del capital de una empresa.",
  'criptomoneda':"Una criptomoneda es activo digital basado en criptografía."
};

function setupGlobal() {
  const AI = new FinancialAI();
  // Reemplaza funciones para que puedan ser llamadas desde IA
  window.actualizarMoneda = async (id, per) => {
    document.getElementById('selMoneda').value = id.toUpperCase();
    document.getElementById('selPeriodoMoneda').value = per;
    await actualizarMoneda();
  };
  window.actualizarCripto = async (id, per) => {
    document.getElementById('selCripto').value = id.toUpperCase();
    document.getElementById('selPeriodoCripto').value = per;
    await actualizarCripto();
  };
}

window.addEventListener('DOMContentLoaded',setupGlobal);
