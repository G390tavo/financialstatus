async function obtenerHTML(url) {
  try {
    const respuesta = await fetch(url);
    if (!respuesta.ok) throw new Error("No se pudo cargar la página.");
    const texto = await respuesta.text();
    const parser = new DOMParser();
    return parser.parseFromString(texto, "text/html");
  } catch (error) {
    console.error("Error al obtener HTML:", error);
    return null;
  }
}

function crearTarjeta(nombre, valor, variacion, descripcion, onClick) {
  const tarjeta = document.createElement("div");
  tarjeta.className = "tarjeta";
  tarjeta.innerHTML = `
    <h3>${nombre}</h3>
    <div class="valor">${valor}</div>
    <div class="variacion">${variacion}</div>
    <div class="descripcion">${descripcion}</div>
  `;
  tarjeta.addEventListener("click", onClick);
  return tarjeta;
}

function limpiarContenedor(selector) {
  const contenedor = document.querySelector(selector);
  if (contenedor) contenedor.innerHTML = "";
}
