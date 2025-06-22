document.addEventListener('DOMContentLoaded', () => {
  const contenedorIA = document.getElementById('ia');
  if (!contenedorIA) return;

  const preguntas = [
    "¿Qué es una criptomoneda?",
    "¿Cómo se mide la inflación?",
    "¿Qué es el tipo de cambio?",
    "¿Qué factores afectan a una empresa?"
  ];

  const lista = document.createElement('ul');
  lista.style.marginTop = '20px';

  preguntas.forEach(p => {
    const item = document.createElement('li');
    const boton = document.createElement('button');
    boton.textContent = p;
    boton.style.marginBottom = '10px';
    boton.onclick = () => ejecutarIA(p);
    item.appendChild(boton);
    lista.appendChild(item);
  });

  contenedorIA.appendChild(lista);
});

function ejecutarIA(pregunta) {
  const respuestaCont = document.getElementById('respuesta-ia');
  const cargando = document.getElementById('ia-cargando');
  if (!respuestaCont || !cargando) return;

  cargando.textContent = "Pensando...";

  fetch('https://financial-proxy.onrender.com/?url=https://www.google.com/search?q=' + encodeURIComponent(pregunta))
    .then(res => res.text())
    .then(html => {
      cargando.textContent = "";
      const resumen = html.includes('html') ? "Respuesta obtenida de internet, basada en resultados." : "No se pudo obtener una respuesta.";
      respuestaCont.innerHTML = `<strong>${pregunta}</strong><br><br>${resumen}`;
    })
    .catch(err => {
      cargando.textContent = "";
      respuestaCont.textContent = "Error al buscar información.";
    });
}
