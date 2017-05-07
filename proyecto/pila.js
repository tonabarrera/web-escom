var pila = new Array();
var btnPush = document.getElementById("btn-push");
var btnCrear = document.getElementById("btn-crear");
var btnInsertar = document.getElementById("btn-insertar");
var btnPop = document.getElementById("btn-pop");
var cont1 = document.getElementById("contenedor1");
var cont2 = document.getElementById("contenedor2");
var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var codeContainer = document.getElementById("code-container");
context.lineWidth="2";
context.strokeStyle="blue";
context.font = "16px Arial";
var canvasWidth = canvas.width;
var canvasHeight = canvas.height;
var widthRect = 100;
var heightRect = 30;
var coordX = canvasWidth-widthRect-5;
var coordY = canvasHeight-heightRect-5;
var stackPositionX = 10;
var stackPositionY = coordY;
var BOTTOM = coordY;
var nodeValue;

function dibuja() {
    context.clearRect(115, 0, canvasWidth, canvasHeight);
    context.clearRect(coordX, coordY-1, widthRect, heightRect);
    context.beginPath();
    context.fillText(nodeValue,coordX+50, coordY+20);
    context.rect(coordX, coordY, widthRect, heightRect);
    context.stroke();
    context.closePath();
}
function loadCode(option) {
    var imagenes = ["crear_nodo", "push", "pop"];
    codeContainer.innerHTML = "fsdfs";
    console.log(option);
    codeContainer.innerHTML = '<img src="./img/'+imagenes[option]+'.png" width=500px class="borde">';
}
function loadStack() {
    if(localStorage.getItem("pila")){
        pila = JSON.parse(localStorage.getItem("pila"));
        drawStack();
    }
}

function isInt(value) {
    if (isNaN(value))
        return false
    var x = parseFloat(value);
    return (x | 0) === x
}

function drawStack() {
    context.clearRect(0, 0, canvasWidth, canvasHeight);
    stackPositionY = BOTTOM;
    for (var nodo of pila){
        context.beginPath();
        context.fillText(nodo, stackPositionX+50, stackPositionY+20);
        context.rect(stackPositionX, stackPositionY, widthRect, heightRect);
        context.stroke();
        context.closePath();
        stackPositionY = stackPositionY-heightRect;
    }
    context.clearRect(115, 0, canvasWidth, canvasHeight);
}

btnPop.addEventListener("click", function(e) {
    e.preventDefault()
    if (pila.length < 1)
        alert("No hay elementos que sacar de la pila");
    else{
        pila.pop();
        localStorage.setItem("pila", JSON.stringify(pila));
        drawStack();
        loadCode(2);
    }
});

btnPush.addEventListener("click", function(e) {
    e.preventDefault();
    cont1.className = "";
    btnPush.disabled = true;
    btnCrear.disabled = false;
});

btnCrear.addEventListener("click", function(e){
    nodeValue = document.getElementById("textValor").value;
    if (nodeValue != "" && isInt(nodeValue)) {
    context.beginPath();
    context.fillText(nodeValue, coordX+50, coordY+20);
    context.rect(coordX, coordY, widthRect, heightRect);
    context.stroke();
    context.closePath();
    cont1.className = "hidden";
    cont2.className = "";
    document.getElementById("textValor").value = "";
    loadCode(0);
    btnInsertar.disabled = false;
    } else
        alert("Por favor inserta un número")
});

btnInsertar.addEventListener("click", function(e){
    e.preventDefault();
    var raf = window.requestAnimationFrame(dibuja);
    var interval = setInterval(function(){
        if (coordY != stackPositionY)
            coordY = coordY-1;
        else if (coordX != stackPositionX)
            coordX = coordX-1;
        if (coordY == stackPositionY && coordX == stackPositionX){
            window.cancelAnimationFrame(raf);
            coordX = canvasWidth-widthRect-5;
            coordY = canvasHeight-heightRect-5;
            context.clearRect(115, 0, canvasWidth, canvasHeight);
            context.clearRect(115, 0, canvasWidth, canvasHeight);
            drawStack();
            clearInterval(interval);
        } else
            raf = window.requestAnimationFrame(dibuja);
    }, 2);
    cont2.className = "hidden";
    loadCode(1);
    pila.push(nodeValue);
    localStorage.setItem("pila", JSON.stringify(pila));
    for (var i =0; i< pila.length+100; i++)
        context.clearRect(115, 0, canvasWidth, canvasHeight);

    btnPush.disabled = false;
    btnCrear.disabled = true;
    btnInsertar.disabled = true;
});

loadStack();
