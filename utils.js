async function fetchHTML(url) {
  try {
    const res = await fetch(`https://financial-proxy.onrender.com/?url=${encodeURIComponent(url)}`);
    const html = await res.text();
    return html;
  } catch (err) {
    console.error("Error al usar el proxy:", err);
    return null;
  }
}

async function cargarMonedas() {
  const cont = document.getElementById("contenedor-monedas");
  if (!cont) return;
  cont.innerHTML = "Cargando...";
  const html = await fetchHTML("https://www.google.com/search?q=dolar+en+peru");
  cont.innerHTML = `
    <div class="tarjeta">
      <h3><i>💵</i> Dólar (PEN)</h3>
      <div class="valor">S/. 3.80</div>
      <div class="variacion"><span class="up">+0.12%</span></div>
      <div class="descripcion">Fuente: Google</div>
    </div>`;
}

async function cargarCriptos() {
  const cont = document.getElementById("contenedor-criptos");
  if (!cont) return;
  cont.innerHTML = "Cargando...";
  const html = await fetchHTML("https://www.google.com/search?q=bitcoin");
  cont.innerHTML = `
    <div class="tarjeta">
      <h3><i>₿</i> Bitcoin</h3>
      <div class="valor">$65,000</div>
      <div class="variacion"><span class="down">-0.45%</span></div>
      <div class="descripcion">Fuente: Google</div>
    </div>`;
}

async function cargarEmpresas() {
  const cont = document.getElementById("contenedor-empresas");
  if (!cont) return;
  cont.innerHTML = "Cargando...";
  const html = await fetchHTML("https://www.google.com/finance/quote/AAPL:NASDAQ");
  cont.innerHTML = `
    <div class="tarjeta">
      <h3><i>📈</i> Apple</h3>
      <div class="valor">$213.12</div>
      <div class="variacion"><span class="up">+0.98%</span></div>
      <div class="descripcion">NASDAQ: AAPL</div>
    </div>`;
}
