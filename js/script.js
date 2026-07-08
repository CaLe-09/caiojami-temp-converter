// Elementos da página
const inputTemperatura = document.getElementById("valor-temperatura");
const unidadeDe = document.getElementById("unidade-de");
const unidadePara = document.getElementById("unidade-para");

const botaoConverter = document.getElementById("botao-converter");
const botaoLimpar = document.getElementById("botao-limpar");

const resultadoTexto = document.getElementById("resultado-texto");
const mensagemErro = document.getElementById("mensagem-erro");

// Função principal de conversão
function converterTemperatura() {

    mensagemErro.textContent = "";
    resultadoTexto.classList.remove("animacao-resultado");
    resultadoTexto.classList.remove("sucesso");
    inputTemperatura.classList.remove("erro");

    const valor = parseFloat(inputTemperatura.value);

    if (inputTemperatura.value.trim() === "") {

        mensagemErro.textContent = "Digite uma temperatura.";
        inputTemperatura.classList.add("erro");
        return;

    }

    if (isNaN(valor)) {

        mensagemErro.textContent = "Digite um valor válido.";
        inputTemperatura.classList.add("erro");
        return;

    }

    const origem = unidadeDe.value;
    const destino = unidadePara.value;

    if (origem === destino) {

        mensagemErro.textContent = "Escolha unidades diferentes.";
        return;

    }

    if (origem === "K" && valor < 0) {

        mensagemErro.textContent =
            "A temperatura em Kelvin não pode ser negativa.";

        inputTemperatura.classList.add("erro");
        return;

    }

    let celsius;

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

    resultadoTexto.innerHTML = `
        🌡️ <strong>${valor} °${origem}</strong><br>
        ⬇️<br>
        <strong>${resultado.toFixed(2)} °${destino}</strong>
    `;

    resultadoTexto.classList.add("sucesso");
    resultadoTexto.classList.add("animacao-resultado");

}

// Limpar formulário
function limparCampos() {

    inputTemperatura.value = "";

    unidadeDe.value = "C";
    unidadePara.value = "F";

    resultadoTexto.textContent = "O resultado aparecerá aqui.";

    mensagemErro.textContent = "";

    resultadoTexto.classList.remove("sucesso");
    resultadoTexto.classList.remove("animacao-resultado");

    inputTemperatura.classList.remove("erro");

    inputTemperatura.focus();

}

// Verifica se as unidades são diferentes
function verificarUnidades() {

    if (unidadeDe.value === unidadePara.value) {

        mensagemErro.textContent =
            "Escolha unidades diferentes para realizar a conversão.";

        resultadoTexto.textContent = "";

    } else {

        mensagemErro.textContent = "";

    }

}

// Eventos

botaoConverter.addEventListener("click", converterTemperatura);

botaoLimpar.addEventListener("click", limparCampos);

unidadeDe.addEventListener("change", verificarUnidades);

unidadePara.addEventListener("change", verificarUnidades);

// Permite converter pressionando Enter

inputTemperatura.addEventListener("keypress", function (event) {

    if (event.key === "Enter") {

        converterTemperatura();

    }

});

// Remove o erro enquanto o usuário digita

inputTemperatura.addEventListener("input", function () {

    mensagemErro.textContent = "";
    inputTemperatura.classList.remove("erro");

});