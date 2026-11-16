let listaMobs = [];
let comportamentoAtual = 'todos';

// Carrega os dados do mobs.json assim que a página abre
document.addEventListener("DOMContentLoaded", () => {
    fetch('mobs.json')
        .then(response => response.json())
        .then(data => {
            listaMobs = data;
            exibirMobs(listaMobs);
        })
        .catch(error => console.error("Erro ao carregar o arquivo JSON:", error));
});

// Renderiza os cards na tela
function exibirMobs(mobs) {
    const grid = document.getElementById("grid-mobs");
    grid.innerHTML = "";

    if (mobs.length === 0) {
        grid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; font-size: 1.2rem; color: #d0d0d0; padding: 40px;">Nenhum mob encontrado.</p>`;
        return;
    }

    mobs.forEach(mob => {
        const card = document.createElement("div");
        card.className = "card-mob";
        card.onclick = () => abrirModal(mob);

        card.innerHTML = `
            <div class="img-container">
                <img src="${mob.image}" alt="${mob.displayName}" loading="lazy">
            </div>
            <h2>${mob.displayName}</h2>
            <span class="badge ${mob.behavior}">${mob.behavior}</span>
        `;

        grid.appendChild(card);
    });
}

// Filtra por comportamento (botões do topo)
function filtrarPorComportamento(comportamento, elementoBotao) {
    comportamentoAtual = comportamento;

    // Atualiza classe ativa dos botões
    document.querySelectorAll('.btn-filtro').forEach(btn => btn.classList.remove('ativo'));
    elementoBotao.classList.add('ativo');

    aplicarFiltros();
}

// Filtra por texto digitado e comportamento selecionado simultaneamente
function filtrarMobs() {
    aplicarFiltros();
}

function aplicarFiltros() {
    const termoBusca = document.getElementById("campo-busca").value.toLowerCase();

    const mobsFiltrados = listaMobs.filter(mob => {
        const correspondeBusca = mob.displayName.toLowerCase().includes(termoBusca);
        const correspondeComportamento = (comportamentoAtual === 'todos' || mob.behavior === comportamentoAtual);
        return correspondeBusca && correspondeComportamento;
    });

    exibirMobs(mobsFiltrados);
}

// Abre o Modal com os detalhes completinhos do mob
function abrirModal(mob) {
    document.getElementById("modal-imagem").src = mob.image;
    document.getElementById("modal-titulo").textContent = mob.displayName;
    document.getElementById("modal-dimensao").textContent = mob.dimension.toUpperCase();
    document.getElementById("modal-comida").textContent = mob.food || "Nenhuma";
    document.getElementById("modal-descricao").textContent = mob.description || "Sem descrição disponível.";

    const badgeContainer = document.getElementById("modal-badge-container");
    badgeContainer.innerHTML = `<span class="badge ${mob.behavior}" style="font-size: 0.9rem; padding: 6px 16px;">${mob.behavior}</span>`;

    document.getElementById("modal-mob").classList.add("aberto");
}

// Fecha o Modal
function fecharModal() {
    document.getElementById("modal-mob").classList.remove("aberto");
}

// Fecha se clicar fora da caixa do modal
function fecharModalFora(event) {
    const modalConteudo = document.querySelector(".modal-conteudo");
    if (!modalConteudo.contains(event.target)) {
        fecharModal();
    }
}
