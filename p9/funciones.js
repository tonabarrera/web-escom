var btnIgual = document.getElementById("igual");
var btnResta = document.getElementById("resta");
var btnSuma = document.getElementById("suma");
var btnDivision = document.getElementById("division");
var btnMultiplicacion = document.getElementById("multiplicacion");
var btnBinario = document.getElementById("binario");
var btnCero = document.getElementById("cero");
var btnUno = document.getElementById("uno");
var btnDos = document.getElementById("dos");
var btnTres = document.getElementById("tres");
var btnCuatro = document.getElementById("cuatro");
var btnCinco = document.getElementById("cinco");
var btnSeis = document.getElementById("seis");
var btnSiete = document.getElementById("siete");
var btnOcho = document.getElementById("ocho");
var btnNueve = document.getElementById("nueve");
var contenedor = document.getElementById("resultado");
var botones = document.getElementsByTagName("input");

function evaluar(cadena) {
    var cola = new Array();
    var pila = new Array();
    var pila2 = new Array();
    var continua = false;
    for (var caracter of cadena){
        console.log(caracter);
        if (caracter.charCodeAt(0) >47 && caracter.charCodeAt(0)<58){
            if (continua)
                cola.push(cola.pop()+caracter);
            else
                cola.push(caracter);
            continua = true
        } else if (caracter==="+" || caracter==="-" || caracter==="/" || caracter==="*") {
            var valor = pila.pop();
            while (valor==="+" || valor==="-" || valor==="/" || valor==="*") {
                if (caracter==="+" || caracter==="*") {
                    if (!(caracter ==="*" && valor==="-") && !(caracter ==="*" && valor==="+")) {
                        cola.push(valor);
                        valor = pila.pop()
                    } else {
                        pila.push(valor);
                        break;
                    }
                } else {
                    if (caracter==="-" && valor==="*"){
                        cola.push(valor);
                        valor = pila.pop();
                    } else if (caracter==="-" && valor==="/"){
                        cola.push(valor);
                        valor = pila.pop();
                    } else if (caracter==="-" && valor==="-"){
                        cola.push(valor);
                        valor = pila.pop();
                    } else if (caracter==="-" && valor==="+"){
                        cola.push(valor);
                        valor = pila.pop();
                    } else if (caracter==="/" && valor==="/"){
                        cola.push(valor);
                        valor = pila.pop();
                    } else if (caracter==="/" && valor==="*"){
                        cola.push(valor);
                        valor = pila.pop();
                    } else {
                        pila.push(valor);
                        break;
                    }
                }
            }
            pila.push(caracter);
            continua = false;
        }
    }
    while (pila.length >0)
        cola.push(pila.pop());
    var a;
    var b;
    for (var elemento of cola) {
        if (elemento=="+"){
            a = pila2.pop();
            b = pila2.pop();
            pila2.push(a+b);
        } else if (elemento=="-") {
            a = pila2.pop();
            b = pila2.pop();
            pila2.push(b-a);
        } else if (elemento=="*") {
            a = pila2.pop();
            b = pila2.pop();
            pila2.push(a*b);
        } else if (elemento=="/") {
            a = pila2.pop();
            b = pila2.pop();
            pila2.push(b/a);
        }
        else
            pila2.push(parseInt(elemento, 10));
    }
    if (isNaN(pila2[0])){
        alert("Error");
        return 0;
    }else
        return (pila2[0]).toFixed(2);
}

function toBinario(cadena) {
    var dato = evaluar(cadena);
    dato = (dato>>>0).toString(2);
    contenedor.innerHTML = dato;
}

for (var elemento of botones) {
    (function(e){
    e.addEventListener("click", function() {
        if (e.value!=="Binario" && e.value!=="=" && e.value!=="Borrar")
            contenedor.innerHTML = contenedor.innerHTML + e.value;
        else if (e.value === "="){
            var re = evaluar(contenedor.innerHTML);
            contenedor.innerHTML = re;
        }else if (e.value === "Binario")
            toBinario(contenedor.innerHTML);
        else if (e.value === "Borrar")
            contenedor.innerHTML = "";
        else
            console.log("ERROR");
    });
  })(elemento);
}
