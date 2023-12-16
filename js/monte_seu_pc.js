document.addEventListener("DOMContentLoaded", function () {
  // Adiciona um evento de clique a todos os radio buttons
  var radioButtons = document.querySelectorAll('input[type="radio"]');
  radioButtons.forEach(function (radio) {
    radio.addEventListener("click", function () {
      copiarDadosSelecionados();
      calcularTotal();
      atualizarProgressoCircular();
      emitirAlerta(radio);
    });
  });
});

function emitirAlerta(radio) {
    var componente = radio.getAttribute("name");
    var mensagem = componente.charAt(0).toUpperCase() + componente.slice(1);
    if (mensagem === "Placa-mae") {
        mensagem = "Placa mãe";
    } else if (mensagem === "Ram") {
        mensagem = "Memória RAM";
    } else if (mensagem === "Ssd") {
        mensagem = "SSD";
    } else if (mensagem === "Processador") {
        mensagem = "Processador";
    }

    alert(mensagem + " adicionado(a) ao carrinho!");
}

function calcularTotal() {
  var total = 0;

  // Seleciona todos os inputs do tipo radio que estão selecionados
  var produtosSelecionados = document.querySelectorAll(
    "input[type=radio]:checked"
  );

  // Itera sobre os inputs selecionados e adiciona os valores ao total
  produtosSelecionados.forEach(function (input) {
    // Encontra o span com a classe "valor" dentro do mesmo div que o input
    var spanValor = input.parentElement.querySelector(".valor");

    var valorTexto = spanValor.textContent
      .replace("R$ ", "")
      .replace(".", "")
      .replace(",", ".");
    var valor = parseFloat(valorTexto);
    total += valor;
  });

  // Atualiza o valor total na div com id "valor-total"
  var totalFormatado =
    "R$ " +
    total.toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  document.getElementById("valor-total").textContent = totalFormatado;
}

// Adicione um ouvinte de evento para cada botão de opção
document.querySelectorAll("input[type=radio]").forEach(function (radioButton) {
  radioButton.addEventListener("change", calcularTotal);
});

function copiarDadosSelecionados() {
  var sectionPecasSelecionadas = document.querySelector(".pecas-selecionadas");
  var produtosSelecionados = document.querySelectorAll(
    'input[type="radio"]:checked'
  );

  // Limpa o conteúdo da section
  sectionPecasSelecionadas.innerHTML = "";

  // Itera sobre os produtos selecionados e adiciona clones à section
  produtosSelecionados.forEach(function (radioButton) {
    var produtoSelecionado = radioButton.parentNode.cloneNode(true);
    sectionPecasSelecionadas.appendChild(produtoSelecionado);
  });
}

function atualizarProgressoCircular() {
  var pecas = ["processador", "placa-mae", "ram", "ssd"];
  var totalSelecionado = 0;

  pecas.forEach(function (peca) {
    var inputSelecionado = document.querySelector(
      "input[name=" + peca + "]:checked"
    );
    if (inputSelecionado) {
      totalSelecionado++;
    }
  });

  var circulo = document.querySelector(
    ".progresso-circular-0-4 circle:nth-child(2)"
  );
  var numero = document.querySelector(
    ".progresso-circular-0-4 .numero h2:first-child"
  );

  var comprimentoCirculo = 2 * Math.PI * circulo.getAttribute("r");
  var offset = comprimentoCirculo * (1 - totalSelecionado / pecas.length);

  circulo.style.strokeDashoffset = offset;
  numero.textContent = totalSelecionado;

  // Set the color of the circle to #FF6500
  circulo.style.stroke = "#FF6500";
  }