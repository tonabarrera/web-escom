var cola = new Array();
var btnCola = document.getElementById("btn-formar");
var btnCrear = document.getElementById("btn-crear");
var btnInsertar = document.getElementById("btn-insertar");
var btnPop = document.getElementById("btn-sacar");
var cont1 = document.getElementById("contenedor1");
var cont2 = document.getElementById("contenedor2");
var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var codeContainer = document.getElementById("code-container");
context.lineWidth="2";
context.strokeStyle="green";
context.font = "16px Arial";
var canvasWidth = canvas.width;
var canvasHeight = canvas.height;
var widthRect = 50;
var heightRect = 30;
var coordX = canvasWidth-widthRect-5;
var coordY = canvasHeight-heightRect-5;
var stackPositionX = 10;
var stackPositionY = 200;
var BOTTOM = stackPositionY;
var LEFT = stackPositionX;
var nodeValue;
var yolo=10;
function dibuja() {
    context.clearRect((cola.length * 50)+10, 0, canvasWidth, canvasHeight);
    context.clearRect(coordX, coordY, widthRect, heightRect);
    context.beginPath();
    context.fillText(nodeValue,coordX+20, coordY+20);
    context.rect(coordX, coordY, widthRect, heightRect);
    context.stroke();
    context.closePath();
}
function loadCode(option) {
    var imagenes = ["crearcola", "enqueve", "dequeve"];
    console.log(option);
    codeContainer.innerHTML = '<img src="./img/'+imagenes[option]+'.png" width=500px class="borde">';
}
function loadStack() {
    if(localStorage.getItem("cola")){
        cola = JSON.parse(localStorage.getItem("cola"));
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
    stackPositionX = LEFT;
    for (var nodo of cola){
        context.beginPath();
        context.fillText(nodo, stackPositionX+20, stackPositionY+20);
        context.rect(stackPositionX, stackPositionY, widthRect, heightRect);
        context.stroke();
        context.closePath();
        stackPositionX = stackPositionX+widthRect;
    }
}
btnPop.addEventListener("click", function(e) {
    e.preventDefault();
    context.clearRect(100, 300, canvasWidth, canvasHeight);
    if (cola.length < 1)
        alert("No hay elementos que sacar de la cola");
    else{
        cola.splice(0,1);
        localStorage.setItem("cola", JSON.stringify(cola));
        drawStack();
        loadCode(2);
    }
});
btnCola.addEventListener("click", function(e) {
    e.preventDefault();
    context.clearRect(100, 300, canvasWidth, canvasHeight);
    if (cola.length>15){
        alert("Tope de la cola alcanzado");
        return;
    }
    cont1.className = "";
    btnCola.disabled = true;
    btnCrear.disabled = false;
});

btnCrear.addEventListener("click", function(e){
    nodeValue = document.getElementById("textValor").value;
    if (nodeValue != "" && isInt(nodeValue)) {
    context.beginPath();
    context.fillText(nodeValue, coordX+20, coordY+20);
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
            context.clearRect(0, 0, canvasWidth, canvasHeight);
            drawStack();
            clearInterval(interval);
        } else
            raf = window.requestAnimationFrame(dibuja);
    },2);
    cont2.className = "hidden";
    cola.push(nodeValue);
    localStorage.setItem("cola", JSON.stringify(cola));
    for (var i =0; i< cola.length+100; i++)
        context.clearRect(400, 0, canvasWidth, canvasHeight);
    btnCola.disabled = false;
    btnCrear.disabled = true;
    btnInsertar.disabled = true;
    loadCode(1);
});

loadStack();
