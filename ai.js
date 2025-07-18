const respuestasIA = {
  "¿Qué es la inflación?": "La inflación es el aumento general de los precios. Disminuye el poder adquisitivo y puede ser causada por demanda alta o costos de producción.",
  "¿Qué es el PBI?": "El Producto Bruto Interno mide el valor total de bienes y servicios producidos en un país.",
  "¿Qué es una criptomoneda?": "Es un activo digital que usa criptografía y funciona sin bancos centrales.",
  "¿Qué es el tipo de cambio?": "Es la relación entre el valor de una moneda y otra.",
  "¿Qué es una acción?": "Es una parte del capital de una empresa. Comprar acciones te convierte en copropietario."
};

function responderPregunta() {
  const input = document.getElementById("pregunta");
  const texto = input.value.trim();
  const respuesta = respuestasIA[texto] || "No tengo una respuesta directa. Intenta con otra pregunta.";
  const div = document.createElement("div");
  div.innerText = respuesta;
  document.getElementById("ia-respuestas").appendChild(div);
  input.value = "";
}
