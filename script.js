// Base de datos local de monedas (respaldo si no se puede cargar en línea)
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
    await cargarMonedas();
    await cargarCriptos();
    cargarEmpresas();
    prepararIA();
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
    try {
        const response = await fetch("https://api.exchangerate.host/latest");
        const data = await response.json();

        const monedas = data.rates ? Object.keys(data.rates) : Object.keys(monedasLocales);

        monedas.forEach(codigo => {
            const option = document.createElement("option");
            option.value = codigo;
            option.textContent = `${codigo} - ${monedasLocales[codigo]?.nombre || "Moneda Desconocida"}`;
            select.appendChild(option);
        });

    } catch (error) {
        console.warn("Error al cargar monedas, usando respaldo local.");
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
        console.warn("Error al cargar criptos, usando respaldo local.");
        Object.keys(criptosLocales).forEach(id => {
            const option = document.createElement("option");
            option.value = id;
            option.textContent = criptosLocales[id].nombre;
            select.appendChild(option);
        });
    }
}

// IA secundaria
function prepararIA() {
    const respuesta = document.getElementById("respuestaIA");

    document.querySelectorAll(".botonesIA button").forEach(boton => {
        boton.addEventListener("click", () => {
            const texto = boton.dataset.respuesta || "Lo siento, no entiendo esa pregunta.";
            respuesta.textContent = texto;
        });
    });
}

// Cargar empresas
function cargarEmpresas() {
    const lista = document.getElementById("listaEmpresas");
    lista.innerHTML = "";

    const empresas = [
        {
            nombre: "Apple",
            descripcion: "Apple Inc. diseña, fabrica y comercializa productos electrónicos de consumo, software y servicios en línea.",
            sector: "Tecnología",
            pais: "EE.UU.",
            valor: "$607.15"
        },
        {
            nombre: "Microsoft",
            descripcion: "Microsoft desarrolla, licencia y da soporte a software, servicios, dispositivos y soluciones en la nube.",
            sector: "Tecnología",
            pais: "EE.UU.",
            valor: "$417.53"
        },
        {
            nombre: "Tesla",
            descripcion: "Tesla diseña, fabrica y vende vehículos eléctricos y sistemas de energía renovable.",
            sector: "Automoción",
            pais: "EE.UU.",
            valor: "$256.43"
        }
    ];

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
