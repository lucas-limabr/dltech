function exibirInformacoesPeca(pecaSelecionada, tipo) {
        // Obter o elemento de imagem, título e preço da peça selecionada
        var imgElement = document.querySelector(`.${tipo}-escolhido img`);
        var tituloElement = document.querySelector(`.${tipo}-escolhido h2`);
        var precoElement = document.querySelector(`.${tipo}-escolhido p`);

        // Obter o elemento do produto selecionado
        var produtoSelecionado = document.querySelector(`input[name=${tipo}]:checked`);

        // Verificar se um produto foi selecionado
        if (produtoSelecionado) {
            // Atualizar as informações da peça selecionada
            imgElement.src = produtoSelecionado.parentElement.querySelector('img').src;
            tituloElement.textContent = produtoSelecionado.parentElement.querySelector('h2').textContent;
            precoElement.textContent = produtoSelecionado.parentElement.querySelector('.preco').textContent;
        } else {
            // Se nenhum produto foi selecionado, limpar as informações
            imgElement.src = '';
            tituloElement.textContent = '';
            precoElement.textContent = '';
        }
    }

    // Adicione um ouvinte de evento para cada seção de seleção
    document.querySelectorAll('.produtos').forEach(function (secao) {
        secao.addEventListener('change', function () {
            // Obter o tipo da peça (processador, placa, ram, ssd)
            var tipoPeca = secao.classList[1].split('-')[1];
            exibirInformacoesPeca(tipoPeca, tipoPeca);
        });
    });
