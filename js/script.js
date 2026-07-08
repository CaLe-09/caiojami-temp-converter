// Elementos da página
const inputTemperatura = document.getElementById("valor-temperatura");
const unidadeDe = document.getElementById("unidade-de");
const unidadePara = document.getElementById("unidade-para");

const botaoConverter = document.getElementById("botao-converter");
const botaoLimpar = document.getElementById("botao-limpar");

const resultadoTexto = document.getElementById("resultado-texto");
const mensagemErro = document.getElementById("mensagem-erro");

// Converter temperatura
function converterTemperatura() {

    mensagemErro.textContent = "";
    resultadoTexto.textContent = "O resultado aparecerá aqui.";

    const valor = parseFloat(inputTemperatura.value);

    if (inputTemperatura.value.trim() === "") {
        mensagemErro.textContent = "Digite uma temperatura.";
        return;
    }

    if (isNaN(valor)) {
        mensagemErro.textContent = "Digite um valor válido.";
        return;
    }

    const origem = unidadeDe.value;
    const destino = unidadePara.value;

    // Kelvin não pode ser negativo
    if (origem === "K" && valor < 0) {
        mensagemErro.textContent = "A temperatura em Kelvin não pode ser negativa.";
        return;
    }

    let celsius;

    // Converter para Celsius
    switch (origem) {

        case "C":
            celsius = valor;
            break;

        case "F":
            celsius = (valor - 32) * 5 / 9;
            break;

        case "K":
            celsius = valor - 273.15;
            break;
    }

    let resultado;

    // Converter de Celsius para destino
    switch (destino) {

        case "C":
            resultado = celsius;
            break;

        case "F":
            resultado = (celsius * 9 / 5) + 32;
            break;

        case "K":
            resultado = celsius + 273.15;
            break;
    }

    resultadoTexto.textContent =
        `${valor} °${origem} = ${resultado.toFixed(2)} °${destino}`;
}

// Limpar formulário
function limparCampos() {

    inputTemperatura.value = "";
    unidadeDe.selectedIndex = 0;
    unidadePara.selectedIndex = 0;

    resultadoTexto.textContent = "O resultado aparecerá aqui.";
    mensagemErro.textContent = "";

    inputTemperatura.focus();

}

// Converter clicando no botão
botaoConverter.addEventListener("click", converterTemperatura);

// Limpar
botaoLimpar.addEventListener("click", limparCampos);

// Enter converte automaticamente
inputTemperatura.addEventListener("keypress", function (event) {

    if (event.key === "Enter") {
        converterTemperatura();
    }

});

// Impede escolher a mesma unidade
unidadeDe.addEventListener("change", verificarUnidades);
unidadePara.addEventListener("change", verificarUnidades);

function verificarUnidades() {

    if (unidadeDe.value === unidadePara.value) {

        mensagemErro.textContent =
            "Escolha unidades diferentes para realizar a conversão.";

        resultadoTexto.textContent = "";

    } else {

        mensagemErro.textContent = "";

    }

}