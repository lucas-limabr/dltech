// Obtém o carrinho do localStorage
const lista_favoritos = JSON.parse(localStorage.getItem('lista_favoritos'))

const cartItemsdiv = document.getElementById('fav-items')

document.getElementById('clear_fav').addEventListener('click', function () {
    // exclui todos os itens do cart, deixando-o nulo
    localStorage.removeItem('lista_favoritos')
    location.reload()
})

if (lista_favoritos && lista_favoritos.length > 0) {

    lista_favoritos.forEach(product => {

        const productDiv = document.createElement('div')
        productDiv.setAttribute('class', 'box_produto')

        const productInfoDiv = document.createElement('div') // Esta div vai agrupar title_produto e preco_produto
        productInfoDiv.setAttribute('class', 'info_produto')

        const productName = document.createElement('h3')
        productName.setAttribute('class', 'title_produto')

        const productPrice = document.createElement('p')
        productPrice.setAttribute('class', 'preco_produto')

        const productImage = document.createElement('img')
        productImage.setAttribute('class', 'img_produto')

        const lixeira = document.createElement('img')
        lixeira.setAttribute('src', "img/icones/excluir.png")
        lixeira.setAttribute('class', 'btn_delete')

        productName.textContent = product.name
        productPrice.textContent = product.price
        productImage.src = product.image
        productImage.alt = 'Imagem do Produto'

        productInfoDiv.appendChild(productName)
        productInfoDiv.appendChild(productPrice)
        productInfoDiv.appendChild(lixeira)

        productDiv.appendChild(productInfoDiv)
        productDiv.appendChild(productImage)

        cartItemsdiv.appendChild(productDiv)
    });

    var deletar = document.getElementsByClassName('btn_delete')
    Array.from(deletar).forEach((produto, index) => {
        produto.addEventListener('click', () => {
            let lista_favoritos = JSON.parse(localStorage.getItem('lista_favoritos'))
            lista_favoritos.splice(index, 1)

            localStorage.setItem('lista_favoritos', JSON.stringify(lista_favoritos))
            location.reload()
        })
    })

} else {
    cartItemsdiv.textContent = "Sua lista de favoritos está vazia!"
}

function clicarMenu() {
    var menu = document.getElementById('menu')
    
    if (menu.style.display == 'none') {
        menu.style.display = 'block';
    }
    else {
        menu.style.display = 'none';
    }
}

window.addEventListener('resize', () => {
    let menu = document.getElementById('menu')

        if (window.innerWidth >= 768) {
            menu.style.display = "block"
        }
        else {
            menu.style.display = "none"
        }
})