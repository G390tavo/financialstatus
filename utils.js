async function fetchHTML(url) {
  try {
    const res = await fetch(`http://localhost:3000/fetch?url=${encodeURIComponent(url)}`);
    return await res.text();
  } catch (err) {
    console.error("Error en fetchHTML:", err);
    return null;
  }
}

function crearElemento(tag, clase = "", texto = "") {
  const el = document.createElement(tag);
  if (clase) el.className = clase;
  if (texto) el.textContent = texto;
  return el;
}

function mostrarError(mensaje, contenedor) {
  contenedor.innerHTML = `<div class="error">${mensaje}</div>`;
}

function crearTarjeta(item, tipo) {
  const tarjeta = document.createElement("div");
  tarjeta.className = "tarjeta";

  const nombre = crearElemento("h3", "nombre", item.nombre);
  const descripcion = crearElemento("p", "descripcion", item.descripcion || "");
  const valor = crearElemento("div", "valor", "Cargando...");
  const variacion = crearElemento("div", "variacion", "");

  tarjeta.append(nombre, descripcion, valor, variacion);
  return tarjeta;
}
