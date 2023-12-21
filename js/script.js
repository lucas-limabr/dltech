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

// FUNÇÃO DE PESQUISA DE PRODUTOS
function pesquisar() {
    var div_hover = document.getElementsByClassName('div-hover')
    var barra_pesquisa = document.getElementById('search-bar').value.toLowerCase()
    var titulos_produto = document.getElementsByClassName('title-produto')
    var secao_produto = document.getElementsByClassName('secao-produto')
    var titulo_secao = document.getElementsByClassName('title-secao')
    var msg_nenhum_produto = document.getElementById('msg-nenhum-produto');

    if (barra_pesquisa.trim() !== '') {
        var j = 0
        var cont = 0
        var exibir_secao
        var sem_correspondencia = 0
        document.getElementById('titulo-marcas').style.display = "none"
        document.getElementById('secao-marcas').style.display = "none"

        while (j < secao_produto.length) {

            exibir_secao = false
            for (let i = 0; i < 4; i++) {


                if (!titulos_produto[cont].innerHTML.toLocaleLowerCase().includes(barra_pesquisa)) {
                    div_hover[cont].style.display = "none"
                    sem_correspondencia++
                }
                else {
                    exibir_secao = true
                    secao_produto[j].style.justifyContent = "flex-start"
                    div_hover[cont].style.display = "block"
                    div_hover[cont].style.marginLeft = "50px"
                }
                cont++
            }

            if (exibir_secao) {
                secao_produto[j].style.display = "flex"
                titulo_secao[j].style.display = "block"
            }
            else {
                secao_produto[j].style.display = "none"
                titulo_secao[j].style.display = "none"
            }

            j++
        }
    }
    else {
        document.getElementById('titulo-marcas').style.display = "block"
        document.getElementById('secao-marcas').style.display = "flex"

        let j = 0
        for (let i = 0; i < div_hover.length; i++) {
            div_hover[i].style.display = "block"
            div_hover[i].style.marginLeft = "0px"
        }
        while (j < secao_produto.length) {
            secao_produto[j].style.display = "flex"
            secao_produto[j].style.justifyContent = "space-evenly"
            titulo_secao[j].style.display = "block"

            j++
        }
    }

    if (sem_correspondencia === 20) {
        // Verifica se a mensagem já foi adicionada antes de inserir novamente
        if (!msg_nenhum_produto) {
            var h2 = document.createElement('h2');
            h2.id = 'msg-nenhum-produto';
            h2.appendChild(document.createTextNode('Nenhum produto encontrado'));
            h2.style.backgroundColor = "white"
            h2.style.color = "black"

            var main = document.querySelector('main');
            main.appendChild(h2);
        }
    }
    // Remove a mensagem se houver correspondência
    if (msg_nenhum_produto && sem_correspondencia != 20) {
        msg_nenhum_produto.remove();
    }
}

// CARRINHO
    document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', function(){
        //pega informações do produto
        const productName = this.parentNode.querySelector('.title-produto').innerHTML
        const productImage = this.parentNode.querySelector('img').src
        const productPrice = this.parentNode.querySelector('.preco-desconto').innerHTML

        // Cria um objeto com os detalhes do produto
        const product = {
            name: productName,
            image: productImage,
            price: productPrice
        };

        // Verifica se já existe um carrinho no localStorage
        let cart = localStorage.getItem('cart')

        if(!cart){
            cart = []
        }
        else{
           // Se existir, converte o JSON para um array
           cart = JSON.parse(cart) 
        }

        cart.push(product)

        localStorage.setItem('cart', JSON.stringify(cart));

        // Redireciona para a página do carrinho
        window.location.href = 'carrinho.html';
    })
});