// Pra garantir que todo o HTML (DOM) foi carregado, eu escuto este evento e chamo a função apenas quando o carregamneto está 100% concluído

if (document.readyState === "loading") {  // Ainda carregando
    document.addEventListener("DOMContentLoaded", divHover);
} else {  // `DOMContentLoaded` foi disparado
    divHover();
}

//VARIÁVEIS GLOBAIS
var div_hover = document.getElementsByClassName('div-hover')
//console.log(div_hover.length)

var span = document.getElementsByClassName('icons-hover')

function divHover() {
    //console.log("DOM completamente carregado e analisado");

    //necessário a variável ser let
    for (let i = 0; i < div_hover.length; i++) {
        //necessário o uso de arrow function neste caso quando eu preciso chamar uma função passando um argumento
        div_hover[i].addEventListener('mouseenter', () => exibiricone(i))
    }
}

function exibiricone(j) {
    //console.log(j)
    span[j].style.visibility = "visible"
    span[j].style.cursor = "pointer"

    div_hover[j].addEventListener('mouseleave', () => ocultarIcone(j))
}

function ocultarIcone(j) {
    span[j].style.visibility = "hidden"
}

function pesquisar() {
    // Obtém o valor digitado na barra de pesquisa
    var termoPesquisa = document.getElementById('search-bar').value.toLowerCase();

    // Obtém todas as tags h3 com o id "produto"
    var produtos = document.querySelectorAll('#produto');

    // Itera sobre cada produto e verifica se o termo de pesquisa está contido no texto
    produtos.forEach(function (produto) {
        var textoProduto = produto.innerText.toLowerCase();
        var paiProduto = produto.parentNode;

        // Verifica se o termo de pesquisa está contido no texto do produto
        if (textoProduto.includes(termoPesquisa)) {
            // Se sim, exibe o produto
            paiProduto.style.display = 'block';

            // Role a página para o produto pesquisado
            produto.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
        } else {
            // Se não, oculta o produto
            paiProduto.style.display = 'none';
        }
    });
}

