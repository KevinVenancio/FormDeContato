const camposDoFormulario = document.querySelectorAll("[required]");
const formulario = document.querySelector("[data-formulario]");

formulario.addEventListener("submit", (e) => {
    e.preventDefault();

    const listaRespostas = {
        "nome": e.target.elements["nome"].value,
        "email": e.target.elements["email"].value,
        "telefone": e.target.elements["telefone"].value,
        "regiao": e.target.elements["regiao"].value,
    }
    localStorage.setItem("Envios", JSON.stringify(listaRespostas));
})

camposDoFormulario.forEach( (campo) => {
    campo.addEventListener("blur", () => verificaCampo(campo));
    campo.addEventListener("invalid", evento => evento.preventDefault())
})

const tiposDeErro = [
    'valueMissing', //valor vazio
    'typeMismatch', //não está condizendo com o tipo do input, tipo um email sem @, dominio...
    'patternMismatch', //dado que não segue o regex (tipo para cpf(. ou -))
    'tooShort', // não esta respeitando o min do tamanho setado
    'customError' //erros costumizados
]

const mensagens = {
    nome: {
        valueMissing: "O campo de nome não pode estar vazio.",
        patternMismatch: "Por favor, preencha um nome válido.",
        tooShort: "Por favor, preencha um nome válido."
    },
    email: {
        valueMissing: "O campo de e-mail não pode estar vazio.",
        typeMismatch: "Por favor, preencha um email válido.",
        tooShort: "Por favor, preencha um e-mail válido."
    },
    telefone: {
        valueMissing: "O campo de telefone não pode estar vazio.",
        typeMismatch: "Por favor, preencha um telefone válido.",
        tooShort: "Por favor, preencha um telefone válido."
    },
    regiao: {
        valueMissing: "Você deve selecionar uma região.",
    },
    termos: {
        valueMissing: 'Você deve aceitar nossos termos antes de continuar.',
    }
}

function verificaCampo(campo){
    let mensagem = ""
    campo.setCustomValidity('')
    // console.log(campo.validity)
    tiposDeErro.forEach(erro => {
        if(campo.validity[erro]){
            mensagem = mensagens[campo.name][erro];
        }
    })

    const mensagemErro = campo.parentNode.querySelector('.mensagem-erro');
    const validadorDeInput = campo.checkValidity();

    if(!validadorDeInput){
        mensagemErro.textContent = mensagem;
    }else{
        mensagemErro.textContent = "";
    }
}