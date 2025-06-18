async function preguntarIA(pregunta) {
  const respuestaElem = document.getElementById('respuesta-ia');
  respuestaElem.textContent = 'Buscando respuesta...';
  const respuesta = await obtenerInfo(pregunta);
  respuestaElem.textContent = respuesta;
}
