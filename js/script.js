// ================================
// Elementos da página
// ================================

const botaoCopiar = document.getElementById("botao-copiar");
const inputTemperatura = document.getElementById("valor-temperatura");
const unidadeDe = document.getElementById("unidade-de");
const unidadePara = document.getElementById("unidade-para");

const botaoConverter = document.getElementById("botao-converter");
const botaoLimpar = document.getElementById("botao-limpar");
const botaoInverter = document.getElementById("botao-inverter");
const botaoDarkMode = document.getElementById("botao-dark-mode");

const resultadoTexto = document.getElementById("resultado-texto");
const mensagemErro = document.getElementById("mensagem-erro");

const historicoLista = document.getElementById("historico-lista");

const animacaoContainer = document.getElementById("animacao-temperatura");

let historico = [];

let animacao;

// ================================
// Carrega animação
// ================================

function carregarAnimacao(arquivo) {
  if (animacao) {
    animacao.destroy();
  }

  animacao = lottie.loadAnimation({
    container: animacaoContainer,
    renderer: "svg",
    loop: true,
    autoplay: true,
    path: arquivo,
  });
}

// animação inicial

carregarAnimacao("assets/animations/ameno.json");

// ================================

function atualizarAnimacao(celsius) {
  if (celsius < 10) {
    carregarAnimacao("assets/animations/frio.json");
  } else if (celsius > 30) {
    carregarAnimacao("assets/animations/calor.json");
  } else {
    carregarAnimacao("assets/animations/ameno.json");
  }
}

// ================================
// Conversão
// ================================

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
    mensagemErro.textContent = "Kelvin não pode ser negativo.";

    inputTemperatura.classList.add("erro");

    return;
  }

  let celsius;

  switch (origem) {
    case "C":
      celsius = valor;
      break;

    case "F":
      celsius = ((valor - 32) * 5) / 9;
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
      resultado = (celsius * 9) / 5 + 32;
      break;

    case "K":
      resultado = celsius + 273.15;
      break;
  }

  atualizarAnimacao(celsius);

  resultadoTexto.innerHTML = `
        <strong>${valor} °${origem}</strong>
        <br><br>
        ⬇
        <br><br>
        <strong>${resultado.toFixed(2)} °${destino}</strong>
    `;

  resultadoTexto.classList.add("sucesso");
  resultadoTexto.classList.add("animacao-resultado");

  // Histórico

  historico.unshift(
    `${valor} °${origem} ➜ ${resultado.toFixed(2)} °${destino}`,
  );

  if (historico.length > 5) {
    historico.pop();
  }

  historicoLista.innerHTML = "";

  historico.forEach((item) => {
    const li = document.createElement("li");

    li.textContent = item;

    historicoLista.appendChild(li);
  });

  botaoCopiar.style.display = "block";
  botaoCopiar.textContent = "📋 Copiar Resultado";
}

// ================================

function limparCampos() {
  inputTemperatura.value = "";
  botaoCopiar.style.display = "none";

  unidadeDe.value = "C";
  unidadePara.value = "F";

  resultadoTexto.textContent = "O resultado aparecerá aqui.";

  mensagemErro.textContent = "";

  historico = [];

  historicoLista.innerHTML = "<li>Nenhuma conversão realizada.</li>";

  carregarAnimacao("assets/animations/ameno.json");

  inputTemperatura.classList.remove("erro");

  inputTemperatura.focus();
}

// ================================

function inverterUnidades() {
  const origem = unidadeDe.value;

  unidadeDe.value = unidadePara.value;

  unidadePara.value = origem;
}

// ================================

function verificarUnidades() {
  if (unidadeDe.value === unidadePara.value) {
    mensagemErro.textContent = "Escolha unidades diferentes.";
  } else {
    mensagemErro.textContent = "";
  }
}

// ================================
// Eventos
// ================================

botaoConverter.addEventListener("click", converterTemperatura);

botaoLimpar.addEventListener("click", limparCampos);

botaoInverter.addEventListener("click", inverterUnidades);

unidadeDe.addEventListener("change", verificarUnidades);

unidadePara.addEventListener("change", verificarUnidades);

inputTemperatura.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    converterTemperatura();
  }
});

inputTemperatura.addEventListener("input", function () {
  mensagemErro.textContent = "";

  inputTemperatura.classList.remove("erro");
});

// ================================
// Modo Escuro
// ================================
// Verifica se o usuário já tinha uma preferência salva no navegador
if (localStorage.getItem("tema") === "dark") {
  document.body.classList.add("dark-mode");
  botaoDarkMode.textContent = "☀️ Modo Claro";
}

// Evento de clique para alternar o tema
botaoDarkMode.addEventListener("click", function () {
  document.body.classList.toggle("dark-mode");

  // Atualiza o texto do botão e salva a escolha no localStorage
  if (document.body.classList.contains("dark-mode")) {
    botaoDarkMode.textContent = "☀️ Modo Claro";
    localStorage.setItem("tema", "dark");
  } else {
    botaoDarkMode.textContent = "🌓 Modo Escuro";
    localStorage.setItem("tema", "light");
  }
});

botaoCopiar.addEventListener("click", function () {
  // Pega o texto limpo do resultado (removendo as quebras de linha e a seta)
  const textoAnalisado = resultadoTexto.innerText.replace(/\n+/g, " ");
  navigator.clipboard.writeText(textoAnalisado).then(() => {
    botaoCopiar.textContent = "✅ Copiado!";
    setTimeout(() => {
      botaoCopiar.textContent = "📋 Copiar Resultado";
    }, 2000);
  });
});
