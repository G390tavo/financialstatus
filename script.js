document.addEventListener("DOMContentLoaded", () => {
  const botones = {
    inicio: document.getElementById("btn-inicio"),
    moneda: document.getElementById("btn-moneda"),
    cripto: document.getElementById("btn-cripto"),
    empresas: document.getElementById("btn-empresas"),
    ia: document.getElementById("btn-ia"),
  };

  const secciones = {
    inicio: document.getElementById("inicio"),
    monedas: document.getElementById("monedas"),
    criptos: document.getElementById("criptos"),
    empresas: document.getElementById("empresas"),
    ia: document.getElementById("ia"),
  };

  const mostrarSeccion = (id) => {
    for (let key in secciones) {
      secciones[key].classList.add("hidden");
    }
    secciones[id].classList.remove("hidden");
  };

  botones.inicio.addEventListener("click", () => mostrarSeccion("inicio"));
  botones.moneda.addEventListener("click", () => mostrarSeccion("monedas"));
  botones.cripto.addEventListener("click", () => mostrarSeccion("criptos"));
  botones.empresas.addEventListener("click", () => mostrarSeccion("empresas"));
  botones.ia.addEventListener("click", () => mostrarSeccion("ia"));

  mostrarSeccion("inicio");

  document.getElementById("toggle-dark").addEventListener("click", () => {
    document.body.classList.toggle("dark");
  });
});
