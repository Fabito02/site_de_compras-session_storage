const numItens = document.getElementById('numItens');
const modalProdutos = document.getElementById('produtosCarrinho');
const body = document.querySelector('body')
var temaAtual = 'light'
let numeroDeProdutos = 0;

function salvar() {
    let itens = numItens.innerHTML;
    let produtos = modalProdutos.innerHTML;
    
    sessionStorage.setItem('numItens', itens);
    sessionStorage.setItem('produtosCarrinho', produtos);
    sessionStorage.setItem('theme', temaAtual)
}

function carregar() {
    modalProdutos.innerHTML = '';

    let itensSalvos = sessionStorage.getItem('numItens');
    if (itensSalvos !== null && itensSalvos !== '') {
        numeroDeProdutos = Number(itensSalvos);
        numItens.innerHTML = numeroDeProdutos;
    } else {
        numeroDeProdutos = 0;
        numItens.innerHTML = 0;
    }

    modalProdutos.innerHTML = sessionStorage.getItem('produtosCarrinho');

    let removeButtons = document.querySelectorAll('.removerProduto');
    removeButtons.forEach(button => {
        button.onclick = function() { excluirProdutos(this); };
    });

    temaAtual = sessionStorage.getItem('theme')

    console.log(temaAtual)

    if (temaAtual == "dark") {
        body.setAttribute("theme", "dark")
        temaAtual = "dark"
    } else {
        body.setAttribute("theme", "light")
        temaAtual = "light"
    }
}

document.addEventListener('DOMContentLoaded', carregar);

const modal = document.getElementById('modal');
const carrinhoModal = document.querySelector('.carrinhoModal');

function abrirModal() {
    modal.style.display = "flex";
}

function fecharModal() {
    modal.style.display = "none";
}

document.addEventListener('click', function(event) {
    if (!carrinhoModal.contains(event.target) && event.target === modal) {
        fecharModal();
    }
});

function adicionarProduto(produtoElem) {
    let produto = produtoElem.closest('.produto');
    let descricaoProduto = produto.querySelector('.descricaoProduto').textContent;
    let imgProduto = produto.querySelector('img').src;
    let precoProduto = produto.querySelector('.precoProduto').textContent;

    let novoProdutoContainer = document.createElement('div');
    let novoProdutoDescr = document.createElement('span');
    let novaImgProduto = document.createElement('img');
    let novoProdutoPreco = document.createElement('span');
    let novoRemoveProduto = document.createElement('span');
    let i = document.createElement('i');
    
    numeroDeProdutos += 1;
    numItens.innerHTML = numeroDeProdutos;
    
    novoProdutoContainer.className = 'modalProduto';
    novaImgProduto.src = imgProduto;
    novoProdutoDescr.textContent = descricaoProduto;
    novoProdutoPreco.textContent = precoProduto;
    novoProdutoDescr.className = 'produtoTxt';
    novoProdutoPreco.className = 'produtoPreco';
    novoRemoveProduto.className = 'removerProduto';
    i.className = 'fa-solid fa-trash-can';

    novoProdutoContainer.appendChild(novaImgProduto);
    novoProdutoContainer.appendChild(novoProdutoDescr);
    novoProdutoContainer.appendChild(novoProdutoPreco);
    novoRemoveProduto.appendChild(i);
    novoProdutoContainer.appendChild(novoRemoveProduto);

    modalProdutos.insertBefore(novoProdutoContainer, modalProdutos.firstChild);

    novoRemoveProduto.onclick = function() { excluirProdutos(this); };
    salvar();
}

function excluirProdutos(produto){
    produto.parentElement.remove();
    numeroDeProdutos -= 1;
    numItens.innerHTML = numeroDeProdutos;
    salvar();
}

function trocarTema() {
    if (body.getAttribute("theme") === "dark") {
        body.setAttribute("theme", "light")
        temaAtual = "light"
    } else {
        body.setAttribute("theme", "dark")
        temaAtual = "dark"
    }
    salvar();
}
