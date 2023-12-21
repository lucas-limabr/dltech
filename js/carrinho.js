// Obtém o carrinho do localStorage
const cart = JSON.parse(localStorage.getItem('cart'))

// Verifica se há itens no carrinho
if (cart && cart.length > 0) {
    const cartItemsdiv = document.getElementById('cart-items')


    // Itera sobre os produtos no carrinho e os exibe na página
    cart.forEach(product => {
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

        const parag_qtd = document.createElement('p')
        parag_qtd.style.color = "#7F858D"
        parag_qtd.style.fontSize = "14px"
        parag_qtd.textContent = "Escolha a quantidade:"

        const qtd_produto = document.createElement('input')
        qtd_produto.setAttribute('class', 'qtd_produto')
        qtd_produto.setAttribute('type', 'number')
        qtd_produto.setAttribute('value', '1')


        productName.textContent = product.name
        productPrice.textContent = product.price
        productImage.src = product.image
        productImage.alt = 'Imagem do Produto'

        productInfoDiv.appendChild(productName)
        productInfoDiv.appendChild(productPrice)
        productInfoDiv.appendChild(parag_qtd)
        productInfoDiv.appendChild(qtd_produto)

        productDiv.appendChild(productInfoDiv)
        productDiv.appendChild(productImage)

        cartItemsdiv.appendChild(productDiv)

        let valor_tot = document.getElementById('valor_tot')
        let valor_monetario
        valor_tot.innerText += `${product.price} * ${Number(qtd_produto.value)}`   

    });
} else {
    // Se o carrinho estiver vazio, exibe uma mensagem
    const cartItemsdiv = document.getElementById('cart-items')
    cartItemsdiv.textContent = "Seu carrinho está vazio!"
}

// FUNÇÃO FORMATA CEP
let conta_digitos = 0

function formataCep(input) {
    let cep = input.value.replace(/\D/g, ''); // Remove caracteres não numéricos

    // Verifica se já temos 5 dígitos inseridos
    if (cep.length >= 5) {
        // Insere o hífen após os primeiros 5 dígitos
        cep = cep.substring(0, 5) + '-' + cep.slice(5, 8);
    }
    // Atualiza o valor do input
    input.value = cep;
    conta_digitos = cep.length
}

// FUNÇÃO CEP
function buscarCEP() {
    console.log(conta_digitos)

    if (conta_digitos == 9) {
        const cepInput = document.getElementById('cep');
        const cep = cepInput.value.replace(/\D/g, ''); // Remove caracteres não numéricos

        // Faz a requisição à API ViaCEP
        fetch(`https://viacep.com.br/ws/${cep}/json/`)
            .then(response => response.json())
            .then(data => {
                // Manipula os dados da resposta da API
                const resultado = document.getElementById('resultado');
                if (data.erro) {
                    resultado.innerHTML = 'CEP não encontrado';
                } else {
                    resultado.innerHTML = `
                    <p>CEP: ${data.cep}</p>
                    <p>Logradouro: ${data.logradouro}</p>
                    <p>Bairro: ${data.bairro}</p>
                    <p>Cidade/Estado: ${data.localidade}/${data.uf}</p>
                    <p id="parag_num">Número: <input id="input_num" type="number"></p>
                    <p>Complemento: <input type="text" size="9"></p>
                `;
                }
            })
            .catch(error => {
                console.error('Ocorreu um erro:', error);
            });
    }
}

