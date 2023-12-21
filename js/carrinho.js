// Obtém o carrinho do localStorage
const cart = JSON.parse(localStorage.getItem('cart'))

// Verifica se há itens no carrinho
if(cart && cart.length > 0){
    const cartItemsdiv = document.getElementById('cart-items')


// Itera sobre os produtos no carrinho e os exibe na página
cart.forEach(product => {
    const productDiv = document.createElement('div')
    const productName = document.createElement('h3')
    const productPrice = document.createElement('p')

    productName.textContent = product.name
    productPrice.textContent = product.price
    const productImage = document.createElement('img')
    productImage.src = product.image
    productImage.alt = 'Imagem do Produto'

    productDiv.appendChild(productName)
    productDiv.appendChild(productPrice)
    productDiv.appendChild(productImage)
    cartItemsdiv.appendChild(productDiv)
});
}else{
   // Se o carrinho estiver vazio, exibe uma mensagem
   const cartItemsdiv = document.getElementById('cart-items') 
   cartItemsdiv.textContent = "Seu carrinho está vazio!"
}