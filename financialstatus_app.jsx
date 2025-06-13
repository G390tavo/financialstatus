<!-- index.html -->
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>FinancialStatus</title>
  <link rel="stylesheet" href="style.css" />
</head>
<body>
  <header class="app-header">
    <h1>FinancialStatus</h1>
  </header>
  <main>
    <section>
      <h2>Empresas destacadas</h2>
      <div class="company-card">
        <h3>Apple Inc.</h3>
        <p>Diseña y fabrica productos electrónicos como el iPhone.</p>
        <p class="risk risk-bajo">Riesgo: Bajo</p>
      </div>
      <div class="company-card">
        <h3>Tesla Inc.</h3>
        <p>Fabricante de autos eléctricos y tecnologías limpias.</p>
        <p class="risk risk-alto">Riesgo: Alto</p>
      </div>
      <div class="company-card">
        <h3>Microsoft Corp.</h3>
        <p>Desarrolla software, servicios en la nube y dispositivos.</p>
        <p class="risk risk-medio">Riesgo: Medio</p>
      </div>
    </section>

    <section>
      <h2>Valores de monedas</h2>
      <p>Por ahora sin conexión a API externa. Módulo en preparación.</p>
    </section>

    <section>
      <h2>Recomendaciones de inversión (IA Gemini)</h2>
      <p>Esta sección usará tu clave de Gemini para generar sugerencias.</p>
    </section>
  </main>

  <footer class="app-footer">© 2025 FinancialStatus</footer>

  <script src="script.js"></script>
</body>
</html>

/* style.css */
body {
  font-family: Arial, sans-serif;
  margin: 0;
  background-color: white;
  color: #1B5E20;
}

.app-header {
  background-color: #A8E6A1;
  padding: 1rem;
  text-align: center;
}

.company-card {
  border: 1px solid #A8E6A1;
  padding: 1rem;
  margin: 1rem;
  border-radius: 8px;
  background: #f9fff9;
}

.risk-bajo {
  color: green;
}
.risk-medio {
  color: orange;
}
.risk-alto {
  color: red;
}

.app-footer {
  padding: 1rem;
  text-align: center;
  background-color: #A8E6A1;
  margin-top: 2rem;
}

/* script.js */
// Aquí puedes poner funciones JS más adelante si las necesitas
console.log("FinancialStatus cargado correctamente");
