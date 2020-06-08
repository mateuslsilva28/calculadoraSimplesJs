const nmrTela = document.getElementById("resultado")
var valoresEspaco = '';
var valores = []
window.addEventListener("keydown", teclado);

function pegarNumero(numero){
    if(nmrTela.innerHTML == "0"){
        nmrTela.innerHTML = numero
    }
    else {
        nmrTela.innerHTML+= `${numero}`
    }
}

function somar(){
    verificar('+')
}
function subtrair(){
    verificar('-')
}

function multiplicar(){
    verificar('x')
}

function dividir(){
    verificar('/')
}

function verificar(sinal){
    if(valores.length<=1){
        valoresEspaco = nmrTela.innerHTML.split(' ')
        valores.push(parseFloat(nmrTela.innerHTML))
        nmrTela.innerHTML+= ` ${sinal} `
        valores.push(sinal)
    }
}

function porcentagem () {
    var caracteres = nmrTela.innerHTML.split(' ')
    var valorPorCento = parseFloat(caracteres[2]) / 100
    nmrTela.innerHTML+= '%'
    valores.push(valorPorCento)
}

function colocarPonto(){
    var caracteresDaConta = []
    var caracteresValor1= []
    var caracteresValor2 = []
    caracteresDaConta.push(nmrTela.innerHTML.trim().split(' '))//separa entre valor 1, operação e valor2
    caracteresValor1.push(caracteresDaConta[0][0].split(''))//separa cada caractere do valor 1

    if(caracteresDaConta[0].length==3){
        caracteresValor2.push(caracteresDaConta[0][2].split(''))//se exister 3 posições, separa cada caractere do valor 2
        for(let i in caracteresValor2[0]){
            if(caracteresValor2[0][i]=='.'){
                var acumulaPontoValor2 = '.'
            }
        }
        
        if(!(acumulaPontoValor2=='.')){
            nmrTela.innerHTML+='.'
        }
    }

    for(let i in caracteresValor1[0]){
        if(caracteresValor1[0][i]=='.'){
            var acumulaPontoValor1 = '.'
        }
    }
    if(!(acumulaPontoValor1=='.')){
        nmrTela.innerHTML+='.'
    }
}

function mudarSinal(){
    var caracteres = nmrTela.innerHTML.split('')
    var nmrAtual = parseFloat(nmrTela.innerHTML);
    if (valores.length == 0){
        if(nmrAtual != 0){
            if(caracteres[0] == "-"){        
                caracteres.shift()
                nmrTela.innerHTML = caracteres
            } 
            else {
                nmrTela.innerHTML = `-${nmrAtual}`
            }
        }
    }
    else {
        let caracteres2Valor = caracteres[2].split('')
        if(caracteres2Valor[0] != "-"){
            let novosCaracteres = '-'
            for (let i in caracteres2Valor){
                novosCaracteres += caracteres2Valor[i]
            }
            caracteres[2] = novosCaracteres
            nmrTela.innerHTML = `${caracteres[0]} ${caracteres[1]} ${caracteres[2]}`
        }
        else {
            let novosCaracteres = caracteres[2].split('')
            novosCaracteres.shift()
            nmrTela.innerHTML = `${caracteres[0]} ${caracteres[1]} ${novosCaracteres[0]}`
        }
    }
}

function darResultado() {
    var resultado = 0
    var operacao = valores[1]
    if(operacao == '-'){
        tratarResultado('-')
    }
    else if(operacao =='+'){
        tratarResultado('+')
    }
    else if(operacao == 'x'){
        tratarResultado('*')
    }
    else if(operacao == '/'){
        tratarResultado('/')
    }
    valores.splice(0,3)

    function tratarResultado(operacao){
        valoresEspaco = nmrTela.innerHTML.split(' ')
        valores.push(valoresEspaco[2])
        switch(operacao){
            case '-':
                resultado = parseFloat(valores[0]) - parseFloat(valores[2])
                nmrTela.innerHTML= resultado
                break;
            case '+':
                resultado = parseFloat(valores[0]) + parseFloat(valores[2])
                nmrTela.innerHTML= resultado
                break;
            case '*':
                console.log('chegou')
                resultado = parseFloat(valores[0]) * parseFloat(valores[2])
                nmrTela.innerHTML= resultado
                break;
            case '/':
                resultado = parseFloat(valores[0]) / parseFloat(valores[2])
                nmrTela.innerHTML= resultado
                break;
        }
    }
}

function limpar(){
    valores.splice(0,3)
    nmrTela.innerHTML = "0"
}

function apagarUltimo (){
    var caracteres = nmrTela.innerHTML.trim().split('')
    var arrayCaracteresTela = ""
    caracteres.pop()
    for(let i in caracteres){arrayCaracteresTela += caracteres[i]}
    if((arrayCaracteresTela == [])||(arrayCaracteresTela == '-')){
        nmrTela.innerHTML = 0
    }
    else{
        nmrTela.innerHTML = arrayCaracteresTela
    }
    
    if(caracteres.length == 0){
        valores.pop()
        valores.pop()
    }
}

function teclado(){
    var tecla=event.keyCode;
    
    switch(tecla){
        case 48:
            pegarNumero(0)
            break;
        case 49: 
            pegarNumero(1) 
            break;
        case 50:
            pegarNumero(2)
            break;
        case 51:
            pegarNumero(3)
            break
        case 52:
            pegarNumero(4)
            break;
        case 53:
            pegarNumero(5)
            break;
        case 54: 
            pegarNumero(6) 
            break;
        case 55:
            pegarNumero(7)
            break;
        case 56:
            pegarNumero(8)
            break
        case 57:
            pegarNumero(9)
            break;
        case 88:
            multiplicar()
            break;
        case 193:
            dividir()
            break;
        case 187:
            somar()
            break;
        case 188:
            colocarPonto()
            break;
        case 189:
            subtrair();
            break;
        case 190:
            colocarPonto()
            break;
        case 13:
            darResultado()
            break;
        case 8:
            apagarUltimo()
            break;
        case 27:
            limpar();
            break;
    }
}