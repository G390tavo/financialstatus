// Base local para monedas nacionales y criptos (respaldo si APIs fallan)
const monedasLocales = {
    USD: { nombre: "Dólar Estadounidense", simbolo: "$" },
    EUR: { nombre: "Euro", simbolo: "€" },
    PEN: { nombre: "Sol Peruano", simbolo: "S/" },
    MXN: { nombre: "Peso Mexicano", simbolo: "$" },
    JPY: { nombre: "Yen Japonés", simbolo: "¥" }
};

const criptosLocales = {
    bitcoin: { nombre: "Bitcoin", simbolo: "BTC" },
    ethereum: { nombre: "Ethereum", simbolo: "ETH" },
    dogecoin: { nombre: "Dogecoin", simbolo: "DOGE" }
};

document.addEventListener("DOMContentLoaded", async () => {
    mostrarSeccion('inicio');
    cargarEmpresas();
    cargarPreguntasIA();
    await cargarMonedas();
    await cargarCriptos();
});

// Navegación
function mostrarSeccion(id) {
    document.querySelectorAll(".seccion").forEach(seccion => {
        seccion.style.display = "none";
    });
    document.getElementById(id).style.display = "block";
}

// Cargar monedas
async function cargarMonedas() {
    const select = document.getElementById("monedaSelect");
    if (!select) return;

    try {
        const response = await fetch("https://api.exchangerate.host/latest");
        const data = await response.json();

        if (!data || !data.rates) throw new Error("API vacía");

        const monedas = Object.keys(data.rates);
        monedas.forEach(codigo => {
            const option = document.createElement("option");
            option.value = codigo;
            option.textContent = `${codigo} - ${monedasLocales[codigo]?.nombre || "Moneda desconocida"}`;
            select.appendChild(option);
        });
    } catch (error) {
        console.warn("Usando datos locales de monedas.");
        Object.keys(monedasLocales).forEach(codigo => {
            const option = document.createElement("option");
            option.value = codigo;
            option.textContent = `${codigo} - ${monedasLocales[codigo].nombre}`;
            select.appendChild(option);
        });
    }
}

// Cargar criptomonedas
async function cargarCriptos() {
    const select = document.getElementById("criptoSelect");
    if (!select) return;

    try {
        const response = await fetch("https://api.coingecko.com/api/v3/coins/list");
        const data = await response.json();
        const primeras = data.slice(0, 10);

        primeras.forEach(cripto => {
            const option = document.createElement("option");
            option.value = cripto.id;
            option.textContent = cripto.name;
            select.appendChild(option);
        });

    } catch (error) {
        console.warn("Usando datos locales de criptos.");
        Object.keys(criptosLocales).forEach(id => {
            const option = document.createElement("option");
            option.value = id;
            option.textContent = criptosLocales[id].nombre;
            select.appendChild(option);
        });
    }
}

// IA simulada (modo gratuito, sin conexión externa)
function cargarPreguntasIA() {
    const respuesta = document.getElementById("respuestaIA");
    const botones = document.querySelectorAll(".botonesIA button");

    if (!respuesta || !botones) return;

    botones.forEach(boton => {
        boton.addEventListener("click", () => {
            const texto = boton.dataset.respuesta || "Lo siento, no tengo una respuesta para eso.";
            respuesta.textContent = texto;
        });
    });
}

// Empresas reales
function cargarEmpresas() {
    const lista = document.getElementById("listaEmpresas");
    if (!lista) return;

    const empresas = [
        {
            nombre: "Apple",
            descripcion: "Apple Inc. es una compañía estadounidense que diseña y produce equipos electrónicos, software y servicios en línea.",
            sector: "Tecnología",
            pais: "EE.UU.",
            valor: "$607.15"
        },
        {
            nombre: "Microsoft",
            descripcion: "Microsoft es una empresa líder en software, creadora de Windows, Office, Azure y muchos servicios tecnológicos.",
            sector: "Tecnología",
            pais: "EE.UU.",
            valor: "$417.53"
        },
        {
            nombre: "Tesla",
            descripcion: "Tesla fabrica autos eléctricos, baterías, y sistemas de energía solar. Líder en innovación energética.",
            sector: "Automoción",
            pais: "EE.UU.",
            valor: "$256.43"
        }
    ];

    lista.innerHTML = "";
    empresas.forEach(e => {
        const div = document.createElement("div");
        div.className = "empresa";
        div.innerHTML = `
            <h3>${e.nombre}</h3>
            <p>${e.descripcion}</p>
            <p><strong>Sector:</strong> ${e.sector} | <strong>País:</strong> ${e.pais}</p>
            <p><strong>Valor actual:</strong> ${e.valor}</p>
        `;
        lista.appendChild(div);
    });
}
