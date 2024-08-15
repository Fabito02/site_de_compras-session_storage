const numItens = document.getElementById('numItens');
const modalProdutos = document.getElementById('produtosCarrinho');
let numeroDeProdutos = 0;

function salvar() {
    let itens = numItens.innerHTML;
    let produtos = modalProdutos.innerHTML;
    
    sessionStorage.setItem('numItens', itens);
    sessionStorage.setItem('produtosCarrinho', produtos);
}

function carregar() {
    modalProdutos.innerHTML = '';
    numItens.innerHTML = '0';

    if (sessionStorage.getItem('numItens') === null || sessionStorage.getItem('numItens') === '') {
        numItens.innerHTML = '0';
        return;
    }
    
    numItens.innerHTML = sessionStorage.getItem('numItens');
    modalProdutos.innerHTML = sessionStorage.getItem('produtosCarrinho') || '';

    let removeButtons = document.querySelectorAll('.removerProduto');
    removeButtons.forEach(button => {
        button.onclick = function() { excluirProdutos(this); };
    });
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

function adicionarProduto(produto){
    let descricaoProduto = produto.querySelector('div').textContent;
    let novoProdutoContainer = document.createElement('div');
    let novoProdutoDescr = document.createElement('span');
    let novaImgProduto = document.createElement('img');
    let imgProduto = produto.querySelector('img');
    let novoProdutoPreco = document.createElement('span');
    let produtoPreco = produto.querySelector('span');
    let novoRemoveProduto = document.createElement('span');
    let i = document.createElement('i');
    
    let srcDAImagem = imgProduto.src;
    numeroDeProdutos += 1;
    numItens.innerHTML = numeroDeProdutos;
    novaImgProduto.src = srcDAImagem;
    
    novoProdutoContainer.setAttribute('class','modalProduto');
    novoProdutoDescr.textContent = descricaoProduto;
    novoProdutoPreco.textContent = produtoPreco.textContent;
    novoProdutoDescr.setAttribute('class', 'produtoTxt');
    novoProdutoPreco.setAttribute('class','produtoPreco');
    novoRemoveProduto.setAttribute('class','removerProduto');
    i.setAttribute('class', 'fa-solid fa-trash-can');

    novoProdutoContainer.appendChild(novaImgProduto);
    novoProdutoContainer.appendChild(novoProdutoDescr);
    novoProdutoContainer.appendChild(novoProdutoPreco);
    novoRemoveProduto.appendChild(i);
    novoProdutoContainer.appendChild(novoRemoveProduto);

    if (modalProdutos.firstChild) {
        modalProdutos.insertBefore(novoProdutoContainer, modalProdutos.firstChild);
    } else {
        modalProdutos.appendChild(novoProdutoContainer);
    }
    novoRemoveProduto.onclick = function() { excluirProdutos(this); };
    salvar();
}

function excluirProdutos(produto){
    produto.parentElement.remove();
    numeroDeProdutos -= 1;
    numItens.innerHTML = numeroDeProdutos;
    salvar();
}