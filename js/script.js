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

document.getElementById('aceitar_cookie').addEventListener('click', ()=>{
    document.getElementById('cookie_bar').style.display = "none"
})

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
// forEach só aceita iterar sobre um array comum ou uma NodeList (lista de nós), como é o caso, gerada pelo queryselectorAll
// para selecionar mais de um seletor no querySelector, eu deixo eles dentro de '' e separados por vírgula
document.querySelectorAll('button, .comprar').forEach(button => {
    // função anônima é a correta para acessar o this, que é o button de cada iteração
    //a cada clique, já executa a função
    button.addEventListener('click', function () {
        //restringe a busca pelo seletor ao pesquisar apenas dentro da "div-hover" que é pai de this (button)
        //pega informações do produto
        const productName = this.offsetParent.querySelector('.title-produto').innerHTML
        const productImage = this.offsetParent.querySelector('img').src
        const productPrice = this.offsetParent.querySelector('.preco-desconto').innerHTML

        console.log(productPrice)

        // Cria um objeto com os detalhes do produto
        const product = {
            name: productName,
            image: productImage,
            price: productPrice,
        };

        // Verifica se já existe um carrinho no localStorage
        let cart = localStorage.getItem('cart')

        //se for nulo, cria um novo array
        if (!cart) {
            cart = []
        }
        else {
            // Se existir, converte o JSON para um array, para em seguida, usar um método de array
            cart = JSON.parse(cart)
        }

        cart.push(product)

        // atualizando o localstorage, passando o nome da chave e o seu respectivo valor
        localStorage.setItem('cart', JSON.stringify(cart));

        let redirecionar = confirm('Produto adicionado com sucesso! Deseja ir para o carrinho?')
        if (redirecionar) {
            window.location.href = 'carrinho.html'
        }
    })
});

function clicarMenu() {
    if (menu.style.display == 'none') {
        menu.style.display = 'block';
    }
    else {
        menu.style.display = 'none';
    }
}

// esta variável recebe o valor da largura atual da página quando ela é carregada
var largura_inicial = window.innerWidth

// no carregamento inicial ou refreshs esta arrow function será executada, para ver o tamanho de largura que a página abriu, se for menor que 768px, adicione uma classe junto ao id menu, dentro da tag menu, esta classe é um seletor no mediaquery.css, definindo display none pra ela
//Tal função garante que se a página for aberta em disp. mobile, o menu estará ocultado
window.addEventListener('load', ()=>{
   var menu = document.getElementById('menu')

   if(window.innerWidth < 768){
        menu.classList.add('menu-hidden')
   }
   else{
    menu.classList.remove('menu-hidden')
   }
})

window.addEventListener('resize', () => {
    let menu = document.getElementById('menu')

    // apenas se a mudança de largura da tela for significativa (deduzi mais do que 30 px), é um evento real de redimensionamento de tela, portanto execute. Isso corrige o bug de clicar no input de pesquisa, que gerava um redimensionamento mínimo da janela do navegador em disp. mobiles
    if (Math.abs(window.innerWidth - largura_inicial) > 40) {
        if (window.innerWidth >= 768) {
            menu.style.display = "block"
        }
        else {
            menu.style.display = "none"
        }
    }
})