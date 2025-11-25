const cardContainer = document.querySelector(".card-container");
const campoBusca = document.querySelector("header input");
let dados = [];
const LARGURA_CARD = 366; 

function removerAcentos(texto) {
    return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function normalizarTexto(texto) {
    return removerAcentos(texto.toLowerCase());
}

function gerarMapaEstatico(lat, lon) {
    return `https://SEU-BACKEND-PUBLICO.onrender.com/map?lat=${lat}&lon=${lon}`;
}

async function carregarTodosOsCards() {
    try {
        const resposta = await fetch("data.json");
        dados = await resposta.json();
        renderizarCards(dados);
    } catch (error) {
        console.error("Erro ao carregar dados:", error);
    }
}

async function iniciarBusca() {
    const termo = normalizarTexto(campoBusca.value);

    const dadosFiltrados = dados.filter((dado) => {
        return (
            normalizarTexto(dado.nome).includes(termo) ||
            normalizarTexto(dado.descricao).includes(termo)
        );
    });

    renderizarCards(dadosFiltrados);
}

function renderizarCards(lista) {
    cardContainer.innerHTML = "";

    lista.forEach((dado) => {
        const article = document.createElement("article");
        article.classList.add("card");
        article.dataset.praia = dado.nome;

        article.addEventListener("click", () => {
            window.location.href = `details.html?nome=${encodeURIComponent(dado.nome)}`;
        });

        article.innerHTML = `
            <div class="card-body">
                <h2>${dado.nome}</h2>
                <img src="${dado.imagem}" alt="${dado.nome}">
                <p>${dado.descricao}</p>
                <img class="mapa-estatico" src="${gerarMapaEstatico(dado.latitude, dado.longitude)}" alt="Mapa de ${dado.nome}">
            </div>
        `;

        cardContainer.appendChild(article);
    });

    cardContainer.style.justifyContent =
        lista.length === 1 ? "center" : "flex-start";
}

function scrollDireita() {
    cardContainer.scrollBy({ left: LARGURA_CARD, behavior: "smooth" });
}

function scrollEsquerda() {
    cardContainer.scrollBy({ left: -LARGURA_CARD, behavior: "smooth" });
}

window.addEventListener("DOMContentLoaded", carregarTodosOsCards);

campoBusca.addEventListener("keydown", (evento) => {
    if (evento.key === "Enter") iniciarBusca();
});