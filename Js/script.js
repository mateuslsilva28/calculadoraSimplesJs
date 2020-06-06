const nmrTela = document.getElementById("resultado")

var valoresEspaco = '';
var valores = []
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
    console.log()
    var caracteres = nmrTela.innerHTML.split('')
    if (caracteres[0] != sinal){
        valoresEspaco = nmrTela.innerHTML.split(' ')
        valores.push(parseFloat(nmrTela.innerHTML))
        nmrTela.innerHTML+=  ` ${sinal} `
    }
    else{
        valoresEspaco = nmrTela.innerHTML.split(' ')
        valores.push(parseFloat(nmrTela.innerHTML))
        nmrTela.innerHTML+= ` ${sinal} `
    }
    valores.push(sinal)
}

function colocarPonto(){
    nmrTela.innerHTML+='.'    
}

function mudarSinal(){
    console.log(valores)
    if (valores.length == 0){
        var caracteres = nmrTela.innerHTML.split('')
        var nmrAtual = parseFloat(nmrTela.innerHTML);
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
        var caracteres = nmrTela.innerHTML.split(' ')
        var nmrAtual = parseFloat(nmrTela.innerHTML);
        console.log(caracteres)
        let caracteres2Valor = caracteres[2].split('')
        if(caracteres2Valor[0]!= " "){
            alert('top')
            caracteres = '-'
            let novosCaracteres = []
            novosCaracteres.concat(caracteres)
            console.log(novosCaracteres)
        }
    }
    /*
    var caracteres = nmrTela.innerHTML.split('')
    var nmrAtual = parseFloat(nmrTela.innerHTML);
    if(nmrAtual != 0){
        if(caracteres[0] == "-"){        
            caracteres.shift()
            nmrTela.innerHTML = caracteres
        } 
        else {
            nmrTela.innerHTML = `-${nmrAtual}`
        }
    }*/
}

function darResultado() {
    var resultado = 0
    var operacao = valores[1]
    if(operacao == '-'){
        valoresEspaco = nmrTela.innerHTML.split(' ')
        valores.push(valoresEspaco[2])
        
        resultado = parseFloat(valores[0]) - parseFloat(valores[2])
        nmrTela.innerHTML= resultado
    }
    else if(operacao =='+'){
        valoresEspaco = nmrTela.innerHTML.split(' ')
        valores.push(valoresEspaco[2])
        resultado = parseFloat(valores[0]) + parseFloat(valores[2])
        nmrTela.innerHTML= resultado
    }
    else if(operacao == 'x'){
        valoresEspaco = nmrTela.innerHTML.split(' ')
        valores.push(valoresEspaco[2])
        resultado = parseFloat(valores[0]) * parseFloat(valores[2])
        nmrTela.innerHTML= resultado
    }
    else if(operacao == '/'){
        valoresEspaco = nmrTela.innerHTML.split(' ')
        valores.push(valoresEspaco[2])
        resultado = parseFloat(valores[0]) / parseFloat(valores[2])
        nmrTela.innerHTML= resultado
    }
    valores.splice(0,3)
}

function limpar(){
    valores.splice(0,3)
    nmrTela.innerHTML = "0"
}

function apagarUltimo (){
    var caracteres = nmrTela.innerHTML.split('')
    caracteres.pop()
    var arrayCaracteresTela = ""
    for(let i in caracteres){arrayCaracteresTela += caracteres[i]}
    if((arrayCaracteresTela == [])||(arrayCaracteresTela == '-')){
        nmrTela.innerHTML = 0
    }
    else{
        nmrTela.innerHTML = arrayCaracteresTela
    }
}