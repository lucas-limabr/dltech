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


