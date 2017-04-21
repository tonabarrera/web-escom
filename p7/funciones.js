var contador = 0;
function agregar(numero) {
    var valor = 0;
    if (numero == 0) {
        valor = contador++;
    } else {
        valor = numero;
    }
    var tr = document.createElement("tr");
    var td_numero = document.createElement("td");
    var td_valor = document.createElement("td");
    var numero_contenido = document.createTextNode(valor);
    var factorial = calcularFactorial(valor);
    var valor_contenido = document.createTextNode(factorial);
    var cuerpo = document.getElementById("cuerpo");
    td_numero.appendChild(numero_contenido);
    td_valor.appendChild(valor_contenido);
    tr.appendChild(td_numero);
    tr.appendChild(td_valor);
    cuerpo.appendChild(tr);
}

function agregarCinco() {
    for (var i = contador; i < contador+5; i++)
        agregar(i);
    contador = i;
}

function eliminar() {
    var padre = document.getElementById("cuerpo");
    var ultimo = padre.lastChild;
    if (ultimo != null) {
        padre.removeChild(ultimo);
        contador--;
        console.log(contador);
    }
}

function eliminarTodo() {
    var padre = document.getElementById("cuerpo");
    var ultimo = padre.lastChild;
    while (ultimo != null) {
        padre.removeChild(ultimo);
        contador--;
        ultimo = padre.lastChild;
    }
}

function calcularFactorial(numero) {
    if (numero < 2) {
        return 1;
    }
    return numero * calcularFactorial(numero-1);
}
