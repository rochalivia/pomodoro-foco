///primeira atividade: personalizacao de temas (feito)
///segunda atividade: adicionar atividades a lista

///localizando no html
const temaRosa = document.querySelector('button#modeRosa')
const temaRoxo = document.querySelector('button#modeRoxo')
const temaAzul = document.querySelector('button#modeAzul')
const temaVerde = document.querySelector('button#modeVerde')
const categoria = document.querySelector('select#categoria')
const atividadeLista = document.querySelector('#atividadeLista')
const botaoIniciar = document.querySelector('button#iniciar')
const botaoEncerrar = document.querySelector('button#encerrar')
const botaoPausar = document.querySelector('button#pausar')
const botaoSubmit = document.querySelector('form#formulario')
const tarefaSeletor = document.querySelector('input#tarefaAqui')

botaoPausar.addEventListener('click', temporizadorPausa)
botaoEncerrar.addEventListener('click', temporizadorEncerrar)
botaoIniciar.addEventListener('click', temporizadorInicio)



const tempoRelogio = document.querySelector('p#tempoRelogio')
const minutosDigitados = document.querySelector('input#minutosDigitados')





///adicionando escutadores de evento
temaAzul.addEventListener('click', mudarParaAzul)
temaVerde.addEventListener('click', mudarParaVerde)
temaRosa.addEventListener('click', mudarParaRosa)
temaRoxo.addEventListener('click', mudarParaRoxo)



///Arrow function que previne atualização ''refresh'' na pagina = preventDefault
botaoSubmit.addEventListener('submit', (event) => {
    event.preventDefault()
    adicionarTarefa(tarefaSeletor, atividadeLista, categoria);
  




});

function adicionarTarefa(tarefaSeletor, atividadeLista, categoria) {
   


    ///createElement cria um elemento novo dinamico
    const novoItem = document.createElement('li');
    const textoTarefa = document.createElement('span');
    const excluirTarefa = document.createElement('button')
    const modoFoco = document.createElement('span')
    const andamento = document.createElement('input')


    ///comando que define o que ele deve fazer/ter como conteudo
    excluirTarefa.textContent = 'Excluir'
    modoFoco.textContent = categoria.value
    textoTarefa.textContent = tarefaSeletor.value;
    andamento.type = 'checkbox'

    ///funcao de excluir
    excluirTarefa.addEventListener('click', () => {
        novoItem.remove();
    });

    ///adicionar dinamicamente


    ///adiciona os elementos DENTRO do li primeiro
    novoItem.appendChild(andamento)
    novoItem.appendChild(textoTarefa)
    novoItem.appendChild(modoFoco)

    novoItem.appendChild(excluirTarefa)


    ///por ultimo adiciona o li completo na ul
    atividadeLista.appendChild(novoItem)

    tarefaSeletor.value = ''




}
///contadores globais
let horas = 0
let minutos = 0
let segundos = 0
let intervalo = null
let totalSegundos = 0

function temporizadorInicio(event) {
    event.preventDefault()


    ///condicao para retornar caso intervalo esteja vazio
    if (intervalo) return

    ///se total de segundos for menor que zero(e é nesse momento) multiplique por valor do numero em 60. assim temos minutos*60==segundos
    if (totalSegundos <= 0) {
        totalSegundos = Number(minutosDigitados.value) * 60
    }

    ///tendo este tempo em segundos, chamamos a funcao nativa setInterval
    ///totalSegundos-- faz a contagem regrissiva, no finalzinho das chaves temos o numero 1000, que representa os segundos. então iniciamos a logica de conversão dos numeros

    intervalo = setInterval(() => {
        ///contagem regressiva
        totalSegundos--

        ///logica de conversao
        let horas = Math.floor(totalSegundos / 3600)
        let minutos = Math.floor((totalSegundos % 3600) / 60)
        let segundos = totalSegundos % 60

        ///mostrando na tela
        tempoRelogio.textContent = `${horas}:${String(minutos).padStart(2, "0")}:${String(segundos).padStart(2, "0")}`

        ///condicao de parada
        if (totalSegundos <= 0) {
            clearInterval(intervalo)
            intervalo = null
        }
    }, 1000)
}

///condição de pausa

function temporizadorPausa(event) {
    event.preventDefault()

    clearInterval(intervalo)
    intervalo = null
}

///condicao de encerrar, zerar as variaveis 
function temporizadorEncerrar(event) {
    event.preventDefault()

    clearInterval(intervalo)
    intervalo = null
    totalSegundos = 0
    tempoRelogio.textContent = "0:00:00"
}





///setAttribute = serve para mudar e definir atributos no html
///documentElement = pegar a raíz do elemento html

function mudarParaRosa() {
    document.documentElement.setAttribute('data-theme', 'rosa')
}

function mudarParaAzul() {
    document.documentElement.setAttribute('data-theme', 'azul')
}

function mudarParaRoxo() {
    document.documentElement.setAttribute('data-theme', 'roxo')
}

function mudarParaVerde() {
    document.documentElement.setAttribute('data-theme', 'verde')
}
