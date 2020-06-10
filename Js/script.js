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

function verificarSinal(sinal){
    if(valores.length<=1){
        valoresEspaco = nmrTela.innerHTML.split(' ')
        valores.push(parseFloat(nmrTela.innerHTML))
        nmrTela.innerHTML+= ` ${sinal} `
        valores.push(sinal)
    }
}

function porcentagem () {
    var caracteres = nmrTela.innerHTML.split(' ')
    console.log(caracteres.length, caracteres)
    if(caracteres.length == 3){
        var valorPorCento = parseFloat(caracteres[2]) / 100
        var caracteresValor2 = caracteres[2].split('')
        if(caracteresValor2.length != 0){
            if(caracteresValor2[caracteresValor2.length - 1] != "%"){
                nmrTela.innerHTML+= '%'
            }
            valores.push(valorPorCento)
        }
    }
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
            imprimirValor(caracteresValor2, valor2 ,caracteresDaConta)
        }
        else{
            caracteresValor2.unshift('-')
            imprimirValor(caracteresValor2, valor2, caracteresDaConta);
        }
    }

    if(valores.length == 0){
        if(caracteresValor1[0] == "-"){
            caracteresValor1.shift()
            imprimirValor(caracteresValor1, valor1)
        }
        else{
            caracteresValor1.unshift('-')
            imprimirValor(caracteresValor1, valor1)
        }
    }

    function imprimirValor(caracteresValor,  valorNumero, caracteresConta){
        caracteresValor.forEach(valor =>{
            valorNumero+= valor;
        })        
        if(caracteresConta!=undefined){
            nmrTela.innerHTML = `${caracteresConta[0]} ${caracteresConta[1]} ${valorNumero}`            
        }
        else{
            nmrTela.innerHTML = valorNumero           
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
    const numbers = '0123456789'
    const operadores = '+-/x'
    var tecla = event.key
    if(numbers.includes(tecla)){
        pegarNumero(tecla)
    }
    else if(operadores.includes(tecla)){
        verificarSinal(tecla)
    }
    else switch(tecla){
        case '*':
            verificarSinal('x')
            break;
        case '%':
            porcentagem()
            break;
        case '.':
        case ',':
            colocarPonto();
            break;
        case '=':
        case 'Enter':
            darResultado();
            break;
        case 'Backspace':
            apagarUltimo()
            break;
        case 'Escape':
            limpar(0);
            break;
    }
}