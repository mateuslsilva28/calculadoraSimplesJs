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
        verificarSeExistePonto(caracteresValor2)
    }

    verificarSeExistePonto(caracteresValor1)

    function verificarSeExistePonto(caracteresValor){
        for(let i in caracteresValor[0]){
            if(caracteresValor[0][i]=='.'){
                var acumuladora = '.'
            }
        }
        
        if(!(acumuladora=='.')){
            nmrTela.innerHTML+='.'
        }
    }
}

function mudarSinal(){
    const caracteresDaConta = nmrTela.innerHTML.trim().split(' ')
    let caracteresValor1 = caracteresDaConta[0].split('')
    let valor1 = ''
    let valor2 = ''

    if(caracteresDaConta.length == 3){
        var caracteresValor2 = caracteresDaConta[2].split('')
        
        if(caracteresValor2[0] == '-'){
            caracteresValor2.shift()
            imprimirValor2()
        }
        else{
            caracteresValor2.unshift('-')
            imprimirValor2();
        }
    }

    if(valores.length == 0){
        if(caracteresValor1[0] == "-"){
            caracteresValor1.shift()
            imprimirValor1()
        }
        else{
            caracteresValor1.unshift('-')
            imprimirValor1()
        }
    }

    function imprimirValor2(){
        caracteresValor2.forEach(valor => {
            valor2+= valor
        })
        nmrTela.innerHTML = `${caracteresDaConta[0]} ${caracteresDaConta[1]} ${valor2}`
    }

    function imprimirValor1(){
        caracteresValor1.forEach(valor => {
            valor1+= valor;
        });
        nmrTela.innerHTML = valor1
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
                limpar(resultado)
                break;
            case '+':
                resultado = parseFloat(valores[0]) + parseFloat(valores[2])
                limpar(resultado)
                break;
            case '*':
                resultado = parseFloat(valores[0]) * parseFloat(valores[2])
                limpar(resultado)
                break;
            case '/':
                resultado = parseFloat(valores[0]) / parseFloat(valores[2])
                limpar(resultado)
                break;
        }
    }
}

function limpar(valor){
    valores.splice(0,3)
    nmrTela.innerHTML = valor
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